"""
Mount artwork generator for Crimson Desert guide dashboard.
Uses PIL/Pillow only. Each image: 400x260 px.
"""

import random
from PIL import Image, ImageDraw, ImageFilter

W, H = 400, 260
OUT = r"C:\Users\Rainer Winkler\Desktop\deploy-69fcff9bfbeb7525ed81aec7\cd_assets\mounts"


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def make_base(tint=(13, 10, 8)):
    """Dark gradient background."""
    img = Image.new("RGBA", (W, H), (0, 0, 0, 255))
    draw = ImageDraw.Draw(img)
    for y in range(H):
        t = y / H
        r = int(tint[0] + (21 - tint[0]) * t)
        g = int(tint[1] + (16 - tint[1]) * t)
        b = int(tint[2] + (16 - tint[2]) * t)
        draw.line([(0, y), (W, y)], fill=(r, g, b, 255))
    return img


def add_particles(img, color=(255, 255, 255), count=40, seed=42):
    rng = random.Random(seed)
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for _ in range(count):
        x = rng.randint(0, W)
        y = rng.randint(0, H - 60)
        r = rng.choice([1, 1, 1, 2])
        alpha = rng.randint(20, 70)
        draw.ellipse([x - r, y - r, x + r, y + r], fill=(*color[:3], alpha))
    return Image.alpha_composite(img, overlay)


def add_bottom_fade(img):
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    fade_h = 70
    for i in range(fade_h):
        alpha = int(200 * (i / fade_h) ** 1.5)
        y = H - fade_h + i
        draw.line([(0, y), (W, y)], fill=(0, 0, 0, alpha))
    return Image.alpha_composite(img, overlay)


def add_glow(img, cx, cy, radius, color, strength=120, steps=6):
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for i in range(steps, 0, -1):
        r = int(radius * i / steps)
        alpha = int(strength * (1 - i / steps) ** 0.6)
        draw.ellipse([cx - r, cy - r, cx + r, cy + r],
                     fill=(*color[:3], alpha))
    return Image.alpha_composite(img, overlay)


def draw_ellipse_aa(draw, bbox, fill, outline=None):
    draw.ellipse(bbox, fill=fill, outline=outline)


def finalize(img):
    img = add_bottom_fade(img)
    return img.convert("RGB")


# ---------------------------------------------------------------------------
# 1. herspia.png — chestnut brown horse, noble side profile
# ---------------------------------------------------------------------------

def make_herspia():
    img = make_base((13, 9, 6))
    img = add_particles(img, (180, 120, 60), 35, seed=1)
    img = add_glow(img, 200, 130, 110, (139, 69, 19), strength=80)

    draw = ImageDraw.Draw(img)

    BROWN = (139, 69, 19)
    DBROWN = (100, 45, 10)
    LBROWN = (175, 100, 40)
    MANE = (60, 30, 5)

    # Body — large oval torso
    draw.ellipse([100, 100, 300, 200], fill=BROWN)
    # Neck
    draw.polygon([(215, 100), (245, 60), (265, 65), (240, 110)], fill=BROWN)
    # Head
    draw.ellipse([245, 48, 305, 95], fill=BROWN)
    # Snout
    draw.ellipse([285, 62, 320, 88], fill=LBROWN)
    # Nostril
    draw.ellipse([308, 72, 316, 80], fill=DBROWN)
    # Eye
    draw.ellipse([268, 56, 278, 64], fill=(20, 10, 5))
    draw.ellipse([270, 57, 276, 63], fill=(80, 50, 20))
    # Ear
    draw.polygon([(255, 50), (248, 35), (263, 40)], fill=LBROWN)

    # Mane
    draw.polygon([(220, 60), (215, 100), (230, 100), (245, 62)], fill=MANE)
    draw.polygon([(235, 58), (228, 95), (240, 95), (252, 60)], fill=MANE)

    # Legs — 4 legs
    for lx in [130, 160, 220, 250]:
        draw.rectangle([lx, 190, lx + 18, 240], fill=DBROWN)
        # Hoof
        draw.ellipse([lx - 2, 234, lx + 20, 246], fill=(30, 15, 5))

    # Tail
    draw.polygon([(100, 140), (60, 120), (55, 160), (70, 175), (100, 165)], fill=MANE)
    draw.polygon([(62, 122), (40, 100), (35, 145), (55, 155)], fill=DBROWN)

    # Belly shading
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d2 = ImageDraw.Draw(overlay)
    d2.ellipse([115, 155, 290, 205], fill=(0, 0, 0, 60))
    img = Image.alpha_composite(img, overlay)

    # Highlight on back
    overlay2 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d3 = ImageDraw.Draw(overlay2)
    d3.ellipse([140, 98, 270, 140], fill=(220, 160, 80, 40))
    img = Image.alpha_composite(img, overlay2)

    return finalize(img)


# ---------------------------------------------------------------------------
# 2. royler.png — silver-white horse, speed streaks
# ---------------------------------------------------------------------------

def make_royler():
    img = make_base((8, 8, 12))
    img = add_particles(img, (200, 220, 255), 50, seed=2)
    img = add_glow(img, 195, 125, 120, (192, 192, 210), strength=90)

    # Speed streaks
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    for i, (y, length, alpha) in enumerate([
        (90, 80, 35), (110, 110, 45), (130, 90, 30),
        (150, 70, 25), (105, 60, 20), (145, 50, 18),
    ]):
        d.line([(10, y), (10 + length, y)], fill=(180, 200, 255, alpha), width=2)
    img = Image.alpha_composite(img, overlay)

    draw = ImageDraw.Draw(img)
    SILVER = (192, 192, 200)
    WHITE = (232, 232, 240)
    MANE = (245, 245, 255)
    SHADOW = (120, 120, 135)

    # Body
    draw.ellipse([95, 98, 295, 195], fill=SILVER)
    # Neck
    draw.polygon([(210, 98), (242, 55), (264, 62), (238, 105)], fill=WHITE)
    # Head
    draw.ellipse([242, 44, 308, 93], fill=WHITE)
    # Snout
    draw.ellipse([284, 60, 322, 86], fill=SILVER)
    draw.ellipse([307, 70, 316, 79], fill=SHADOW)
    # Eye
    draw.ellipse([262, 53, 274, 63], fill=(15, 15, 25))
    draw.ellipse([264, 54, 271, 61], fill=(60, 60, 90))
    # Ear
    draw.polygon([(252, 46), (245, 30), (262, 38)], fill=WHITE)

    # Flowing mane — multiple curves
    draw.polygon([(218, 55), (200, 42), (188, 60), (196, 100), (215, 100), (240, 60)], fill=MANE)
    draw.polygon([(198, 44), (175, 38), (165, 58), (175, 95), (198, 100)], fill=(210, 215, 235))
    draw.polygon([(178, 40), (155, 42), (148, 68), (162, 95)], fill=(180, 185, 210))

    # Legs
    for lx in [128, 158, 218, 248]:
        draw.rectangle([lx, 188, lx + 18, 238], fill=SHADOW)
        draw.ellipse([lx - 2, 232, lx + 20, 244], fill=(50, 50, 65))

    # Tail
    draw.polygon([(95, 135), (50, 110), (42, 155), (58, 172), (95, 162)], fill=MANE)
    draw.polygon([(52, 112), (28, 95), (24, 148), (50, 160)], fill=SILVER)

    # Highlight
    overlay2 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d2 = ImageDraw.Draw(overlay2)
    d2.ellipse([130, 95, 268, 138], fill=(255, 255, 255, 50))
    img = Image.alpha_composite(img, overlay2)

    return finalize(img)


# ---------------------------------------------------------------------------
# 3. rokade.png — dark armored warhorse
# ---------------------------------------------------------------------------

def make_rokade():
    img = make_base((8, 6, 6))
    img = add_particles(img, (150, 100, 60), 30, seed=3)
    img = add_glow(img, 195, 135, 100, (80, 50, 20), strength=70)

    draw = ImageDraw.Draw(img)
    STEEL = (55, 55, 65)
    DARK = (30, 25, 20)
    HIGHLIGHT = (110, 110, 120)
    SPIKE = (90, 80, 50)
    RED = (180, 40, 20)

    # Body — stocky
    draw.ellipse([90, 105, 300, 205], fill=STEEL)
    # Neck — thick
    draw.polygon([(210, 105), (240, 62), (275, 68), (250, 112)], fill=STEEL)
    # Head — armored
    draw.ellipse([242, 50, 312, 98], fill=DARK)
    draw.ellipse([290, 60, 330, 90], fill=DARK)
    draw.ellipse([312, 68, 325, 82], fill=(20, 15, 10))
    # Helmet brim
    draw.polygon([(242, 68), (240, 55), (315, 55), (318, 70)], fill=STEEL)
    draw.polygon([(240, 55), (238, 50), (320, 50), (318, 55)], fill=HIGHLIGHT)

    # Eye glow
    img = add_glow(img, 265, 72, 12, (220, 60, 20), strength=100)
    draw = ImageDraw.Draw(img)
    draw.ellipse([260, 68, 272, 78], fill=RED)
    draw.ellipse([263, 70, 270, 76], fill=(255, 120, 20))

    # Armor plates on body
    for ay, ax_start, ax_end in [(115, 100, 290), (140, 95, 295), (165, 100, 290)]:
        draw.line([(ax_start, ay), (ax_end, ay)], fill=HIGHLIGHT, width=1)

    # Shoulder armor spike
    draw.polygon([(195, 105), (185, 80), (210, 95)], fill=SPIKE)
    draw.polygon([(210, 105), (205, 78), (225, 92)], fill=SPIKE)
    draw.polygon([(225, 107), (222, 82), (240, 98)], fill=SPIKE)

    # Legs — armored, thick
    for lx, w in [(120, 22), (152, 22), (218, 22), (250, 22)]:
        draw.rectangle([lx, 198, lx + w, 245], fill=DARK)
        draw.line([(lx, 215), (lx + w, 215)], fill=HIGHLIGHT, width=1)
        draw.line([(lx, 228), (lx + w, 228)], fill=HIGHLIGHT, width=1)
        draw.ellipse([lx - 2, 238, lx + w + 2, 250], fill=(15, 12, 10))

    # Tail — armored
    draw.polygon([(90, 140), (55, 118), (48, 162), (65, 178), (90, 168)], fill=DARK)
    # Tail spikes
    draw.polygon([(68, 125), (55, 105), (72, 118)], fill=SPIKE)
    draw.polygon([(60, 142), (44, 128), (62, 138)], fill=SPIKE)

    # Neck armor
    draw.polygon([(210, 105), (215, 70), (230, 68), (235, 105)], fill=HIGHLIGHT)
    draw.polygon([(232, 105), (238, 68), (252, 70), (252, 108)], fill=STEEL)

    # Body highlight
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.ellipse([120, 105, 270, 148], fill=(180, 180, 200, 30))
    img = Image.alpha_composite(img, overlay)

    return finalize(img)


# ---------------------------------------------------------------------------
# 4. camora.png — sleek dark horse with golden markings
# ---------------------------------------------------------------------------

def make_camora():
    img = make_base((10, 8, 4))
    img = add_particles(img, (200, 160, 40), 40, seed=4)
    img = add_glow(img, 195, 128, 115, (180, 140, 20), strength=75)

    draw = ImageDraw.Draw(img)
    BODY = (25, 18, 10)
    DARK = (15, 10, 5)
    GOLD = (201, 162, 39)
    LGOLD = (240, 200, 74)

    # Body
    draw.ellipse([98, 100, 298, 198], fill=BODY)
    # Neck
    draw.polygon([(212, 100), (240, 56), (262, 62), (238, 107)], fill=DARK)
    # Head
    draw.ellipse([240, 44, 308, 92], fill=DARK)
    draw.ellipse([284, 58, 322, 84], fill=BODY)
    draw.ellipse([308, 68, 316, 76], fill=(8, 5, 2))
    # Eye glow
    img = add_glow(img, 264, 68, 12, GOLD, strength=90)
    draw = ImageDraw.Draw(img)
    draw.ellipse([259, 63, 271, 73], fill=GOLD)
    draw.ellipse([262, 65, 268, 71], fill=(255, 220, 100))
    # Ear
    draw.polygon([(250, 46), (243, 30), (260, 38)], fill=DARK)

    # Golden markings — tribal patterns on body
    # Spine line
    draw.line([(130, 102), (285, 105)], fill=GOLD, width=2)
    # Shoulder marking
    draw.polygon([(175, 110), (165, 125), (178, 135), (190, 122)], fill=GOLD)
    draw.polygon([(192, 108), (184, 118), (195, 126), (205, 116)], fill=LGOLD)
    # Flank marking
    draw.polygon([(238, 120), (228, 138), (244, 148), (256, 130)], fill=GOLD)
    # Neck marking
    draw.polygon([(225, 65), (220, 78), (232, 80), (238, 67)], fill=LGOLD)
    draw.line([(218, 58), (258, 62)], fill=GOLD, width=2)

    # Mane — dark with gold edge
    draw.polygon([(218, 57), (210, 98), (226, 97), (244, 58)], fill=DARK)
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.polygon([(215, 57), (208, 98), (214, 98), (238, 58)], fill=(*GOLD, 80))
    img = Image.alpha_composite(img, overlay)
    draw = ImageDraw.Draw(img)

    # Legs
    for lx in [125, 155, 215, 245]:
        draw.rectangle([lx, 190, lx + 18, 240], fill=DARK)
        draw.line([(lx, 205), (lx + 18, 205)], fill=GOLD, width=1)
        draw.ellipse([lx - 2, 234, lx + 20, 246], fill=(5, 3, 1))

    # Tail
    draw.polygon([(98, 138), (55, 115), (48, 158), (65, 175), (98, 162)], fill=DARK)

    # Golden glow overlay
    overlay2 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d2 = ImageDraw.Draw(overlay2)
    d2.ellipse([120, 95, 285, 165], fill=(*GOLD, 15))
    img = Image.alpha_composite(img, overlay2)

    return finalize(img)


# ---------------------------------------------------------------------------
# 5. blackstar.png — black dragon, wings, fire breath
# ---------------------------------------------------------------------------

def make_blackstar():
    img = make_base((8, 5, 4))
    img = add_particles(img, (200, 80, 20), 45, seed=5)

    # Fire glow at left
    img = add_glow(img, 55, 145, 90, (255, 100, 0), strength=130)
    img = add_glow(img, 60, 148, 50, (255, 200, 0), strength=120)
    img = add_glow(img, 195, 130, 100, (150, 30, 10), strength=60)

    draw = ImageDraw.Draw(img)
    DBLACK = (15, 12, 10)
    BODY = (26, 20, 18)
    SCALE = (40, 30, 25)
    RED = (181, 45, 32)
    ORANGE = (255, 107, 0)
    FIRE = (255, 200, 50)

    # Wings — left
    draw.polygon([
        (190, 120), (80, 40), (30, 70), (60, 105), (120, 100), (185, 135)
    ], fill=(20, 15, 12))
    draw.polygon([
        (190, 120), (80, 40), (90, 45), (135, 85), (188, 128)
    ], fill=(30, 22, 18))

    # Wings — right
    draw.polygon([
        (215, 118), (330, 35), (375, 65), (345, 102), (280, 100), (220, 130)
    ], fill=(20, 15, 12))
    draw.polygon([
        (215, 118), (330, 35), (320, 40), (268, 82), (218, 125)
    ], fill=(30, 22, 18))

    # Wing membrane lines
    for i, end in enumerate([(80, 40), (100, 60), (120, 75), (145, 88)]):
        draw.line([(190, 120), end], fill=(35, 28, 22), width=1)
    for i, end in enumerate([(330, 35), (310, 55), (288, 70), (262, 85)]):
        draw.line([(215, 118), end], fill=(35, 28, 22), width=1)

    # Body
    draw.ellipse([145, 115, 275, 200], fill=BODY)
    # Neck
    draw.polygon([(175, 118), (150, 80), (170, 75), (195, 115)], fill=BODY)
    # Head
    draw.ellipse([122, 62, 185, 102], fill=DBLACK)
    # Snout — elongated
    draw.polygon([(122, 78), (75, 88), (78, 100), (122, 95)], fill=DBLACK)
    # Jaw lower
    draw.polygon([(122, 88), (80, 100), (82, 108), (122, 100)], fill=(18, 14, 12))

    # Fire breath
    draw.polygon([(78, 90), (10, 100), (5, 115), (12, 130), (80, 105)], fill=ORANGE)
    draw.polygon([(78, 92), (20, 103), (18, 118), (80, 107)], fill=FIRE)
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.polygon([(78, 94), (30, 106), (28, 116), (80, 108)], fill=(255, 240, 180, 120))
    img = Image.alpha_composite(img, overlay)
    draw = ImageDraw.Draw(img)

    # Eyes — glowing red
    img = add_glow(img, 140, 78, 18, RED, strength=150)
    img = add_glow(img, 163, 76, 14, RED, strength=130)
    draw = ImageDraw.Draw(img)
    draw.ellipse([134, 73, 148, 84], fill=RED)
    draw.ellipse([137, 75, 145, 82], fill=ORANGE)
    draw.ellipse([157, 71, 170, 82], fill=RED)
    draw.ellipse([160, 73, 167, 79], fill=ORANGE)

    # Horns
    draw.polygon([(140, 63), (132, 40), (145, 55)], fill=SCALE)
    draw.polygon([(158, 62), (162, 38), (168, 55)], fill=SCALE)

    # Spine spikes
    for sx, sy in [(185, 115), (200, 108), (215, 106), (230, 108), (245, 112)]:
        draw.polygon([(sx - 5, sy), (sx, sy - 18), (sx + 5, sy)], fill=SCALE)

    # Tail
    draw.polygon([(275, 165), (340, 180), (360, 170), (345, 160), (280, 155)], fill=BODY)
    draw.polygon([(340, 178), (370, 190), (372, 175), (358, 168)], fill=DBLACK)

    # Claws
    for cx, cy in [(160, 200), (200, 203), (230, 200)]:
        for offset in [-8, 0, 8]:
            draw.polygon([(cx + offset, cy), (cx + offset - 3, cy + 20), (cx + offset + 3, cy + 20)], fill=SCALE)

    return finalize(img)


# ---------------------------------------------------------------------------
# 6. silver-fang.png — white wolf, lightning markings
# ---------------------------------------------------------------------------

def make_silver_fang():
    img = make_base((7, 8, 12))
    img = add_particles(img, (100, 150, 255), 50, seed=6)
    img = add_glow(img, 195, 128, 105, (74, 144, 217), strength=70)

    draw = ImageDraw.Draw(img)
    WHITE = (224, 224, 232)
    LGREY = (200, 202, 215)
    GREY = (160, 162, 178)
    BLUE = (74, 144, 217)
    LBLUE = (140, 190, 255)
    DARK = (30, 35, 55)

    # Body — lean, low
    draw.ellipse([100, 118, 285, 200], fill=WHITE)
    # Haunch — raised at back
    draw.ellipse([90, 108, 185, 178], fill=LGREY)
    # Neck
    draw.polygon([(220, 118), (245, 76), (268, 82), (248, 123)], fill=WHITE)
    # Head
    draw.ellipse([242, 60, 308, 108], fill=WHITE)
    # Snout — pointed
    draw.polygon([(290, 72), (332, 88), (328, 100), (290, 96)], fill=LGREY)
    # Nose
    draw.ellipse([326, 84, 338, 96], fill=DARK)
    # Ear — pointed, aggressive
    draw.polygon([(258, 62), (250, 38), (274, 55)], fill=WHITE)
    draw.polygon([(260, 62), (253, 42), (272, 56)], fill=(190, 195, 215))
    draw.polygon([(278, 60), (280, 38), (296, 56)], fill=WHITE)
    draw.polygon([(280, 60), (282, 42), (294, 57)], fill=(190, 195, 215))

    # Eye — electric blue
    img = add_glow(img, 268, 80, 12, BLUE, strength=120)
    draw = ImageDraw.Draw(img)
    draw.ellipse([262, 74, 276, 87], fill=BLUE)
    draw.ellipse([265, 77, 273, 84], fill=(200, 230, 255))

    # Mouth — snarl, fangs showing
    draw.polygon([(295, 95), (310, 88), (315, 100), (295, 102)], fill=LGREY)
    draw.polygon([(306, 88), (310, 78), (318, 88)], fill=(245, 245, 255))  # fang
    draw.polygon([(316, 90), (320, 80), (328, 90)], fill=(245, 245, 255))  # fang

    # Lightning bolt markings
    # Shoulder
    draw.polygon([(185, 120), (195, 138), (188, 138), (198, 155)], fill=BLUE)
    # Flank
    draw.polygon([(230, 125), (242, 142), (234, 142), (246, 158)], fill=LBLUE)
    # Back of neck
    draw.polygon([(238, 80), (246, 95), (240, 95), (250, 110)], fill=BLUE)

    # Tail — raised aggressively
    draw.polygon([(285, 145), (330, 100), (342, 108), (345, 120), (295, 155)], fill=LGREY)
    draw.polygon([(330, 100), (338, 92), (350, 102), (342, 108)], fill=WHITE)

    # Legs — lean
    for lx, h in [(118, 55), (148, 50), (215, 58), (248, 55)]:
        draw.rectangle([lx, 193, lx + 16, 193 + h], fill=GREY)
        draw.ellipse([lx - 3, 193 + h - 5, lx + 19, 193 + h + 8], fill=DARK)

    # Fur highlights on back
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.ellipse([130, 112, 270, 145], fill=(255, 255, 255, 35))
    img = Image.alpha_composite(img, overlay)

    return finalize(img)


# ---------------------------------------------------------------------------
# 7. white-bear.png — polar bear, rearing pose
# ---------------------------------------------------------------------------

def make_white_bear():
    img = make_base((7, 9, 12))
    img = add_particles(img, (120, 200, 230), 40, seed=7)
    img = add_glow(img, 195, 120, 115, (126, 200, 227), strength=85)

    draw = ImageDraw.Draw(img)
    WHITE = (240, 242, 245)
    OFFWHITE = (210, 218, 225)
    ICE = (126, 200, 227)
    DARK = (20, 25, 35)
    LGREY = (175, 188, 198)

    # Body — large, rearing (centered, tall)
    draw.ellipse([130, 90, 280, 210], fill=WHITE)
    # Lower belly
    draw.ellipse([140, 155, 270, 220], fill=OFFWHITE)

    # Right arm raised high
    draw.ellipse([262, 60, 318, 130], fill=WHITE)
    draw.polygon([(262, 85), (265, 55), (318, 60), (318, 120), (262, 125)], fill=WHITE)
    # Claws right
    for i in range(4):
        cx = 310 + i * 5
        draw.polygon([(cx, 60), (cx + 2, 45), (cx + 5, 60)], fill=DARK)

    # Left arm — partially raised
    draw.ellipse([82, 90, 148, 158], fill=WHITE)
    draw.polygon([(82, 110), (78, 80), (138, 80), (148, 140), (82, 150)], fill=OFFWHITE)
    # Claws left
    for i in range(4):
        cx = 82 + i * 6
        draw.polygon([(cx, 82), (cx + 1, 68), (cx + 4, 82)], fill=DARK)

    # Head
    draw.ellipse([165, 45, 255, 110], fill=WHITE)
    # Snout
    draw.ellipse([195, 72, 258, 108], fill=OFFWHITE)
    # Nose
    draw.ellipse([227, 72, 248, 85], fill=DARK)
    # Eyes
    draw.ellipse([178, 58, 193, 72], fill=DARK)
    draw.ellipse([180, 60, 190, 70], fill=ICE)
    draw.ellipse([225, 56, 238, 68], fill=DARK)
    draw.ellipse([226, 57, 236, 67], fill=ICE)
    # Ears
    draw.ellipse([168, 42, 192, 62], fill=WHITE)
    draw.ellipse([172, 44, 188, 58], fill=OFFWHITE)
    draw.ellipse([235, 42, 258, 62], fill=WHITE)
    draw.ellipse([238, 44, 254, 58], fill=OFFWHITE)

    # Hind legs
    draw.ellipse([145, 195, 195, 255], fill=LGREY)
    draw.ellipse([210, 195, 262, 255], fill=LGREY)
    # Paws
    draw.ellipse([142, 238, 198, 258], fill=OFFWHITE)
    draw.ellipse([208, 238, 264, 258], fill=OFFWHITE)

    # Ice highlight markings
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.ellipse([155, 85, 270, 140], fill=(*ICE, 30))
    d.ellipse([175, 45, 252, 98], fill=(255, 255, 255, 40))
    img = Image.alpha_composite(img, overlay)

    # Breath cloud
    draw = ImageDraw.Draw(img)
    overlay2 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d2 = ImageDraw.Draw(overlay2)
    d2.ellipse([255, 85, 305, 115], fill=(*ICE, 50))
    d2.ellipse([270, 80, 330, 110], fill=(*ICE, 35))
    d2.ellipse([285, 75, 350, 102], fill=(*ICE, 20))
    img = Image.alpha_composite(img, overlay2)

    return finalize(img)


# ---------------------------------------------------------------------------
# 8. snowwhite-deer.png — white deer, antlers, ethereal glow
# ---------------------------------------------------------------------------

def make_snowwhite_deer():
    img = make_base((8, 8, 10))
    img = add_particles(img, (200, 190, 140), 55, seed=8)
    img = add_glow(img, 200, 115, 130, (201, 162, 39), strength=85)
    img = add_glow(img, 200, 115, 80, (245, 245, 245), strength=70)

    draw = ImageDraw.Draw(img)
    WHITE = (245, 245, 248)
    CREAM = (230, 228, 215)
    GOLD = (201, 162, 39)
    LGOLD = (240, 200, 74)
    DARK = (15, 12, 10)
    GLOW = (255, 240, 180)

    # Body — elegant, slender
    draw.ellipse([115, 112, 285, 195], fill=WHITE)
    # Neck — long
    draw.polygon([(210, 112), (228, 62), (248, 66), (232, 115)], fill=WHITE)
    # Head
    draw.ellipse([218, 42, 272, 84], fill=WHITE)
    # Snout
    draw.ellipse([256, 56, 290, 80], fill=CREAM)
    draw.ellipse([280, 62, 290, 72], fill=DARK)
    # Eye
    img = add_glow(img, 237, 62, 10, GOLD, strength=90)
    draw = ImageDraw.Draw(img)
    draw.ellipse([231, 57, 244, 68], fill=DARK)
    draw.ellipse([233, 59, 241, 66], fill=GOLD)
    draw.ellipse([235, 60, 239, 64], fill=(255, 240, 200))
    # Ear
    draw.polygon([(222, 44), (214, 26), (232, 38)], fill=WHITE)
    draw.polygon([(224, 44), (218, 30), (230, 40)], fill=CREAM)

    # ANTLERS — large, branching
    # Main left antler
    draw.line([(232, 44), (218, 18)], fill=CREAM, width=4)
    draw.line([(218, 18), (205, 5)], fill=CREAM, width=3)
    draw.line([(218, 18), (210, 8)], fill=CREAM, width=2)
    draw.line([(224, 30), (210, 18)], fill=CREAM, width=3)
    draw.line([(210, 18), (200, 8)], fill=CREAM, width=2)
    draw.line([(210, 18), (215, 6)], fill=CREAM, width=2)
    draw.line([(220, 24), (208, 14)], fill=CREAM, width=2)

    # Main right antler
    draw.line([(255, 43), (270, 18)], fill=CREAM, width=4)
    draw.line([(270, 18), (282, 5)], fill=CREAM, width=3)
    draw.line([(270, 18), (278, 8)], fill=CREAM, width=2)
    draw.line([(263, 30), (278, 18)], fill=CREAM, width=3)
    draw.line([(278, 18), (290, 8)], fill=CREAM, width=2)
    draw.line([(278, 18), (272, 6)], fill=CREAM, width=2)
    draw.line([(268, 24), (280, 14)], fill=CREAM, width=2)

    # Antler glow
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    for pt in [(218, 18), (270, 18), (205, 5), (282, 5), (210, 18), (278, 18)]:
        d.ellipse([pt[0]-6, pt[1]-6, pt[0]+6, pt[1]+6], fill=(*LGOLD, 60))
    img = Image.alpha_composite(img, overlay)
    draw = ImageDraw.Draw(img)

    # Legs — slender
    for lx in [138, 162, 220, 248]:
        draw.rectangle([lx, 188, lx + 12, 242], fill=CREAM)
        draw.ellipse([lx - 2, 236, lx + 14, 248], fill=DARK)

    # Tail — white
    draw.polygon([(115, 148), (78, 135), (72, 158), (85, 170), (115, 162)], fill=WHITE)

    # Ethereal glow particles
    overlay2 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d2 = ImageDraw.Draw(overlay2)
    rng = random.Random(88)
    for _ in range(25):
        x = rng.randint(140, 310)
        y = rng.randint(20, 140)
        r = rng.choice([2, 3, 4])
        d2.ellipse([x-r, y-r, x+r, y+r], fill=(*LGOLD, rng.randint(40, 100)))
    img = Image.alpha_composite(img, overlay2)

    # Full body glow
    overlay3 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d3 = ImageDraw.Draw(overlay3)
    d3.ellipse([110, 40, 295, 200], fill=(255, 255, 220, 18))
    img = Image.alpha_composite(img, overlay3)

    return finalize(img)


# ---------------------------------------------------------------------------
# 9. icicle-ibex.png — mountain ibex, curved horns, icy tints
# ---------------------------------------------------------------------------

def make_icicle_ibex():
    img = make_base((7, 9, 11))
    img = add_particles(img, (90, 210, 210), 45, seed=9)
    img = add_glow(img, 195, 130, 100, (91, 207, 207), strength=75)

    draw = ImageDraw.Draw(img)
    GREY = (136, 140, 148)
    LGREY = (172, 178, 188)
    TEAL = (91, 207, 207)
    LTEAL = (140, 230, 230)
    DARK = (20, 25, 30)
    CREAM = (235, 238, 228)

    # Body — stocky mountain build
    draw.ellipse([108, 115, 290, 205], fill=GREY)
    # Haunches
    draw.ellipse([105, 110, 200, 185], fill=LGREY)
    # Neck
    draw.polygon([(215, 115), (238, 70), (258, 76), (240, 120)], fill=LGREY)
    # Head
    draw.ellipse([232, 54, 294, 96], fill=GREY)
    # Snout — elongated
    draw.polygon([(280, 68), (320, 80), (316, 92), (280, 88)], fill=LGREY)
    draw.ellipse([312, 76, 322, 87], fill=DARK)
    # Eye
    draw.ellipse([248, 64, 260, 74], fill=DARK)
    draw.ellipse([250, 65, 258, 72], fill=TEAL)
    # Ear
    draw.polygon([(242, 56), (235, 40), (252, 50)], fill=LGREY)

    # HORNS — dramatic curved backward sweep
    # Left horn
    for i in range(30):
        t = i / 29
        # Sweeping arc backward and up
        x = int(258 + t * (-40) + (t * (1-t)) * (-30))
        y = int(55 - t * 55 + (t * (1-t)) * 15)
        r = max(1, 5 - int(t * 3))
        draw.ellipse([x-r, y-r, x+r, y+r], fill=CREAM)

    # Right horn
    for i in range(30):
        t = i / 29
        x = int(272 + t * (-25) + (t * (1-t)) * (-25))
        y = int(54 - t * 52 + (t * (1-t)) * 10)
        r = max(1, 5 - int(t * 3))
        draw.ellipse([x-r, y-r, x+r, y+r], fill=CREAM)

    # Horn ridges/grooves
    for i in range(0, 30, 5):
        t = i / 29
        x = int(258 + t * (-40) + (t * (1-t)) * (-30))
        y = int(55 - t * 55 + (t * (1-t)) * 15)
        draw.ellipse([x-2, y-2, x+2, y+2], fill=TEAL)

    # Icy horn glow
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.ellipse([215, 0, 270, 60], fill=(*TEAL, 40))
    img = Image.alpha_composite(img, overlay)
    draw = ImageDraw.Draw(img)

    # Beard
    draw.polygon([(270, 92), (265, 108), (278, 108), (282, 92)], fill=LGREY)

    # Legs — sturdy
    for lx in [128, 158, 220, 252]:
        draw.rectangle([lx, 198, lx + 18, 245], fill=DARK)
        draw.ellipse([lx - 2, 240, lx + 20, 252], fill=(10, 12, 15))
        draw.line([(lx, 215), (lx + 18, 215)], fill=TEAL, width=1)

    # Tail — stubby
    draw.ellipse([108, 145, 130, 165], fill=LGREY)

    # Icy markings
    draw.line([(140, 118), (200, 120)], fill=LTEAL, width=2)
    draw.line([(165, 122), (210, 125)], fill=TEAL, width=1)
    # Shoulder icy patch
    overlay2 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d2 = ImageDraw.Draw(overlay2)
    d2.ellipse([125, 112, 195, 158], fill=(*TEAL, 35))
    img = Image.alpha_composite(img, overlay2)

    # Breath frost
    overlay3 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d3 = ImageDraw.Draw(overlay3)
    d3.ellipse([320, 78, 360, 105], fill=(*LTEAL, 45))
    d3.ellipse([340, 72, 385, 98], fill=(*TEAL, 30))
    img = Image.alpha_composite(img, overlay3)

    return finalize(img)


# ---------------------------------------------------------------------------
# 10. rock-tusk-warthog.png — dark warthog, tusks, aggressive
# ---------------------------------------------------------------------------

def make_rock_tusk_warthog():
    img = make_base((9, 7, 5))
    img = add_particles(img, (180, 130, 80), 35, seed=10)
    img = add_glow(img, 195, 140, 95, (100, 60, 20), strength=65)

    draw = ImageDraw.Draw(img)
    DARK = (74, 48, 32)
    VDARK = (40, 25, 15)
    TUSK = (245, 240, 220)
    IVORY = (220, 210, 180)
    WART = (90, 60, 35)
    RED = (160, 45, 20)

    # Body — massive, low to ground
    draw.ellipse([85, 125, 305, 218], fill=DARK)
    # Barrel chest
    draw.ellipse([90, 118, 240, 205], fill=WART)
    # Neck — thick
    draw.polygon([(185, 125), (185, 88), (225, 88), (230, 125)], fill=DARK)
    # Head — massive, flat face
    draw.ellipse([148, 72, 260, 140], fill=VDARK)
    # Snout — broad flat
    draw.ellipse([148, 100, 205, 138], fill=DARK)
    # Nostrils
    draw.ellipse([156, 108, 172, 120], fill=(25, 15, 8))
    draw.ellipse([178, 108, 192, 120], fill=(25, 15, 8))

    # TUSKS — large, prominent, sweeping up
    # Lower left tusk
    draw.polygon([
        (148, 125), (90, 118), (82, 108), (90, 100), (148, 115)
    ], fill=TUSK)
    draw.polygon([
        (148, 120), (88, 112), (83, 104), (90, 100), (148, 112)
    ], fill=IVORY)
    # Lower right tusk
    draw.polygon([
        (200, 125), (260, 118), (268, 108), (260, 100), (200, 115)
    ], fill=TUSK)
    draw.polygon([
        (200, 120), (262, 112), (267, 104), (260, 100), (200, 112)
    ], fill=IVORY)

    # Upper smaller tusks (warts)
    draw.polygon([(152, 108), (128, 90), (122, 98), (152, 112)], fill=TUSK)
    draw.polygon([(196, 108), (220, 90), (226, 98), (196, 112)], fill=TUSK)

    # Eyes — small, mean
    img = add_glow(img, 175, 88, 10, RED, strength=80)
    img = add_glow(img, 230, 88, 10, RED, strength=80)
    draw = ImageDraw.Draw(img)
    draw.ellipse([169, 83, 182, 94], fill=VDARK)
    draw.ellipse([171, 85, 180, 93], fill=RED)
    draw.ellipse([224, 83, 237, 94], fill=VDARK)
    draw.ellipse([226, 85, 235, 93], fill=RED)

    # Ear
    draw.polygon([(175, 74), (162, 52), (182, 68)], fill=DARK)
    draw.polygon([(224, 74), (238, 52), (218, 68)], fill=DARK)

    # Warts/bumps on face
    draw.ellipse([158, 98, 170, 108], fill=WART)
    draw.ellipse([196, 98, 208, 108], fill=WART)
    draw.ellipse([168, 80, 178, 88], fill=WART)
    draw.ellipse([220, 80, 230, 88], fill=WART)

    # Mane/ridge on back
    for mx in range(185, 295, 12):
        draw.polygon([(mx, 125), (mx + 5, 108), (mx + 10, 125)], fill=VDARK)

    # Legs — squat, powerful
    for lx, w in [(108, 25), (148, 25), (225, 25), (265, 25)]:
        draw.rectangle([lx, 208, lx + w, 250], fill=VDARK)
        draw.ellipse([lx - 3, 244, lx + w + 3, 258], fill=(15, 8, 4))

    # Tail — curly
    draw.polygon([(305, 172), (335, 160), (345, 170), (338, 182), (310, 178)], fill=DARK)
    draw.polygon([(338, 182), (350, 188), (352, 178), (340, 172)], fill=VDARK)

    # Ground shadow / weight
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.ellipse([95, 205, 305, 228], fill=(0, 0, 0, 80))
    img = Image.alpha_composite(img, overlay)

    # Highlight on back
    overlay2 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d2 = ImageDraw.Draw(overlay2)
    d2.ellipse([130, 118, 275, 160], fill=(180, 120, 60, 25))
    img = Image.alpha_composite(img, overlay2)

    return finalize(img)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

MOUNTS = [
    ("herspia.png",         make_herspia),
    ("royler.png",          make_royler),
    ("rokade.png",          make_rokade),
    ("camora.png",          make_camora),
    ("blackstar.png",       make_blackstar),
    ("silver-fang.png",     make_silver_fang),
    ("white-bear.png",      make_white_bear),
    ("snowwhite-deer.png",  make_snowwhite_deer),
    ("icicle-ibex.png",     make_icicle_ibex),
    ("rock-tusk-warthog.png", make_rock_tusk_warthog),
]

import os

for filename, fn in MOUNTS:
    path = os.path.join(OUT, filename)
    img = fn()
    assert img.size == (W, H), f"{filename}: wrong size {img.size}"
    img.save(path, "PNG")
    print(f"  saved: {filename}  ({img.size})")

print("\nDone. Verifying files:")
for filename, _ in MOUNTS:
    path = os.path.join(OUT, filename)
    size = os.path.getsize(path)
    print(f"  {filename}: {size} bytes")
