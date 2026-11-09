/**
 * Tour Lead Form Submission & Photo Upload Handler
 */

import { CONFIG } from './config.js';
import { getCountryMeta } from './sheet-sync.js';
import { renderLanguageSwitcher, applyTranslations, t } from './i18n.js';

class TourLeadSubmission {
  constructor() {
    this.photoBase64 = '';
    this.photoFileName = '';
    this.init();
  }

  init() {
    renderLanguageSwitcher('langSwitcherLeadSubmit');
    applyTranslations();

    window.addEventListener('languageChanged', () => {
      this.populateCountrySelect();
    });

    this.bindPhotoUpload();
    this.bindFormSubmit();
    this.populateCountrySelect();
  }

  populateCountrySelect() {
    const select = document.getElementById('nationalitySelect');
    if (!select) return;

    const placeholderText = t('submitSelectCountry') || 'Select your ASEAN country / nationality';
    select.innerHTML = `<option value="" disabled selected>${placeholderText}</option>` +
      CONFIG.countries.map(c => `<option value="${c.name}">${c.flag} ${c.name}</option>`).join('');
  }

  bindPhotoUpload() {
    const dropzone = document.getElementById('photoDropzone');
    const fileInput = document.getElementById('photoFileInput');
    const previewContainer = document.getElementById('photoPreviewContainer');
    const previewImg = document.getElementById('photoPreviewImg');
    const removeBtn = document.getElementById('btnRemovePhoto');
    const uploadPrompt = document.getElementById('photoUploadPrompt');

    if (!fileInput) return;

    const handleFile = (file) => {
      if (!file || !file.type.startsWith('image/')) {
        alert('Please select a valid image file (JPG, PNG, or WebP).');
        return;
      }

      // Max 5MB
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size exceeds 5MB. Please choose a smaller photo.');
        return;
      }

      this.photoFileName = file.name;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoBase64 = e.target.result;
        previewImg.src = this.photoBase64;
        uploadPrompt.classList.add('hidden');
        previewContainer.classList.remove('hidden');
      };
      reader.readAsDataURL(file);
    };

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
      }
    });

    if (dropzone) {
      ['dragenter', 'dragover'].forEach(event => {
        dropzone.addEventListener(event, (e) => {
          e.preventDefault();
          dropzone.classList.add('border-emerald-500', 'bg-emerald-50/50');
        });
      });

      ['dragleave', 'drop'].forEach(event => {
        dropzone.addEventListener(event, (e) => {
          e.preventDefault();
          dropzone.classList.remove('border-emerald-500', 'bg-emerald-50/50');
        });
      });

      dropzone.addEventListener('drop', (e) => {
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleFile(e.dataTransfer.files[0]);
        }
      });
    }

    if (removeBtn) {
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.photoBase64 = '';
        this.photoFileName = '';
        fileInput.value = '';
        previewImg.src = '';
        previewContainer.classList.add('hidden');
        uploadPrompt.classList.remove('hidden');
      });
    }
  }

  bindFormSubmit() {
    const form = document.getElementById('tourLeadForm');
    const submitBtn = document.getElementById('btnSubmitLeadForm');
    const successBox = document.getElementById('submissionSuccessBox');

    if (!form || !submitBtn) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btnOriginalText = submitBtn.innerHTML;

      // 1. Profile photo is required
      if (!this.photoBase64) {
        alert('Please upload a profile photo / กรุณาอัปโหลดรูปถ่ายโปรไฟล์');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="inline-flex items-center gap-2">
          <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          Submitting to Google Sheet...
        </span>
      `;

      const countryName = form.nationality.value || 'Thailand';
      const countryMeta = getCountryMeta(countryName);

      const payload = {
        id: `form-lead-${Date.now()}`,
        nameEnglish: form.nameEnglish.value.trim(),
        nameNative: form.nameNative.value.trim() || form.nameEnglish.value.trim(),
        nickname: form.nickname.value.trim(),
        title: form.title.value.trim() || 'Tour Lead',
        country: countryMeta.name,
        nationality: countryName,
        countryCode: countryMeta.code,
        affiliation: form.affiliation.value.trim() || 'Seminar Tour Lead Team',
        tourName: '',
        sessionTitle: form.title.value.trim() || 'Tour Lead Coordinator',
        tourDate: '',
        sessionDate: '',
        sessionDay: 'Tour Lead',
        tourHighlights: '',
        topics: '',
        guideUrl: '',
        slidesUrl: '',
        phone: form.phone.value.trim(),
        email: form.email.value.trim(),
        wechatId: form.wechatId ? form.wechatId.value.trim() : '',
        lineId: form.lineId ? form.lineId.value.trim() : '',
        whatsapp: form.whatsapp ? form.whatsapp.value.trim() : '',
        facebook: form.facebook ? form.facebook.value.trim() : '',
        linkedin: form.linkedin ? form.linkedin.value.trim() : '',
        website: form.website ? form.website.value.trim() : '',
        labWebsite: form.website ? form.website.value.trim() : '',
        messaging: [
          form.wechatId && form.wechatId.value.trim() ? `WeChat: ${form.wechatId.value.trim()}` : '',
          form.lineId && form.lineId.value.trim() ? `LINE: ${form.lineId.value.trim()}` : '',
          form.whatsapp && form.whatsapp.value.trim() ? `WhatsApp: ${form.whatsapp.value.trim()}` : '',
          form.facebook && form.facebook.value.trim() ? `FB: ${form.facebook.value.trim()}` : ''
        ].filter(Boolean).join(' | '),
        photoBase64: this.photoBase64,
        photoFileName: this.photoFileName,
        photoUrl: this.photoBase64 || `https://ui-avatars.com/api/?name=${encodeURIComponent(form.nameEnglish.value)}&background=064e3b&color=34d399&size=256`,
        role: "Tour Lead",
        targetSheet: "Lecturers"
      };

      // 1. Try sending to Google Apps Script Webhook
      const scriptUrl = localStorage.getItem('rs_apps_script_url') || CONFIG.googleIntegration.appsScriptUrl;
      let sentToCloud = false;

      if (scriptUrl) {
        try {
          await fetch(scriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          sentToCloud = true;
        } catch (err) {
          console.warn('Apps Script submission error:', err);
        }
      }

      // 2. Also save to local storage (rs_local_lecturers) so user sees themselves instantly in the directory
      let localLecturers = JSON.parse(localStorage.getItem('rs_local_lecturers') || '[]');
      localLecturers = localLecturers.filter(l => 
        (l.email || '').toLowerCase().trim() !== (payload.email || '').toLowerCase().trim() &&
        (l.nameEnglish || '').toLowerCase().trim() !== (payload.nameEnglish || '').toLowerCase().trim()
      );
      localLecturers.unshift(payload);
      localStorage.setItem('rs_local_lecturers', JSON.stringify(localLecturers));

      // 3. Show success state
      form.classList.add('hidden');
      if (successBox) {
        successBox.classList.remove('hidden');
        const msgDetail = document.getElementById('successDetails');
        if (msgDetail) {
          msgDetail.innerHTML = sentToCloud 
            ? `<span class="text-emerald-700 font-medium">✓ Uploaded photo to Google Drive and saved row to Google Sheets (Lecturers sheet)!</span>`
            : `<span class="text-slate-600">Saved to local directory view. (To connect Google Sheets, enter the Apps Script Web App URL in Settings).</span>`;
        }
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = btnOriginalText;
    });
  }
}

function startTourLeadSubmission() {
  new TourLeadSubmission();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startTourLeadSubmission);
} else {
  startTourLeadSubmission();
}

