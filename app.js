/**
 * ============================================================================
 * DR. ROHAN PATANI - DIGITAL VISITING CARD & SECTION-WISE PORTFOLIO ENGINE
 * Inspired by Kiran Popat Architecture & DentInsure Branding
 * "Surety for Your Pearly Whites" • World Record Holder
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. Central Profile Configuration
  // --------------------------------------------------------------------------
  const CONFIG = {
    doctorName: "Dr. Rohan Patani",
    brandTitle: "DentInsure",
    tagline: "Surety for Your Pearly Whites",
    professionalLabel: "Expert Implantologist & Dental Surgeon",
    worldRecord: "World Record Holder for Maximum Dental Implants in a Day",
    phoneDisplay: "+91 9967750624",
    phoneClean: "9967750624",
    phoneInternational: "+919967750624",
    whatsappClean: "919967750624",
    email: "dentinsure@gmail.com",
    
    clinicName: "Dental Studio & Implant Center",
    clinicAddress: "103, Parvati Niwas, S.V. Road, Opp. Croma, Mahesh Nagar, Goregaon West, Mumbai – 400104",
    googleMapsUrl: "https://maps.app.goo.gl/zrPm28sLbQGmcrcA9",
    
    instagramUrl: "https://www.instagram.com/dentinsureplans/",
    facebookUrl: "https://www.facebook.com/dentinsure/",
    productionUrl: "https://dentinsure.in/",
    adminPin: "rohan2026",
    
    getActiveUrl: function() {
      if (window.location.protocol.startsWith('http') && 
          !window.location.hostname.includes('localhost') && 
          !window.location.hostname.includes('127.0.0.1')) {
        return window.location.origin + window.location.pathname;
      }
      return this.productionUrl;
    }
  };

  const activeUrl = CONFIG.getActiveUrl();

  // Populate dynamic profile URL input elements
  const modalCopyUrlInput = document.getElementById('modalCopyUrlInput');
  if (modalCopyUrlInput) modalCopyUrlInput.value = activeUrl;

  // --------------------------------------------------------------------------
  // 2. Section-Wise Tab Navigation (Kiran Popat & Manasi Polyclinic Architecture)
  // --------------------------------------------------------------------------
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  function switchTab(targetId) {
    // Deactivate all tabs and panels
    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));

    // Activate selected tab button
    const matchingBtn = document.querySelector(`.tab-btn[data-tab="${targetId}"]`);
    if (matchingBtn) {
      matchingBtn.classList.add('active');
      // Smoothly center the active tab pill within the horizontal tab container without scrolling the main window
      const cardTabs = document.getElementById('cardTabs');
      if (cardTabs) {
        const containerWidth = cardTabs.offsetWidth;
        const btnLeft = matchingBtn.offsetLeft;
        const btnWidth = matchingBtn.offsetWidth;
        cardTabs.scrollTo({
          left: btnLeft - (containerWidth / 2) + (btnWidth / 2),
          behavior: 'smooth'
        });
      }
    }

    // Activate selected panel
    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }
  }

  // Bind tab click events (NO automatic jumping/scrolling, user retains natural control)
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      switchTab(targetId);
    });
  });

  // Bottom action bar "QR" button jumps to the QR Tab
  const bottomShareBtn = document.getElementById('bottomShareBtn');
  if (bottomShareBtn) {
    bottomShareBtn.addEventListener('click', () => {
      switchTab('tab-qr');
    });
  }


  // --------------------------------------------------------------------------
  // 3. Theme Toggle (Light / Dark Mode with Persistence)
  // --------------------------------------------------------------------------
  const btnThemeToggle = document.getElementById('btnThemeToggle');
  const themeToggleIcon = document.getElementById('themeToggleIcon');
  const themeToggleText = document.getElementById('themeToggleText');

  function initTheme() {
    const savedTheme = localStorage.getItem('dentinsure_theme') || 'light';
    applyTheme(savedTheme);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dentinsure_theme', theme);

    if (theme === 'dark') {
      if (themeToggleIcon) themeToggleIcon.className = 'ri-sun-line';
      if (themeToggleText) themeToggleText.textContent = 'Light Mode';
    } else {
      if (themeToggleIcon) themeToggleIcon.className = 'ri-moon-line';
      if (themeToggleText) themeToggleText.textContent = 'Dark Mode';
    }
  }

  if (btnThemeToggle) {
    btnThemeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  initTheme();

  // --------------------------------------------------------------------------
  // 4. Dynamic QR Code Generation (High Quality, Scannable on iOS & Android)
  // --------------------------------------------------------------------------
  const qrContainer = document.getElementById('qrCodeContainer');

  function generateQRCode() {
    if (typeof QRCode === 'undefined' || !qrContainer) {
      console.warn('QRCode library not ready.');
      return;
    }

    qrContainer.innerHTML = '';
    new QRCode(qrContainer, {
      text: activeUrl,
      width: 196,
      height: 196,
      colorDark: "#091b2e",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  generateQRCode();

  // --------------------------------------------------------------------------
  // 5. Download QR Code Action (Export as Branded High-Resolution PNG)
  // --------------------------------------------------------------------------
  function downloadQRCodeImage() {
    const canvas = qrContainer ? qrContainer.querySelector('canvas') : null;

    if (canvas) {
      const exportCanvas = document.createElement('canvas');
      const exportSize = 600;
      exportCanvas.width = exportSize;
      exportCanvas.height = exportSize + 140;
      const ctx = exportCanvas.getContext('2d');

      // 1. Rich Navy background
      ctx.fillStyle = '#091b2e';
      ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

      // 2. Cyan border
      ctx.strokeStyle = '#01abf9';
      ctx.lineWidth = 6;
      ctx.strokeRect(12, 12, exportCanvas.width - 24, exportCanvas.height - 24);

      // 3. Header text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(CONFIG.doctorName, exportSize / 2, 52);

      ctx.fillStyle = '#fd8732';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText("WORLD RECORD HOLDER • DENTAL IMPLANTS", exportSize / 2, 80);

      ctx.fillStyle = '#72d4ff';
      ctx.font = '15px sans-serif';
      ctx.fillText("Co-founder of DentInsure", exportSize / 2, 104);

      // 4. White card backing for QR
      const qrBoxSize = 410;
      const qrBoxX = (exportSize - qrBoxSize) / 2;
      const qrBoxY = 120;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 16);
      } else {
        ctx.rect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize);
      }
      ctx.fill();

      // 5. Draw QR code
      ctx.drawImage(canvas, qrBoxX + 20, qrBoxY + 20, qrBoxSize - 40, qrBoxSize - 40);

      // 6. Footer branding
      ctx.fillStyle = '#fd8732';
      ctx.font = 'italic 16px serif';
      ctx.fillText(`"${CONFIG.tagline}" • Mob: ${CONFIG.phoneDisplay}`, exportSize / 2, 570);
      ctx.font = 'bold 14px sans-serif';
      ctx.fillStyle = '#01abf9';
      ctx.fillText('Scan with any Smartphone Camera to View Profile & Save Contact', exportSize / 2, 605);

      // Trigger download
      const dataUrl = exportCanvas.toDataURL('image/png');
      triggerDownload(dataUrl, 'Dr_Rohan_Patani_DentInsure_QR.png');
      showToast('QR Code downloaded successfully!');
    } else {
      const img = qrContainer ? qrContainer.querySelector('img') : null;
      if (img && img.src) {
        triggerDownload(img.src, 'Dr_Rohan_Patani_QR.png');
        showToast('QR Code downloaded!');
      } else {
        showToast('Unable to export QR code at this moment.');
      }
    }
  }

  const btnDownloadQrCode = document.getElementById('btnDownloadQrCode');
  if (btnDownloadQrCode) btnDownloadQrCode.addEventListener('click', downloadQRCodeImage);

  // --------------------------------------------------------------------------
  // 6. Download Complete Digital Visiting Card Image (.png / .jpg)
  // --------------------------------------------------------------------------
  function downloadVisitingCardImage(e) {
    if (e && e.preventDefault) e.preventDefault();
    
    // Check hidden canvas
    const visitingCanvas = document.getElementById('visitingCardCanvas');
    if (visitingCanvas) {
      try {
        renderFullVisitingCard(visitingCanvas);
        const dataUrl = visitingCanvas.toDataURL('image/png');
        triggerDownload(dataUrl, 'Dr_Rohan_Patani_Digital_Visiting_Card.png');
        showToast('Visiting Card downloaded successfully!');
        return;
      } catch (err) {
        console.warn('Canvas render error, falling back:', err);
      }
    }

    triggerDownload('assets/visiting-card.png', 'Dr_Rohan_Patani_Digital_Visiting_Card.png');
    showToast('Visiting Card downloaded successfully!');
  }

  function renderFullVisitingCard(canvas) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    // Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, '#091b2e');
    bgGrad.addColorStop(0.5, '#0d2844');
    bgGrad.addColorStop(1, '#05111c');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Accent Lines
    ctx.fillStyle = '#01abf9';
    ctx.fillRect(0, 0, W, 8);
    ctx.fillStyle = '#fd8732';
    ctx.fillRect(0, H - 8, W, 8);

    // Borders
    ctx.strokeStyle = 'rgba(1, 171, 249, 0.3)';
    ctx.lineWidth = 2;
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(20, 20, W - 40, H - 40, 16);
      ctx.stroke();
    }

    // Photo
    const photo = document.getElementById('profilePhoto');
    const leftX = 65;
    const avatarSize = 210;
    const avatarY = 120;

    if (photo && photo.complete) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(leftX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2 + 5, 0, Math.PI * 2);
      ctx.fillStyle = '#01abf9';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(leftX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(photo, leftX, avatarY, avatarSize, avatarSize);
      ctx.restore();

      // World Record Ribbon Badge
      ctx.fillStyle = '#fd8732';
      const badgeY = avatarY + avatarSize + 16;
      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(leftX - 10, badgeY, avatarSize + 20, 36, 8);
        ctx.fill();
      }
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText("WORLD RECORD HOLDER", leftX + avatarSize / 2, badgeY + 23);
    }

    // Doctor info
    const textX = 330;
    ctx.textAlign = 'left';

    ctx.fillStyle = '#01abf9';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText("DentInsure", textX, 70);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 14px sans-serif';
    ctx.fillText("• CO-FOUNDER OF DENTINSURE", textX + 130, 68);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px sans-serif';
    ctx.fillText(CONFIG.doctorName, textX, 135);

    ctx.fillStyle = '#01abf9';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText("Expert Implantologist  |  Dental Surgeon", textX, 172);

    ctx.fillStyle = '#fd8732';
    ctx.font = 'italic 18px serif';
    ctx.fillText(`"${CONFIG.tagline}"`, textX, 205);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(textX, 225);
    ctx.lineTo(textX + 480, 225);
    ctx.stroke();

    let curY = 260;
    const lineGap = 32;

    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText("Phone:", textX, curY);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(CONFIG.phoneDisplay, textX + 70, curY);

    curY += lineGap;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText("Email:", textX, curY);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(CONFIG.email, textX + 70, curY);

    curY += lineGap;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText("Web:", textX, curY);
    ctx.fillStyle = '#01abf9';
    ctx.fillText(CONFIG.productionUrl, textX + 70, curY);

    curY += lineGap;
    ctx.fillStyle = '#94a3b8';
    ctx.fillText("Clinic:", textX, curY);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(CONFIG.clinicName, textX + 70, curY);

    curY += 24;
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText("103, Parvati Niwas, S.V. Rd, Opp Croma, Goregaon (W), Mumbai", textX + 70, curY);

    curY += 35;
    ctx.font = '13px sans-serif';
    ctx.fillStyle = '#72d4ff';
    ctx.fillText("Consulting: Borivali • Kandivali • Dahisar • Vasai • Grant Road • Pune", textX, curY);

    // QR Code Container on Right
    const qrBoxW = 240;
    const qrBoxX = W - qrBoxW - 60;
    const qrBoxY = 130;

    ctx.fillStyle = '#ffffff';
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(qrBoxX, qrBoxY, qrBoxW, 350, 16);
      ctx.fill();
    }

    ctx.strokeStyle = '#01abf9';
    ctx.lineWidth = 2;
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(qrBoxX, qrBoxY, qrBoxW, 350, 16);
      ctx.stroke();
    }

    ctx.textAlign = 'center';
    ctx.fillStyle = '#091b2e';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText("SCAN TO CONNECT", qrBoxX + qrBoxW / 2, qrBoxY + 30);

    ctx.fillStyle = '#64748b';
    ctx.font = '12px sans-serif';
    ctx.fillText("Digital Visiting Card", qrBoxX + qrBoxW / 2, qrBoxY + 50);

    const qrCanvas = qrContainer ? qrContainer.querySelector('canvas') : null;
    if (qrCanvas) {
      ctx.drawImage(qrCanvas, qrBoxX + 20, qrBoxY + 65, 200, 200);
    }

    ctx.fillStyle = '#01abf9';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText("Save Contact • Book Visit", qrBoxX + qrBoxW / 2, qrBoxY + 295);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px sans-serif';
    ctx.fillText("Compatible with iOS & Android", qrBoxX + qrBoxW / 2, qrBoxY + 320);
  }

  // Bind Visiting Card triggers
  const heroDownloadCardBtn = document.getElementById('heroDownloadCardBtn');
  const btnDownloadVisitingCard = document.getElementById('btnDownloadVisitingCard');
  const btnDownloadCardFromContact = document.getElementById('btnDownloadCardFromContact');
  const modalSaveToGallery = document.getElementById('modalSaveToGallery');

  if (heroDownloadCardBtn) heroDownloadCardBtn.addEventListener('click', downloadVisitingCardImage);
  if (btnDownloadVisitingCard) btnDownloadVisitingCard.addEventListener('click', downloadVisitingCardImage);
  if (btnDownloadCardFromContact) btnDownloadCardFromContact.addEventListener('click', downloadVisitingCardImage);
  if (modalSaveToGallery) {
    modalSaveToGallery.addEventListener('click', () => {
      closeShareModalPopup();
      downloadVisitingCardImage();
    });
  }

  // --------------------------------------------------------------------------
  // 7. Save Contact to Phonebook (.vcf vCard 3.0)
  // --------------------------------------------------------------------------
  function downloadVCard() {
    const photoUrl = (activeUrl.endsWith('/') ? activeUrl : activeUrl + '/') + 'assets/dr-rohan-patani.jpg';
    
    const vCardLines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Patani;Rohan;Dr.;;',
      `FN:${CONFIG.doctorName}`,
      `ORG:DentInsure;${CONFIG.clinicName}`,
      `TITLE:Co-founder of DentInsure | Expert Implantologist | Dental Surgeon`,
      `TEL;TYPE=CELL,VOICE,PREF:${CONFIG.phoneInternational}`,
      `EMAIL;TYPE=INTERNET,WORK:${CONFIG.email}`,
      `URL;TYPE=WORK:${activeUrl}`,
      `ADR;TYPE=WORK:;;103, Parvati Niwas, S.V. Road, Opp. Croma, Mahesh Nagar;Goregaon West;Maharashtra;400104;India`,
      `LABEL;TYPE=WORK:${CONFIG.clinicAddress}`,
      `PHOTO;VALUE=URI:${photoUrl}`,
      `X-SOCIALPROFILE;TYPE=instagram:${CONFIG.instagramUrl}`,
      `X-SOCIALPROFILE;TYPE=facebook:${CONFIG.facebookUrl}`,
      `NOTE:World Record Holder – Maximum Number of Dental Implants Done in a Day. ${CONFIG.tagline}. Co-author of 'Influential Entrepreneur'. Co-founder of DentInsure. Consulting in Goregaon, Borivali, Kandivali, Dahisar, Vasai, Grant Road, Mumbai & Pune. Phone: ${CONFIG.phoneDisplay}`,
      'END:VCARD'
    ];

    const vCardContent = vCardLines.join('\r\n');
    const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8;' });
    const blobUrl = URL.createObjectURL(blob);

    triggerDownload(blobUrl, 'Dr_Rohan_Patani.vcf');

    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 2000);

    showToast('Contact file downloaded! Tap to save in your phonebook.');
  }

  // Bind Save Contact triggers
  const heroSaveContactBtn = document.getElementById('heroSaveContactBtn');
  const bottomSaveBtn = document.getElementById('bottomSaveBtn');
  const btnSaveContactVcf = document.getElementById('btnSaveContactVcf');

  if (heroSaveContactBtn) heroSaveContactBtn.addEventListener('click', downloadVCard);
  if (bottomSaveBtn) bottomSaveBtn.addEventListener('click', downloadVCard);
  if (btnSaveContactVcf) btnSaveContactVcf.addEventListener('click', downloadVCard);

  // --------------------------------------------------------------------------
  // 8. Copy Profile Link to Clipboard
  // --------------------------------------------------------------------------
  function copyProfileUrl() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(activeUrl)
        .then(() => {
          showToast('Profile link copied to clipboard!');
        })
        .catch(() => {
          fallbackClipboardCopy(activeUrl);
        });
    } else {
      fallbackClipboardCopy(activeUrl);
    }
  }

  function fallbackClipboardCopy(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    tempInput.style.position = 'fixed';
    tempInput.style.opacity = '0';
    document.body.appendChild(tempInput);
    tempInput.focus();
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast('Profile link copied to clipboard!');
    } catch (err) {
      showToast('Could not copy link. Please copy manually.');
    }
    document.body.removeChild(tempInput);
  }

  const btnCopyProfileUrl = document.getElementById('btnCopyProfileUrl');
  const btnModalCopyLink = document.getElementById('btnModalCopyLink');
  if (btnCopyProfileUrl) btnCopyProfileUrl.addEventListener('click', copyProfileUrl);
  if (btnModalCopyLink) btnModalCopyLink.addEventListener('click', copyProfileUrl);

  // --------------------------------------------------------------------------
  // 9. Share Profile Modal Handlers
  // --------------------------------------------------------------------------
  const shareModal = document.getElementById('shareModal');
  const closeShareModal = document.getElementById('closeShareModal');
  const btnShareModalTrigger = document.getElementById('btnShareModalTrigger');

  function openShareModal() {
    if (shareModal) {
      shareModal.classList.add('open');
      shareModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeShareModalPopup() {
    if (shareModal) {
      shareModal.classList.remove('open');
      shareModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (btnShareModalTrigger) btnShareModalTrigger.addEventListener('click', openShareModal);
  if (closeShareModal) closeShareModal.addEventListener('click', closeShareModalPopup);
  if (shareModal) {
    shareModal.addEventListener('click', (e) => {
      if (e.target === shareModal) closeShareModalPopup();
    });
  }

  // Share Channels
  const modalShareWhatsapp = document.getElementById('modalShareWhatsapp');
  if (modalShareWhatsapp) {
    modalShareWhatsapp.addEventListener('click', () => {
      const msg = encodeURIComponent(
        `*🦷 Dr. Rohan Patani - Expert Implantologist*\n` +
        `*Co-founder of DentInsure*\n\n` +
        `🏆 _World Record Holder for Maximum Dental Implants in a Day_\n` +
        `_"Surety for Your Pearly Whites"_\n\n` +
        `📍 *Clinic:* Dental Studio & Implant Center, Goregaon (W), Mumbai\n` +
        `📞 *Contact:* ${CONFIG.phoneDisplay}\n\n` +
        `👉 *Tap to view Digital Card & Save Contact:*\n${activeUrl}`
      );
      window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
      closeShareModalPopup();
    });
  }

  const modalShareEmail = document.getElementById('modalShareEmail');
  if (modalShareEmail) {
    modalShareEmail.addEventListener('click', () => {
      const subject = encodeURIComponent(`${CONFIG.doctorName} - Expert Implantologist Digital Card`);
      const body = encodeURIComponent(
        `Hi,\n\nPlease find the digital card and dental portfolio for Dr. Rohan Patani (Co-founder of DentInsure):\n\n${activeUrl}\n\nPhone: ${CONFIG.phoneDisplay}\nEmail: ${CONFIG.email}\nClinic: ${CONFIG.clinicAddress}\n"Surety for Your Pearly Whites"`
      );
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
      closeShareModalPopup();
    });
  }

  const modalShareSms = document.getElementById('modalShareSms');
  if (modalShareSms) {
    modalShareSms.addEventListener('click', () => {
      const text = encodeURIComponent(
        `Dr. Rohan Patani - Expert Implantologist & Co-founder DentInsure. View digital card & save contact: ${activeUrl}`
      );
      window.location.href = `sms:?body=${text}`;
      closeShareModalPopup();
    });
  }

  const modalShareNative = document.getElementById('modalShareNative');
  if (modalShareNative) {
    modalShareNative.addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({
          title: CONFIG.doctorName,
          text: `Dr. Rohan Patani - Expert Implantologist: ${activeUrl}`,
          url: activeUrl
        }).catch(() => {});
      } else {
        copyProfileUrl();
      }
      closeShareModalPopup();
    });
  }

  // --------------------------------------------------------------------------
  // 10. Direct WhatsApp Profile Forwarder Form
  // --------------------------------------------------------------------------
  const directWhatsAppShareForm = document.getElementById('directWhatsAppShareForm');
  if (directWhatsAppShareForm) {
    directWhatsAppShareForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('forwardMobileNumber');
      const cleanNum = input.value.replace(/[^0-9]/g, '');

      if (cleanNum.length === 10) {
        const targetNumber = '91' + cleanNum;
        const msg = encodeURIComponent(
          `*🦷 Dr. Rohan Patani - Expert Implantologist*\n` +
          `*Co-founder of DentInsure*\n\n` +
          `🏆 _World Record Holder for Maximum Dental Implants in a Day_\n` +
          `_"Surety for Your Pearly Whites"_\n\n` +
          `📋 *Key Treatments:*\n` +
          `• Dental Implants (Single, Multiple, Full Mouth, All-on-4)\n` +
          `• Painless Root Canal Treatments\n` +
          `• Cosmetic Smile Designing & Teeth Whitening\n` +
          `• Save up to 15-20% with DentInsure Plans\n\n` +
          `📍 *Clinic:* Dental Studio & Implant Center, Goregaon (W), Mumbai\n` +
          `📞 *Contact:* ${CONFIG.phoneDisplay}\n\n` +
          `👉 *View Full Digital Profile & Save Contact:*\n${activeUrl}`
        );
        window.open(`https://api.whatsapp.com/send?phone=${targetNumber}&text=${msg}`, '_blank');
        input.value = '';
        showToast('Opening WhatsApp to send digital card...');
      } else {
        showToast('Please enter a valid 10-digit mobile number.');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 11. Patient Reviews & Testimonials Engine (Verified Reviews & Moderation)
  // --------------------------------------------------------------------------
  const INITIAL_VERIFIED_REVIEWS = [
    {
      id: "rev_1",
      name: "Shobha S.",
      rating: 5,
      treatment: "Dental Implants",
      review: "I have done 3 implants by Dr. Rohan. He explains very nicely, makes comfortable & the procedure was done very smoothly. Very less pain. Thank you very much.",
      date: "2024-03-12",
      verified: true,
      source: "DentInsure Verified Member"
    },
    {
      id: "rev_2",
      name: "Karan S.",
      rating: 5,
      treatment: "Root Canal & Implant",
      review: "I visited Dr Rohan for root canal and implant treatment. He explains everything in detail and give you genuine suggestions. Moreover treatment charges are also very reasonable. He is friendly and co-operative. I would do like to recommend him for all dental treatments.",
      date: "2024-04-05",
      verified: true,
      source: "DentInsure Verified Member"
    },
    {
      id: "rev_3",
      name: "Jay V.",
      rating: 5,
      treatment: "Dental Implants",
      review: "The implant was done very smoothly and the charges are reasonable when you compare it with others. I would highly highly recommend everyone.",
      date: "2024-05-18",
      verified: true,
      source: "DentInsure Verified Member"
    }
  ];

  const reviewsContainer = document.getElementById('reviewsContainer');

  function renderReviews(reviewsList) {
    if (!reviewsContainer) return;
    reviewsContainer.innerHTML = '';

    reviewsList.forEach(rev => {
      const card = document.createElement('div');
      card.className = 'review-card-item';

      const stars = '★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating);

      card.innerHTML = `
        <div class="r-head">
          <h4 class="r-author">${escapeHtml(rev.name)}</h4>
          <span class="r-stars">${stars}</span>
        </div>
        <span class="r-badge">${escapeHtml(rev.treatment)}</span>
        <p class="r-body">"${escapeHtml(rev.review)}"</p>
        <div class="r-footer">
          <span class="r-verified"><i class="ri-checkbox-circle-fill"></i> ${rev.source || 'DentInsure Verified Review'}</span>
          <span>${rev.date}</span>
        </div>
      `;
      reviewsContainer.appendChild(card);
    });
  }

  async function loadApprovedReviews() {
    try {
      const res = await fetch('/api/reviews');
      if (res.ok) {
        const data = await res.json();
        if (data.reviews && data.reviews.length > 0) {
          renderReviews(data.reviews);
          return;
        }
      }
    } catch (e) {}

    const localStored = localStorage.getItem('dentinsure_approved_reviews');
    if (localStored) {
      try {
        const parsed = JSON.parse(localStored);
        if (parsed.length > 0) {
          renderReviews(parsed);
          return;
        }
      } catch (e) {}
    }

    renderReviews(INITIAL_VERIFIED_REVIEWS);
  }

  loadApprovedReviews();

  // Star Rating Selector
  const starButtons = document.querySelectorAll('.star-btn');
  const selectedStarScore = document.getElementById('selectedStarScore');
  const ratingTextLabel = document.getElementById('ratingTextLabel');

  const RATING_DESCRIPTIONS = {
    1: '1.0 - Needs Improvement',
    2: '2.0 - Fair Experience',
    3: '3.0 - Good Service',
    4: '4.0 - Very Good Care',
    5: '5.0 - Excellent Experience'
  };

  starButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const score = parseInt(btn.getAttribute('data-rating'), 10);
      selectedStarScore.value = score;
      ratingTextLabel.textContent = RATING_DESCRIPTIONS[score] || `${score}.0`;

      starButtons.forEach(b => {
        const r = parseInt(b.getAttribute('data-rating'), 10);
        if (r <= score) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
    });
  });

  // Character counter
  const reviewExperienceText = document.getElementById('reviewExperienceText');
  const charCount = document.getElementById('charCount');
  if (reviewExperienceText && charCount) {
    reviewExperienceText.addEventListener('input', () => {
      charCount.textContent = `${reviewExperienceText.value.length} / 1000`;
    });
  }

  // Patient Review Form Submission
  const patientReviewForm = document.getElementById('patientReviewForm');
  let lastReviewSubmissionTime = 0;

  if (patientReviewForm) {
    patientReviewForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const honeypotVal = document.getElementById('reviewHpWebsite')?.value || '';
      if (honeypotVal.trim() !== '') {
        showToast('Review submitted.');
        return;
      }

      const now = Date.now();
      if (now - lastReviewSubmissionTime < 15000) {
        showToast('Please wait a moment before submitting another review.');
        return;
      }

      const name = document.getElementById('reviewPatientName').value.trim();
      const treatment = document.getElementById('reviewTreatmentReceived').value;
      const rating = parseInt(selectedStarScore.value, 10);
      const reviewText = reviewExperienceText.value.trim();

      if (!name || !treatment || !reviewText) {
        showToast('Please fill in all review fields.');
        return;
      }

      const payload = {
        name,
        treatment,
        rating,
        review: reviewText,
        honeypot: honeypotVal
      };

      let submittedToServer = false;
      try {
        const res = await fetch('/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          submittedToServer = true;
          showToast('Thank you! Review submitted to moderation queue.');
        } else {
          showToast(data.error || 'Submission error.');
          return;
        }
      } catch (err) {}

      if (!submittedToServer) {
        const pendingReviews = JSON.parse(localStorage.getItem('dentinsure_pending_reviews') || '[]');
        pendingReviews.push({
          id: 'rev_' + Date.now(),
          name,
          treatment,
          rating,
          review: reviewText,
          date: new Date().toISOString().split('T')[0],
          status: 'pending'
        });
        localStorage.setItem('dentinsure_pending_reviews', JSON.stringify(pendingReviews));
        showToast('Thank you! Review submitted to moderation queue.');
      }

      lastReviewSubmissionTime = Date.now();
      patientReviewForm.reset();
      selectedStarScore.value = 5;
      ratingTextLabel.textContent = RATING_DESCRIPTIONS[5];
      starButtons.forEach(b => b.classList.add('active'));
      if (charCount) charCount.textContent = '0 / 1000';
    });
  }

  // --------------------------------------------------------------------------
  // 12. Clinic Staff Moderation Queue Modal
  // --------------------------------------------------------------------------
  const moderationModal = document.getElementById('moderationModal');
  const closeModerationModal = document.getElementById('closeModerationModal');
  const btnOpenModerationPortal = document.getElementById('btnOpenModerationPortal');
  const modAuthGate = document.getElementById('modAuthGate');
  const modQueuePanel = document.getElementById('modQueuePanel');
  const modAdminPin = document.getElementById('modAdminPin');
  const btnUnlockModeration = document.getElementById('btnUnlockModeration');
  const modPendingList = document.getElementById('modPendingList');
  const modPendingCount = document.getElementById('modPendingCount');
  const btnRefreshModQueue = document.getElementById('btnRefreshModQueue');

  function openModerationModal() {
    if (moderationModal) {
      moderationModal.classList.add('open');
      moderationModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeModerationModalPopup() {
    if (moderationModal) {
      moderationModal.classList.remove('open');
      moderationModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (btnOpenModerationPortal) btnOpenModerationPortal.addEventListener('click', openModerationModal);
  if (closeModerationModal) closeModerationModal.addEventListener('click', closeModerationModalPopup);
  if (moderationModal) {
    moderationModal.addEventListener('click', (e) => {
      if (e.target === moderationModal) closeModerationModalPopup();
    });
  }

  async function loadPendingQueue() {
    let pending = [];
    try {
      const res = await fetch(`/api/admin/reviews?key=${encodeURIComponent(CONFIG.adminPin)}`);
      if (res.ok) {
        const data = await res.json();
        pending = data.pending || [];
      }
    } catch (e) {
      pending = JSON.parse(localStorage.getItem('dentinsure_pending_reviews') || '[]');
    }

    if (modPendingCount) modPendingCount.textContent = pending.length;
    if (!modPendingList) return;
    modPendingList.innerHTML = '';

    if (pending.length === 0) {
      modPendingList.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding: 1.5rem 0; font-size:0.9rem;">No reviews currently awaiting moderation.</p>`;
      return;
    }

    pending.forEach(item => {
      const div = document.createElement('div');
      div.className = 'mod-item';
      div.innerHTML = `
        <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
          <strong>${escapeHtml(item.name)} (${item.rating}★)</strong>
          <span style="font-size:0.78rem; color:var(--text-muted);">${item.treatment} • ${item.date}</span>
        </div>
        <p style="font-size:0.85rem; color:var(--text-secondary); font-style:italic;">"${escapeHtml(item.review)}"</p>
        <div style="display:flex; gap:0.5rem; margin-top:0.75rem;">
          <button type="button" class="btn-loc-action primary btn-approve" style="padding:0.4rem 0.8rem; font-size:0.78rem;" data-id="${item.id}">Approve</button>
          <button type="button" class="btn-loc-action secondary btn-reject" style="padding:0.4rem 0.8rem; font-size:0.78rem;" data-id="${item.id}">Reject</button>
        </div>
      `;
      modPendingList.appendChild(div);
    });

    modPendingList.querySelectorAll('.btn-approve').forEach(b => {
      b.addEventListener('click', () => handleModerationAction(b.getAttribute('data-id'), 'approve'));
    });
    modPendingList.querySelectorAll('.btn-reject').forEach(b => {
      b.addEventListener('click', () => handleModerationAction(b.getAttribute('data-id'), 'reject'));
    });
  }

  async function handleModerationAction(reviewId, action) {
    try {
      const res = await fetch('/api/admin/moderate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: CONFIG.adminPin, id: reviewId, action })
      });
      if (res.ok) {
        showToast(action === 'approve' ? 'Review approved & published!' : 'Review rejected.');
        loadPendingQueue();
        loadApprovedReviews();
        return;
      }
    } catch (e) {}

    const pending = JSON.parse(localStorage.getItem('dentinsure_pending_reviews') || '[]');
    const idx = pending.findIndex(r => r.id === reviewId);
    if (idx !== -1) {
      const [item] = pending.splice(idx, 1);
      if (action === 'approve') {
        const approved = JSON.parse(localStorage.getItem('dentinsure_approved_reviews') || JSON.stringify(INITIAL_VERIFIED_REVIEWS));
        item.verified = true;
        item.source = 'DentInsure Verified Review';
        approved.unshift(item);
        localStorage.setItem('dentinsure_approved_reviews', JSON.stringify(approved));
        renderReviews(approved);
        showToast('Review approved and published!');
      } else {
        showToast('Review rejected.');
      }
      localStorage.setItem('dentinsure_pending_reviews', JSON.stringify(pending));
      loadPendingQueue();
    }
  }

  if (btnUnlockModeration && modAdminPin) {
    btnUnlockModeration.addEventListener('click', () => {
      if (modAdminPin.value.trim() === CONFIG.adminPin) {
        modAuthGate.style.display = 'none';
        modQueuePanel.style.display = 'block';
        loadPendingQueue();
      } else {
        showToast('Invalid clinic security PIN.');
      }
    });
  }

  if (btnRefreshModQueue) {
    btnRefreshModQueue.addEventListener('click', loadPendingQueue);
  }

  // --------------------------------------------------------------------------
  // 13. Video Overview Modal
  // --------------------------------------------------------------------------
  const videoModal = document.getElementById('videoModal');
  const closeVideoModal = document.getElementById('closeVideoModal');
  const videoModalHeading = document.getElementById('videoModalHeading');
  const videoModalText = document.getElementById('videoModalText');
  const videoModalWatchLink = document.getElementById('videoModalWatchLink');
  const videoPreviewTriggers = document.querySelectorAll('.video-preview-trigger');

  function openVideoModal(title, desc, url) {
    if (videoModalHeading) videoModalHeading.textContent = title;
    if (videoModalText) videoModalText.textContent = desc;
    if (videoModalWatchLink) videoModalWatchLink.href = url;

    if (videoModal) {
      videoModal.classList.add('open');
      videoModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeVideoModalPopup() {
    if (videoModal) {
      videoModal.classList.remove('open');
      videoModal.setAttribute('aria-hidden', 'true');
    }
  }

  videoPreviewTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      const desc = btn.getAttribute('data-desc');
      const url = btn.getAttribute('data-url');
      openVideoModal(title, desc, url);
    });
  });

  if (closeVideoModal) closeVideoModal.addEventListener('click', closeVideoModalPopup);
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideoModalPopup();
    });
  }

  // --------------------------------------------------------------------------
  // 14. Fast WhatsApp Consultation Request Builder
  // --------------------------------------------------------------------------
  const quickConsultationForm = document.getElementById('quickConsultationForm');
  if (quickConsultationForm) {
    quickConsultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const patientName = document.getElementById('consultPatientName').value.trim();
      const treatment = document.getElementById('consultTreatment').value;
      const location = document.getElementById('consultLocation').value;
      const message = document.getElementById('consultMessage').value.trim();

      const msg = encodeURIComponent(
        `*🦷 Consultation Request for Dr. Rohan Patani*\n\n` +
        `👤 *Patient Name:* ${patientName}\n` +
        `🦷 *Treatment:* ${treatment}\n` +
        `📍 *Preferred Center:* ${location}\n` +
        (message ? `📝 *Notes/Problem:* ${message}\n\n` : `\n`) +
        `Please let me know available appointment slots. Thank you!`
      );

      window.open(`https://api.whatsapp.com/send?phone=${CONFIG.whatsappClean}&text=${msg}`, '_blank');
      showToast('Opening WhatsApp with appointment request...');
    });
  }

  // --------------------------------------------------------------------------
  // 15. Helper Utilities: Toast & TriggerDownload
  // --------------------------------------------------------------------------
  let toastTimeout;
  function showToast(message) {
    const toast = document.getElementById('toastNotification');
    const toastText = document.getElementById('toastMessage');
    if (!toast || !toastText) return;

    toastText.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  function triggerDownload(url, filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

});
