from PIL import Image, ImageDraw, ImageFont, ImageFilter
import qrcode
import os

def create_visiting_card():
    # Card dimensions (High-res 1200 x 675, standard 16:9 business card aspect ratio)
    W, H = 1200, 675
    
    # Create base image with deep navy/midnight medical blue gradient
    img = Image.new("RGBA", (W, H), (9, 27, 46, 255)) # #091b2e
    draw = ImageDraw.Draw(img)
    
    # Draw subtle background geometric accents
    # Gradient overlay or dental curve
    for y in range(H):
        ratio = y / H
        # subtle gradient from #0b223a to #06121f
        r = int(11 * (1 - ratio) + 6 * ratio)
        g = int(34 * (1 - ratio) + 18 * ratio)
        b = int(58 * (1 - ratio) + 31 * ratio)
        draw.line([(0, y), (W, y)], fill=(r, g, b, 255))
        
    # Draw refined gold & cyan accent borders
    # Top accent line
    draw.rectangle([(0, 0), (W, 6)], fill=(1, 171, 249, 255)) # #01abf9
    # Bottom accent line
    draw.rectangle([(0, H - 6), (W, H)], fill=(253, 135, 50, 255)) # #fd8732
    # Subtle inner border
    draw.rounded_rectangle([(24, 24), (W - 24, H - 24)], radius=20, outline=(255, 255, 255, 30), width=2)
    
    # Left decorative vertical glow
    for i in range(15):
        alpha = int(20 * (1 - i / 15))
        draw.line([(30 + i, 30), (30 + i, H - 30)], fill=(1, 171, 249, alpha))
        
    # Load fonts (system fonts on Windows)
    try:
        font_name = ImageFont.truetype("arialbd.ttf", 46)
        font_sub = ImageFont.truetype("arialbd.ttf", 20)
        font_badge = ImageFont.truetype("arialbd.ttf", 16)
        font_tagline = ImageFont.truetype("ariali.ttf", 22)
        font_body = ImageFont.truetype("arial.ttf", 18)
        font_bold = ImageFont.truetype("arialbd.ttf", 18)
        font_small = ImageFont.truetype("arial.ttf", 15)
        font_brand = ImageFont.truetype("arialbd.ttf", 26)
    except:
        font_name = ImageFont.load_default()
        font_sub = font_name
        font_badge = font_name
        font_tagline = font_name
        font_body = font_name
        font_bold = font_name
        font_small = font_name
        font_brand = font_name

    # Add Doctor's Photo in an elegant circular/rounded frame
    photo_path = "assets/dr-rohan-patani.jpg"
    if os.path.exists(photo_path):
        photo = Image.open(photo_path).convert("RGBA")
        photo_size = 220
        photo = photo.resize((photo_size, photo_size), Image.Resampling.LANCZOS)
        
        # Create circular mask
        mask = Image.new("L", (photo_size, photo_size), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.ellipse((0, 0, photo_size, photo_size), fill=255)
        
        # Border ring around photo
        ring_size = photo_size + 16
        ring_x, ring_y = 60, 110
        # Outer gold/cyan gradient ring
        draw.ellipse([ring_x, ring_y, ring_x + ring_size, ring_y + ring_size], fill=(1, 171, 249, 255))
        draw.ellipse([ring_x + 4, ring_y + 4, ring_x + ring_size - 4, ring_y + ring_size - 4], fill=(9, 27, 46, 255))
        
        # Paste photo
        img.paste(photo, (ring_x + 8, ring_y + 8), mask)
        
        # World Record Ribbon Badge under photo
        badge_box = [(ring_x - 10, ring_y + ring_size - 24), (ring_x + ring_size + 10, ring_y + ring_size + 14)]
        draw.rounded_rectangle(badge_box, radius=8, fill=(253, 135, 50, 255)) # amber/orange
        badge_text = "WORLD RECORD HOLDER"
        draw.text((ring_x + 16, ring_y + ring_size - 18), badge_text, fill=(255, 255, 255, 255), font=font_badge)

    # Doctor Information Block (Center Left)
    info_x = 330
    
    # Brand Top Row: DentInsure Logo / Name
    logo_path = "assets/dentinsure-logo.png"
    if os.path.exists(logo_path):
        logo = Image.open(logo_path).convert("RGBA")
        logo_w = int(logo.width * 0.9)
        logo_h = int(logo.height * 0.9)
        logo = logo.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
        # Background card for logo so it pops cleanly
        draw.rounded_rectangle([(info_x, 50), (info_x + logo_w + 24, 50 + logo_h + 12)], radius=10, fill=(255, 255, 255, 240))
        img.paste(logo, (info_x + 12, 56), logo)
    else:
        draw.text((info_x, 55), "DentInsure", fill=(1, 171, 249, 255), font=font_brand)

    # Co-founder badge
    cf_box = [(info_x + 230, 62), (info_x + 545, 96)]
    draw.rounded_rectangle(cf_box, radius=6, fill=(1, 171, 249, 40), outline=(1, 171, 249, 150), width=1)
    draw.text((info_x + 242, 69), "CO-FOUNDER OF DENTINSURE", fill=(1, 171, 249, 255), font=font_badge)

    # Doctor Name
    name_y = 145
    draw.text((info_x, name_y), "Dr. Rohan Patani", fill=(255, 255, 255, 255), font=font_name)
    
    # Subtitle / Credentials
    sub_y = name_y + 55
    draw.text((info_x, sub_y), "Expert Implantologist  |  Dental Surgeon", fill=(1, 171, 249, 255), font=font_sub)
    
    # Tagline with quotation
    tag_y = sub_y + 36
    draw.text((info_x, tag_y), "\"Surety for Your Pearly Whites\"", fill=(253, 135, 50, 255), font=font_tagline)

    # Divider line
    div_y = tag_y + 38
    draw.line([(info_x, div_y), (info_x + 480, div_y)], fill=(255, 255, 255, 40), width=1)
    
    # Contact Details (Icons & Text)
    cy = div_y + 18
    line_h = 32
    
    # Phone
    draw.text((info_x, cy), "Phone:", fill=(148, 163, 184, 255), font=font_bold)
    draw.text((info_x + 75, cy), "+91 9967750624", fill=(255, 255, 255, 255), font=font_bold)
    
    # Email
    cy += line_h
    draw.text((info_x, cy), "Email:", fill=(148, 163, 184, 255), font=font_bold)
    draw.text((info_x + 75, cy), "dentinsure@gmail.com", fill=(255, 255, 255, 255), font=font_body)

    # Website
    cy += line_h
    draw.text((info_x, cy), "Web:", fill=(148, 163, 184, 255), font=font_bold)
    draw.text((info_x + 75, cy), "https://dentinsure.in/", fill=(1, 171, 249, 255), font=font_body)

    # Address
    cy += line_h
    draw.text((info_x, cy), "Clinic:", fill=(148, 163, 184, 255), font=font_bold)
    draw.text((info_x + 75, cy), "Dental Studio & Implant Center", fill=(255, 255, 255, 255), font=font_bold)
    cy += 24
    draw.text((info_x + 75, cy), "103, Parvati Niwas, S.V. Rd, Opp Croma, Goregaon (W), Mumbai", fill=(203, 213, 225, 255), font=font_small)

    # Highlights Chip Row
    cy += 36
    chips = ["World Record Holder", "Influential Entrepreneur Author", "Consulting Mumbai & Pune"]
    chip_x = info_x
    for c in chips:
        c_w = len(c) * 8 + 20
        draw.rounded_rectangle([(chip_x, cy), (chip_x + c_w, cy + 26)], radius=6, fill=(255, 255, 255, 18), outline=(255, 255, 255, 40), width=1)
        draw.text((chip_x + 10, cy + 5), c, fill=(226, 232, 240, 255), font=font_small)
        chip_x += c_w + 12

    # QR Code Block on Right Side
    qr_box_w = 260
    qr_x = W - qr_box_w - 60
    qr_y = 120
    
    # White card container for QR
    draw.rounded_rectangle([(qr_x, qr_y), (qr_x + qr_box_w, qr_y + 360)], radius=18, fill=(255, 255, 255, 255))
    # Border
    draw.rounded_rectangle([(qr_x, qr_y), (qr_x + qr_box_w, qr_y + 360)], radius=18, outline=(1, 171, 249, 200), width=2)
    
    # Header inside QR box
    draw.text((qr_x + 22, qr_y + 18), "SCAN TO CONNECT", fill=(9, 27, 46, 255), font=font_badge)
    draw.text((qr_x + 22, qr_y + 38), "Digital Visiting Card & Portfolio", fill=(100, 116, 139, 255), font=font_small)
    
    # Generate QR Code pointing to default portfolio URL
    qr_target = "https://dentinsure.in/"
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=6,
        border=2,
    )
    qr.add_data(qr_target)
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color="#091b2e", back_color="white").convert("RGBA")
    qr_img = qr_img.resize((216, 216), Image.Resampling.LANCZOS)
    img.paste(qr_img, (qr_x + 22, qr_y + 68), qr_img)
    
    # Footer under QR
    draw.text((qr_x + 32, qr_y + 296), "Save Contact  *  Book Visit", fill=(1, 171, 249, 255), font=font_badge)
    draw.text((qr_x + 24, qr_y + 322), "Instant Smartphone Camera Scan", fill=(148, 163, 184, 255), font=font_small)

    # Save Visiting Card
    img.save("assets/visiting-card.png", "PNG", quality=95)
    img.convert("RGB").save("assets/visiting-card.jpg", "JPEG", quality=92)
    print("Generated assets/visiting-card.png and assets/visiting-card.jpg successfully!")

create_visiting_card()

