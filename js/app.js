/**
 * Main Application Logic for ASEAN Remote Sensing Seminar 2026 Directory
 */

import { CONFIG } from './config.js';
import { SAMPLE_PARTICIPANTS, SAMPLE_LECTURERS } from './data.js';
import { fetchLiveParticipants, fetchLiveLecturers, getCountryMeta, getCountryFlagImg } from './sheet-sync.js';
import { renderLanguageSwitcher, applyTranslations, t, getCurrentLang } from './i18n.js';

export const SOCIAL_ICONS = {
  mail: `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  phone: `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  wechat: `<svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M8.5 2C3.8 2 0 5.3 0 9.4c0 2.4 1.3 4.5 3.3 5.9-.2.8-.8 2.4-.9 2.6 0 .2.1.3.3.2 1.2-.7 2.7-1.7 3.3-2.1.8.2 1.6.3 2.5.3.3 0 .7 0 1-.1-.3-.8-.4-1.7-.4-2.6 0-4.4 4.3-8 9.5-8 .3 0 .6 0 1 .1C18.6 4.3 14 2 8.5 2zm-2.8 5.6c.7 0 1.3.6 1.3 1.3s-.6 1.3-1.3 1.3-1.3-.6-1.3-1.3.6-1.3 1.3-1.3zm5.6 0c.7 0 1.3.6 1.3 1.3s-.6 1.3-1.3 1.3-1.3-.6-1.3-1.3.6-1.3 1.3-1.3zm5.7 3.9c-4.4 0-8 3.1-8 6.9 0 3.8 3.6 6.9 8 6.9.7 0 1.4-.1 2.1-.3.5.4 1.7 1.1 2.6 1.6.2.1.3 0 .2-.1-.1-.2-.6-1.4-.7-2.1 1.7-1.1 2.8-2.8 2.8-4.7 0-3.8-3.6-6.9-8-6.9zm-2.6 4.8c-.6 0-1-.5-1-1s.4-1 1-1 1 .5 1 1-.4 1-1 1zm5.2 0c-.6 0-1-.5-1-1s.4-1 1-1 1 .5 1 1-.4 1-1 1z"/></svg>`,
  line: `<svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M22 10.4c0-4.6-4.5-8.4-10-8.4S2 5.8 2 10.4c0 4.1 3.6 7.6 8.5 8.2.3.1.8.2.9.6.1.3.1.8 0 1.2l-.3 1.6c-.1.5-.4 1.8 1.6 1 2-0.8 5.4-3.2 7.4-5.5 1.2-1.4 1.9-2.9 1.9-4.5z"/></svg>`,
  whatsapp: `<svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.586 1.761.884 2.791.884 3.179 0 5.767-2.587 5.767-5.766.001-3.18-2.585-5.77-5.767-5.77zm3.376 8.163c-.144.405-.837.774-1.17.824-.312.045-.694.079-2.007-.465-1.68-.696-2.766-2.42-2.85-2.531-.084-.111-.678-.902-.678-1.72 0-.819.43-1.222.583-1.389.153-.166.333-.208.444-.208.111 0 .222.001.319.005.102.004.238-.039.373.285.144.345.492 1.2.534 1.287.042.087.07.189.014.301-.055.111-.083.18-.166.278-.083.097-.174.218-.249.293-.083.083-.169.173-.073.338.096.165.426.703.914 1.137.627.558 1.155.731 1.32.815.166.083.264.07.362-.042.097-.111.417-.485.528-.652.111-.166.222-.139.374-.083.153.056.97.457 1.137.54.167.083.278.125.319.194.042.07.042.404-.102.809z"/></svg>`,
  facebook: `<svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  linkedin: `<svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>`
};

const iconLg = (svgStr) => svgStr.replace('w-3.5 h-3.5', 'w-4 h-4');

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
    this.loaderDismissed = false;

    this.init();
  }

  async init() {
    // 0. SETUP THEMATIC REMOTE SENSING LOADER
    this.setupThematicLoader();

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

    // 1. APP-LIKE SKELETON LOADER: Display shimmering skeleton cards and animated loading state while syncing
    this.renderSkeletons();

    // 2. PARALLEL LIVE SYNC: Fetch live Google Sheet data (races CSV & Apps Script API in parallel)
    await this.loadData();

    // 3. RENDER CONTENT: Display live interactive filters & directory cards
    this.renderCountryFilters();
    this.renderExpertiseFilters();

    // Check URL hash for direct tab linking (e.g. index.html#lecturers)
    if (window.location.hash === '#lecturers') {
      const tabLec = document.getElementById('tabLecturers');
      if (tabLec) tabLec.click();
    } else {
      this.render();
    }

    // 4. DISMISS THEMATIC FULL-PAGE LOADER
    this.dismissLoader();
  }

  /**
   * Set up and drive the full-page Remote Sensing thematic loading animation
   */
  setupThematicLoader() {
    const loader = document.getElementById('fullPageLoader');
    if (!loader) return;

    const btnSkip = document.getElementById('btnSkipLoader');
    if (btnSkip) {
      btnSkip.onclick = (e) => {
        e.stopPropagation();
        this.dismissLoader();
      };
    }

    loader.onclick = () => this.dismissLoader();

    // Realistic telemetry progress sequence
    const telemetrySteps = [
      { at: 200, pct: 30, text: "Calibrating Earth Observation Sensors (SAR & Optical)..." },
      { at: 600, pct: 60, text: "Acquiring ASEAN Member States & GXIBVC Cloud Telemetry..." },
      { at: 1100, pct: 85, text: "Compiling Directory & Connecting Ground Stations..." }
    ];

    telemetrySteps.forEach(step => {
      setTimeout(() => {
        if (!this.loaderDismissed) {
          this.updateLoader(step.pct, step.text);
        }
      }, step.at);
    });

    // Safety fallback: auto-dismiss after 6 seconds to prevent any blocking
    setTimeout(() => {
      this.dismissLoader();
    }, 6000);
  }

  updateLoader(pct, text) {
    const pctEl = document.getElementById('loaderPercent');
    const barEl = document.getElementById('loaderProgressBar');
    const textEl = document.getElementById('loaderStatusText');

    if (pctEl) pctEl.innerText = `${pct}%`;
    if (barEl) barEl.style.width = `${pct}%`;
    if (textEl && text) textEl.innerText = text;
  }

  dismissLoader() {
    if (this.loaderDismissed) return;
    this.loaderDismissed = true;

    this.updateLoader(100, "Earth Observation Directory Ready!");
    const loader = document.getElementById('fullPageLoader');
    if (!loader) return;

    setTimeout(() => {
      loader.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => {
        if (loader.parentNode) loader.parentNode.removeChild(loader);
      }, 700);
    }, 350);
  }

  /**
   * Render app-like shimmering skeleton cards while Google Sheet is syncing
   */
  renderSkeletons() {
    const container = document.getElementById('cardsContainer');
    const resultsCount = document.getElementById('resultsCount');
    const statusBadge = document.getElementById('sheetStatusBadge');
    const topBar = document.getElementById('topAppLoadingBar');

    if (topBar) {
      topBar.classList.remove('hidden', 'opacity-0');
    }

    if (statusBadge) {
      statusBadge.innerHTML = `
        <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800 shadow-sm">
          <svg class="animate-spin h-3.5 w-3.5 text-cyan-400" viewBox="0 0 24 24" fill="none">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <span>Syncing Google Sheet...</span>
        </span>
      `;
    }

    if (resultsCount) {
      resultsCount.innerHTML = `
        <div class="inline-flex items-center gap-2 text-slate-500 font-medium">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span>Connecting & syncing live seminar directory from Google Sheet...</span>
        </div>
      `;
    }

    if (!container) return;

    let skeletonsHtml = '';
    for (let i = 0; i < 8; i++) {
      skeletonsHtml += `
        <div class="glass-card rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-sm flex flex-col animate-pulse">
          <div class="aspect-[4/3] w-full bg-slate-200 relative">
            <div class="absolute top-3 left-3 w-24 h-6 rounded-full bg-slate-300"></div>
            <div class="absolute top-3 right-3 w-20 h-6 rounded-full bg-slate-300"></div>
          </div>
          <div class="p-5 flex-1 flex flex-col space-y-3">
            <div class="space-y-1.5">
              <div class="h-5 w-3/4 bg-slate-300 rounded-md"></div>
              <div class="h-3.5 w-1/2 bg-slate-200 rounded-md"></div>
            </div>
            <div class="space-y-1.5 pt-1">
              <div class="h-4 w-1/3 bg-slate-200 rounded"></div>
              <div class="h-3.5 w-4/5 bg-slate-200 rounded"></div>
            </div>
            <div class="space-y-2 pt-2 border-t border-slate-100">
              <div class="h-3.5 w-3/4 bg-slate-200 rounded"></div>
              <div class="h-3.5 w-1/2 bg-slate-200 rounded"></div>
            </div>
            <div class="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 mt-auto">
              <div class="h-5 w-16 bg-slate-200 rounded-md"></div>
              <div class="h-5 w-20 bg-slate-200 rounded-md"></div>
              <div class="h-5 w-24 bg-slate-200 rounded-md"></div>
            </div>
          </div>
        </div>
      `;
    }

    container.innerHTML = skeletonsHtml;
  }

  /**
   * Fast synchronous initial data loader from localStorage cache / local submissions / samples
   */
  loadInitialData() {
    const dedupe = (list) => {
      const seen = new Set();
      return list.filter(item => {
        const emailKey = (item.email || '').toLowerCase().trim();
        const nameKey = (item.nameEnglish || '').toLowerCase().trim();
        const key = emailKey || nameKey;
        if (!key) return true;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    };

    let localParticipants = JSON.parse(localStorage.getItem('rs_local_participants') || '[]');
    let localLecturers = JSON.parse(localStorage.getItem('rs_local_lecturers') || '[]');
    let cachedParticipants = JSON.parse(localStorage.getItem('rs_cached_participants') || 'null');
    let cachedLecturers = JSON.parse(localStorage.getItem('rs_cached_lecturers') || 'null');

    const hasConfiguredUrls = !!(CONFIG.googleIntegration.participantsCsvUrl || CONFIG.googleIntegration.appsScriptUrl);

    if (cachedParticipants && cachedParticipants.length > 0) {
      this.participants = dedupe([...localParticipants, ...cachedParticipants]);
      this.isLiveConnected = true;
    } else {
      if (localParticipants.length > 0) {
        this.participants = dedupe(localParticipants);
      } else {
        // If not configured, show sample data; if configured, wait for live sync
        this.participants = hasConfiguredUrls ? [] : [...SAMPLE_PARTICIPANTS];
      }
      this.isLiveConnected = hasConfiguredUrls;
    }

    if (cachedLecturers && cachedLecturers.length > 0) {
      this.lecturers = dedupe([...localLecturers, ...cachedLecturers]);
    } else {
      if (localLecturers.length > 0) {
        this.lecturers = dedupe(localLecturers);
      } else {
        this.lecturers = hasConfiguredUrls ? [] : [...SAMPLE_LECTURERS];
      }
    }

    this.updateStats();
    this.updateStatusBadge(hasConfiguredUrls && (!cachedParticipants || cachedParticipants.length === 0));
  }

  /**
   * Load data from Live Google Sheet CSV or Apps Script API in parallel with caching
   */
  async loadData() {
    this.updateStatusBadge(true);
    const topBar = document.getElementById('topAppLoadingBar');
    if (topBar) {
      topBar.classList.remove('hidden', 'opacity-0');
    }

    const participantsUrl = CONFIG.googleIntegration.participantsCsvUrl;
    const lecturersUrl = CONFIG.googleIntegration.lecturersCsvUrl;
    const appsScriptUrl = CONFIG.googleIntegration.appsScriptUrl;

    // Fetch both Google Sheet sources in PARALLEL with dual-source fallback (CSV + Web App API)
    let liveP = null;
    let liveL = null;

    try {
      const [resP, resL] = await Promise.all([
        fetchLiveParticipants(participantsUrl, appsScriptUrl),
        fetchLiveLecturers(lecturersUrl, appsScriptUrl)
      ]);
      liveP = resP;
      liveL = resL;
    } catch (err) {
      console.warn("Parallel sheet fetch error:", err);
    }

    // Load local submissions from localStorage
    let localParticipants = JSON.parse(localStorage.getItem('rs_local_participants') || '[]');
    let localLecturers = JSON.parse(localStorage.getItem('rs_local_lecturers') || '[]');

    // Deduplication helper (by email or English name)
    const dedupe = (list) => {
      const seen = new Set();
      return list.filter(item => {
        const emailKey = (item.email || '').toLowerCase().trim();
        const nameKey = (item.nameEnglish || '').toLowerCase().trim();
        const key = emailKey || nameKey;
        if (!key) return true;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    };

    if (liveP && liveP.length > 0) {
      // Save fresh data into localStorage cache for instant loading next time
      try {
        localStorage.setItem('rs_cached_participants', JSON.stringify(liveP));
      } catch (e) {
        console.warn('Could not cache participants:', e);
      }

      // Prune local submissions once they have synced into the live Google Sheet
      const liveEmails = new Set(liveP.map(p => (p.email || '').toLowerCase().trim()).filter(Boolean));
      const liveNames = new Set(liveP.map(p => (p.nameEnglish || '').toLowerCase().trim()).filter(Boolean));
      localParticipants = localParticipants.filter(p => {
        const email = (p.email || '').toLowerCase().trim();
        const name = (p.nameEnglish || '').toLowerCase().trim();
        return !(email && liveEmails.has(email)) && !(name && liveNames.has(name));
      });
      localStorage.setItem('rs_local_participants', JSON.stringify(localParticipants));

      this.participants = dedupe([...localParticipants, ...liveP]);
      this.isLiveConnected = true;
    } else if (!this.participants || this.participants.length === 0) {
      this.participants = dedupe([...localParticipants, ...SAMPLE_PARTICIPANTS]);
      this.isLiveConnected = false;
    }

    if (liveL && liveL.length > 0) {
      // Save fresh data into localStorage cache
      try {
        localStorage.setItem('rs_cached_lecturers', JSON.stringify(liveL));
      } catch (e) {
        console.warn('Could not cache lecturers:', e);
      }

      const liveEmails = new Set(liveL.map(l => (l.email || '').toLowerCase().trim()).filter(Boolean));
      const liveNames = new Set(liveL.map(l => (l.nameEnglish || '').toLowerCase().trim()).filter(Boolean));
      localLecturers = localLecturers.filter(l => {
        const email = (l.email || '').toLowerCase().trim();
        const name = (l.nameEnglish || '').toLowerCase().trim();
        return !(email && liveEmails.has(email)) && !(name && liveNames.has(name));
      });
      localStorage.setItem('rs_local_lecturers', JSON.stringify(localLecturers));

      this.lecturers = dedupe([...localLecturers, ...liveL]);
    } else if (!this.lecturers || this.lecturers.length === 0) {
      this.lecturers = dedupe([...localLecturers, ...SAMPLE_LECTURERS]);
    }

    this.updateStatusBadge(false);
    this.updateStats();

    if (topBar) {
      topBar.classList.add('opacity-0');
      setTimeout(() => topBar.classList.add('hidden'), 500);
    }
  }

  updateStatusBadge(syncing = false) {
    const statusBadge = document.getElementById('sheetStatusBadge');
    if (!statusBadge) return;

    if (syncing) {
      statusBadge.innerHTML = `
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          <span>Syncing with Google Sheet...</span>
        </span>
      `;
      return;
    }

    if (this.isLiveConnected) {
      statusBadge.innerHTML = `
        <button id="btnRefreshSync" title="Connected to Google Sheet. Click to refresh." class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300 transition cursor-pointer">
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Live Google Sheet Connected</span>
          <i data-lucide="refresh-cw" class="w-3 h-3 text-emerald-700 ml-0.5"></i>
        </button>
      `;
      const btnRefresh = document.getElementById('btnRefreshSync');
      if (btnRefresh) {
        btnRefresh.onclick = async () => {
          btnRefresh.disabled = true;
          await this.loadData();
          this.render();
          btnRefresh.disabled = false;
        };
      }
      if (window.lucide) lucide.createIcons();
    } else {
      statusBadge.innerHTML = `
        <button id="btnRetrySync" title="Using cached directory. Click to retry connecting to Google Sheet." class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition cursor-pointer">
          <span class="w-2 h-2 rounded-full bg-amber-400"></span>
          <span>Cached • Click to Retry Sync</span>
          <i data-lucide="refresh-cw" class="w-3 h-3 text-slate-600 ml-0.5"></i>
        </button>
      `;
      const btnRetry = document.getElementById('btnRetrySync');
      if (btnRetry) {
        btnRetry.onclick = async () => {
          btnRetry.disabled = true;
          await this.loadData();
          this.render();
          btnRetry.disabled = false;
        };
      }
      if (window.lucide) lucide.createIcons();
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
        if (window.location.hash) history.replaceState(null, null, window.location.pathname + window.location.search);
        tabParticipants.className = "px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm bg-cyan-600 text-white flex items-center gap-2 transition";
        tabLecturers.className = "px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 flex items-center gap-2 transition";
        document.getElementById('expertiseFilterContainer')?.classList.remove('hidden');
        this.render();
      });

      tabLecturers.addEventListener('click', () => {
        this.activeTab = 'lecturers';
        history.replaceState(null, null, '#lecturers');
        tabLecturers.className = "px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm bg-cyan-600 text-white flex items-center gap-2 transition";
        tabParticipants.className = "px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 flex items-center gap-2 transition";
        document.getElementById('expertiseFilterContainer')?.classList.add('hidden');
        this.render();
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

    const baseClass = "country-filter-btn flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition cursor-pointer";
    const activeClass = `${baseClass} font-semibold bg-slate-900 text-white shadow-sm border border-slate-900`;
    const inactiveClass = `${baseClass} font-medium bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300`;

    let html = `
      <button data-country="ALL" class="${this.selectedCountry === 'ALL' ? activeClass : inactiveClass}">
        <span class="text-sm">🌏</span> <span>${t('filterAllCountries')}</span>
      </button>
    `;

    CONFIG.countries.forEach(c => {
      const isSelected = this.selectedCountry === c.code;
      const flagImg = getCountryFlagImg(c.code, c.flag, 'w-4.5 h-3 object-cover rounded-[2px] shadow-xs inline-block flex-shrink-0');
      html += `
        <button data-country="${c.code}" class="${isSelected ? activeClass : inactiveClass}">
          ${flagImg} <span>${c.name}</span>
        </button>
      `;
    });

    container.innerHTML = html;

    container.querySelectorAll('.country-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedCountry = btn.dataset.country;
        container.querySelectorAll('.country-filter-btn').forEach(b => {
          b.className = inactiveClass;
        });
        btn.className = activeClass;
        this.render();
      });
    });
  }

  renderExpertiseFilters() {
    const container = document.getElementById('expertiseFilterPills');
    if (!container) return;

    // Harvest unique tags from preset CONFIG plus all loaded participant profiles
    const tagSet = new Set(CONFIG.expertiseTags || []);
    if (this.participants && this.participants.length > 0) {
      this.participants.forEach(p => {
        if (!p.expertise) return;
        const tags = Array.isArray(p.expertise)
          ? p.expertise
          : p.expertise.split(/[,，]/).map(s => s.trim()).filter(Boolean);
        tags.forEach(t => {
          if (t) tagSet.add(t);
        });
      });
    }

    const allTags = Array.from(tagSet);
    const isAllSelected = !this.selectedExpertise || this.selectedExpertise === 'ALL';

    let html = `
      <button data-expertise="ALL" class="expertise-pill px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer ${isAllSelected ? 'bg-cyan-600 text-white border border-cyan-700 font-semibold' : 'bg-cyan-100 text-cyan-800 border border-cyan-300 hover:bg-cyan-200'}">
        ${t('filterAllExpertise')}
      </button>
    `;

    allTags.forEach(tag => {
      const isSelected = this.selectedExpertise === tag;
      const safeTag = tag.replace(/"/g, '&quot;');
      html += `
        <button data-expertise="${safeTag}" class="expertise-pill px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer ${isSelected ? 'bg-cyan-600 text-white border border-cyan-700 font-semibold' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'}">
          ${safeTag}
        </button>
      `;
    });

    container.innerHTML = html;

    container.querySelectorAll('.expertise-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedExpertise = btn.dataset.expertise;
        container.querySelectorAll('.expertise-pill').forEach(b => {
          b.className = "expertise-pill px-2.5 py-1 rounded-md text-xs font-medium transition bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 cursor-pointer";
        });
        btn.className = "expertise-pill px-2.5 py-1 rounded-md text-xs font-semibold transition bg-cyan-600 text-white border border-cyan-700 cursor-pointer";
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
        const firstSegment = targetExp.split('/')[0].trim();
        const matches = itemExp.includes(targetExp) || (firstSegment && itemExp.includes(firstSegment));
        if (!matches) return false;
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
    const photo = p.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.nameEnglish)}&background=0b132b&color=38bdf8&size=512`;

    return `
      <div class="glass-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer border border-slate-200/90 group bg-white" data-id="${p.id}" data-type="participant">
        <!-- Hero Photo at Top with Badges -->
        <div class="relative w-full aspect-[4/3] overflow-hidden bg-slate-100 flex-shrink-0">
          <img src="${photo}" alt="${p.nameEnglish}" loading="lazy" class="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(p.nameEnglish)}&background=0b132b&color=38bdf8';"/>
          
          <!-- Subtle Top & Bottom Gradient Overlay for contrast -->
          <div class="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none"></div>
          <div class="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

          <!-- Top-Left Country Badge -->
          <div class="absolute top-3 left-3 z-10">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-900/80 backdrop-blur-md text-white border border-white/20 shadow-sm">
              ${countryMeta.flagHtml} <span class="tracking-wide">${countryMeta.name}</span>
            </span>
          </div>

          <!-- Top-Right Nickname Badge -->
          ${p.nickname ? `
            <div class="absolute top-3 right-3 z-10">
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-600/90 backdrop-blur-md text-white border border-cyan-300/40 shadow-sm">
                <span class="opacity-90 font-medium text-[10px]">${t('cardPreferred') || 'Nickname:'}</span> ${p.nickname}
              </span>
            </div>
          ` : ''}
        </div>

        <!-- Card Body -->
        <div class="p-5 flex-1 flex flex-col justify-between space-y-3.5 bg-white">
          <!-- Name Section -->
          <div>
            <h3 class="font-bold text-slate-900 text-lg leading-snug group-hover:text-cyan-600 transition flex items-baseline gap-1.5 flex-wrap">
              <span>${p.nameEnglish}</span>
              ${p.nickname ? `<span class="text-cyan-600 font-semibold text-base">(${p.nickname})</span>` : ''}
            </h3>
            ${p.nameNative && p.nameNative !== p.nameEnglish ? `<p class="text-xs text-slate-500 font-medium mt-0.5">${p.nameNative}</p>` : ''}
          </div>

          <!-- Role / Position & Affiliation -->
          <div class="space-y-1.5 text-xs">
            <div class="flex items-center justify-between gap-2">
              <span class="inline-flex items-center gap-1.5 font-bold text-rose-700 bg-rose-50 border border-rose-200/80 px-2.5 py-1 rounded-md text-xs">
                <i data-lucide="briefcase" class="w-3.5 h-3.5 text-rose-500 flex-shrink-0"></i>
                <span class="line-clamp-1">${p.position || 'Participant / Specialist'}</span>
              </span>
            </div>
            <p class="text-slate-600 line-clamp-1 flex items-center gap-1.5 pt-0.5" title="${p.affiliation || ''}">
              <i data-lucide="building-2" class="w-3.5 h-3.5 text-slate-400 flex-shrink-0"></i>
              <span class="line-clamp-1">${p.affiliation || 'Geospatial Institution'}</span>
            </p>
          </div>

          <!-- Contact Channels (Email, Phone, Messaging Shortcuts) -->
          <div class="space-y-1.5 pt-2.5 border-t border-slate-100 text-xs">
            ${p.email ? `
              <a href="mailto:${p.email}" onclick="event.stopPropagation()" class="flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition group/mail">
                <span class="text-slate-400 group-hover/mail:text-cyan-600 flex-shrink-0">${SOCIAL_ICONS.mail}</span>
                <span class="truncate text-xs">${p.email}</span>
              </a>
            ` : ''}

            ${p.phone ? `
              <a href="tel:${p.phone}" onclick="event.stopPropagation()" class="flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition group/phone">
                <span class="text-slate-400 group-hover/phone:text-cyan-600 flex-shrink-0">${SOCIAL_ICONS.phone}</span>
                <span class="truncate text-xs">${p.phone}</span>
              </a>
            ` : ''}

            ${(p.wechatId || p.lineId || p.whatsapp || p.facebook || p.linkedin) ? `
              <div class="flex flex-wrap items-center gap-1.5 pt-1">
                ${p.wechatId ? `
                  <button type="button" onclick="event.stopPropagation(); navigator.clipboard.writeText('${p.wechatId}'); alert('Copied WeChat ID: ${p.wechatId}');" title="WeChat ID: ${p.wechatId} (Click to copy)" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition cursor-pointer">
                    <span class="text-emerald-600 flex-shrink-0">${SOCIAL_ICONS.wechat}</span> <span>${p.wechatId}</span>
                  </button>
                ` : ''}
                ${p.lineId ? `
                  <a href="https://line.me/R/ti/p/~${p.lineId}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="LINE: ${p.lineId}" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-green-50 text-[#06c755] hover:bg-green-100 border border-green-200 transition">
                    <span class="text-[#06c755] flex-shrink-0">${SOCIAL_ICONS.line}</span> <span>LINE</span>
                  </a>
                ` : ''}
                ${p.whatsapp ? `
                  <a href="https://wa.me/${p.whatsapp.replace(/[^0-9]/g, '')}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="WhatsApp: ${p.whatsapp}" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-teal-50 text-[#25d366] hover:bg-teal-100 border border-teal-200 transition">
                    <span class="text-[#25d366] flex-shrink-0">${SOCIAL_ICONS.whatsapp}</span> <span>WhatsApp</span>
                  </a>
                ` : ''}
                ${p.facebook ? `
                  <a href="${p.facebook.startsWith('http') ? p.facebook : 'https://facebook.com/' + p.facebook}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="Facebook Profile" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-[#1877f2] hover:bg-blue-100 border border-blue-200 transition">
                    <span class="text-[#1877f2] flex-shrink-0">${SOCIAL_ICONS.facebook}</span> <span>FB</span>
                  </a>
                ` : ''}
                ${p.linkedin ? `
                  <a href="${p.linkedin}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="LinkedIn Profile" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-sky-50 text-[#0077b5] hover:bg-sky-100 border border-sky-200 transition">
                    <span class="text-[#0077b5] flex-shrink-0">${SOCIAL_ICONS.linkedin}</span> <span>LinkedIn</span>
                  </a>
                ` : ''}
              </div>
            ` : ''}
          </div>

          <!-- Areas of Interest / Specialization ("สาขาวิจัยที่สนใจ") -->
          ${p.expertise ? `
            <div class="pt-2.5 border-t border-slate-100 mt-auto">
              <p class="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                <i data-lucide="tag" class="w-3 h-3 text-slate-400"></i> ${t('cardExpertise') || 'Research Areas & Interests'}
              </p>
              <div class="flex flex-wrap gap-1.5">
                ${(Array.isArray(p.expertise) ? p.expertise : p.expertise.split(/[,，]/)).slice(0, 3).map(tag => `
                  <span class="inline-block px-2.5 py-1 rounded-md text-[11px] font-medium bg-cyan-50 text-cyan-800 border border-cyan-200/80">
                    ${tag.trim()}
                  </span>
                `).join('')}
                ${(Array.isArray(p.expertise) ? p.expertise : p.expertise.split(/[,，]/)).length > 3 ? `
                  <span class="px-2 py-1 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                    +${(Array.isArray(p.expertise) ? p.expertise : p.expertise.split(/[,，]/)).length - 3}
                  </span>
                ` : ''}
              </div>
            </div>
          ` : ''}

          <!-- Message snippet if available -->
          ${p.message ? `
            <div class="p-2.5 bg-slate-50 rounded-xl text-[11px] text-slate-600 italic line-clamp-2 border border-slate-100 flex items-start gap-1.5">
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
    const photo = l.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(l.nameEnglish)}&background=0b132b&color=38bdf8&size=512`;
    const isTourLead = l.role === 'Tour Lead' ||
      (l.title && l.title.toLowerCase().includes('tour lead')) ||
      (l.title && l.title.includes('ผู้นำทัศนศึกษา')) ||
      (l.sessionTitle && (l.sessionTitle.toLowerCase().includes('tour') || l.sessionTitle.toLowerCase().includes('field trip') || l.sessionTitle.toLowerCase().includes('excursion')));

    const roleBadgeClass = isTourLead
      ? 'bg-emerald-600/90 text-white border-emerald-400/40'
      : 'bg-cyan-600/90 text-white border-cyan-400/40';

    const roleBadgeText = isTourLead
      ? `🚌 ${t('badgeTourLead') || 'Tour Lead'}`
      : `🎓 ${l.sessionDay || t('badgeLecturer') || 'Lecturer'}`;

    const linkButtonClass = isTourLead
      ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border-emerald-200'
      : 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100 border-cyan-200';

    const linkButtonLabel = isTourLead
      ? (t('btnTourGuide') || 'Tour Itinerary / Field Guide')
      : 'Presentation Slides';

    const linkButtonIcon = isTourLead ? 'compass' : 'file-text';

    return `
      <div class="glass-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer border border-slate-200/90 group bg-white" data-id="${l.id}" data-type="lecturer">
        <!-- Hero Photo at Top with Badges -->
        <div class="relative w-full aspect-[4/3] overflow-hidden bg-slate-100 flex-shrink-0">
          <img src="${photo}" alt="${l.nameEnglish}" loading="lazy" class="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(l.nameEnglish)}&background=0b132b&color=38bdf8';"/>
          
          <!-- Subtle Top & Bottom Gradient Overlay -->
          <div class="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none"></div>
          <div class="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

          <!-- Top-Left Role Badge -->
          <div class="absolute top-3 left-3 z-10">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${roleBadgeClass} backdrop-blur-md border shadow-sm">
              ${roleBadgeText}
            </span>
          </div>

          <!-- Top-Right Country Badge -->
          <div class="absolute top-3 right-3 z-10">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-900/80 backdrop-blur-md text-white border border-white/20 shadow-sm">
              ${countryMeta.flagHtml} <span class="tracking-wide">${countryMeta.name}</span>
            </span>
          </div>
        </div>

        <!-- Card Body -->
        <div class="p-5 flex-1 flex flex-col justify-between space-y-3.5 bg-white">
          <!-- Name Section -->
          <div>
            <h3 class="font-bold text-slate-900 text-lg leading-snug ${isTourLead ? 'group-hover:text-emerald-600' : 'group-hover:text-cyan-600'} transition flex items-baseline gap-1.5 flex-wrap">
              <span>${l.nameEnglish}</span>
              ${l.nickname ? `<span class="${isTourLead ? 'text-emerald-600' : 'text-cyan-600'} font-semibold text-base">(${l.nickname})</span>` : ''}
            </h3>
            ${l.nameNative && l.nameNative !== l.nameEnglish ? `<p class="text-xs text-slate-500 font-medium mt-0.5">${l.nameNative}</p>` : ''}
          </div>

          <!-- Role / Position Title & Affiliation -->
          <div class="space-y-1.5 text-xs">
            <div class="flex items-center justify-between gap-2">
              <span class="inline-flex items-center gap-1.5 font-bold ${isTourLead ? 'text-emerald-700 bg-emerald-50 border-emerald-200/80' : 'text-cyan-800 bg-cyan-50 border-cyan-200/80'} border px-2.5 py-1 rounded-md text-xs">
                <i data-lucide="briefcase" class="w-3.5 h-3.5 ${isTourLead ? 'text-emerald-500' : 'text-cyan-500'} flex-shrink-0"></i>
                <span class="line-clamp-1">${l.title || (isTourLead ? 'Tour Lead & Field Trip Coordinator' : 'Lecturer')}</span>
              </span>
            </div>
            <p class="text-slate-600 line-clamp-1 flex items-center gap-1.5 pt-0.5" title="${l.affiliation || ''}">
              <i data-lucide="building-2" class="w-3.5 h-3.5 text-slate-400 flex-shrink-0"></i>
              <span class="line-clamp-1">${l.affiliation}</span>
            </p>
          </div>

          <!-- Seminar Session or Tour Details Box -->
          <div class="p-3 rounded-xl ${isTourLead ? 'bg-emerald-50/70 border-emerald-100' : 'bg-slate-50 border-slate-200/80'} border space-y-1 text-xs">
            <div class="flex items-center justify-between text-[11px] font-semibold ${isTourLead ? 'text-emerald-700' : 'text-cyan-700'}">
              <span class="flex items-center gap-1">
                <i data-lucide="${isTourLead ? 'compass' : 'book-open'}" class="w-3.5 h-3.5"></i>
                <span>${isTourLead ? 'Tour & Field Trip Session' : 'Seminar Topic'}</span>
              </span>
              ${l.sessionDate ? `
                <span class="text-slate-500 font-normal flex items-center gap-1">
                  <i data-lucide="calendar" class="w-3 h-3"></i> ${l.sessionDate}
                </span>
              ` : ''}
            </div>
            <p class="font-semibold text-slate-800 line-clamp-2 text-xs leading-snug">
              ${l.sessionTitle || l.title || (isTourLead ? 'Tour Lead & Field Trip Guide' : 'Seminar Lecture')}
            </p>
            ${l.topics ? `<p class="text-[11px] text-slate-500 line-clamp-2 pt-0.5">${l.topics}</p>` : ''}
          </div>

          <!-- Contact Shortcuts -->
          <div class="space-y-1.5 pt-2.5 border-t border-slate-100 text-xs">
            ${l.email ? `
              <a href="mailto:${l.email}" onclick="event.stopPropagation()" class="flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition group/mail">
                <span class="text-slate-400 group-hover/mail:text-cyan-600 flex-shrink-0">${SOCIAL_ICONS.mail}</span>
                <span class="truncate text-xs">${l.email}</span>
              </a>
            ` : ''}

            ${l.phone ? `
              <a href="tel:${l.phone}" onclick="event.stopPropagation()" class="flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition group/phone">
                <span class="text-slate-400 group-hover/phone:text-cyan-600 flex-shrink-0">${SOCIAL_ICONS.phone}</span>
                <span class="truncate text-xs">${l.phone}</span>
              </a>
            ` : ''}

            ${(l.wechatId || l.lineId || l.whatsapp || l.facebook || l.linkedin) ? `
              <div class="flex flex-wrap items-center gap-1.5 pt-1">
                ${l.wechatId ? `
                  <button type="button" onclick="event.stopPropagation(); navigator.clipboard.writeText('${l.wechatId}'); alert('Copied WeChat ID: ${l.wechatId}');" title="WeChat ID: ${l.wechatId} (Click to copy)" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition cursor-pointer">
                    <span class="text-emerald-600 flex-shrink-0">${SOCIAL_ICONS.wechat}</span> <span>${l.wechatId}</span>
                  </button>
                ` : ''}
                ${l.lineId ? `
                  <a href="https://line.me/R/ti/p/~${l.lineId}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="LINE: ${l.lineId}" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-green-50 text-[#06c755] hover:bg-green-100 border border-green-200 transition">
                    <span class="text-[#06c755] flex-shrink-0">${SOCIAL_ICONS.line}</span> <span>LINE</span>
                  </a>
                ` : ''}
                ${l.whatsapp ? `
                  <a href="https://wa.me/${l.whatsapp.replace(/[^0-9]/g, '')}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="WhatsApp: ${l.whatsapp}" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-teal-50 text-[#25d366] hover:bg-teal-100 border border-teal-200 transition">
                    <span class="text-[#25d366] flex-shrink-0">${SOCIAL_ICONS.whatsapp}</span> <span>WhatsApp</span>
                  </a>
                ` : ''}
                ${l.facebook ? `
                  <a href="${l.facebook.startsWith('http') ? l.facebook : 'https://facebook.com/' + l.facebook}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="Facebook Profile" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-[#1877f2] hover:bg-blue-100 border border-blue-200 transition">
                    <span class="text-[#1877f2] flex-shrink-0">${SOCIAL_ICONS.facebook}</span> <span>FB</span>
                  </a>
                ` : ''}
                ${l.linkedin ? `
                  <a href="${l.linkedin}" target="_blank" rel="noopener" onclick="event.stopPropagation()" title="LinkedIn Profile" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-sky-50 text-[#0077b5] hover:bg-sky-100 border border-sky-200 transition">
                    <span class="text-[#0077b5] flex-shrink-0">${SOCIAL_ICONS.linkedin}</span> <span>LinkedIn</span>
                  </a>
                ` : ''}
              </div>
            ` : ''}
          </div>

          <!-- Slides or Tour Guide button if available -->
          ${l.slidesUrl ? `
            <div class="pt-2 mt-auto">
              <a href="${l.slidesUrl}" target="_blank" rel="noopener" onclick="event.stopPropagation()" class="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl text-xs font-semibold ${linkButtonClass} transition border shadow-sm">
                <i data-lucide="${linkButtonIcon}" class="w-3.5 h-3.5"></i> ${linkButtonLabel}
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
        <div class="relative bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 p-6 sm:p-7 text-white sm:rounded-t-2xl">
          <div class="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left">
            <div class="relative group cursor-pointer flex-shrink-0" onclick="window.open('${photo}', '_blank')" title="Click to view full image">
              <div class="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-2xl avatar-container shadow-2xl border-4 border-white/90 ring-4 ring-cyan-500/30 overflow-hidden bg-slate-800 transition transform group-hover:scale-[1.02]">
                <img src="${photo}" alt="${item.nameEnglish}" class="w-full h-full object-cover object-top" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(item.nameEnglish)}&background=0b132b&color=38bdf8&size=512';"/>
              </div>
              <div class="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 backdrop-blur text-white text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                <i data-lucide="zoom-in" class="w-3 h-3"></i> Full Photo
              </div>
            </div>
            <div class="flex-1 min-w-0 pt-1">
              <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md border border-white/10">
                  ${countryMeta.flagHtml} <span>${countryMeta.name}</span>
                </span>
                ${item.nickname ? `<span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-400/20 text-cyan-200 border border-cyan-400/30">Nickname: ${item.nickname}</span>` : ''}
              </div>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight">${item.nameEnglish}</h2>
              ${item.nameNative && item.nameNative !== item.nameEnglish ? `<p class="text-base sm:text-lg text-cyan-200 mt-1 font-medium">${item.nameNative}</p>` : ''}
              <div class="mt-2 text-xs sm:text-sm text-slate-300 space-y-1">
                <p class="font-medium text-white flex items-center justify-center sm:justify-start gap-1.5">
                  <i data-lucide="briefcase" class="w-3.5 h-3.5 text-cyan-400 flex-shrink-0"></i>
                  ${item.position || 'Participant'}
                </p>
                <p class="text-slate-300 flex items-center justify-center sm:justify-start gap-1.5">
                  <i data-lucide="building-2" class="w-3.5 h-3.5 text-slate-400 flex-shrink-0"></i>
                  ${item.affiliation || 'Geospatial Agency'}
                </p>
              </div>
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
                <a href="tel:${item.phone}" class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition group">
                  <div class="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-800 group-hover:text-white transition">
                    <i data-lucide="phone" class="w-4 h-4"></i>
                  </div>
                  <div class="min-w-0">
                    <p class="text-[11px] font-medium text-slate-400">Phone / Mobile</p>
                    <p class="text-xs font-semibold text-slate-800 truncate">${item.phone}</p>
                  </div>
                </a>
              ` : ''}

              ${item.wechatId ? `
                <div onclick="navigator.clipboard.writeText('${item.wechatId}'); alert('Copied WeChat ID: ${item.wechatId}');" class="flex items-center justify-between p-3 rounded-xl border border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100/80 transition cursor-pointer group">
                  <div class="flex items-center gap-3 min-w-0">
                    <div class="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-xs shadow-sm">
                      微
                    </div>
                    <div class="min-w-0">
                      <p class="text-[11px] font-bold text-emerald-800 flex items-center gap-1.5">
                        WeChat ID (微信号)
                        <span class="text-[9px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded font-semibold">China</span>
                      </p>
                      <p class="text-xs font-bold text-slate-900 truncate">${item.wechatId}</p>
                    </div>
                  </div>
                  <span class="text-[10px] font-semibold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">Copy</span>
                </div>
              ` : ''}

              ${item.lineId ? `
                <a href="https://line.me/R/ti/p/~${item.lineId}" target="_blank" rel="noopener" class="flex items-center gap-3 p-3 rounded-xl border border-green-300 bg-green-50/60 hover:bg-green-100/70 transition group">
                  <div class="w-9 h-9 rounded-lg bg-[#06c755] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    ${iconLg(SOCIAL_ICONS.line)}
                  </div>
                  <div class="min-w-0">
                    <p class="text-[11px] font-semibold text-green-800">LINE ID</p>
                    <p class="text-xs font-bold text-slate-900 truncate">${item.lineId}</p>
                  </div>
                </a>
              ` : ''}

              ${item.whatsapp ? `
                <a href="https://wa.me/${item.whatsapp.replace(/[^0-9]/g, '')}" target="_blank" rel="noopener" class="flex items-center gap-3 p-3 rounded-xl border border-teal-300 bg-teal-50/60 hover:bg-teal-100/70 transition group">
                  <div class="w-9 h-9 rounded-lg bg-[#25d366] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    ${iconLg(SOCIAL_ICONS.whatsapp)}
                  </div>
                  <div class="min-w-0">
                    <p class="text-[11px] font-semibold text-teal-800">WhatsApp</p>
                    <p class="text-xs font-bold text-slate-900 truncate">${item.whatsapp}</p>
                  </div>
                </a>
              ` : ''}

              ${item.facebook ? `
                <a href="${item.facebook.startsWith('http') ? item.facebook : 'https://facebook.com/' + item.facebook}" target="_blank" rel="noopener" class="flex items-center gap-3 p-3 rounded-xl border border-blue-300 bg-blue-50/60 hover:bg-blue-100/70 transition group">
                  <div class="w-9 h-9 rounded-lg bg-[#1877f2] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    ${iconLg(SOCIAL_ICONS.facebook)}
                  </div>
                  <div class="min-w-0">
                    <p class="text-[11px] font-semibold text-blue-800">Facebook</p>
                    <p class="text-xs font-bold text-slate-900 truncate">${item.facebook.replace(/https?:\/\/(www\.)?facebook\.com\/?/, '')}</p>
                  </div>
                </a>
              ` : ''}

              ${item.linkedin ? `
                <a href="${item.linkedin}" target="_blank" rel="noopener" class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition group">
                  <div class="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0077b5] group-hover:text-white transition">
                    ${iconLg(SOCIAL_ICONS.linkedin)}
                  </div>
                  <div class="min-w-0">
                    <p class="text-[11px] font-medium text-slate-400">LinkedIn Profile</p>
                    <p class="text-xs font-semibold text-slate-800 truncate">View Profile</p>
                  </div>
                </a>
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
      // Lecturer / Tour Lead modal
      const isTourLead = item.role === 'Tour Lead' ||
        (item.title && item.title.toLowerCase().includes('tour lead')) ||
        (item.title && item.title.includes('ผู้นำทัศนศึกษา')) ||
        (item.sessionTitle && (item.sessionTitle.toLowerCase().includes('tour') || item.sessionTitle.toLowerCase().includes('field trip') || item.sessionTitle.toLowerCase().includes('excursion')));

      const headerGradient = isTourLead 
        ? 'bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950'
        : 'bg-gradient-to-r from-cyan-950 via-slate-900 to-sky-950';

      const roleBadgeText = isTourLead
        ? `🚌 ${t('badgeTourLead') || 'Tour Lead & Field Trip Coordinator'}`
        : `🎓 ${item.sessionDay || t('badgeLecturer') || 'Lecturer'}`;

      const roleBadgeClass = isTourLead
        ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30'
        : 'bg-cyan-500/20 text-cyan-200 border-cyan-400/30';

      content.innerHTML = `
        <div class="relative ${headerGradient} p-6 sm:p-7 text-white sm:rounded-t-2xl">
          <div class="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left">
            <div class="relative group cursor-pointer flex-shrink-0" onclick="window.open('${photo}', '_blank')" title="Click to view full image">
              <div class="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-2xl avatar-container shadow-2xl border-4 border-white/90 ring-4 ${isTourLead ? 'ring-emerald-500/30' : 'ring-cyan-500/30'} overflow-hidden bg-slate-800 transition transform group-hover:scale-[1.02]">
                <img src="${photo}" alt="${item.nameEnglish}" class="w-full h-full object-cover object-top" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(item.nameEnglish)}&background=0b132b&color=38bdf8&size=512';"/>
              </div>
              <div class="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 backdrop-blur text-white text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                <i data-lucide="zoom-in" class="w-3 h-3"></i> Full Photo
              </div>
            </div>
            <div class="flex-1 min-w-0 pt-1">
              <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${roleBadgeClass} border">
                  ${roleBadgeText}
                </span>
                <span class="text-xs text-slate-300 bg-black/20 px-2.5 py-1 rounded-full border border-white/10 inline-flex items-center gap-1.5">${countryMeta.flagHtml} <span>${item.country}</span></span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight">${item.nameEnglish}</h2>
              ${item.nameNative && item.nameNative !== item.nameEnglish ? `<p class="text-base sm:text-lg ${isTourLead ? 'text-emerald-200' : 'text-cyan-200'} mt-1 font-medium">${item.nameNative}</p>` : ''}
              <p class="text-xs sm:text-sm text-slate-300 mt-2">${item.title} • ${item.affiliation}</p>
            </div>
          </div>
        </div>

        <div class="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          <!-- Session / Tour Details (if available) -->
          ${(item.sessionTitle || item.sessionDate) ? `
          <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">${isTourLead ? 'Field Trip / Technical Tour' : 'Seminar Session'}</p>
            ${item.sessionTitle ? `<h3 class="text-base font-bold text-slate-900 mb-1">${item.sessionTitle}</h3>` : ''}
            ${item.sessionDate ? `
            <p class="text-xs ${isTourLead ? 'text-emerald-700' : 'text-cyan-700'} font-medium flex items-center gap-1.5">
              <i data-lucide="calendar" class="w-3.5 h-3.5"></i> ${item.sessionDate}
            </p>` : ''}
          </div>
          ` : ''}

          <!-- Topics / Highlights -->
          ${item.topics ? `
            <div>
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">${isTourLead ? 'Tour Highlights & Instructions' : 'Topics & Highlights'}</h4>
              <p class="text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-200 leading-relaxed">
                ${item.topics}
              </p>
            </div>
          ` : ''}

          <!-- Notes -->
          ${item.notes ? `
            <div>
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">${isTourLead ? 'Important Tour Notes' : 'Session Notes'}</h4>
              <p class="text-xs text-slate-600 italic bg-amber-50/60 p-3 rounded-xl border border-amber-200">
                ${item.notes}
              </p>
            </div>
          ` : ''}

          <!-- Presentation Slides & Guide Links -->
          <div class="flex flex-wrap gap-2 pt-2">
            ${item.slidesUrl ? `
              <a href="${item.slidesUrl}" target="_blank" rel="noopener" class="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold ${isTourLead ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-cyan-600 hover:bg-cyan-700'} text-white shadow-sm transition">
                <i data-lucide="${isTourLead ? 'compass' : 'file-text'}" class="w-4 h-4"></i> ${isTourLead ? (t('btnTourGuide') || 'Tour Itinerary / Field Guide') : 'Download Session Slides'}
              </a>
            ` : ''}
            ${item.labWebsite ? `
              <a href="${item.labWebsite}" target="_blank" rel="noopener" class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
                <i data-lucide="globe" class="w-4 h-4"></i> Organization Website
              </a>
            ` : ''}
          </div>

          <!-- Contacts -->
          <div class="border-t border-slate-100 pt-4">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">${isTourLead ? 'Coordinator Contact' : 'Lecturer Contact'}</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              ${item.email ? `<p class="flex items-center gap-2 text-slate-700"><span class="text-slate-400">${SOCIAL_ICONS.mail}</span> <span>${item.email}</span></p>` : ''}
              ${item.phone ? `<p class="flex items-center gap-2 text-slate-700"><span class="text-slate-400">${SOCIAL_ICONS.phone}</span> <span>${item.phone}</span></p>` : ''}
              ${item.wechatId ? `<p class="flex items-center gap-2 text-emerald-800 font-semibold cursor-pointer" onclick="navigator.clipboard.writeText('${item.wechatId}'); alert('Copied WeChat ID: ${item.wechatId}');"><span class="text-emerald-600">${SOCIAL_ICONS.wechat}</span> WeChat: ${item.wechatId}</p>` : ''}
              ${item.lineId ? `<a href="https://line.me/R/ti/p/~${item.lineId}" target="_blank" class="flex items-center gap-2 text-[#06c755] hover:underline font-medium"><span class="text-[#06c755]">${SOCIAL_ICONS.line}</span> LINE: ${item.lineId}</a>` : ''}
              ${item.whatsapp ? `<a href="https://wa.me/${item.whatsapp.replace(/[^0-9]/g, '')}" target="_blank" class="flex items-center gap-2 text-[#25d366] hover:underline font-medium"><span class="text-[#25d366]">${SOCIAL_ICONS.whatsapp}</span> WhatsApp: ${item.whatsapp}</a>` : ''}
              ${item.facebook ? `<a href="${item.facebook.startsWith('http') ? item.facebook : 'https://facebook.com/' + item.facebook}" target="_blank" class="flex items-center gap-2 text-[#1877f2] hover:underline font-medium"><span class="text-[#1877f2]">${SOCIAL_ICONS.facebook}</span> Facebook</a>` : ''}
              ${item.linkedin ? `<a href="${item.linkedin}" target="_blank" class="flex items-center gap-2 text-[#0077b5] hover:underline"><span class="text-[#0077b5]">${SOCIAL_ICONS.linkedin}</span> LinkedIn Profile</a>` : ''}
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

function startApp() {
  window.app = new DirectoryApp();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
