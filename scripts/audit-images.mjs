import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = path.join(ROOT, 'data');
const REPORT_PATH = 'G:\\Claude\\Crimson-Desert-NPC-Bilder\\BILD-AUDIT.md';
const MIN_BYTES = 1024;
const MAP_DECLARATION = /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*_IMGS(?:_CDN)?)\s*=/g;
const IMAGE_PATH = /\.(?:webp|png|jpe?g|svg)(?:[?#].*)?$/i;

function uint24LE(buffer, offset) {
  return buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16);
}

function parsePng(buffer) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (buffer.length < 24 || !buffer.subarray(0, 8).equals(signature)) return null;
  if (buffer.toString('ascii', 12, 16) !== 'IHDR') return null;
  return { format: 'PNG', width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function parseWebp(buffer) {
  if (
    buffer.length < 30 ||
    buffer.toString('ascii', 0, 4) !== 'RIFF' ||
    buffer.toString('ascii', 8, 12) !== 'WEBP'
  ) return null;

  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const type = buffer.toString('ascii', offset, offset + 4);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const data = offset + 8;
    if (data + chunkSize > buffer.length) return null;

    if (type === 'VP8 ' && chunkSize >= 10) {
      if (buffer[data + 3] !== 0x9d || buffer[data + 4] !== 0x01 || buffer[data + 5] !== 0x2a) return null;
      return {
        format: 'WEBP',
        width: buffer.readUInt16LE(data + 6) & 0x3fff,
        height: buffer.readUInt16LE(data + 8) & 0x3fff,
      };
    }

    if (type === 'VP8L' && chunkSize >= 5) {
      if (buffer[data] !== 0x2f) return null;
      const bits = buffer.readUInt32LE(data + 1);
      return {
        format: 'WEBP',
        width: (bits & 0x3fff) + 1,
        height: ((bits >>> 14) & 0x3fff) + 1,
      };
    }

    if (type === 'VP8X' && chunkSize >= 10) {
      return {
        format: 'WEBP',
        width: uint24LE(buffer, data + 4) + 1,
        height: uint24LE(buffer, data + 7) + 1,
      };
    }

    offset = data + chunkSize + (chunkSize & 1);
  }
  return null;
}

function parseJpeg(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;
  const sofMarkers = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
  let offset = 2;

  while (offset < buffer.length) {
    while (offset < buffer.length && buffer[offset] !== 0xff) offset += 1;
    while (offset < buffer.length && buffer[offset] === 0xff) offset += 1;
    if (offset >= buffer.length) break;

    const marker = buffer[offset++];
    if (marker === 0xd8 || marker === 0xd9 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
    if (offset + 2 > buffer.length) return null;
    const segmentLength = buffer.readUInt16BE(offset);
    if (segmentLength < 2 || offset + segmentLength > buffer.length) return null;

    if (sofMarkers.has(marker)) {
      if (segmentLength < 7) return null;
      return {
        format: 'JPEG',
        width: buffer.readUInt16BE(offset + 5),
        height: buffer.readUInt16BE(offset + 3),
      };
    }
    if (marker === 0xda) break;
    offset += segmentLength;
  }
  return null;
}

export function readImageInfo(buffer) {
  const info = parsePng(buffer) ?? parseWebp(buffer) ?? parseJpeg(buffer);
  if (!info || info.width < 1 || info.height < 1) return null;
  return { ...info, ratio: info.width / info.height };
}

function mapNames(source) {
  return [...source.matchAll(MAP_DECLARATION)].map((match) => match[1]);
}

function evaluateMaps(source, names, filename) {
  if (names.length === 0) return {};
  try {
    const result = new Function(`${source}\nreturn {${names.join(',')}};`)();
    return Object.fromEntries(names.map((name) => [name, result[name]]));
  } catch (error) {
    throw new Error(`Bild-Maps aus ${filename} konnten nicht ausgewertet werden: ${error.message}`);
  }
}

function collectImageStrings(value, labels = [], result = []) {
  if (typeof value === 'string') {
    if (IMAGE_PATH.test(value)) result.push({ key: labels.join(' > ') || '(Wert)', value });
    return result;
  }
  if (!value || typeof value !== 'object') return result;
  for (const [key, child] of Object.entries(value)) collectImageStrings(child, [...labels, key], result);
  return result;
}

function isRemote(value) {
  return /^(?:[a-z][a-z\d+.-]*:)?\/\//i.test(value) || /^(?:data|blob):/i.test(value);
}

function cleanLocalPath(value) {
  return value.split(/[?#]/, 1)[0].replace(/^[/\\]+/, '').replace(/[\\/]+/g, path.sep);
}

function slash(value) {
  return value.split(path.sep).join('/');
}

function itemLine(item) {
  const suffix = item.reason ? `: ${item.reason}` : '';
  return `- \`${item.key}\` -> \`${item.displayPath}\`${suffix}`;
}

function groupedSection(title, items, mapOrder) {
  const lines = [`## ${title}`, ''];
  if (items.length === 0) return [...lines, '- Keine.', ''];
  for (const mapName of mapOrder) {
    const group = items.filter((item) => item.map === mapName);
    if (group.length === 0) continue;
    lines.push(`### ${mapName}`, '', ...group.map(itemLine), '');
  }
  return lines;
}

async function loadMaps() {
  const files = (await readdir(DATA_DIR, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith('.js'))
    .sort((a, b) => a.name.localeCompare(b.name));
  const maps = [];
  for (const file of files) {
    const source = await readFile(path.join(DATA_DIR, file.name), 'utf8');
    const names = mapNames(source);
    const evaluated = evaluateMaps(source, names, file.name);
    for (const name of names) maps.push({ name, file: file.name, value: evaluated[name] });
  }
  return maps;
}

async function listFilesRecursively(directory) {
  const output = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...await listFilesRecursively(fullPath));
    else if (entry.isFile()) output.push(fullPath);
  }
  return output;
}

async function main() {
  const maps = await loadMaps();
  const mapOrder = maps.map((map) => map.name);
  const missing = [];
  const suspicious = [];
  const landscape = [];
  const referenced = new Set();
  let localReferenceCount = 0;

  for (const map of maps) {
    for (const image of collectImageStrings(map.value)) {
      if (isRemote(image.value)) continue;
      localReferenceCount += 1;
      const localPath = cleanLocalPath(image.value);
      const fullPath = path.resolve(ROOT, localPath);
      const displayPath = slash(path.relative(ROOT, fullPath));
      referenced.add(displayPath.toLowerCase());
      const base = { map: map.name, key: image.key, displayPath };

      let fileStat;
      try {
        fileStat = await stat(fullPath);
      } catch (error) {
        if (error.code === 'ENOENT') {
          missing.push(base);
          continue;
        }
        throw error;
      }
      if (!fileStat.isFile()) {
        missing.push({ ...base, reason: 'Pfad ist keine Datei' });
        continue;
      }

      const buffer = await readFile(fullPath);
      const info = readImageInfo(buffer);
      const reasons = [];
      if (fileStat.size <= MIN_BYTES) reasons.push(`nur ${fileStat.size} Bytes (muss > 1 KB sein)`);
      if (!info) reasons.push('kein gueltiger WEBP-/PNG-/JPEG-Header oder Abmessungen nicht lesbar');
      if (reasons.length > 0) suspicious.push({ ...base, reason: reasons.join('; ') });
      if (map.name === 'NPC_IMGS' && info?.ratio > 1.3) {
        landscape.push({
          ...base,
          reason: `${info.width}x${info.height}, Seitenverhaeltnis ${info.ratio.toFixed(2)}`,
        });
      }
    }
  }

  const npcDirectory = path.join(ROOT, 'cd_assets', 'npcs');
  const orphaned = (await listFilesRecursively(npcDirectory))
    .filter((file) => IMAGE_PATH.test(file))
    .map((file) => slash(path.relative(ROOT, file)))
    .filter((file) => !referenced.has(file.toLowerCase()))
    .sort((a, b) => a.localeCompare(b))
    .map((displayPath) => ({ map: 'cd_assets/npcs', key: '(keine Referenz)', displayPath }));

  const now = new Date().toISOString();
  const report = [
    '# Bild-Audit',
    '',
    `Erstellt: ${now}`,
    `Projekt: \`${ROOT}\``,
    `Gepruefte Maps: ${maps.length}; lokale Referenzen: ${localReferenceCount}`,
    '',
    ...groupedSection('Fehlende Dateien', missing, mapOrder),
    ...groupedSection('Verdaechtige Dateien', suspicious, mapOrder),
    ...groupedSection('Querformat-Bilder in Portrait-Kontexten', landscape, mapOrder),
    ...groupedSection('Verwaiste Dateien', orphaned, ['cd_assets/npcs']),
  ].join('\n');

  await mkdir(path.dirname(REPORT_PATH), { recursive: true });
  await writeFile(REPORT_PATH, report, 'utf8');

  const summary = [
    `Bild-Audit: ${maps.length} Maps, ${localReferenceCount} lokale Referenzen`,
    `Fehlend: ${missing.length}`,
    `Verdaechtig: ${suspicious.length}`,
    `Querformat in NPC_IMGS: ${landscape.length}`,
    `Verwaist in cd_assets/npcs: ${orphaned.length}`,
    `Report: ${REPORT_PATH}`,
  ].join('\n');
  console.log(summary);
  process.exitCode = missing.length > 0 || suspicious.length > 0 ? 1 : 0;
}

if (path.resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(`Bild-Audit fehlgeschlagen: ${error.stack ?? error.message}`);
    process.exitCode = 1;
  });
}
