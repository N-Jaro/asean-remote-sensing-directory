/**
 * Configuration for ASEAN Remote Sensing Seminar 2026 Directory
 * Seminar on Remote Sensing Technology for ASEAN Countries (28 Oct – 10 Nov 2026)
 */

// Purge legacy local storage overrides so users cannot accidentally or maliciously modify configuration URLs
try {
  localStorage.removeItem('rs_participants_csv_url');
  localStorage.removeItem('rs_lecturers_csv_url');
  localStorage.removeItem('rs_apps_script_url');
  localStorage.removeItem('rs_google_form_url');
  localStorage.removeItem('rs_google_sheet_view_url');
} catch (e) {
  // Ignore in private browsing mode
}

export const CONFIG = {
  seminar: {
    title: "Seminar on Remote Sensing Technology Empowering New Quality Productive Forces for ASEAN Countries",
    titleZh: "东盟国家遥感技术赋能新质生产力研修班",
    titleTh: "การสัมมนาเชิงปฏิบัติการเทคโนโลยีสำรวจระยะไกลเพื่อเสริมสร้างพลังการผลิตคุณภาพใหม่สำหรับกลุ่มประเทศอาเซียน",
    dates: "28 October – 10 November 2026",
    datesZh: "2026年10月28日至11月10日",
    datesTh: "28 ตุลาคม – 10 พฤศจิกายน 2569",
    location: "Nanning, Guangxi & Beijing, China",
    locationZh: "中国广西南宁市及北京市",
    locationTh: "เมืองหนานหนิง เขตปกครองตนเองกว่างซี และกรุงปักกิ่ง ประเทศจีน",
    organizer: "Guangxi International Business Vocational College (GXIBVC)",
    organizerZh: "广西国际商务职业技术学院",
    organizerContact: "Ms. Xie Jing (0086-771-3244221 / xiejing0771@qq.com)",
    theme: "Remote Sensing Technology Empowering New Quality Productive Forces for ASEAN Countries",
  },

  // Locked Production Google Sheet & Cloud API Integration Settings (Immutable)
  googleIntegration: {
    // 1. Google Sheets "Publish to the web" CSV URL for Participants
    participantsCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvyKOBDiAEtxzkr3ETAYT8SLg_L4NeeZnyblKl1C3BFiTa8a66AZzTYZeNMKNYw4UKIEkH1US8PcI7/pub?gid=1959497488&single=true&output=csv",

    // 2. Google Sheets "Publish to the web" CSV URL for Lecturers
    lecturersCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvyKOBDiAEtxzkr3ETAYT8SLg_L4NeeZnyblKl1C3BFiTa8a66AZzTYZeNMKNYw4UKIEkH1US8PcI7/pub?gid=998993160&single=true&output=csv",

    // 3. Google Apps Script Web App URL (for direct web form submissions and fast JSON API)
    appsScriptUrl: "https://script.google.com/macros/s/AKfycbzDqSebJZ0pRmAmt1eTN0VauiM-zi8m3tkLM8qman29yZf45vRayv-xdgG4GfBgzO7B/exec",

    // 4. (Optional) Direct Google Form Link
    googleFormUrl: "",

    // 5. Google Sheet View Link
    googleSheetViewUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvyKOBDiAEtxzkr3ETAYT8SLg_L4NeeZnyblKl1C3BFiTa8a66AZzTYZeNMKNYw4UKIEkH1US8PcI7/pubhtml",
  },

  // ASEAN Member States with flags and localized labels
  countries: [
    { code: "BN", name: "Brunei Darussalam", flag: "🇧🇳" },
    { code: "KH", name: "Cambodia", flag: "🇰🇭" },
    { code: "ID", name: "Indonesia", flag: "🇮🇩" },
    { code: "LA", name: "Laos", flag: "🇱🇦" },
    { code: "MY", name: "Malaysia", flag: "🇲🇾" },
    { code: "MM", name: "Myanmar", flag: "🇲🇲" },
    { code: "PH", name: "Philippines", flag: "🇵🇭" },
    { code: "SG", name: "Singapore", flag: "🇸🇬" },
    { code: "TH", name: "Thailand", flag: "🇹🇭" },
    { code: "TL", name: "Timor-Leste", flag: "🇹🇱" },
    { code: "VN", name: "Vietnam", flag: "🇻🇳" },
    { code: "CN", name: "China", flag: "🇨🇳" },
    { code: "OTHER", name: "International / Partner", flag: "🌐" }
  ],

  // Popular Expertise tags for quick filters
  expertiseTags: [
    "SAR / Radar Remote Sensing",
    "Optical & Multispectral Imagery",
    "Hyperspectral Sensing",
    "UAV / Drone Mapping",
    "AI / Deep Learning for EO",
    "GIS & Spatial Modeling",
    "Disaster Risk & Early Warning",
    "Forestry & Biomass Estimation",
    "Precision Agriculture",
    "Coastal & Marine Resources",
    "Urban & Land Use Planning",
    "Climate Change & Meteorology"
  ]
};

