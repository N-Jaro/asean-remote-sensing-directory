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
    this.selectedTags = new Set();
    this.init();
  }

  init() {
    renderLanguageSwitcher('langSwitcherSubmit');
    applyTranslations();

    window.addEventListener('languageChanged', () => {
      this.populateCountrySelect();
      if (this.renderSelectedTags) this.renderSelectedTags();
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
    const chipsContainer = document.getElementById('expertiseChips');
    const selectedContainer = document.getElementById('selectedExpertiseContainer');
    const input = document.getElementById('expertiseInput');
    const customInput = document.getElementById('customTagInput');
    const btnAddCustom = document.getElementById('btnAddCustomTag');

    if (!input) return;

    const renderSelected = () => {
      input.value = Array.from(this.selectedTags).join(', ');

      if (!selectedContainer) return;

      if (this.selectedTags.size === 0) {
        selectedContainer.innerHTML = `
          <span class="text-xs text-slate-400 italic">
            ${t('submitNoTagsSelected') || 'No specializations selected yet. Click suggested topics below or type your own.'}
          </span>
        `;
        return;
      }

      let html = '';
      this.selectedTags.forEach(tag => {
        const safeTag = tag.replace(/"/g, '&quot;');
        html += `
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-600 text-white shadow-xs">
            <span>${safeTag}</span>
            <button type="button" data-tag="${safeTag}" class="btn-remove-tag w-4 h-4 rounded-full flex items-center justify-center hover:bg-white/25 text-white/80 hover:text-white transition cursor-pointer text-sm" title="Remove">&times;</button>
          </span>
        `;
      });
      selectedContainer.innerHTML = html;

      selectedContainer.querySelectorAll('.btn-remove-tag').forEach(btn => {
        btn.addEventListener('click', () => {
          const tag = btn.getAttribute('data-tag');
          this.selectedTags.delete(tag);
          renderSelected();
          renderChips();
        });
      });
    };

    const renderChips = () => {
      if (!chipsContainer) return;
      chipsContainer.innerHTML = '';

      CONFIG.expertiseTags.forEach(tag => {
        const isSelected = this.selectedTags.has(tag);
        const chip = document.createElement('button');
        chip.type = 'button';
        if (isSelected) {
          chip.className = 'px-3 py-1 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-800 border border-cyan-400 transition flex items-center gap-1.5 cursor-pointer';
          chip.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-cyan-700"></i><span>${tag}</span>`;
        } else {
          chip.className = 'px-3 py-1 rounded-full text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition cursor-pointer';
          chip.innerText = `+ ${tag}`;
        }

        chip.onclick = () => {
          if (this.selectedTags.has(tag)) {
            this.selectedTags.delete(tag);
          } else {
            this.selectedTags.add(tag);
          }
          renderSelected();
          renderChips();
        };

        chipsContainer.appendChild(chip);
      });

      if (window.lucide) {
        window.lucide.createIcons();
      }
    };

    const addCustomTag = () => {
      if (!customInput) return;
      const raw = customInput.value.trim();
      if (!raw) return;

      const tags = raw.split(/[,，]/).map(s => s.trim()).filter(Boolean);
      tags.forEach(t => {
        if (t) this.selectedTags.add(t);
      });

      customInput.value = '';
      renderSelected();
      renderChips();
    };

    if (btnAddCustom) {
      btnAddCustom.onclick = (e) => {
        e.preventDefault();
        addCustomTag();
      };
    }

    if (customInput) {
      customInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          addCustomTag();
        }
      });
    }

    this.renderSelectedTags = renderSelected;
    renderSelected();
    renderChips();
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

      if (!form.expertise.value.trim()) {
        alert(t('submitExpertiseHint') || 'Please select or add at least one expertise/specialization.');
        document.getElementById('customTagInput')?.focus();
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
        wechatId: form.wechatId ? form.wechatId.value.trim() : '',
        lineId: form.lineId ? form.lineId.value.trim() : '',
        whatsapp: form.whatsapp ? form.whatsapp.value.trim() : '',
        facebook: form.facebook ? form.facebook.value.trim() : '',
        linkedin: form.linkedin ? form.linkedin.value.trim() : '',
        website: form.website ? form.website.value.trim() : '',
        messaging: [
          form.wechatId && form.wechatId.value.trim() ? `WeChat: ${form.wechatId.value.trim()}` : '',
          form.lineId && form.lineId.value.trim() ? `LINE: ${form.lineId.value.trim()}` : '',
          form.whatsapp && form.whatsapp.value.trim() ? `WhatsApp: ${form.whatsapp.value.trim()}` : '',
          form.facebook && form.facebook.value.trim() ? `FB: ${form.facebook.value.trim()}` : ''
        ].filter(Boolean).join(' | '),
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

      // 2. Also save to local storage so user sees themselves instantly in the directory (deduplicated)
      let localParticipants = JSON.parse(localStorage.getItem('rs_local_participants') || '[]');
      localParticipants = localParticipants.filter(p => 
        (p.email || '').toLowerCase().trim() !== (payload.email || '').toLowerCase().trim() &&
        (p.nameEnglish || '').toLowerCase().trim() !== (payload.nameEnglish || '').toLowerCase().trim()
      );
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

function startSubmission() {
  new ProfileSubmission();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startSubmission);
} else {
  startSubmission();
}

