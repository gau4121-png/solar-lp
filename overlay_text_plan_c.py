from PIL import Image, ImageDraw, ImageFont
import os

# Define image paths and texts for Plan C
scenes = [
    {
        "image": "/home/ubuntu/solar-lp/client/public/images/scene_c1_storm.png",
        "text": "「あ！停電！？」\nそんな時…",
        "output": "/home/ubuntu/solar-lp/client/public/images/scene_c1_text.png",
        "color": "white",
        "stroke_color": "#CC0000", # Red for urgency
        "position": "center"
    },
    {
        "image": "/home/ubuntu/solar-lp/client/public/images/scene_c2_waiting.png",
        "text": "すぐに駆けつけられる\n距離にいますか？",
        "output": "/home/ubuntu/solar-lp/client/public/images/scene_c2_text.png",
        "color": "white",
        "stroke_color": "#003366", # Navy
        "position": "center"
    },
    {
        "image": "/home/ubuntu/solar-lp/client/public/images/scene_c3_speed.png",
        "text": "遠くの大手より、\n近くの専門店。",
        "output": "/home/ubuntu/solar-lp/client/public/images/scene_c3_text.png",
        "color": "white",
        "stroke_color": "#FF6600", # Orange for emphasis
        "position": "bottom"
    },
    {
        "image": "/home/ubuntu/solar-lp/client/public/images/scene_c4_map.png",
        "text": "朝霞・新座の太陽光なら\n地元のダイマツへ。",
        "output": "/home/ubuntu/solar-lp/client/public/images/scene_c4_text.png",
        "color": "white",
        "stroke_color": "#003366",
        "position": "center"
    },
    {
        "image": "/home/ubuntu/solar-lp/client/public/images/scene_c5_phone.png",
        "text": "地域密着の理由は\nプロフのリンクから👇",
        "output": "/home/ubuntu/solar-lp/client/public/images/scene_c5_text.png",
        "color": "white",
        "stroke_color": "#FF6600",
        "position": "center"
    }
]

# Font settings
font_path = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc"
font_size = 80

def add_text_to_image(scene):
    try:
        img = Image.open(scene["image"]).convert("RGBA")
        draw = ImageDraw.Draw(img)
        
        try:
            font = ImageFont.truetype(font_path, font_size)
        except IOError:
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
