/**
 * Main Application Logic for ASEAN Remote Sensing Seminar 2026 Directory
 */

import { CONFIG } from './config.js';
import { SAMPLE_PARTICIPANTS, SAMPLE_LECTURERS } from './data.js';
import { fetchLiveParticipants, fetchLiveLecturers, getCountryMeta } from './sheet-sync.js';
import { renderLanguageSwitcher, applyTranslations, t, getCurrentLang } from './i18n.js';

class DirectoryApp {
  constructor() {
    this.participants = [];
    this.lecturers = [];
    this.activeTab = 'participants'; // 'participants' or 'lecturers'
    this.searchQuery = '';
    this.selectedCountry = 'ALL';
    this.selectedExpertise = 'ALL';
    this.sortBy = 'name_asc';
    this.isLiveConnected = false;
    this.selectedPerson = null;

    this.init();
  }

  async init() {
    // Initialize Language Switcher & Translations
    renderLanguageSwitcher('langSwitcherContainer');
    applyTranslations();

    window.addEventListener('languageChanged', () => {
      this.renderCountryFilters();
      this.renderExpertiseFilters();
      this.render();
      this.updateStats();
      this.updateStatusBadge();
    });

    this.bindEvents();
    this.renderCountryFilters();
    this.renderExpertiseFilters();
    await this.loadData();

    // Check URL hash for direct tab linking (e.g. index.html#lecturers)
    if (window.location.hash === '#lecturers') {
      const tabLec = document.getElementById('tabLecturers');
      if (tabLec) tabLec.click();
    } else {
      this.render();
    }
  }

  /**
   * Load data from Live Google Sheet CSV or fallback to SAMPLE data
   */
  async loadData() {
    const statusBadge = document.getElementById('sheetStatusBadge');
    if (statusBadge) {
      statusBadge.innerHTML = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800"><span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Syncing with Google Sheet...</span>`;
    }

    const participantsUrl = CONFIG.googleIntegration.participantsCsvUrl;
    const lecturersUrl = CONFIG.googleIntegration.lecturersCsvUrl;

    let liveP = null;
    let liveL = null;

    if (participantsUrl) {
      liveP = await fetchLiveParticipants(participantsUrl);
    }
    if (lecturersUrl) {
      liveL = await fetchLiveLecturers(lecturersUrl);
    }

    // Merge with any local submissions from localStorage
    const localParticipants = JSON.parse(localStorage.getItem('rs_local_participants') || '[]');
    const localLecturers = JSON.parse(localStorage.getItem('rs_local_lecturers') || '[]');

    if (liveP && liveP.length > 0) {
      this.participants = [...localParticipants, ...liveP];
      this.isLiveConnected = true;
    } else {
      this.participants = [...localParticipants, ...SAMPLE_PARTICIPANTS];
      this.isLiveConnected = false;
    }

    if (liveL && liveL.length > 0) {
      this.lecturers = [...localLecturers, ...liveL];
    } else {
      this.lecturers = [...localLecturers, ...SAMPLE_LECTURERS];
    }

    this.updateStatusBadge();
    this.updateStats();
  }

  updateStatusBadge() {
    const statusBadge = document.getElementById('sheetStatusBadge');
    if (!statusBadge) return;

    if (this.isLiveConnected) {
      statusBadge.innerHTML = `
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-300">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Live Google Sheet Connected
        </span>
      `;
    } else {
      statusBadge.innerHTML = `
        <button id="btnOpenSettingsFromBadge" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition">
          <span class="w-2 h-2 rounded-full bg-slate-400"></span>
          Demo Mode (Connect Google Sheet)
        </button>
      `;
      const btn = document.getElementById('btnOpenSettingsFromBadge');
      if (btn) btn.onclick = () => this.openSettingsModal();
    }
  }

  updateStats() {
    const countEl = document.getElementById('totalParticipantsCount');
    const countryCountEl = document.getElementById('totalCountriesCount');
    const lecCountEl = document.getElementById('totalLecturersCount');

    if (countEl) countEl.innerText = this.participants.length;
    if (lecCountEl) lecCountEl.innerText = this.lecturers.length;

    if (countryCountEl) {
      const uniqueCountries = new Set(this.participants.map(p => p.nationality || p.countryCode));
      countryCountEl.innerText = uniqueCountries.size;
    }
  }

  bindEvents() {
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    // Sort select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.sortBy = e.target.value;
        this.render();
      });
    }

    // Tab buttons
    const tabParticipants = document.getElementById('tabParticipants');
    const tabLecturers = document.getElementById('tabLecturers');

    if (tabParticipants && tabLecturers) {
      tabParticipants.addEventListener('click', () => {
        this.activeTab = 'participants';
        tabParticipants.className = "px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm bg-cyan-600 text-white flex items-center gap-2 transition";
        tabLecturers.className = "px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 flex items-center gap-2 transition";
        document.getElementById('expertiseFilterContainer')?.classList.remove('hidden');
        this.render();
      });

      tabLecturers.addEventListener('click', () => {
        this.activeTab = 'lecturers';
        tabLecturers.className = "px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm bg-cyan-600 text-white flex items-center gap-2 transition";
        tabParticipants.className = "px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 flex items-center gap-2 transition";
        document.getElementById('expertiseFilterContainer')?.classList.add('hidden');
        this.render();
      });
    }

    // Settings Modal
    const btnSettings = document.getElementById('btnOpenSettings');
    if (btnSettings) {
      btnSettings.addEventListener('click', () => this.openSettingsModal());
    }

    const btnCloseSettings = document.getElementById('btnCloseSettings');
    if (btnCloseSettings) {
      btnCloseSettings.addEventListener('click', () => this.closeSettingsModal());
    }

    const formSettings = document.getElementById('settingsForm');
    if (formSettings) {
      formSettings.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveSettings();
      });
    }

    // Add Lecturer Modal
    const btnOpenAddLecturer = document.getElementById('btnOpenAddLecturer');
    if (btnOpenAddLecturer) {
      btnOpenAddLecturer.addEventListener('click', () => this.openAddLecturerModal());
    }

    const btnCloseAddLecturer = document.getElementById('btnCloseAddLecturer');
    if (btnCloseAddLecturer) {
      btnCloseAddLecturer.addEventListener('click', () => this.closeAddLecturerModal());
    }

    const formAddLecturer = document.getElementById('addLecturerForm');
    if (formAddLecturer) {
      formAddLecturer.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleAddLecturerSubmit();
      });
    }

    // Modal Close
    const btnCloseDetail = document.getElementById('btnCloseDetailModal');
    if (btnCloseDetail) {
      btnCloseDetail.addEventListener('click', () => this.closeDetailModal());
    }

    const modalBackdrop = document.getElementById('detailModalBackdrop');
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) this.closeDetailModal();
      });
    }

    // Export CSV
    const btnExport = document.getElementById('btnExportCsv');
    if (btnExport) {
      btnExport.addEventListener('click', () => this.exportCsv());
    }
  }

  renderCountryFilters() {
    const container = document.getElementById('countryFilterButtons');
    if (!container) return;

    let html = `
      <button data-country="ALL" class="country-filter-btn px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition bg-slate-900 text-white shadow-sm">
        🌏 ${t('filterAllCountries')}
      </button>
    `;

    CONFIG.countries.forEach(c => {
      html += `
        <button data-country="${c.code}" class="country-filter-btn px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300">
          <span>${c.flag}</span> <span class="hidden sm:inline">${c.name}</span><span class="sm:hidden">${c.code}</span>
        </button>
      `;
    });

    container.innerHTML = html;

    container.querySelectorAll('.country-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedCountry = btn.dataset.country;
        container.querySelectorAll('.country-filter-btn').forEach(b => {
          b.className = "country-filter-btn px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition bg-white border border-slate-200 text-slate-700 hover:bg-slate-50";
        });
        btn.className = "country-filter-btn px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition bg-slate-900 text-white shadow-sm";
        this.render();
      });
    });
  }

  renderExpertiseFilters() {
    const container = document.getElementById('expertiseFilterPills');
    if (!container) return;

    let html = `
      <button data-expertise="ALL" class="expertise-pill px-2.5 py-1 rounded-md text-xs font-medium transition bg-cyan-100 text-cyan-800 border border-cyan-300">
        ${t('filterAllExpertise')}
      </button>
    `;

    CONFIG.expertiseTags.forEach(tag => {
      html += `
        <button data-expertise="${tag}" class="expertise-pill px-2.5 py-1 rounded-md text-xs font-medium transition bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200">
          ${tag}
        </button>
      `;
    });

    container.innerHTML = html;

    container.querySelectorAll('.expertise-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedExpertise = btn.dataset.expertise;
        container.querySelectorAll('.expertise-pill').forEach(b => {
          b.className = "expertise-pill px-2.5 py-1 rounded-md text-xs font-medium transition bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200";
        });
        btn.className = "expertise-pill px-2.5 py-1 rounded-md text-xs font-semibold transition bg-cyan-600 text-white border border-cyan-700";
        this.render();
      });
    });
  }

  getFilteredData() {
    const dataset = this.activeTab === 'participants' ? this.participants : this.lecturers;

    return dataset.filter(item => {
      // 1. Search Query
      if (this.searchQuery) {
        const q = this.searchQuery;
        const textContent = [
          item.nameEnglish || '',
          item.nameNative || '',
          item.nickname || '',
          item.nationality || '',
          item.country || '',
          item.affiliation || '',
          item.position || '',
          item.title || '',
          item.expertise || '',
          item.topics || '',
          item.workingOffice || '',
          item.message || '',
          item.notes || '',
          item.sessionTitle || ''
        ].join(' ').toLowerCase();

        if (!textContent.includes(q)) return false;
      }

      // 2. Country Filter
      if (this.selectedCountry !== 'ALL') {
        const itemCode = item.countryCode || getCountryMeta(item.nationality || item.country).code;
        if (itemCode !== this.selectedCountry) return false;
      }

      // 3. Expertise Filter (Participants tab only)
      if (this.activeTab === 'participants' && this.selectedExpertise !== 'ALL') {
        const itemExp = (item.expertise || '').toLowerCase();
        const targetExp = this.selectedExpertise.toLowerCase();
        if (!itemExp.includes(targetExp.split('/')[0].trim().toLowerCase())) return false;
      }

      return true;
    }).sort((a, b) => {
      if (this.sortBy === 'name_asc') {
        return (a.nameEnglish || '').localeCompare(b.nameEnglish || '');
      } else if (this.sortBy === 'name_desc') {
        return (b.nameEnglish || '').localeCompare(a.nameEnglish || '');
      } else if (this.sortBy === 'country_asc') {
        return (a.nationality || a.country || '').localeCompare(b.nationality || b.country || '');
      }
      return 0;
    });
  }

  render() {
    const container = document.getElementById('cardsContainer');
    const resultsCountEl = document.getElementById('resultsCount');
    if (!container) return;

    const dataset = this.activeTab === 'participants' ? this.participants : this.lecturers;
    const filtered = this.getFilteredData();
    if (resultsCountEl) {
      resultsCountEl.innerText = `${t('showingText')} ${filtered.length} ${t('ofText')} ${dataset.length} ${t('membersText')}`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <i data-lucide="search-x" class="w-8 h-8"></i>
          </div>
          <h3 class="text-base font-semibold text-slate-800">${t('emptyTitle')}</h3>
          <p class="text-sm text-slate-500 mt-1 max-w-sm mx-auto">${t('emptyDesc')}</p>
          <button onclick="document.getElementById('searchInput').value=''; window.app.searchQuery=''; window.app.selectedCountry='ALL'; window.app.selectedExpertise='ALL'; window.app.render();" class="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition">
            ${t('btnResetFilters')}
          </button>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    if (this.activeTab === 'participants') {
      container.innerHTML = filtered.map(p => this.renderParticipantCard(p)).join('');
    } else {
      container.innerHTML = filtered.map(l => this.renderLecturerCard(l)).join('');
    }

    if (window.lucide) lucide.createIcons();
    this.attachCardEventListeners();
  }

  renderParticipantCard(p) {
    const countryMeta = getCountryMeta(p.nationality);
    const photo = p.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.nameEnglish)}&background=0b132b&color=38bdf8&size=256`;

    return `
      <div class="glass-card rounded-2xl overflow-hidden shadow-sm flex flex-col cursor-pointer border border-slate-200/90 group" data-id="${p.id}" data-type="participant">
        <!-- Top banner & avatar -->
        <div class="relative bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 h-24 p-3 flex justify-between items-start">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md text-white border border-white/20">
            <span>${countryMeta.flag}</span> <span>${countryMeta.name}</span>
          </span>
          ${p.nickname ? `<span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-cyan-400/20 text-cyan-200 border border-cyan-400/30">${t('cardPreferred')} ${p.nickname}</span>` : ''}
        </div>

        <div class="px-5 pt-0 pb-5 flex-1 flex flex-col -mt-12">
          <!-- Photo -->
          <div class="flex items-end justify-between mb-3">
            <div class="w-20 h-20 rounded-2xl avatar-container shadow-md border-2 border-white ring-2 ring-slate-100 flex-shrink-0">
              <img src="${photo}" alt="${p.nameEnglish}" loading="lazy" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(p.nameEnglish)}&background=0b132b&color=38bdf8';"/>
            </div>
            <div class="flex gap-1.5 pb-1">
              ${p.email ? `<a href="mailto:${p.email}" onclick="event.stopPropagation()" title="Send Email" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-cyan-50 hover:text-cyan-600 text-slate-600 flex items-center justify-center transition text-xs"><i data-lucide="mail" class="w-4 h-4"></i></a>` : ''}
              ${p.linkedin ? `<a href="${p.linkedin}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="LinkedIn Profile" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 flex items-center justify-center transition text-xs"><i data-lucide="linkedin" class="w-4 h-4"></i></a>` : ''}
              ${p.lineId ? `<span title="Line: ${p.lineId}" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-green-50 hover:text-green-600 text-slate-600 flex items-center justify-center transition text-xs"><i data-lucide="message-circle" class="w-4 h-4"></i></span>` : ''}
            </div>
          </div>

          <!-- Names -->
          <div class="mb-2">
            <h3 class="font-bold text-slate-900 text-base leading-snug group-hover:text-cyan-600 transition flex items-center gap-1.5">
              ${p.nameEnglish}
            </h3>
            ${p.nameNative && p.nameNative !== p.nameEnglish ? `<p class="text-xs text-slate-500 font-medium">${p.nameNative}</p>` : ''}
          </div>

          <!-- Position & Affiliation -->
          <div class="text-xs text-slate-600 mb-3 space-y-1">
            <p class="font-medium text-slate-800 line-clamp-1 flex items-center gap-1.5">
              <i data-lucide="briefcase" class="w-3.5 h-3.5 text-slate-400 flex-shrink-0"></i>
              ${p.position || 'Specialist'}
            </p>
            <p class="text-slate-500 line-clamp-1 flex items-center gap-1.5">
              <i data-lucide="building-2" class="w-3.5 h-3.5 text-slate-400 flex-shrink-0"></i>
              ${p.affiliation || 'Geospatial Institution'}
            </p>
          </div>

          <!-- Expertise Badges -->
          <div class="mt-auto pt-3 border-t border-slate-100">
            <div class="flex flex-wrap gap-1">
              ${(p.expertise || '').split(',').slice(0, 2).map(tag => `
                <span class="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700">
                  ${tag.trim()}
                </span>
              `).join('')}
              ${(p.expertise || '').split(',').length > 2 ? `<span class="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-500">+${(p.expertise || '').split(',').length - 2}</span>` : ''}
            </div>
          </div>

          <!-- Message snippet if available -->
          ${p.message ? `
            <div class="mt-2.5 p-2 bg-slate-50 rounded-lg text-[11px] text-slate-600 italic line-clamp-2 border border-slate-100 flex items-start gap-1.5">
              <i data-lucide="quote" class="w-3 h-3 text-cyan-500 flex-shrink-0 mt-0.5"></i>
              <span>${p.message}</span>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  renderLecturerCard(l) {
    const countryMeta = getCountryMeta(l.country);
    const photo = l.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(l.nameEnglish)}&background=0b132b&color=38bdf8&size=256`;

    return `
      <div class="glass-card rounded-2xl overflow-hidden shadow-sm flex flex-col cursor-pointer border border-slate-200/90 group" data-id="${l.id}" data-type="lecturer">
        <!-- Session badge top -->
        <div class="relative bg-gradient-to-r from-cyan-900 via-slate-900 to-sky-950 p-4 text-white">
          <div class="flex justify-between items-start gap-2 mb-1.5">
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/20 text-cyan-200 border border-cyan-400/30">
              ${l.sessionDay || 'Seminar Session'}
            </span>
            <span class="text-xs font-medium text-slate-300 flex items-center gap-1">
              <i data-lucide="calendar" class="w-3.5 h-3.5 text-cyan-400"></i> ${l.sessionDate}
            </span>
          </div>
          <h4 class="font-semibold text-sm text-cyan-50 line-clamp-2 leading-tight">
            ${l.sessionTitle}
          </h4>
        </div>

        <div class="p-5 flex-1 flex flex-col">
          <!-- Lecturer profile row -->
          <div class="flex items-center gap-3.5 mb-3">
            <div class="w-14 h-14 rounded-xl avatar-container shadow-sm border border-slate-200 flex-shrink-0">
              <img src="${photo}" alt="${l.nameEnglish}" loading="lazy" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(l.nameEnglish)}&background=0b132b&color=38bdf8';"/>
            </div>
            <div>
              <h3 class="font-bold text-slate-900 text-sm group-hover:text-cyan-600 transition">
                ${l.nameEnglish}
              </h3>
              ${l.nameNative && l.nameNative !== l.nameEnglish ? `<p class="text-xs text-slate-500">${l.nameNative}</p>` : ''}
              <p class="text-xs font-medium text-slate-600 line-clamp-1">${l.title || 'Lecturer'}</p>
            </div>
          </div>

          <!-- Affiliation & Country -->
          <div class="text-xs text-slate-500 mb-3 space-y-1">
            <p class="flex items-center gap-1.5 line-clamp-1">
              <i data-lucide="building-2" class="w-3.5 h-3.5 text-slate-400 flex-shrink-0"></i>
              ${l.affiliation}
            </p>
            <p class="flex items-center gap-1.5">
              <span>${countryMeta.flag}</span> <span>${l.country}</span>
            </p>
          </div>

          <!-- Covered Topics -->
          ${l.topics ? `
            <div class="mt-auto pt-3 border-t border-slate-100">
              <p class="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1">Topics covered:</p>
              <p class="text-xs text-slate-700 line-clamp-2">${l.topics}</p>
            </div>
          ` : ''}

          <!-- Slides button if available -->
          ${l.slidesUrl ? `
            <div class="mt-3">
              <a href="${l.slidesUrl}" target="_blank" rel="noopener" onclick="event.stopPropagation()" class="inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-cyan-50 text-cyan-700 hover:bg-cyan-100 transition border border-cyan-200">
                <i data-lucide="file-text" class="w-3.5 h-3.5"></i> Presentation Slides
              </a>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  attachCardEventListeners() {
    document.querySelectorAll('.glass-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        const type = card.dataset.type;
        const person = type === 'participant' 
          ? this.participants.find(p => p.id === id)
          : this.lecturers.find(l => l.id === id);

        if (person) this.openDetailModal(person, type);
      });
    });
  }

  openDetailModal(item, type) {
    this.selectedPerson = item;
    const modal = document.getElementById('detailModal');
    const content = document.getElementById('detailModalContent');
    if (!modal || !content) return;

    const countryMeta = getCountryMeta(item.nationality || item.country);
    const photo = item.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.nameEnglish)}&background=0b132b&color=38bdf8&size=256`;

    if (type === 'participant') {
      content.innerHTML = `
        <div class="relative bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 p-6 text-white sm:rounded-t-2xl">
          <div class="flex items-start gap-4">
            <div class="w-24 h-24 rounded-2xl avatar-container shadow-xl border-2 border-white/80 ring-4 ring-cyan-500/20 flex-shrink-0">
              <img src="${photo}" alt="${item.nameEnglish}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(item.nameEnglish)}&background=0b132b&color=38bdf8';"/>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-center gap-2 mb-1">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-md">
                  <span>${countryMeta.flag}</span> <span>${countryMeta.name}</span>
                </span>
                ${item.nickname ? `<span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-400/20 text-cyan-200 border border-cyan-400/30">Nickname: ${item.nickname}</span>` : ''}
              </div>
              <h2 class="text-xl font-bold text-white leading-tight">${item.nameEnglish}</h2>
              ${item.nameNative && item.nameNative !== item.nameEnglish ? `<p class="text-sm text-cyan-200 mt-0.5 font-medium">${item.nameNative}</p>` : ''}
              <p class="text-xs text-slate-300 mt-1">${item.position || 'Participant'} • ${item.affiliation}</p>
            </div>
          </div>
        </div>

        <div class="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <!-- Expertise & Specialization -->
          <div>
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <i data-lucide="sparkles" class="w-4 h-4 text-cyan-500"></i> Expertise & Specialization
            </h4>
            <div class="flex flex-wrap gap-1.5">
              ${(item.expertise || 'Remote Sensing & GIS').split(',').map(tag => `
                <span class="px-2.5 py-1 rounded-md text-xs font-medium bg-cyan-50 text-cyan-800 border border-cyan-200">
                  ${tag.trim()}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- Working Office Location -->
          ${item.workingOffice ? `
            <div>
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <i data-lucide="map-pin" class="w-4 h-4 text-emerald-500"></i> Working Office / Work Station
              </h4>
              <p class="text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80 leading-relaxed">
                ${item.workingOffice}
              </p>
            </div>
          ` : ''}

          <!-- Message to other participants -->
          ${item.message ? `
            <div>
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <i data-lucide="message-square" class="w-4 h-4 text-blue-500"></i> Message to Other Participants
              </h4>
              <div class="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 text-slate-700 text-sm italic leading-relaxed">
                "${item.message}"
              </div>
            </div>
          ` : ''}

          <!-- Contact Channels -->
          <div>
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <i data-lucide="contact" class="w-4 h-4 text-purple-500"></i> Contact Information
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              ${item.email ? `
                <a href="mailto:${item.email}" class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/50 transition group">
                  <div class="w-9 h-9 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition">
                    <i data-lucide="mail" class="w-4 h-4"></i>
                  </div>
                  <div class="min-w-0">
                    <p class="text-[11px] font-medium text-slate-400">Email Address</p>
                    <p class="text-xs font-semibold text-slate-800 truncate">${item.email}</p>
                  </div>
                </a>
              ` : ''}

              ${item.phone ? `
                <a href="tel:${item.phone}" class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 transition group">
                  <div class="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition">
                    <i data-lucide="phone" class="w-4 h-4"></i>
                  </div>
                  <div class="min-w-0">
                    <p class="text-[11px] font-medium text-slate-400">Phone / Mobile</p>
                    <p class="text-xs font-semibold text-slate-800 truncate">${item.phone}</p>
                  </div>
                </a>
              ` : ''}

              ${item.linkedin ? `
                <a href="${item.linkedin}" target="_blank" rel="noopener" class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition group">
                  <div class="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition">
                    <i data-lucide="linkedin" class="w-4 h-4"></i>
                  </div>
                  <div class="min-w-0">
                    <p class="text-[11px] font-medium text-slate-400">LinkedIn Profile</p>
                    <p class="text-xs font-semibold text-slate-800 truncate">View Profile</p>
                  </div>
                </a>
              ` : ''}

              ${item.lineId ? `
                <div class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/70">
                  <div class="w-9 h-9 rounded-lg bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0">
                    <i data-lucide="message-circle" class="w-4 h-4"></i>
                  </div>
                  <div class="min-w-0">
                    <p class="text-[11px] font-medium text-slate-400">Line ID / WhatsApp</p>
                    <p class="text-xs font-semibold text-slate-800 truncate">${item.lineId}</p>
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        </div>

        <!-- Footer buttons -->
        <div class="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap gap-2 justify-end sm:rounded-b-2xl">
          <button id="btnDownloadVcard" class="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 flex items-center gap-1.5 transition">
            <i data-lucide="download" class="w-3.5 h-3.5"></i> Save Contact (vCard)
          </button>
          <button id="btnCopyContact" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-1.5 transition">
            <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy Details
          </button>
        </div>
      `;
    } else {
      // Lecturer modal
      content.innerHTML = `
        <div class="relative bg-gradient-to-r from-cyan-950 via-slate-900 to-sky-950 p-6 text-white sm:rounded-t-2xl">
          <div class="flex items-start gap-4">
            <div class="w-24 h-24 rounded-2xl avatar-container shadow-xl border-2 border-white/80 ring-4 ring-cyan-500/20 flex-shrink-0">
              <img src="${photo}" alt="${item.nameEnglish}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(item.nameEnglish)}&background=0b132b&color=38bdf8';"/>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-center gap-2 mb-1">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-200 border border-cyan-400/30">
                  ${item.sessionDay || 'Lecturer'}
                </span>
                <span class="text-xs text-slate-300"><span>${countryMeta.flag}</span> ${item.country}</span>
              </div>
              <h2 class="text-xl font-bold text-white leading-tight">${item.nameEnglish}</h2>
              ${item.nameNative && item.nameNative !== item.nameEnglish ? `<p class="text-sm text-cyan-200 mt-0.5 font-medium">${item.nameNative}</p>` : ''}
              <p class="text-xs text-slate-300 mt-1">${item.title} • ${item.affiliation}</p>
            </div>
          </div>
        </div>

        <div class="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          <!-- Session Details -->
          <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Seminar Session</p>
            <h3 class="text-base font-bold text-slate-900 mb-1">${item.sessionTitle}</h3>
            <p class="text-xs text-cyan-700 font-medium flex items-center gap-1.5">
              <i data-lucide="calendar" class="w-3.5 h-3.5"></i> ${item.sessionDate}
            </p>
          </div>

          <!-- Topics Covered -->
          ${item.topics ? `
            <div>
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Topics & Highlights</h4>
              <p class="text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-200 leading-relaxed">
                ${item.topics}
              </p>
            </div>
          ` : ''}

          <!-- Notes -->
          ${item.notes ? `
            <div>
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Session Notes</h4>
              <p class="text-xs text-slate-600 italic bg-amber-50/60 p-3 rounded-xl border border-amber-200">
                ${item.notes}
              </p>
            </div>
          ` : ''}

          <!-- Presentation Slides & Lab Links -->
          <div class="flex flex-wrap gap-2 pt-2">
            ${item.slidesUrl ? `
              <a href="${item.slidesUrl}" target="_blank" rel="noopener" class="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-700 text-white shadow-sm transition">
                <i data-lucide="file-text" class="w-4 h-4"></i> Download Session Slides
              </a>
            ` : ''}
            ${item.labWebsite ? `
              <a href="${item.labWebsite}" target="_blank" rel="noopener" class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
                <i data-lucide="globe" class="w-4 h-4"></i> Lab / Institution Website
              </a>
            ` : ''}
          </div>

          <!-- Contacts -->
          <div class="border-t border-slate-100 pt-4">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Lecturer Contact</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              ${item.email ? `<p class="flex items-center gap-2 text-slate-700"><i data-lucide="mail" class="w-4 h-4 text-slate-400"></i> ${item.email}</p>` : ''}
              ${item.phone ? `<p class="flex items-center gap-2 text-slate-700"><i data-lucide="phone" class="w-4 h-4 text-slate-400"></i> ${item.phone}</p>` : ''}
              ${item.linkedin ? `<a href="${item.linkedin}" target="_blank" class="flex items-center gap-2 text-blue-600 hover:underline"><i data-lucide="linkedin" class="w-4 h-4 text-blue-500"></i> LinkedIn Profile</a>` : ''}
            </div>
          </div>
        </div>

        <div class="p-4 bg-slate-50 border-t border-slate-200 flex justify-end sm:rounded-b-2xl">
          <button id="btnCopyContact" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-1.5 transition">
            <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy Info
          </button>
        </div>
      `;
    }

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();

    // Bind vCard & Copy
    const vcardBtn = document.getElementById('btnDownloadVcard');
    if (vcardBtn) {
      vcardBtn.onclick = () => this.downloadVCard(item);
    }

    const copyBtn = document.getElementById('btnCopyContact');
    if (copyBtn) {
      copyBtn.onclick = () => {
        const text = `${item.nameEnglish} (${item.nationality || item.country})\n${item.position || item.title} - ${item.affiliation}\nEmail: ${item.email || 'N/A'}\nPhone: ${item.phone || 'N/A'}\nLine: ${item.lineId || 'N/A'}`;
        navigator.clipboard.writeText(text).then(() => {
          copyBtn.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i> Copied!`;
          if (window.lucide) lucide.createIcons();
          setTimeout(() => {
            copyBtn.innerHTML = `<i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy Details`;
            if (window.lucide) lucide.createIcons();
          }, 2000);
        });
      };
    }
  }

  closeDetailModal() {
    const modal = document.getElementById('detailModal');
    if (modal) modal.classList.add('hidden');
  }

  downloadVCard(p) {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${p.nameEnglish}
N:${p.nameEnglish};;;;
ORG:${p.affiliation}
TITLE:${p.position || p.title || 'Participant'}
TEL;TYPE=CELL:${p.phone || ''}
EMAIL;TYPE=INTERNET:${p.email || ''}
NOTE:${p.message || p.expertise || 'Seminar on Remote Sensing Technology for ASEAN Countries 2026'}
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${p.nameEnglish.replace(/\s+/g, '_')}_contact.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  openSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (!modal) return;

    document.getElementById('inputParticipantsCsv').value = CONFIG.googleIntegration.participantsCsvUrl;
    document.getElementById('inputLecturersCsv').value = CONFIG.googleIntegration.lecturersCsvUrl;
    document.getElementById('inputAppsScriptUrl').value = CONFIG.googleIntegration.appsScriptUrl;
    document.getElementById('inputGoogleFormUrl').value = CONFIG.googleIntegration.googleFormUrl;

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  }

  closeSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) modal.classList.add('hidden');
  }

  async saveSettings() {
    const pUrl = document.getElementById('inputParticipantsCsv').value.trim();
    const lUrl = document.getElementById('inputLecturersCsv').value.trim();
    const scriptUrl = document.getElementById('inputAppsScriptUrl').value.trim();
    const formUrl = document.getElementById('inputGoogleFormUrl').value.trim();

    localStorage.setItem('rs_participants_csv_url', pUrl);
    localStorage.setItem('rs_lecturers_csv_url', lUrl);
    localStorage.setItem('rs_apps_script_url', scriptUrl);
    localStorage.setItem('rs_google_form_url', formUrl);

    CONFIG.googleIntegration.participantsCsvUrl = pUrl;
    CONFIG.googleIntegration.lecturersCsvUrl = lUrl;
    CONFIG.googleIntegration.appsScriptUrl = scriptUrl;
    CONFIG.googleIntegration.googleFormUrl = formUrl;

    this.closeSettingsModal();
    await this.loadData();
    this.render();
  }

  openAddLecturerModal() {
    const modal = document.getElementById('addLecturerModal');
    if (modal) {
      modal.classList.remove('hidden');
      if (window.lucide) lucide.createIcons();
    }
  }

  closeAddLecturerModal() {
    const modal = document.getElementById('addLecturerModal');
    if (modal) modal.classList.add('hidden');
  }

  handleAddLecturerSubmit() {
    const form = document.getElementById('addLecturerForm');
    if (!form) return;

    const newLecturer = {
      id: `local-lec-${Date.now()}`,
      nameEnglish: form.lecNameEnglish.value.trim(),
      nameNative: form.lecNameNative.value.trim(),
      title: form.lecTitle.value.trim(),
      affiliation: form.lecAffiliation.value.trim(),
      country: form.lecCountry.value.trim(),
      countryCode: getCountryMeta(form.lecCountry.value).code,
      sessionTitle: form.lecSessionTitle.value.trim(),
      sessionDate: form.lecSessionDate.value.trim(),
      sessionDay: form.lecSessionDay.value.trim() || 'Session',
      topics: form.lecTopics.value.trim(),
      email: form.lecEmail.value.trim(),
      phone: form.lecPhone.value.trim(),
      linkedin: form.lecLinkedin.value.trim(),
      labWebsite: form.lecLabWebsite.value.trim(),
      slidesUrl: form.lecSlidesUrl.value.trim(),
      notes: form.lecNotes.value.trim(),
      photoUrl: form.lecPhotoUrl.value.trim(),
      role: 'Lecturer'
    };

    const localLecturers = JSON.parse(localStorage.getItem('rs_local_lecturers') || '[]');
    localLecturers.unshift(newLecturer);
    localStorage.setItem('rs_local_lecturers', JSON.stringify(localLecturers));

    this.lecturers.unshift(newLecturer);
    form.reset();
    this.closeAddLecturerModal();
    this.updateStats();
    this.render();
  }

  exportCsv() {
    const dataset = this.activeTab === 'participants' ? this.participants : this.lecturers;
    if (dataset.length === 0) return;

    let headers = [];
    let rows = [];

    if (this.activeTab === 'participants') {
      headers = ["Name (English)", "Name (Native)", "Nickname", "Nationality", "Affiliation", "Position", "Expertise", "Working Office", "Phone", "Email", "LinkedIn", "Line ID", "Message"];
      rows = dataset.map(p => [
        `"${p.nameEnglish || ''}"`,
        `"${p.nameNative || ''}"`,
        `"${p.nickname || ''}"`,
        `"${p.nationality || ''}"`,
        `"${p.affiliation || ''}"`,
        `"${p.position || ''}"`,
        `"${p.expertise || ''}"`,
        `"${p.workingOffice || ''}"`,
        `"${p.phone || ''}"`,
        `"${p.email || ''}"`,
        `"${p.linkedin || ''}"`,
        `"${p.lineId || ''}"`,
        `"${(p.message || '').replace(/"/g, '""')}"`
      ]);
    } else {
      headers = ["Lecturer Name", "Native Name", "Title", "Affiliation", "Country", "Session Title", "Session Date", "Key Topics", "Email", "Phone", "LinkedIn", "Slides URL"];
      rows = dataset.map(l => [
        `"${l.nameEnglish || ''}"`,
        `"${l.nameNative || ''}"`,
        `"${l.title || ''}"`,
        `"${l.affiliation || ''}"`,
        `"${l.country || ''}"`,
        `"${l.sessionTitle || ''}"`,
        `"${l.sessionDate || ''}"`,
        `"${(l.topics || '').replace(/"/g, '""')}"`,
        `"${l.email || ''}"`,
        `"${l.phone || ''}"`,
        `"${l.linkedin || ''}"`,
        `"${l.slidesUrl || ''}"`
      ]);
    }

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ASEAN_Remote_Sensing_${this.activeTab}_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  window.app = new DirectoryApp();
});
