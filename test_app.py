import urllib.request
import json

base_url = "http://localhost:3000"

print("--- 1. Testing Homepage (index.html) ---")
req = urllib.request.Request(f"{base_url}/")
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8')
    print("HTTP Status:", resp.status)
    print("Page length:", len(html))
    
    # Check structure
    assert 'class="card-viewport"' in html
    assert 'class="profile-header-card"' in html
    assert 'class="card-tabs"' in html
    assert 'data-tab="tab-qr"' in html
    assert 'data-tab="tab-about"' in html
    assert 'data-tab="tab-implants"' in html
    assert 'data-tab="tab-treatments"' in html
    assert 'data-tab="tab-videos"' in html
    assert 'data-tab="tab-reviews"' in html
    assert 'class="pillars-grid"' in html
    assert 'Surgical Precision' in html
    assert 'Painless &amp; Gentle' in html
    assert 'Affordable Care' in html
    assert 'class="about-locations-container"' in html
    assert 'Goregaon West' in html
    assert 'Borivali' in html
    assert 'Kandivali' in html
    assert 'Dahisar' in html
    assert 'Vasai' in html
    assert 'Grant Road' in html
    assert 'Pune' in html
    assert 'id="quickConsultationForm"' in html
    assert 'id="treatmentCategoryDropdown"' not in html
    assert 'class="treatments-accordion-stack"' in html
    assert 'class="treatment-dropdown-card"' in html
    assert '<details class="treatment-dropdown-card" id="treat-01">' in html
    assert '<details class="treatment-dropdown-card" id="treat-01" open>' not in html
    assert 'id="headerWebsiteBtn"' in html
    assert 'id="headerLocationBtn"' in html
    assert 'id="headerInstagramBtn"' in html
    assert 'https://www.instagram.com/dentinsureplans/' in html
    assert 'id="headerEmailBtn"' not in html
    assert 'id="btnDownloadVisitingCard"' not in html
    assert 'id="btnDownloadQrCode"' in html
    assert 'id="btnCopyProfileUrl"' in html
    assert 'class="sticky-bottom-bar"' in html
    
    # Check details
    assert 'assets/dentinsure-avatar.png' in html
    assert 'assets/rohanpatani.png' in html
    assert "Dr. Rohan Patani" in html
    assert "World Record Holder" in html
    assert "Surety for Your Pearly Whites" in html
    assert "Co-founder of DentInsure" in html
    assert "CEO" not in html
    assert "Dental Studio & Implant Center" in html
    assert "9967750624" in html
    assert "Save Contact (.vcf)" in html
    assert "Download Visiting Card" in html
    print("All structural & content assertions passed!")

print("\n--- 2. Testing Static Assets ---")
assets_to_test = [
    ("/style.css", "text/css"),
    ("/app.js", "application/javascript"),
    ("/assets/dr-rohan-patani.jpg", "image/jpeg"),
    ("/assets/dentinsure-icon.png", "image/png"),
    ("/assets/dentinsure-avatar.png", "image/png"),
    ("/assets/rohanpatani.png", "image/png"),
    ("/assets/qrcode.min.js", "application/javascript"),
    ("/assets/visiting-card.png", "image/png"),
    ("/assets/Dr_Rohan_Patani.vcf", "text/vcard")
]

for path, expected_mime in assets_to_test:
    req = urllib.request.Request(f"{base_url}{path}")
    with urllib.request.urlopen(req) as resp:
        content_type = resp.headers.get('Content-Type')
        data = resp.read()
        print(f"Asset {path}: Status {resp.status}, Size {len(data)} bytes, Content-Type: {content_type}")
        assert resp.status == 200
        assert expected_mime in content_type

print("\n--- 3. Testing GET /api/reviews ---")
req = urllib.request.Request(f"{base_url}/api/reviews")
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    print("Reviews count:", len(data.get("reviews", [])))
    print("Sample review:", data["reviews"][0]["name"], "-", data["reviews"][0]["treatment"])
    assert len(data["reviews"]) >= 3

print("\nALL KIRAN POPAT FORMAT RESTRUCTURE TESTS PASSED!")
