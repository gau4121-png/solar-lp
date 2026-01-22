from PIL import Image, ImageDraw, ImageFont
import os

# Define image paths and texts
scenes = [
    {
        "image": "/home/ubuntu/solar-lp/client/public/images/scene_1_roof.png",
        "text": "太陽光パネル、\n設置して終わり…\nではありません！",
        "output": "/home/ubuntu/solar-lp/client/public/images/scene_1_text.png",
        "color": "white",
        "stroke_color": "#003366", # Navy
        "position": "center"
    },
    {
        "image": "/home/ubuntu/solar-lp/client/public/images/scene_2_time.png",
        "text": "10年、20年と\n長いお付き合いに\nなるからこそ…",
        "output": "/home/ubuntu/solar-lp/client/public/images/scene_2_text.png",
        "color": "white",
        "stroke_color": "#003366",
        "position": "center"
    },
    {
        "image": "/home/ubuntu/solar-lp/client/public/images/scene_3_worker.png",
        "text": "「誰が工事するか」が\n一番大事なんです。",
        "output": "/home/ubuntu/solar-lp/client/public/images/scene_3_text.png",
        "color": "white",
        "stroke_color": "#FF6600", # Orange for emphasis
        "position": "bottom"
    },
    {
        "image": "/home/ubuntu/solar-lp/client/public/images/scene_4_trust.png",
        "text": "埼玉・東京の工事は\n私たちダイマツが\n責任を持ちます。",
        "output": "/home/ubuntu/solar-lp/client/public/images/scene_4_text.png",
        "color": "white",
        "stroke_color": "#003366",
        "position": "center"
    },
    {
        "image": "/home/ubuntu/solar-lp/client/public/images/scene_5_phone.png",
        "text": "失敗しない選び方は\nプロフのリンクから👇",
        "output": "/home/ubuntu/solar-lp/client/public/images/scene_5_text.png",
        "color": "white",
        "stroke_color": "#FF6600",
        "position": "center"
    }
]

# Font settings (using a standard Japanese font available in Ubuntu)
font_path = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
font_size = 80

def add_text_to_image(scene):
    try:
        img = Image.open(scene["image"]).convert("RGBA")
        draw = ImageDraw.Draw(img)
        
        try:
            font = ImageFont.truetype(font_path, font_size)
        except IOError:
            # Fallback if specific font not found
            font = ImageFont.load_default()
            print(f"Warning: Font not found, using default for {scene['output']}")

        text = scene["text"]
        
        # Calculate text size and position
        bbox = draw.multiline_textbbox((0, 0), text, font=font, align="center")
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        img_width, img_height = img.size
        
        x = (img_width - text_width) / 2
        
        if scene["position"] == "center":
            y = (img_height - text_height) / 2
        elif scene["position"] == "bottom":
            y = img_height - text_height - 150 # Padding from bottom
        else:
            y = 100 # Top padding
            
        # Draw text with stroke (outline) for better visibility
        stroke_width = 6
        draw.multiline_text((x, y), text, font=font, fill=scene["color"], align="center", 
                            stroke_width=stroke_width, stroke_fill=scene["stroke_color"])
        
        img.save(scene["output"])
        print(f"Saved: {scene['output']}")
        
    except Exception as e:
        print(f"Error processing {scene['image']}: {e}")

if __name__ == "__main__":
    for scene in scenes:
        add_text_to_image(scene)
