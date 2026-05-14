"""
Generate 15 missing mount images for Crimson Desert wiki.
Same PIL style as generate_mounts.py: 400x260px, dark gradient bg,
polygon/ellipse animal shapes, glow effects, particles, bottom fade.
"""

import random, os
from PIL import Image, ImageDraw, ImageFilter

W, H = 400, 260
OUT = r"C:\Users\Rainer Winkler\Desktop\deploy-69fcff9bfbeb7525ed81aec7\cd_assets\mounts"


# ---------------------------------------------------------------------------
# Helpers (identical to generate_mounts.py)
# ---------------------------------------------------------------------------

def make_base(tint=(13, 10, 8)):
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


def finalize(img):
    img = add_bottom_fade(img)
    return img.convert("RGB")


# ---------------------------------------------------------------------------
# 1. black-bear.png — dark forest bear, standing pose
# ---------------------------------------------------------------------------

def make_black_bear():
    img = make_base((10, 8, 6))
    img = add_particles(img, (100, 140, 80), 35, seed=20)
    img = add_glow(img, 195, 130, 100, (60, 80, 40), strength=65)

    draw = ImageDraw.Draw(img)
    DARK = (30, 28, 25)
    BODY = (45, 40, 35)
    SNOUT = (80, 65, 50)
    EYE = (20, 15, 10)

    # Body — large, stocky
    draw.ellipse([100, 105, 290, 210], fill=BODY)
    # Shoulder hump
    draw.ellipse([120, 90, 230, 165], fill=DARK)
    # Head
    draw.ellipse([230, 70, 310, 130], fill=BODY)
    # Snout
    draw.ellipse([290, 85, 335, 120], fill=SNOUT)
    # Nose
    draw.ellipse([322, 92, 336, 104], fill=EYE)
    # Mouth line
    draw.line([(315, 108), (330, 115)], fill=EYE, width=1)
    # Eyes — small
    draw.ellipse([252, 82, 264, 92], fill=EYE)
    draw.ellipse([254, 84, 261, 90], fill=(60, 50, 30))
    # Ears — round
    draw.ellipse([238, 65, 256, 80], fill=BODY)
    draw.ellipse([240, 67, 254, 78], fill=SNOUT)
    draw.ellipse([268, 62, 286, 78], fill=BODY)
    draw.ellipse([270, 64, 284, 76], fill=SNOUT)

    # Legs — thick
    for lx, w in [(118, 28), (155, 28), (215, 28), (248, 28)]:
        draw.rectangle([lx, 200, lx + w, 250], fill=DARK)
        draw.ellipse([lx - 3, 244, lx + w + 3, 256], fill=(15, 12, 10))
        # Claws
        for c in range(4):
            cx = lx + 3 + c * 6
            draw.polygon([(cx, 248), (cx + 1, 256), (cx + 3, 248)], fill=(20, 15, 10))

    # Tail stub
    draw.ellipse([95, 155, 112, 172], fill=DARK)

    # Fur highlights
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.ellipse([140, 95, 260, 145], fill=(80, 75, 60, 30))
    img = Image.alpha_composite(img, overlay)

    return finalize(img)


# ---------------------------------------------------------------------------
# 2. brown-bear.png — lighter brown bear, side profile
# ---------------------------------------------------------------------------

def make_brown_bear():
    img = make_base((12, 9, 5))
    img = add_particles(img, (160, 120, 60), 35, seed=21)
    img = add_glow(img, 195, 130, 105, (140, 90, 40), strength=70)

    draw = ImageDraw.Draw(img)
    BROWN = (130, 80, 40)
    DBROWN = (90, 55, 25)
    LBROWN = (170, 115, 60)
    SNOUT = (190, 150, 100)

    # Body
    draw.ellipse([95, 100, 290, 210], fill=BROWN)
    # Shoulder hump
    draw.ellipse([115, 85, 225, 160], fill=DBROWN)
    # Head
    draw.ellipse([228, 65, 312, 128], fill=BROWN)
    # Snout
    draw.ellipse([290, 82, 340, 118], fill=SNOUT)
    # Nose
    draw.ellipse([326, 90, 340, 102], fill=(20, 15, 10))
    # Eyes
    draw.ellipse([250, 78, 264, 90], fill=(20, 15, 10))
    draw.ellipse([252, 80, 261, 88], fill=(80, 50, 20))
    # Ears
    draw.ellipse([236, 60, 255, 76], fill=BROWN)
    draw.ellipse([238, 62, 252, 74], fill=LBROWN)
    draw.ellipse([270, 58, 290, 74], fill=BROWN)
    draw.ellipse([272, 60, 288, 72], fill=LBROWN)

    # Legs
    for lx, w in [(115, 28), (152, 28), (218, 28), (252, 28)]:
        draw.rectangle([lx, 200, lx + w, 248], fill=DBROWN)
        draw.ellipse([lx - 3, 242, lx + w + 3, 254], fill=(40, 25, 12))

    # Tail
    draw.ellipse([90, 152, 108, 170], fill=DBROWN)

    # Belly highlight
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.ellipse([130, 150, 270, 210], fill=(200, 150, 80, 25))
    d.ellipse([140, 88, 255, 135], fill=(190, 140, 70, 30))
    img = Image.alpha_composite(img, overlay)

    return finalize(img)


# ---------------------------------------------------------------------------
# 3. boar.png — wild boar, stocky, tusks
# ---------------------------------------------------------------------------

def make_boar():
    img = make_base((10, 8, 5))
    img = add_particles(img, (140, 100, 60), 30, seed=22)
    img = add_glow(img, 195, 140, 90, (100, 70, 30), strength=60)

    draw = ImageDraw.Draw(img)
    BODY = (80, 55, 35)
    DARK = (50, 35, 20)
    SNOUT = (120, 85, 55)
    TUSK = (235, 230, 210)

    # Body — barrel-shaped, low
    draw.ellipse([90, 125, 295, 215], fill=BODY)
    # Shoulder bristle ridge
    draw.ellipse([100, 110, 210, 175], fill=DARK)
    # Neck
    draw.polygon([(200, 125), (210, 90), (240, 95), (235, 130)], fill=BODY)
    # Head — wedge-shaped
    draw.ellipse([210, 75, 290, 130], fill=DARK)
    # Snout — flat
    draw.ellipse([270, 88, 325, 125], fill=SNOUT)
    # Nostrils
    draw.ellipse([308, 96, 320, 106], fill=(30, 20, 10))
    draw.ellipse([308, 108, 320, 118], fill=(30, 20, 10))
    # Eyes — small, angry
    draw.ellipse([228, 82, 240, 92], fill=(20, 10, 5))
    draw.ellipse([230, 84, 238, 90], fill=(120, 50, 20))

    # Tusks
    draw.polygon([(275, 118), (255, 82), (260, 78), (280, 115)], fill=TUSK)
    draw.polygon([(290, 120), (275, 85), (280, 82), (295, 118)], fill=TUSK)

    # Ears — pointed, small
    draw.polygon([(222, 78), (215, 60), (232, 72)], fill=DARK)
    draw.polygon([(252, 76), (258, 58), (266, 72)], fill=DARK)

    # Bristle ridge on back
    for mx in range(130, 280, 10):
        draw.polygon([(mx, 120), (mx + 4, 105), (mx + 8, 120)], fill=DARK)

    # Legs — short, thick
    for lx, w in [(108, 24), (145, 24), (222, 24), (258, 24)]:
        draw.rectangle([lx, 208, lx + w, 248], fill=DARK)
        draw.ellipse([lx - 2, 242, lx + w + 2, 254], fill=(20, 12, 5))

    # Tail — curly stub
    draw.polygon([(90, 165), (70, 155), (65, 168), (75, 175), (90, 170)], fill=BODY)

    # Fur highlight
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.ellipse([120, 115, 260, 155], fill=(160, 120, 70, 25))
    img = Image.alpha_composite(img, overlay)

    return finalize(img)


# ---------------------------------------------------------------------------
# 4. buffalo.png — large water buffalo, horns
# ---------------------------------------------------------------------------

def make_buffalo():
    img = make_base((9, 7, 6))
    img = add_particles(img, (120, 100, 80), 30, seed=23)
    img = add_glow(img, 195, 135, 110, (80, 60, 40), strength=65)

    draw = ImageDraw.Draw(img)
    BODY = (60, 50, 40)
    DARK = (35, 28, 22)
    HORN = (200, 190, 160)
    LHORN = (230, 220, 190)

    # Body — massive
    draw.ellipse([80, 105, 300, 215], fill=BODY)
    # Shoulder hump
    draw.ellipse([95, 88, 220, 170], fill=DARK)
    # Neck
    draw.polygon([(205, 105), (225, 68), (255, 72), (240, 112)], fill=BODY)
    # Head
    draw.ellipse([225, 55, 305, 115], fill=DARK)
    # Snout
    draw.ellipse([280, 72, 330, 108], fill=BODY)
    draw.ellipse([315, 80, 330, 94], fill=(25, 18, 12))
    # Eyes
    draw.ellipse([245, 68, 258, 80], fill=(15, 10, 8))
    draw.ellipse([247, 70, 255, 78], fill=(60, 40, 20))

    # Horns — wide, sweeping
    # Left horn curving backward
    for i in range(25):
        t = i / 24
        x = int(240 + t * (-55) + (t * (1 - t)) * (-20))
        y = int(60 - t * 30 + (t * (1 - t)) * (-25))
        r = max(2, 6 - int(t * 4))
        draw.ellipse([x - r, y - r, x + r, y + r], fill=HORN)
    # Right horn
    for i in range(25):
        t = i / 24
        x = int(280 + t * 50 + (t * (1 - t)) * 15)
        y = int(60 - t * 30 + (t * (1 - t)) * (-20))
        r = max(2, 6 - int(t * 4))
        draw.ellipse([x - r, y - r, x + r, y + r], fill=HORN)

    # Ears
    draw.polygon([(235, 58), (228, 42), (245, 52)], fill=BODY)
    draw.polygon([(285, 58), (292, 42), (278, 52)], fill=BODY)

    # Legs
    for lx, w in [(108, 30), (150, 30), (218, 30), (258, 30)]:
        draw.rectangle([lx, 205, lx + w, 250], fill=DARK)
        draw.ellipse([lx - 3, 244, lx + w + 3, 256], fill=(15, 10, 8))

    # Tail
    draw.polygon([(80, 150), (48, 135), (42, 160), (55, 175), (80, 165)], fill=DARK)

    # Highlight
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.ellipse([120, 92, 265, 145], fill=(120, 100, 70, 25))
    img = Image.alpha_composite(img, overlay)

    return finalize(img)


# ---------------------------------------------------------------------------
# 5. camel.png — desert camel, single hump
# ---------------------------------------------------------------------------

def make_camel():
    img = make_base((15, 11, 6))
    img = add_particles(img, (220, 180, 100), 40, seed=24)
    img = add_glow(img, 195, 125, 110, (200, 160, 80), strength=70)

    draw = ImageDraw.Draw(img)
    TAN = (180, 145, 90)
    DTAN = (140, 110, 65)
    LTAN = (210, 178, 120)
    DARK = (80, 60, 35)

    # Body — tall, lean
    draw.ellipse([110, 110, 280, 195], fill=TAN)
    # Hump
    draw.ellipse([155, 78, 240, 135], fill=DTAN)
    # Neck — long, curved
    draw.polygon([(230, 110), (260, 50), (278, 55), (250, 118)], fill=TAN)
    # Head — elongated
    draw.ellipse([255, 32, 318, 72], fill=TAN)
    # Snout
    draw.ellipse([298, 38, 340, 68], fill=LTAN)
    # Nostrils
    draw.ellipse([328, 48, 338, 56], fill=DARK)
    # Eyes — gentle, large
    draw.ellipse([272, 40, 286, 52], fill=(20, 15, 10))
    draw.ellipse([274, 42, 283, 50], fill=(80, 60, 30))
    # Ears
    draw.polygon([(262, 34), (256, 20), (270, 28)], fill=TAN)
    draw.polygon([(290, 34), (296, 20), (284, 28)], fill=TAN)
    # Lips — characteristic
    draw.ellipse([318, 55, 342, 72], fill=DTAN)

    # Legs — long, thin
    for lx in [125, 155, 225, 255]:
        draw.rectangle([lx, 188, lx + 14, 245], fill=DTAN)
        draw.ellipse([lx - 3, 240, lx + 17, 252], fill=DARK)

    # Tail
    draw.polygon([(110, 148), (80, 138), (75, 158), (85, 165), (110, 160)], fill=DTAN)
    # Tail tuft
    draw.ellipse([70, 135, 85, 165], fill=DARK)

    # Belly shading
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.ellipse([125, 155, 270, 200], fill=(0, 0, 0, 40))
    d.ellipse([165, 80, 235, 120], fill=(220, 190, 120, 30))
    img = Image.alpha_composite(img, overlay)

    return finalize(img)


# ---------------------------------------------------------------------------
# 6. cow.png — farm cow, spotted
# ---------------------------------------------------------------------------

def make_cow():
    img = make_base((11, 9, 6))
    img = add_particles(img, (150, 130, 90), 30, seed=25)
    img = add_glow(img, 195, 135, 95, (120, 100, 60), strength=55)

    draw = ImageDraw.Draw(img)
    WHITE = (215, 210, 200)
    BROWN = (100, 65, 35)
    PINK = (200, 150, 140)
    DARK = (40, 30, 20)

    # Body
    draw.ellipse([95, 108, 290, 200], fill=WHITE)
    # Brown patches
    draw.ellipse([120, 110, 180, 155], fill=BROWN)
    draw.ellipse([210, 120, 265, 170], fill=BROWN)
    draw.ellipse([150, 150, 200, 190], fill=BROWN)
    # Neck
    draw.polygon([(220, 108), (240, 68), (260, 72), (242, 115)], fill=WHITE)
    # Head
    draw.ellipse([238, 52, 310, 100], fill=WHITE)
    # Brown face patch
    draw.ellipse([248, 58, 290, 88], fill=BROWN)
    # Snout
    draw.ellipse([290, 65, 330, 95], fill=PINK)
    # Nostrils
    draw.ellipse([308, 72, 318, 80], fill=DARK)
    draw.ellipse([315, 72, 325, 80], fill=DARK)
    # Eyes
    draw.ellipse([260, 60, 272, 72], fill=DARK)
    draw.ellipse([262, 62, 270, 70], fill=(70, 50, 25))
    # Ears
    draw.polygon([(244, 56), (232, 42), (248, 48)], fill=PINK)
    draw.polygon([(295, 56), (308, 42), (298, 48)], fill=PINK)

    # Horns — small
    draw.polygon([(260, 54), (255, 38), (265, 42)], fill=(220, 210, 180))
    draw.polygon([(282, 54), (285, 38), (278, 42)], fill=(220, 210, 180))

    # Udder
    draw.ellipse([175, 188, 215, 210], fill=PINK)

    # Legs
    for lx in [115, 152, 222, 255]:
        draw.rectangle([lx, 192, lx + 18, 242], fill=WHITE)
        draw.ellipse([lx - 2, 236, lx + 20, 248], fill=DARK)

    # Tail
    draw.polygon([(95, 145), (58, 132), (52, 158), (65, 172), (95, 162)], fill=WHITE)
    draw.ellipse([48, 128, 62, 148], fill=BROWN)

    # Highlight
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.ellipse([130, 105, 270, 145], fill=(255, 255, 230, 25))
    img = Image.alpha_composite(img, overlay)

    return finalize(img)


# ---------------------------------------------------------------------------
# 7. elephant.png — large elephant, tusks, trunk
# ---------------------------------------------------------------------------

def make_elephant():
    img = make_base((9, 8, 8))
    img = add_particles(img, (140, 130, 120), 35, seed=26)
    img = add_glow(img, 195, 125, 120, (100, 95, 88), strength=65)

    draw = ImageDraw.Draw(img)
    GREY = (120, 115, 108)
    DGREY = (80, 75, 68)
    LGREY = (155, 150, 142)
    TUSK = (240, 235, 215)
    DARK = (30, 25, 22)

    # Body — massive
    draw.ellipse([75, 85, 285, 205], fill=GREY)
    # Head — large, round
    draw.ellipse([225, 50, 330, 155], fill=DGREY)
    # Ear — large flap
    draw.ellipse([250, 40, 345, 145], fill=GREY)
    draw.ellipse([260, 50, 335, 135], fill=LGREY)

    # Trunk — curving down
    draw.polygon([(260, 130), (250, 155), (245, 200), (238, 230), (248, 232),
                  (258, 202), (265, 158), (272, 135)], fill=DGREY)
    # Trunk tip
    draw.ellipse([234, 225, 252, 240], fill=LGREY)

    # Tusks
    draw.polygon([(258, 128), (230, 175), (235, 180), (262, 135)], fill=TUSK)
    draw.polygon([(275, 130), (250, 178), (255, 183), (280, 138)], fill=TUSK)

    # Eye
    draw.ellipse([268, 78, 282, 92], fill=DARK)
    draw.ellipse([270, 80, 280, 90], fill=(65, 60, 50))

    # Legs — thick pillars
    for lx, w in [(95, 35), (140, 35), (200, 35), (240, 35)]:
        draw.rectangle([lx, 195, lx + w, 250], fill=DGREY)
        draw.ellipse([lx - 3, 244, lx + w + 3, 256], fill=DARK)

    # Tail
    draw.polygon([(75, 135), (45, 125), (40, 150), (52, 162), (75, 152)], fill=DGREY)
    draw.polygon([(42, 127), (30, 118), (28, 142), (40, 148)], fill=GREY)

    # Wrinkle lines on body
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    for y_off in [105, 125, 145, 165]:
        d.line([(100, y_off), (265, y_off + 5)], fill=(0, 0, 0, 20), width=1)
    d.ellipse([110, 88, 260, 140], fill=(170, 165, 155, 25))
    img = Image.alpha_composite(img, overlay)

    return finalize(img)


# ---------------------------------------------------------------------------
# 8. greywolf.png — grey wolf, lean, aggressive
# ---------------------------------------------------------------------------

def make_greywolf():
    img = make_base((9, 9, 10))
    img = add_particles(img, (140, 145, 150), 40, seed=27)
    img = add_glow(img, 195, 130, 100, (100, 105, 110), strength=65)

    draw = ImageDraw.Draw(img)
    GREY = (130, 132, 138)
    DGREY = (80, 82, 88)
    LGREY = (175, 178, 185)
    BELLY = (200, 200, 205)
    DARK = (25, 28, 32)

    # Body — lean, low
    draw.ellipse([100, 120, 285, 200], fill=GREY)
    # Haunch
    draw.ellipse([90, 110, 185, 180], fill=DGREY)
    # Neck
    draw.polygon([(220, 120), (248, 78), (268, 84), (248, 125)], fill=GREY)
    # Head
    draw.ellipse([242, 62, 310, 110], fill=GREY)
    # Snout — pointed
    draw.polygon([(292, 74), (338, 90), (335, 102), (292, 98)], fill=LGREY)
    # Nose
    draw.ellipse([330, 86, 342, 98], fill=DARK)
    # Ears — pointed
    draw.polygon([(258, 64), (250, 40), (272, 56)], fill=GREY)
    draw.polygon([(260, 64), (254, 44), (270, 57)], fill=DGREY)
    draw.polygon([(280, 62), (284, 40), (296, 56)], fill=GREY)
    draw.polygon([(282, 62), (286, 44), (294, 57)], fill=DGREY)

    # Eye — amber
    draw.ellipse([264, 76, 278, 88], fill=DARK)
    draw.ellipse([266, 78, 276, 86], fill=(180, 140, 40))

    # Mouth — slight snarl
    draw.line([(305, 95), (335, 95)], fill=DARK, width=1)

    # Belly
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.ellipse([120, 160, 270, 205], fill=(*BELLY, 80))
    img = Image.alpha_composite(img, overlay)
    draw = ImageDraw.Draw(img)

    # Legs — lean
    for lx, h in [(118, 52), (148, 48), (218, 55), (250, 52)]:
        draw.rectangle([lx, 193, lx + 16, 193 + h], fill=DGREY)
        draw.ellipse([lx - 3, 193 + h - 5, lx + 19, 193 + h + 8], fill=DARK)

    # Tail — bushy, lowered
    draw.polygon([(90, 145), (40, 130), (32, 155), (48, 172), (90, 165)], fill=DGREY)
    draw.polygon([(42, 132), (22, 122), (18, 150), (38, 160)], fill=GREY)

    # Fur highlight
    overlay2 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d2 = ImageDraw.Draw(overlay2)
    d2.ellipse([130, 112, 265, 150], fill=(200, 200, 210, 30))
    img = Image.alpha_composite(img, overlay2)

    return finalize(img)


# ---------------------------------------------------------------------------
# 9. giant-iguana.png — large iguana/lizard, spined back
# ---------------------------------------------------------------------------

def make_giant_iguana():
    img = make_base((8, 10, 7))
    img = add_particles(img, (80, 180, 80), 40, seed=28)
    img = add_glow(img, 195, 140, 100, (50, 140, 60), strength=65)

    draw = ImageDraw.Draw(img)
    GREEN = (60, 110, 50)
    DGREEN = (35, 75, 30)
    LGREEN = (90, 150, 75)
    BELLY = (140, 170, 100)
    DARK = (18, 30, 15)
    SPINE = (80, 140, 55)

    # Body — long, low, lizard-like
    draw.ellipse([90, 130, 280, 210], fill=GREEN)
    # Neck / head connection
    draw.polygon([(230, 140), (260, 105), (285, 110), (255, 148)], fill=GREEN)
    # Head — flat, reptilian
    draw.ellipse([255, 88, 330, 130], fill=DGREEN)
    # Snout
    draw.polygon([(315, 100), (355, 108), (352, 118), (315, 118)], fill=GREEN)
    # Nostril
    draw.ellipse([345, 105, 353, 113], fill=DARK)
    # Eye — yellow, slit pupil
    draw.ellipse([275, 94, 292, 110], fill=(180, 180, 30))
    draw.ellipse([281, 96, 287, 108], fill=DARK)
    # Dewlap under chin
    draw.polygon([(280, 125), (270, 140), (300, 142), (310, 128)], fill=(160, 80, 40))

    # Spine ridge
    for sx in range(120, 300, 12):
        h = 12 if sx < 220 else 8
        draw.polygon([(sx, 130), (sx + 5, 130 - h), (sx + 10, 130)], fill=SPINE)

    # Scales pattern
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    rng = random.Random(280)
    for _ in range(20):
        x = rng.randint(110, 260)
        y = rng.randint(140, 195)
        r = rng.choice([3, 4, 5])
        d.ellipse([x - r, y - r, x + r, y + r], fill=(*LGREEN, 50))
    img = Image.alpha_composite(img, overlay)
    draw = ImageDraw.Draw(img)

    # Legs — short, splayed
    # Front legs
    draw.polygon([(225, 195), (235, 230), (245, 228), (238, 195)], fill=DGREEN)
    draw.polygon([(250, 195), (260, 228), (270, 225), (258, 195)], fill=DGREEN)
    # Toes
    for cx in [232, 238, 244]:
        draw.polygon([(cx, 228), (cx - 2, 242), (cx + 2, 242)], fill=DARK)
    for cx in [258, 264, 270]:
        draw.polygon([(cx, 225), (cx - 2, 240), (cx + 2, 240)], fill=DARK)
    # Back legs
    draw.polygon([(108, 195), (98, 230), (108, 228), (115, 195)], fill=DGREEN)
    draw.polygon([(135, 195), (128, 228), (138, 225), (142, 195)], fill=DGREEN)

    # Tail — very long, tapering
    draw.polygon([(90, 165), (30, 145), (10, 155), (15, 168), (90, 175)], fill=GREEN)
    draw.polygon([(30, 147), (10, 140), (5, 155), (15, 160)], fill=DGREEN)

    # Belly highlight
    overlay2 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d2 = ImageDraw.Draw(overlay2)
    d2.ellipse([120, 160, 265, 210], fill=(*BELLY, 40))
    img = Image.alpha_composite(img, overlay2)

    return finalize(img)


# ---------------------------------------------------------------------------
# 10. kuku-bird-hatchling.png — small round bird
# ---------------------------------------------------------------------------

def make_kuku_bird():
    img = make_base((10, 8, 10))
    img = add_particles(img, (200, 150, 220), 45, seed=29)
    img = add_glow(img, 200, 120, 100, (160, 100, 180), strength=70)

    draw = ImageDraw.Draw(img)
    BODY = (160, 120, 60)
    DBODY = (120, 85, 40)
    LBODY = (200, 165, 85)
    BEAK = (220, 140, 40)
    DARK = (30, 20, 10)
    WING = (140, 100, 45)

    # Body — round, plump
    draw.ellipse([130, 95, 280, 210], fill=BODY)
    # Belly
    draw.ellipse([145, 140, 268, 215], fill=LBODY)
    # Head — round, on top of body
    draw.ellipse([175, 45, 265, 120], fill=BODY)
    # Beak
    draw.polygon([(250, 72), (298, 85), (295, 95), (250, 90)], fill=BEAK)
    draw.polygon([(250, 90), (290, 92), (288, 100), (250, 98)], fill=(190, 115, 30))
    # Eye — large, cute
    draw.ellipse([210, 58, 238, 86], fill=(245, 245, 240))
    draw.ellipse([218, 62, 236, 80], fill=DARK)
    draw.ellipse([224, 66, 234, 76], fill=(40, 30, 20))
    # Eye shine
    draw.ellipse([226, 67, 232, 73], fill=(255, 255, 255))
    # Crest feathers
    draw.polygon([(210, 48), (200, 22), (215, 35)], fill=DBODY)
    draw.polygon([(225, 46), (225, 18), (235, 32)], fill=BODY)
    draw.polygon([(240, 48), (248, 25), (250, 38)], fill=DBODY)

    # Wings — small, fluffy
    draw.ellipse([105, 115, 165, 180], fill=WING)
    draw.ellipse([260, 115, 310, 175], fill=WING)
    # Wing feather lines
    draw.line([(115, 135), (155, 165)], fill=DBODY, width=1)
    draw.line([(115, 145), (150, 170)], fill=DBODY, width=1)
    draw.line([(270, 135), (300, 160)], fill=DBODY, width=1)

    # Legs — short, bird
    draw.rectangle([180, 205, 192, 238], fill=BEAK)
    draw.rectangle([218, 205, 230, 238], fill=BEAK)
    # Feet
    for lx in [180, 218]:
        draw.polygon([(lx - 4, 235), (lx + 2, 245), (lx + 8, 235)], fill=BEAK)
        draw.polygon([(lx + 4, 235), (lx + 10, 245), (lx + 16, 235)], fill=BEAK)

    # Fluffy belly highlight
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.ellipse([160, 135, 255, 195], fill=(240, 220, 150, 35))
    img = Image.alpha_composite(img, overlay)

    return finalize(img)


# ---------------------------------------------------------------------------
# 11. lion.png — majestic lion with mane
# ---------------------------------------------------------------------------

def make_lion():
    img = make_base((13, 10, 5))
    img = add_particles(img, (200, 160, 60), 40, seed=30)
    img = add_glow(img, 200, 120, 115, (200, 150, 50), strength=75)

    draw = ImageDraw.Draw(img)
    TAN = (195, 155, 80)
    DTAN = (150, 115, 55)
    LTAN = (225, 190, 110)
    MANE = (140, 85, 30)
    DMANE = (100, 60, 20)
    DARK = (30, 20, 10)

    # Body — muscular, feline
    draw.ellipse([105, 115, 285, 200], fill=TAN)
    # Shoulder
    draw.ellipse([160, 100, 260, 175], fill=DTAN)

    # Mane — large, surrounding head
    draw.ellipse([195, 38, 330, 155], fill=MANE)
    draw.ellipse([200, 42, 325, 150], fill=DMANE)
    # Head
    draw.ellipse([225, 55, 305, 125], fill=TAN)
    # Snout
    draw.ellipse([285, 72, 328, 108], fill=LTAN)
    # Nose
    draw.polygon([(308, 80), (300, 88), (316, 88)], fill=DARK)
    # Mouth
    draw.line([(308, 88), (308, 98)], fill=DARK, width=1)
    draw.line([(300, 98), (316, 98)], fill=DARK, width=1)
    # Eyes
    draw.ellipse([245, 72, 262, 86], fill=DARK)
    draw.ellipse([248, 74, 259, 84], fill=(180, 140, 40))
    # Ears
    draw.ellipse([228, 50, 248, 68], fill=MANE)
    draw.ellipse([230, 52, 246, 66], fill=TAN)
    draw.ellipse([290, 48, 310, 66], fill=MANE)
    draw.ellipse([292, 50, 308, 64], fill=TAN)

    # Mane wisps
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    rng = random.Random(301)
    for _ in range(15):
        x = rng.randint(200, 325)
        y = rng.randint(40, 150)
        r = rng.randint(5, 12)
        d.ellipse([x - r, y - r, x + r, y + r], fill=(*MANE, rng.randint(40, 80)))
    img = Image.alpha_composite(img, overlay)
    draw = ImageDraw.Draw(img)

    # Legs
    for lx in [125, 158, 218, 252]:
        draw.rectangle([lx, 192, lx + 18, 242], fill=DTAN)
        draw.ellipse([lx - 2, 236, lx + 20, 248], fill=DARK)

    # Tail — long with tuft
    draw.polygon([(105, 150), (48, 135), (35, 148), (42, 162), (105, 162)], fill=TAN)
    draw.ellipse([28, 130, 50, 158], fill=MANE)

    # Body highlight
    overlay2 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d2 = ImageDraw.Draw(overlay2)
    d2.ellipse([140, 108, 270, 155], fill=(240, 210, 130, 28))
    img = Image.alpha_composite(img, overlay2)

    return finalize(img)


# ---------------------------------------------------------------------------
# 12. raptor.png — dinosaur-like raptor, feathered
# ---------------------------------------------------------------------------

def make_raptor():
    img = make_base((8, 9, 7))
    img = add_particles(img, (120, 180, 100), 40, seed=31)
    img = add_glow(img, 200, 125, 105, (80, 130, 60), strength=65)

    draw = ImageDraw.Draw(img)
    BODY = (70, 100, 55)
    DBODY = (45, 68, 35)
    LBODY = (100, 140, 80)
    FEATHER = (90, 120, 65)
    DARK = (20, 28, 15)
    CLAW = (200, 190, 160)
    RED = (180, 50, 30)

    # Body — lean, forward-leaning
    draw.ellipse([130, 100, 280, 185], fill=BODY)
    # Neck — curved forward
    draw.polygon([(235, 108), (268, 62), (288, 68), (258, 115)], fill=BODY)
    # Head — narrow, predatory
    draw.ellipse([260, 42, 330, 88], fill=DBODY)
    # Snout — sharp
    draw.polygon([(318, 52), (365, 65), (362, 75), (318, 72)], fill=BODY)
    # Teeth line
    for tx in range(320, 360, 6):
        draw.polygon([(tx, 72), (tx + 2, 78), (tx + 4, 72)], fill=CLAW)
    # Eye — fierce
    draw.ellipse([278, 52, 295, 68], fill=(220, 180, 40))
    draw.ellipse([283, 55, 291, 65], fill=DARK)
    # Crest
    draw.polygon([(270, 44), (265, 28), (280, 38)], fill=RED)
    draw.polygon([(285, 44), (288, 26), (298, 38)], fill=RED)

    # Feathered arms
    draw.polygon([(170, 115), (120, 90), (105, 105), (115, 130), (170, 135)], fill=FEATHER)
    draw.polygon([(115, 92), (90, 80), (85, 98), (110, 115)], fill=LBODY)

    # Tail — long, feathered
    draw.polygon([(130, 145), (50, 120), (30, 135), (40, 155), (130, 165)], fill=BODY)
    draw.polygon([(50, 122), (25, 110), (15, 130), (32, 140)], fill=FEATHER)
    # Tail feather tuft
    draw.polygon([(28, 112), (8, 100), (5, 120), (22, 128)], fill=LBODY)

    # Legs — powerful, bird-like
    # Left leg
    draw.polygon([(175, 180), (168, 215), (178, 218), (185, 185)], fill=DBODY)
    draw.polygon([(168, 215), (155, 240), (175, 238), (178, 218)], fill=DBODY)
    # Right leg
    draw.polygon([(225, 178), (220, 212), (230, 215), (235, 182)], fill=DBODY)
    draw.polygon([(220, 212), (208, 238), (228, 236), (230, 215)], fill=DBODY)

    # Sickle claws
    draw.polygon([(155, 238), (148, 250), (158, 248)], fill=CLAW)
    draw.polygon([(165, 236), (160, 250), (170, 248)], fill=CLAW)
    draw.polygon([(208, 236), (202, 250), (212, 248)], fill=CLAW)
    draw.polygon([(218, 234), (214, 250), (224, 248)], fill=CLAW)
    # Big sickle claw
    draw.polygon([(152, 240), (140, 228), (145, 225), (158, 238)], fill=CLAW)
    draw.polygon([(206, 238), (194, 226), (198, 222), (210, 236)], fill=CLAW)

    # Belly
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.ellipse([148, 140, 268, 190], fill=(*LBODY, 40))
    img = Image.alpha_composite(img, overlay)

    return finalize(img)


# ---------------------------------------------------------------------------
# 13. cloudcart.png — hot air balloon vehicle
# ---------------------------------------------------------------------------

def make_cloudcart():
    img = make_base((8, 8, 12))
    img = add_particles(img, (180, 200, 240), 50, seed=32)
    img = add_glow(img, 200, 80, 100, (200, 150, 80), strength=80)

    draw = ImageDraw.Draw(img)
    BALLOON = (160, 50, 30)
    LBALLOON = (200, 80, 45)
    GOLD = (201, 162, 39)
    ROPE = (140, 120, 80)
    BASKET = (120, 85, 45)
    DBASKET = (80, 55, 28)

    # Balloon — large oval
    draw.ellipse([115, 15, 290, 145], fill=BALLOON)
    # Balloon panels
    draw.ellipse([140, 20, 265, 140], fill=LBALLOON)
    draw.ellipse([165, 25, 240, 135], fill=BALLOON)
    # Balloon top ornament
    draw.ellipse([190, 8, 215, 25], fill=GOLD)

    # Panel lines
    for x in [155, 180, 205, 230, 255]:
        draw.line([(x, 20), (x - 5, 140)], fill=(130, 40, 22), width=1)

    # Flame glow under balloon
    img = add_glow(img, 202, 148, 25, (255, 160, 30), strength=140)
    draw = ImageDraw.Draw(img)
    draw.polygon([(195, 140), (200, 155), (205, 140)], fill=(255, 200, 50))

    # Ropes
    draw.line([(145, 138), (165, 185)], fill=ROPE, width=1)
    draw.line([(260, 138), (240, 185)], fill=ROPE, width=1)
    draw.line([(175, 142), (175, 185)], fill=ROPE, width=1)
    draw.line([(230, 142), (230, 185)], fill=ROPE, width=1)

    # Basket
    draw.rectangle([158, 185, 248, 225], fill=BASKET)
    # Basket weave pattern
    for y in range(190, 225, 7):
        draw.line([(160, y), (246, y)], fill=DBASKET, width=1)
    for x in range(162, 248, 8):
        draw.line([(x, 185), (x, 225)], fill=DBASKET, width=1)
    # Basket rim
    draw.rectangle([155, 182, 250, 188], fill=DBASKET)
    draw.rectangle([155, 222, 250, 228], fill=DBASKET)

    # Cloud wisps
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.ellipse([30, 150, 110, 185], fill=(200, 210, 230, 35))
    d.ellipse([300, 120, 380, 155], fill=(200, 210, 230, 30))
    d.ellipse([50, 80, 120, 110], fill=(200, 210, 230, 25))
    img = Image.alpha_composite(img, overlay)

    return finalize(img)


# ---------------------------------------------------------------------------
# 14. wagon-horse.png — horse-drawn wagon/carriage
# ---------------------------------------------------------------------------

def make_wagon_horse():
    img = make_base((11, 9, 6))
    img = add_particles(img, (160, 130, 80), 30, seed=33)
    img = add_glow(img, 190, 130, 110, (140, 100, 50), strength=60)

    draw = ImageDraw.Draw(img)
    WOOD = (120, 78, 38)
    DWOOD = (80, 50, 22)
    LWOOD = (160, 110, 55)
    HORSE = (130, 80, 40)
    DHORSE = (90, 55, 25)
    METAL = (80, 82, 88)
    DARK = (25, 18, 10)

    # Wagon body
    draw.rectangle([45, 120, 210, 180], fill=WOOD)
    draw.rectangle([45, 117, 210, 124], fill=DWOOD)
    draw.rectangle([45, 177, 210, 184], fill=DWOOD)
    # Side planks
    for y in [132, 145, 158, 170]:
        draw.line([(47, y), (208, y)], fill=DWOOD, width=1)
    # Canopy supports
    draw.line([(55, 120), (55, 88)], fill=DWOOD, width=3)
    draw.line([(195, 120), (195, 88)], fill=DWOOD, width=3)
    # Canopy
    draw.polygon([(48, 90), (50, 78), (200, 78), (202, 90)], fill=LWOOD)
    draw.rectangle([48, 88, 202, 94], fill=WOOD)

    # Wheels
    for cx, cy in [(75, 195), (185, 195)]:
        draw.ellipse([cx - 22, cy - 22, cx + 22, cy + 22], fill=DWOOD)
        draw.ellipse([cx - 18, cy - 18, cx + 18, cy + 18], fill=WOOD)
        draw.ellipse([cx - 5, cy - 5, cx + 5, cy + 5], fill=METAL)
        # Spokes
        for angle_seed in range(6):
            import math
            a = angle_seed * 60 * 3.14159 / 180
            ex = cx + int(16 * math.cos(a))
            ey = cy + int(16 * math.sin(a))
            draw.line([(cx, cy), (ex, ey)], fill=METAL, width=1)

    # Shaft connecting to horse
    draw.line([(210, 155), (270, 140)], fill=DWOOD, width=3)
    draw.line([(210, 165), (270, 148)], fill=DWOOD, width=3)

    # Horse — simplified side view
    draw.ellipse([262, 112, 365, 185], fill=HORSE)
    # Neck
    draw.polygon([(330, 115), (345, 72), (360, 78), (348, 120)], fill=HORSE)
    # Head
    draw.ellipse([342, 58, 390, 95], fill=HORSE)
    # Snout
    draw.ellipse([375, 66, 400, 88], fill=DHORSE)
    # Eye
    draw.ellipse([355, 65, 365, 75], fill=DARK)
    draw.ellipse([357, 67, 363, 73], fill=(70, 45, 20))
    # Ear
    draw.polygon([(350, 60), (345, 46), (358, 52)], fill=HORSE)
    # Mane
    draw.polygon([(335, 72), (330, 112), (340, 110), (348, 74)], fill=DHORSE)

    # Horse legs
    for lx in [278, 300, 330, 350]:
        draw.rectangle([lx, 178, lx + 12, 228], fill=DHORSE)
        draw.ellipse([lx - 2, 224, lx + 14, 234], fill=DARK)

    # Horse tail
    draw.polygon([(262, 140), (242, 128), (238, 148), (248, 158), (262, 152)], fill=DHORSE)

    return finalize(img)


# ---------------------------------------------------------------------------
# 15. train.png — fantasy rail vehicle
# ---------------------------------------------------------------------------

def make_train():
    img = make_base((8, 7, 10))
    img = add_particles(img, (150, 140, 180), 35, seed=34)
    img = add_glow(img, 200, 130, 110, (120, 100, 140), strength=60)

    draw = ImageDraw.Draw(img)
    STEEL = (70, 68, 78)
    DSTEEL = (45, 42, 52)
    LSTEEL = (110, 108, 120)
    COPPER = (170, 100, 50)
    WINDOW = (140, 180, 200)
    DARK = (20, 18, 25)
    SMOKE = (100, 98, 105)

    # Track/rails
    draw.rectangle([20, 210, 380, 215], fill=DSTEEL)
    draw.rectangle([20, 222, 380, 227], fill=DSTEEL)
    # Rail ties
    for x in range(30, 380, 20):
        draw.rectangle([x, 208, x + 10, 230], fill=(50, 40, 30))

    # Main locomotive body
    draw.rectangle([140, 115, 350, 205], fill=STEEL)
    draw.rectangle([140, 112, 350, 118], fill=COPPER)
    draw.rectangle([140, 200, 350, 208], fill=DSTEEL)

    # Boiler/front — cylindrical front
    draw.ellipse([60, 105, 170, 205], fill=DSTEEL)
    draw.ellipse([68, 112, 162, 198], fill=STEEL)
    # Front plate
    draw.ellipse([50, 115, 80, 195], fill=LSTEEL)

    # Smokestack
    draw.rectangle([85, 60, 110, 108], fill=DSTEEL)
    draw.rectangle([78, 55, 118, 65], fill=STEEL)
    draw.ellipse([75, 50, 120, 60], fill=COPPER)

    # Smoke clouds
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.ellipse([70, 25, 130, 55], fill=(*SMOKE, 60))
    d.ellipse([50, 15, 115, 48], fill=(*SMOKE, 45))
    d.ellipse([30, 8, 100, 40], fill=(*SMOKE, 30))
    d.ellipse([10, 5, 75, 32], fill=(*SMOKE, 20))
    img = Image.alpha_composite(img, overlay)
    draw = ImageDraw.Draw(img)

    # Windows
    for wx in [165, 200, 235, 270, 305]:
        draw.rectangle([wx, 128, wx + 25, 158], fill=WINDOW)
        draw.rectangle([wx + 1, 129, wx + 24, 157], fill=(90, 140, 170))
        # Window frame
        draw.rectangle([wx, 126, wx + 25, 130], fill=COPPER)
        draw.rectangle([wx, 156, wx + 25, 160], fill=COPPER)

    # Headlight
    img = add_glow(img, 60, 150, 20, (255, 220, 120), strength=120)
    draw = ImageDraw.Draw(img)
    draw.ellipse([52, 142, 68, 158], fill=(255, 240, 180))

    # Cow catcher
    draw.polygon([(50, 205), (20, 220), (80, 220)], fill=DSTEEL)

    # Wheels
    for cx in [90, 130, 200, 260, 320]:
        draw.ellipse([cx - 14, 200, cx + 14, 228], fill=DSTEEL)
        draw.ellipse([cx - 10, 204, cx + 10, 224], fill=STEEL)
        draw.ellipse([cx - 3, 210, cx + 3, 218], fill=COPPER)

    # Cabin roof
    draw.rectangle([290, 100, 355, 115], fill=COPPER)
    draw.polygon([(288, 115), (285, 100), (358, 100), (355, 115)], fill=DSTEEL)

    # Detail: rivets along body
    for rx in range(150, 345, 15):
        draw.ellipse([rx, 195, rx + 4, 199], fill=LSTEEL)

    return finalize(img)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

MOUNTS = [
    ("black-bear.png",          make_black_bear),
    ("brown-bear.png",          make_brown_bear),
    ("boar.png",                make_boar),
    ("buffalo.png",             make_buffalo),
    ("camel.png",               make_camel),
    ("cow.png",                 make_cow),
    ("elephant.png",            make_elephant),
    ("greywolf.png",            make_greywolf),
    ("giant-iguana.png",        make_giant_iguana),
    ("kuku-bird-hatchling.png", make_kuku_bird),
    ("lion.png",                make_lion),
    ("raptor.png",              make_raptor),
    ("cloudcart.png",           make_cloudcart),
    ("wagon-horse.png",         make_wagon_horse),
    ("train.png",               make_train),
]

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
