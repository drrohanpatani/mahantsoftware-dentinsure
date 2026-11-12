vcard_content = """BEGIN:VCARD
VERSION:3.0
N:Patani;Rohan;Dr.;;
FN:Dr. Rohan Patani
ORG:DentInsure;Dental Studio & Implant Center
TITLE:Co-founder of DentInsure | Expert Implantologist | Dental Surgeon
TEL;TYPE=CELL,VOICE,PREF:+919967750624
EMAIL;TYPE=INTERNET,WORK:dentinsure@gmail.com
URL;TYPE=WORK:https://dentinsure.in/
ADR;TYPE=WORK:;;103, Parvati Niwas, S.V. Road, Opp. Croma, Mahesh Nagar;Goregaon West;Maharashtra;400104;India
LABEL;TYPE=WORK:103, Parvati Niwas, S.V. Road, Opp. Croma, Mahesh Nagar, Goregaon West, Mumbai - 400104
X-SOCIALPROFILE;TYPE=instagram:https://www.instagram.com/dentinsureplans/
X-SOCIALPROFILE;TYPE=facebook:https://www.facebook.com/dentinsure/
NOTE:World Record Holder – Maximum Number of Dental Implants Done in a Day. Surety for Your Pearly Whites. Co-founder of DentInsure. Co-author of 'Influential Entrepreneur'. Consulting in Goregaon, Borivali, Kandivali, Dahisar, Vasai, Grant Road, Mumbai & Pune. Phone: +91 9967750624
END:VCARD
"""

with open("assets/Dr_Rohan_Patani.vcf", "w", encoding="utf-8", newline="\r\n") as f:
    f.write(vcard_content.strip() + "\r\n")

print("Created assets/Dr_Rohan_Patani.vcf successfully!")

