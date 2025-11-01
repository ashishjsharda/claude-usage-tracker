#!/usr/bin/env python3
"""
Generate placeholder icons for Claude Usage Tracker extension
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, output_path):
    """Create a gradient icon with the specified size"""
    # Create image with gradient background
    img = Image.new('RGB', (size, size), color='white')
    draw = ImageDraw.Draw(img)
    
    # Create gradient from purple to pink
    for y in range(size):
        r = int(139 + (236 - 139) * y / size)  # 139 to 236
        g = int(92 + (72 - 92) * y / size)     # 92 to 72
        b = int(246 + (153 - 246) * y / size)  # 246 to 153
        draw.line([(0, y), (size, y)], fill=(r, g, b))
    
    # Add rounded corners
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    radius = size // 4
    mask_draw.rounded_rectangle([(0, 0), (size, size)], radius=radius, fill=255)
    
    # Apply mask
    img.putalpha(mask)
    
    # Add simple icon shape (triangle + circle for AI/tracking theme)
    icon_draw = ImageDraw.Draw(img)
    
    # Triangle (represent Claude's logo aesthetic)
    triangle_size = size // 3
    center = size // 2
    triangle = [
        (center, center - triangle_size // 2),
        (center - triangle_size // 2, center + triangle_size // 4),
        (center + triangle_size // 2, center + triangle_size // 4)
    ]
    icon_draw.polygon(triangle, fill='white')
    
    # Circle (represent tracking/monitoring)
    circle_y = center + triangle_size // 2 + size // 10
    circle_radius = size // 8
    circle_bbox = [
        center - circle_radius,
        circle_y - circle_radius,
        center + circle_radius,
        circle_y + circle_radius
    ]
    icon_draw.ellipse(circle_bbox, fill='white')
    
    # Save
    img.save(output_path, 'PNG')
    print(f'Created {output_path}')

def main():
    """Generate all icon sizes"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    icons_dir = os.path.join(script_dir, 'icons')
    
    # Ensure icons directory exists
    os.makedirs(icons_dir, exist_ok=True)
    
    # Generate different sizes
    sizes = [16, 48, 128]
    
    for size in sizes:
        output_path = os.path.join(icons_dir, f'icon{size}.png')
        create_icon(size, output_path)
    
    print('\n✅ All icons generated successfully!')
    print('📁 Icons saved in:', icons_dir)

if __name__ == '__main__':
    main()
