from PIL import Image, ImageDraw
import os

input_path = r"c:\Users\AbinaM\Desktop\we-brand-cms\logo-processed.png"
output_ico1 = r"c:\Users\AbinaM\Desktop\We-brand\webrand\src\app\favicon.ico"
output_png1 = r"c:\Users\AbinaM\Desktop\We-brand\webrand\src\app\favicon.png"
output_ico2 = r"c:\Users\AbinaM\Desktop\we-brand-cms\public\favicon.ico"
output_svg2 = r"c:\Users\AbinaM\Desktop\we-brand-cms\public\favicon.svg"

size = (256, 256)
bg_color = "#2563c9"

# Create a new image with transparent background
icon = Image.new("RGBA", size, (255, 255, 255, 0))
draw = ImageDraw.Draw(icon)

# Draw a circle with the brand color
draw.ellipse((0, 0, size[0], size[1]), fill=bg_color)

try:
    # Open the processed logo (which is white)
    logo = Image.open(input_path).convert("RGBA")
    
    # Resize logo to fit inside the circle (give it some padding)
    logo_size = int(size[0] * 0.7)
    logo = logo.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
    
    # Calculate position to center the logo
    pos = ((size[0] - logo_size) // 2, (size[1] - logo_size) // 2)
    
    # Paste the logo using its own alpha as a mask
    icon.paste(logo, pos, mask=logo)

    # Ensure directories exist
    os.makedirs(os.path.dirname(output_ico1), exist_ok=True)
    os.makedirs(os.path.dirname(output_ico2), exist_ok=True)

    # Save as ICO (multiple sizes for good browser support)
    icon.save(output_ico1, format="ICO", sizes=[(16,16), (32,32), (48,48), (64,64)])
    icon.save(output_ico2, format="ICO", sizes=[(16,16), (32,32), (48,48), (64,64)])
    icon.save(output_png1, format="PNG")
    
    # Optionally save a PNG for the SVG to reference, or just overwrite the SVG with an image data URI if possible.
    # We will just write a simple SVG that embeds the base64 PNG or just delete the SVG so the ICO is used.
    
    print("Favicons generated successfully!")
except Exception as e:
    print("Error:", e)
