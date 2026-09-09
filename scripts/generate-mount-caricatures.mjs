// Complete the existing deliberately simple geometric mount illustration set.
// These are decorative caricatures, not reference images of in-game equipment.
import { writeFileSync } from 'node:fs';
const dir = new URL('../cd_assets/mounts/', import.meta.url);
const ellipse=(x,y,rx,ry,c)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${c}"/>`;
const path=(d,c,stroke='none',width=3)=>`<path d="${d}" fill="${c}" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
const rect=(x,y,w,h,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
const eye=(x,y)=>ellipse(x,y,7,8,'#e9e6d6')+ellipse(x+2,y,3,4,'#17181c');
const legs=(c)=>[137,162,234,259].map((x,i)=>rect(x,169,17,60,c)+ellipse(x+8,229,14,7,i%2?'#242329':'#17171e')).join('');
function horse(c,mane,cloth,scout=false){
 return path('M113 137 L53 107 L48 149 L111 167',mane)+legs(c)+
 ellipse(193,157,91,44,c)+ellipse(183,143,66,22,'#ffffff12')+
 path('M236 140 L258 76 L283 83 L281 143',c)+
 path('M247 104 L242 76 L259 62 L270 73 L262 121',mane)+
 path('M274 70 L269 45 L281 55 L285 72 M288 70 L294 46 L301 63 L298 77',c)+
 ellipse(286,87,29,23,c)+ellipse(311,97,25,16,c)+ellipse(326,95,4,3,mane)+eye(292,81)+
 path('M142 123 L220 121 L231 168 L145 171 Z',cloth)+
 path('M151 127 L153 166 M215 126 L222 164','none','#bd9c58',3)+
 ellipse(184,128,34,9,'#3b2d26')+
 (scout?rect(155,126,18,31,'#918259')+rect(193,126,18,31,'#918259'):
 path('M269 72 L289 69 L300 93 L284 108 L265 97 Z','#8e929b')+eye(291,82)+
 path('M175 144 L184 138 L193 144 L191 155 L184 161 L177 155 Z','#c8aa62'));
}
function bear(c,claws=false){
 return ellipse(113,156,18,17,c)+legs(c)+ellipse(192,157,88,48,c)+ellipse(207,115,56,44,c)+
 ellipse(250,84,12,12,c)+ellipse(280,84,12,12,c)+ellipse(265,110,38,32,c)+
 ellipse(288,123,23,16,'#ae9575')+ellipse(306,119,7,5,'#242124')+eye(273,104)+
 ellipse(175,147,46,26,'#ffffff0b')+(claws?[145,170,242,267].map(x=>
 path(`M${x-8} 229 l-3 10 7-8 M${x} 230 l-1 10 5-9 M${x+7} 229 l2 9 4-10`,'#d7c9aa')).join(''):'');
}
function wolf(c,dark){
 return path('M115 151 L59 112 L70 153 L112 174',c)+legs(dark)+ellipse(191,157,86,36,c)+
 path('M234 147 L251 99 L278 109 L282 155',c)+path('M250 101 L249 70 L266 91 L278 72 L287 111',dark)+
 ellipse(273,117,29,23,c)+path('M285 113 L332 124 L323 141 L280 137',c)+
 ellipse(330,125,6,5,dark)+eye(280,110)+path('M235 139 L246 124 L242 151 L255 140 L251 161',dark);
}
function ibex(){return legs('#756c59')+ellipse(195,158,78,36,'#b5a488')+
 path('M236 145 L255 86 L275 96 L279 152','#b5a488')+ellipse(278,100,29,18,'#b5a488')+
 path('M270 86 Q242 51 238 29 Q224 64 252 93 M281 85 Q270 43 255 26 Q253 59 268 91','none','#d4c9aa',8)+
 path('M259 92 L240 84 L248 100','#b5a488')+eye(283,97)+path('M282 115 L277 135 L293 117','#756c59')+
 path('M121 145 L103 130 L110 153','#b5a488');}
function iguana(){return path('M137 157 L51 130 L95 168 L147 184','#933f2c')+
 [145,183,245,268].map(x=>path(`M${x} 173 l-4 39 15 4`,'none','#853422',9)).join('')+
 ellipse(205,157,78,34,'#b44d32')+path('M249 146 L268 104 L316 110 L326 134 L280 143','#b44d32')+
 path('M137 136 l7-16 8 14 8-18 8 16 8-19 8 17 8-19 8 18 8-18 8 18 8-19 8 18','#e2a261')+
 eye(289,116)+path('M302 132 L328 131','none','#59261c',3)+ellipse(189,150,37,15,'#df794827');}
function balloon(c,fast=false){return ellipse(203,220,111,14,'#08080c')+
 path('M137 112 L162 193 M268 112 L244 193 M185 129 L185 193 M228 129 L228 193','none','#917555',3)+
 ellipse(202,91,fast?116:90,62,c)+ellipse(202,91,fast?78:56,62,'#ffffff12')+
 ellipse(202,91,fast?36:23,62,'#ffffff0e')+rect(154,191,100,28,'#665033')+
 rect(150,187,108,8,'#9b7948')+[162,176,190,204,218,232,246].map(x=>rect(x,197,2,17,'#a0875d')).join('')+
 (fast?path('M90 79 L48 50 L64 94 L48 126 L91 104','#5b777c'):
 path('M137 60 L267 60 M115 90 L291 90 M137 121 L267 121','none','#bea161',3))+
 ellipse(202,29,9,5,'#c6a55e');}
function mech(fast=false){const c=fast?'#929d8b':'#78818b';return ellipse(200,229,104,12,'#08080b')+
 path(fast?'M163 155 L141 189 L160 219 L129 226 M236 155 L260 186 L241 219 L276 226':
 'M156 157 L143 191 L150 224 L120 224 M243 157 L257 190 L251 224 L282 224','none','#535a64',16)+
 ellipse(194,135,64,42,c)+rect(157,111,68,41,'#434955')+
 path('M155 109 L171 82 L222 87 L236 110 Z',c)+ellipse(202,96,7,6,'#e4b963')+
 path('M224 123 L285 106 L310 111 L310 126 L239 139 Z','#5c6570')+rect(302,108,13,22,'#2c313a')+
 ellipse(143,140,17,20,'#ac9567')+ellipse(143,140,8,9,'#444852')+
 (fast?path('M150 126 L106 99 L91 132 L135 157','#b09b69'):
 path('M154 107 L127 92 L104 110 L112 159 L140 161','#8b7955'))+
 [164,228].map(x=>ellipse(x,161,11,11,'#b29b6e')+ellipse(x,161,4,4,'#454952')).join('');}
const artwork={
 'hernandian-warhorse':horse('#77624a','#302b29','#655a3f'),
 'demenissian-war-horse':horse('#66524a','#30282b','#694144'),
 'delesyian-warhorse':horse('#a8a393','#4e4d50','#485765'),
 'wells-military-horse':horse('#8b633e','#392c25','#5e6345'),
 'calphadean-scouts-horse':horse('#6c5140','#252322','#536043',true),
 'clawed-bear':bear('#655345',true), 'grizzly-bear':bear('#8c6b48'),
 'swift-wolf':wolf('#ad9270','#625646'), 'large-white-wolf':wolf('#e0e1e3','#a3a6b2'),
 'ibex':ibex(), 'giant-red-iguana':iguana(),
 'cloudcruiser':balloon('#756494'), 'skystreaker':balloon('#537b82',true),
 'atag':mech(), 'high-mobility-atag':mech(true)
};
for(const [name,body] of Object.entries(artwork)){
 const stars=Array.from({length:24},(_,i)=>ellipse(13+(i*83)%375,12+(i*47)%227,i%3?1:1.6,i%3?1:1.6,'#eee0b02b')).join('');
 writeFileSync(new URL(name+'.svg',dir),`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 266"><title>${name.replaceAll('-',' ')} caricature</title><defs><radialGradient id="glow"><stop stop-color="#55412a" stop-opacity=".3"/><stop offset="1" stop-color="#101014" stop-opacity="0"/></radialGradient></defs><rect width="400" height="266" fill="#0b0a0c"/><circle cx="202" cy="133" r="125" fill="url(#glow)"/>${stars}${body}</svg>\n`);
}
console.log(`Generated ${Object.keys(artwork).length} mount caricatures.`);
