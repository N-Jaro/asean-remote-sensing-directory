/**
 * Participant Form Submission & Photo Upload Handler
 */

import { CONFIG } from './config.js';
import { getCountryMeta } from './sheet-sync.js';
import { renderLanguageSwitcher, applyTranslations, t, getCurrentLang } from './i18n.js';

class ProfileSubmission {
  constructor() {
    this.photoBase64 = '';
    this.photoFileName = '';
    this.init();
  }

  init() {
    renderLanguageSwitcher('langSwitcherSubmit');
    applyTranslations();

    window.addEventListener('languageChanged', () => {
      this.populateCountrySelect();
    });

    this.bindPhotoUpload();
    this.bindFormSubmit();
    this.populateCountrySelect();
    this.setupExpertiseChips();
  }

  populateCountrySelect() {
    const select = document.getElementById('nationalitySelect');
    if (!select) return;

    const placeholderText = t('submitSelectCountry') || 'Select your ASEAN country / nationality';
    select.innerHTML = `<option value="" disabled selected>${placeholderText}</option>` +
      CONFIG.countries.map(c => `<option value="${c.name}">${c.flag} ${c.name}</option>`).join('');
  }

  setupExpertiseChips() {
    const container = document.getElementById('expertiseChips');
    const input = document.getElementById('expertiseInput');
    if (!container || !input) return;

    CONFIG.expertiseTags.forEach(tag => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'px-3 py-1 rounded-full text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition';
      chip.innerText = `+ ${tag}`;
      chip.onclick = () => {
        let current = input.value.split(',').map(s => s.trim()).filter(Boolean);
        if (!current.includes(tag)) {
          current.push(tag);
          input.value = current.join(', ');
          chip.className = 'px-3 py-1 rounded-full text-xs font-semibold bg-cyan-600 text-white border border-cyan-700 transition';
        } else {
          current = current.filter(t => t !== tag);
          input.value = current.join(', ');
          chip.className = 'px-3 py-1 rounded-full text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition';
        }
      };
      container.appendChild(chip);
    });
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
          dropzone.classList.add('border-cyan-500', 'bg-cyan-50/50');
        });
      });

      ['dragleave', 'drop'].forEach(event => {
        dropzone.addEventListener(event, (e) => {
          e.preventDefault();
          dropzone.classList.remove('border-cyan-500', 'bg-cyan-50/50');
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
    const form = document.getElementById('participantForm');
    const submitBtn = document.getElementById('btnSubmitForm');
    const successBox = document.getElementById('submissionSuccessBox');

    if (!form || !submitBtn) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btnOriginalText = submitBtn.innerHTML;
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

      const countryName = form.nationality.value;
      const countryMeta = getCountryMeta(countryName);

      const payload = {
        id: `form-p-${Date.now()}`,
        nameEnglish: form.nameEnglish.value.trim(),
        nameNative: form.nameNative.value.trim() || form.nameEnglish.value.trim(),
        nickname: form.nickname.value.trim(),
        nationality: countryName,
        countryCode: countryMeta.code,
        countryFlag: countryMeta.flag,
        affiliation: form.affiliation.value.trim(),
        position: form.position.value.trim(),
        expertise: form.expertise.value.trim(),
        workingOffice: form.workingOffice.value.trim(),
        phone: form.phone.value.trim(),
        email: form.email.value.trim(),
        linkedin: form.linkedin.value.trim(),
        lineId: form.lineId.value.trim(),
        message: form.message.value.trim(),
        photoBase64: this.photoBase64,
        photoFileName: this.photoFileName,
        photoUrl: this.photoBase64 || `https://ui-avatars.com/api/?name=${encodeURIComponent(form.nameEnglish.value)}&background=0b132b&color=38bdf8&size=256`,
        role: "Participant"
      };

      // 1. Try sending to Google Apps Script Webhook if configured
      const scriptUrl = localStorage.getItem('rs_apps_script_url') || CONFIG.googleIntegration.appsScriptUrl;
      let sentToCloud = false;

      if (scriptUrl) {
        try {
          const res = await fetch(scriptUrl, {
            method: 'POST',
            mode: 'no-cors', // Standard Google Apps Script cross-origin submission
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          sentToCloud = true;
        } catch (err) {
          console.warn('Apps Script submission error:', err);
        }
      }

      // 2. Also save to local storage so user sees themselves instantly in the directory
      const localParticipants = JSON.parse(localStorage.getItem('rs_local_participants') || '[]');
      localParticipants.unshift(payload);
      localStorage.setItem('rs_local_participants', JSON.stringify(localParticipants));

      // 3. Show success state
      form.classList.add('hidden');
      if (successBox) {
        successBox.classList.remove('hidden');
        const nameConfirm = document.getElementById('successParticipantName');
        if (nameConfirm) nameConfirm.innerText = payload.nameEnglish;
        const msgDetail = document.getElementById('successDetails');
        if (msgDetail) {
          msgDetail.innerHTML = sentToCloud 
            ? `<span class="text-emerald-700 font-medium">✓ Uploaded photo to Google Drive and saved row to Google Sheets!</span>`
            : `<span class="text-slate-600">Saved to local directory view. (To connect Google Sheets, enter the Apps Script Web App URL in Settings).</span>`;
        }
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = btnOriginalText;
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new ProfileSubmission();
});

