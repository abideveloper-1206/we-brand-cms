from PIL import Image
import numpy as np

def process_logo():
    input_path = "C:/Users/AbinaM/Desktop/we-brand-cms/logo-original.png"
    output_path = "C:/Users/AbinaM/Desktop/we-brand-cms/logo-processed.png"
    
    # Open the image and convert to RGBA
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img)
    
    # Calculate luminance or darkness
    # The logo is dark blue on a light background. 
    # Let's use the average RGB value. If it's dark, it belongs to the logo.
    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    
    # Calculate grayscale brightness (0 to 255)
    brightness = 0.2989 * r + 0.5870 * g + 0.1140 * b
    
    # The background is light (high brightness), the logo is dark (low brightness)
    # We want the alpha channel to be 255 where it's dark, and 0 where it's light.
    # Let's invert the brightness: 255 - brightness.
    # To make it crisp, we can apply a threshold or just use the inverted brightness as alpha.
    alpha = 255 - brightness
    
    # Enhance the contrast of the alpha mask
    alpha = np.clip((alpha - 50) * 2, 0, 255)
    
    # Set RGB to pure white (255, 255, 255)
    data[:,:,0] = 255
    data[:,:,1] = 255
    data[:,:,2] = 255
    
    # Assign the calculated alpha mask
    data[:,:,3] = alpha.astype(np.uint8)
    
    # Create the new image and save
    new_img = Image.fromarray(data)
    new_img.save(output_path, "PNG")
    print("Logo processed and saved to:", output_path)

if __name__ == "__main__":
    process_logo()
