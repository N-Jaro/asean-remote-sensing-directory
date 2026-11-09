/**
 * Internationalization (i18n) Module for ASEAN Remote Sensing Seminar 2026 Directory
 * Supports: English (en), Thai (th), Lao (lo), Chinese (zh), Myanmar (my), Khmer/Cambodia (km)
 */

// Ensure English is the default language on first load and resets legacy test state
try {
  if (!localStorage.getItem('rs_lang_default_en_v1')) {
    localStorage.setItem('rs_selected_lang', 'en');
    localStorage.setItem('rs_lang_default_en_v1', 'true');
  }
} catch (e) {
  // Ignore in private browsing mode
}

export const SUPPORTED_LANGUAGES = {
  en: { code: 'en', countryCode: 'gb', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  th: { code: 'th', countryCode: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
  lo: { code: 'lo', countryCode: 'la', name: 'Lao', nativeName: 'ພາສາລາວ', flag: '🇱🇦' },
  zh: { code: 'zh', countryCode: 'cn', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  my: { code: 'my', countryCode: 'mm', name: 'Myanmar', nativeName: 'မြန်မာစာ', flag: '🇲🇲' },
  km: { code: 'km', countryCode: 'kh', name: 'Khmer', nativeName: 'ភាសាខ្មែរ', flag: '🇰🇭' }
};

/**
 * Flag CDN helper for language switcher icons
 * Solves Windows OS limitation where country flag emojis render as 2-letter ISO text codes (e.g. GB, TH, LA)
 */
export function getLangFlagImg(countryCode, fallbackEmoji = '🌐', className = 'w-4.5 h-3 object-cover rounded-[2px] shadow-xs inline-block align-middle flex-shrink-0') {
  if (!countryCode) return `<span>${fallbackEmoji}</span>`;
  const code = countryCode.toLowerCase().trim();
  return `<img src="https://flagcdn.com/24x18/${code}.png" srcset="https://flagcdn.com/48x36/${code}.png 2x" class="${className}" alt="${code}" loading="lazy" onerror="this.outerHTML='<span>${fallbackEmoji}</span>'"/>`;
}

export const TRANSLATIONS = {
  en: {
    // Header & Brand
    directoryPageTitle: "ASEAN Remote Sensing Seminar 2026 Directory | Participants & Lecturers",
    seminarBadge: "ASEAN RS 2026",
    datesHeader: "28 Oct – 10 Nov 2026",
    brandTitle: "ASEAN Remote Sensing Directory",
    addProfileBtn: "Add Profile",
    googleSheetBtn: "Google Sheet",

    // Hero Section
    heroBadge: "Seminar on Remote Sensing Technology Empowering New Quality Productive Forces for ASEAN Countries",
    heroTitle: "Directory & Yearbook of Participants & Lecturers",
    heroDesc: "Official directory connecting remote sensing researchers and officials across ASEAN member states for the seminar hosted by Guangxi International Business Vocational College (GXIBVC) in Nanning (Guangxi) and Beijing, China.",
    heroDates: "28 October – 10 November 2026",
    heroLocation: "Nanning (Guangxi) & Beijing, China",
    statParticipants: "Participants",
    statCountries: "Countries",
    statLecturers: "Lecturers & Leads",

    // Tabs & Actions
    tabParticipants: "Participants",
    tabLecturers: "Lecturers & Tour Leads",
    btnAddLecturer: "Add Lecturer",
    btnAddTourLead: "Tour Lead Form",
    btnExportCsv: "Export CSV",
    badgeTourLead: "Tour Lead",
    badgeLecturer: "Lecturer",
    btnTourGuide: "Tour Itinerary / Guide",
    lecturerModalTitle: "Add Lecturer & Session Information",

    // Search & Filter
    searchPlaceholder: "Search by name, nickname, country, organization, expertise...",
    sortByLabel: "Sort by:",
    sortNameAsc: "Name (A – Z)",
    sortNameDesc: "Name (Z – A)",
    sortCountryAsc: "Country / Nationality",
    filterNationalityLabel: "Filter by ASEAN Nationality:",
    filterAllCountries: "All Countries",
    filterExpertiseLabel: "Filter by Specialization:",
    filterAllExpertise: "All Fields",
    showingText: "Showing",
    ofText: "of",
    membersText: "members",
    btnSyncSheet: "Sync Sheet",

    // Participant Cards
    cardPreferred: "Nickname:",
    cardAffiliation: "Affiliation:",
    cardExpertise: "Specialization",
    btnSaveContact: "Save Contact (vCard)",
    btnViewProfile: "View Profile",

    // Lecturer Cards
    lecturerSession: "Session",
    btnDownloadSlides: "Download Slides",
    btnContactLecturer: "Contact Lecturer",

    // Participant Modal
    modalTitle: "Participant Profile",
    modalOffice: "Working Office",
    modalContactHeader: "Contact Information",
    modalMessageHeader: "Message to Participants",
    modalClose: "Close",

    // Empty States
    emptyTitle: "No matching profiles found",
    emptyDesc: "Try adjusting your search terms or clearing the country and specialization filters.",
    btnResetFilters: "Reset Filters",

    // Settings Modal
    settingsTitle: "Google Sheet Connection Settings",
    settingsDesc: "Connect your Google Sheet or Google Apps Script Web App for real-time syncing.",
    settingsPartCsvLabel: "1. Participants Google Sheet CSV URL (Publish to web)",
    settingsLecCsvLabel: "2. Lecturers Google Sheet CSV URL (Publish to web)",
    settingsScriptLabel: "3. Google Apps Script Web App URL",
    settingsBtnSave: "Save & Sync",
    settingsBtnCancel: "Cancel",

    // Submit Page
    submitPageTitle: "Participant Profile Registration | ASEAN Remote Sensing Seminar 2026",
    backToDir: "Back to Directory",
    submitFormBadge: "Participant Profile Registration Form",
    submitFormTitle: "Participant Profile Registration",
    submitFormDesc: "Seminar on Remote Sensing Technology Empowering New Quality Productive Forces for ASEAN Countries (28 Oct – 10 Nov 2026, Nanning, Guangxi & Beijing, China). Please enter your details and upload a photo to be included in the live directory.",
    submitSectionPhoto: "1. Profile Photo",
    submitPhotoPrompt: "Click or drag your photo here",
    submitPhotoHint: "Supports JPG, PNG, WebP (Max 5MB)",
    submitChangePhoto: "Change photo",
    submitLabelNameEn: "2. Name in English",
    submitLabelNameNative: "3. Name in your native language (Lao, Thai, Chinese, Myanmar, Khmer)",
    submitLabelNickname: "4. Nickname / Preferred name",
    submitLabelCountry: "5. Nationality / Country",
    submitSelectCountry: "Select your country / nationality",
    submitLabelAffiliation: "6. Affiliation / Organization",
    submitLabelPosition: "7. Position / Title",
    submitLabelExpertise: "8. Expertise / Specialization",
    submitExpertiseHint: "Select from suggested tags below or type your own custom specializations",
    submitSelectedTags: "Your Selected Specializations:",
    submitRemoveTagHint: "Click × to remove",
    submitNoTagsSelected: "No specializations selected yet. Click suggested topics below or type your own.",
    submitSuggestedTags: "Suggested Topics (Click to add/remove):",
    submitCustomTagPlaceholder: "Type custom expertise (e.g. LiDAR, InSAR, Google Earth Engine) & press Enter",
    submitBtnAddTag: "Add Tag",
    submitLabelOffice: "9. Working Office Location (City, Country)",
    submitContactSection: "Contact & Messaging Channels",
    submitLabelEmail: "Email Address",
    submitLabelPhone: "Phone Number / Mobile",
    submitLabelWechat: "WeChat ID (微信号)",
    badgeWechatRec: "Recommended for China",
    submitLabelLine: "LINE ID",
    submitLabelWhatsapp: "WhatsApp Number",
    submitLabelFacebook: "Facebook Profile / Name",
    submitLabelLinkedin: "LinkedIn Profile URL",
    submitLabelWebsite: "Personal Website / Lab / Portfolio URL",
    submitLabelMessage: "Message to Other Participants",
    submitBtnCancel: "Cancel",
    submitBtnSubmit: "Submit Profile",
    submitBtnSubmitting: "Saving to Google Sheet...",
    submitSuccessTitle: "Registration Successful!",
    submitSuccessDesc: "Welcome to the ASEAN Remote Sensing Directory.",
    submitBtnViewDirectory: "Go to Directory",
    submitBtnAddAnother: "Submit Another Profile",

    // Tour Lead Form Page
    tourLeadPageTitle: "Tour Lead Registration | ASEAN Remote Sensing Seminar 2026",
    tourLeadFormBadge: "Field Trip & Technical Tour Coordinator",
    tourLeadFormTitle: "Tour Lead Profile Registration",
    tourLeadFormDesc: "Seminar on Remote Sensing Technology Empowering New Quality Productive Forces for ASEAN Countries (28 Oct – 10 Nov 2026, Nanning & Beijing). Please register your details as a tour lead / field trip coordinator to be displayed in the directory.",
    tourLeadLabelTourName: "Assigned Tour / Field Trip Session",
    tourLeadLabelTourDate: "Tour Date & Time",
    tourLeadLabelRole: "Lead Role / Position Title",
    tourLeadLabelHighlights: "Tour Highlights, Field Guide & Instructions",
    tourLeadLabelGuideUrl: "Tour Itinerary / Field Guide Document URL (Optional)",
    tourLeadSuccessTitle: "Tour Lead Profile Saved!",
    tourLeadSuccessDesc: "Your profile has been added to the Lecturers & Tour Leads directory."
  },

  th: {
    // Header & Brand
    directoryPageTitle: "ทำเนียบผู้เข้าร่วมสัมมนา | ASEAN Remote Sensing Seminar 2026",
    seminarBadge: "ASEAN RS 2026",
    datesHeader: "28 ต.ค. – 10 พ.ย. 2569",
    brandTitle: "ทำเนียบผู้เข้าร่วมสัมมนาเทคโนโลยีสำรวจระยะไกล",
    addProfileBtn: "เพิ่มโปรไฟล์",
    googleSheetBtn: "Google Sheet",

    // Hero Section
    heroBadge: "Seminar on Remote Sensing Technology Empowering New Quality Productive Forces for ASEAN Countries",
    heroTitle: "ทำเนียบผู้เข้าร่วมสัมมนาและคณาจารย์วิทยากร",
    heroDesc: "ระบบทำเนียบรุ่นออนไลน์สำหรับผู้เข้าร่วมการสัมมนาเชิงปฏิบัติการเทคโนโลยีสำรวจระยะไกลเพื่อเสริมสร้างพลังการผลิตคุณภาพใหม่สำหรับกลุ่มประเทศอาเซียน จัดโดยวิทยาลัยอาชีวศึกษาธุรกิจระหว่างประเทศกว่างซี (GXIBVC) ณ เมืองหนานหนิงและกรุงปักกิ่ง ประเทศจีน (28 ต.ค. – 10 พ.ย. 2569)",
    heroDates: "28 ตุลาคม – 10 พฤศจิกายน 2569",
    heroLocation: "เมืองหนานหนิง (กว่างซี) และกรุงปักกิ่ง ประเทศจีน",
    statParticipants: "ผู้เข้าร่วม",
    statCountries: "ประเทศ",
    statLecturers: "วิทยากร & ผู้นำทัวร์",

    // Tabs & Actions
    tabParticipants: "ผู้เข้าร่วมสัมมนา (Participants)",
    tabLecturers: "วิทยากรและผู้นำทัศนศึกษา (Lecturers & Tour Leads)",
    btnAddLecturer: "เพิ่มวิทยากร",
    btnAddTourLead: "ฟอร์มผู้นำทัศนศึกษา",
    btnExportCsv: "Export CSV",
    badgeTourLead: "ผู้นำทัศนศึกษา",
    badgeLecturer: "วิทยากร",
    btnTourGuide: "คู่มือทัศนศึกษา / กำหนดการ",
    lecturerModalTitle: "เพิ่มข้อมูลวิทยากรและหัวข้อบรรยาย",

    // Search & Filter
    searchPlaceholder: "ค้นหาด้วยชื่อ (ไทย/อังกฤษ), ชื่อเล่น, ประเทศ, หน่วยงาน, หรือความเชี่ยวชาญ...",
    sortByLabel: "เรียงตาม:",
    sortNameAsc: "ชื่อ (A – Z)",
    sortNameDesc: "ชื่อ (Z – A)",
    sortCountryAsc: "สัญชาติ / ประเทศ",
    filterNationalityLabel: "กรองตามประเทศสมาชิกอาเซียน:",
    filterAllCountries: "ทั้งหมด",
    filterExpertiseLabel: "กรองตามสาขาความเชี่ยวชาญ:",
    filterAllExpertise: "ทุกสาขา",
    showingText: "แสดง",
    ofText: "จากทั้งหมด",
    membersText: "ท่าน",
    btnSyncSheet: "ดึงข้อมูลใหม่",

    // Participant Cards
    cardPreferred: "ชื่อเล่น:",
    cardAffiliation: "หน่วยงาน:",
    cardExpertise: "ความเชี่ยวชาญ",
    btnSaveContact: "บันทึกรายชื่อ (vCard)",
    btnViewProfile: "ดูข้อมูลเต็ม",

    // Lecturer Cards
    lecturerSession: "หัวข้อบรรยาย",
    btnDownloadSlides: "ดาวน์โหลดสไลด์",
    btnContactLecturer: "ติดต่อวิทยากร",

    // Participant Modal
    modalTitle: "ข้อมูลผู้เข้าร่วมสัมมนา",
    modalOffice: "สถานที่ทำงาน",
    modalContactHeader: "ช่องทางการติดต่อ",
    modalMessageHeader: "ข้อความทักทายเพื่อนร่วมรุ่น",
    modalClose: "ปิด",

    // Empty States
    emptyTitle: "ไม่พบข้อมูลที่ตรงกับคำค้นหา",
    emptyDesc: "กรุณาลองเปลี่ยนคำค้นหา หรือล้างตัวกรองประเทศและความเชี่ยวชาญ",
    btnResetFilters: "ล้างตัวกรองทั้งหมด",

    // Settings Modal
    settingsTitle: "ตั้งค่าเชื่อมต่อ Google Sheet",
    settingsDesc: "เชื่อมต่อข้อมูลกับ Google Sheet หรือ Google Apps Script เพื่อให้ข้อมูลอัปเดตแบบเรียลไทม์",
    settingsPartCsvLabel: "1. ลิงก์ CSV ผู้เข้าร่วมสัมมนา (Publish to web)",
    settingsLecCsvLabel: "2. ลิงก์ CSV วิทยากร (Publish to web)",
    settingsScriptLabel: "3. Google Apps Script Web App URL",
    settingsBtnSave: "บันทึกและซิงค์",
    settingsBtnCancel: "ยกเลิก",

    // Submit Page
    submitPageTitle: "ลงทะเบียนทำเนียบผู้เข้าร่วมสัมมนา | ASEAN Remote Sensing Seminar 2026",
    backToDir: "กลับสู่หน้าทำเนียบ",
    submitFormBadge: "แบบฟอร์มลงทะเบียนทำเนียบรุ่น",
    submitFormTitle: "ลงทะเบียนทำเนียบผู้เข้าร่วมสัมมนา",
    submitFormDesc: "Seminar on Remote Sensing Technology Empowering New Quality Productive Forces for ASEAN Countries (28 ต.ค. – 10 พ.ย. 2569 ณ นครหนานหนิงและกรุงปักกิ่ง ประเทศจีน) กรุณากรอกข้อมูลและอัปโหลดรูปภาพของท่านเพื่อแสดงในทำเนียบออนไลน์",
    submitSectionPhoto: "1. รูปถ่ายประจำตัว",
    submitPhotoPrompt: "คลิกหรือลากไฟล์รูปภาพมาวางที่นี่",
    submitPhotoHint: "รองรับ JPG, PNG, WebP (ไม่เกิน 5MB)",
    submitChangePhoto: "เปลี่ยนรูปภาพ",
    submitLabelNameEn: "2. Name in English (ชื่อภาษาอังกฤษ)",
    submitLabelNameNative: "3. ชื่อในภาษาท้องถิ่นของคุณ (ລາວ / ไทย / 中文 / မြန်မာ / ខ្មែរ)",
    submitLabelNickname: "4. ชื่อเล่น หรือชื่อเรียกที่สะดวก",
    submitLabelCountry: "5. สัญชาติ / ประเทศ",
    submitSelectCountry: "เลือกประเทศของคุณ",
    submitLabelAffiliation: "6. หน่วยงาน / องค์กรที่สังกัด",
    submitLabelPosition: "7. ตำแหน่งหน้าที่",
    submitLabelExpertise: "8. สาขาความเชี่ยวชาญ",
    submitExpertiseHint: "คลิกเลือกหัวข้อแนะนำด้านล่าง หรือพิมพ์ระบุความเชี่ยวชาญของท่านเอง",
    submitSelectedTags: "ความเชี่ยวชาญที่เลือกไว้:",
    submitRemoveTagHint: "คลิก × เพื่อลบออก",
    submitNoTagsSelected: "ยังไม่ได้เลือกความเชี่ยวชาญ คลิกเลือกหัวข้อแนะนำด้านล่าง หรือพิมพ์ระบุเองได้เลย",
    submitSuggestedTags: "หัวข้อแนะนำ (คลิกเพื่อเลือก/ยกเลิก):",
    submitCustomTagPlaceholder: "พิมพ์ความเชี่ยวชาญอื่นๆ (เช่น LiDAR, InSAR, Google Earth Engine, Blue Carbon) แล้วกด Enter",
    submitBtnAddTag: "เพิ่มแท็ก",
    submitLabelOffice: "9. สถานที่ตั้งที่ทำงาน (เมือง / ประเทศ)",
    submitContactSection: "ช่องทางการติดต่อและโซเชียลมีเดีย",
    submitLabelEmail: "อีเมล",
    submitLabelPhone: "เบอร์โทรศัพท์มือถือ",
    submitLabelWechat: "WeChat ID (ไอดีวีแชท)",
    badgeWechatRec: "แนะนำสำหรับสัมมนาที่ประเทศจีน",
    submitLabelLine: "LINE ID (ไลน์ไอดี)",
    submitLabelWhatsapp: "เบอร์ WhatsApp",
    submitLabelFacebook: "ชื่อ Facebook / ลิงก์โปรไฟล์",
    submitLabelLinkedin: "ลิงก์ LinkedIn",
    submitLabelWebsite: "เว็บไซต์ส่วนตัว / ห้องปฏิบัติการ / Portfolio",
    submitLabelMessage: "ข้อความทักทายเพื่อนร่วมรุ่น",
    submitBtnCancel: "ยกเลิก",
    submitBtnSubmit: "ส่งข้อมูลลงทะเบียน",
    submitBtnSubmitting: "กำลังบันทึกข้อมูล...",
    submitSuccessTitle: "บันทึกข้อมูลเรียบร้อยแล้ว!",
    submitSuccessDesc: "ยินดีต้อนรับเข้าสู่ทำเนียบผู้เข้าร่วมสัมมนาเทคโนโลยีสำรวจระยะไกล",
    submitBtnViewDirectory: "ไปยังหน้าทำเนียบผู้เข้าร่วม",
    submitBtnAddAnother: "กรอกข้อมูลท่านอื่นเพิ่ม",

    // Tour Lead Form Page
    tourLeadPageTitle: "ลงทะเบียนผู้นำทัศนศึกษา | ASEAN Remote Sensing Seminar 2026",
    tourLeadFormBadge: "ผู้ประสานงานและผู้นำทัศนศึกษาภาคสนาม",
    tourLeadFormTitle: "ลงทะเบียนประวัติผู้นำทัศนศึกษา",
    tourLeadFormDesc: "Seminar on Remote Sensing Technology Empowering New Quality Productive Forces for ASEAN Countries (28 ต.ค. – 10 พ.ย. 2569 ณ นครหนานหนิงและกรุงปักกิ่ง) กรุณากรอกข้อมูลและรายละเอียดการนำทัศนศึกษาเพื่อแสดงในทำเนียบวิทยากรและผู้นำทัศนศึกษา",
    tourLeadLabelTourName: "หัวข้อทัศนศึกษา / เส้นทางศึกษาดูงานที่รับผิดชอบ",
    tourLeadLabelTourDate: "วันและเวลาทัศนศึกษา",
    tourLeadLabelRole: "บทบาทหน้าที่ / ตำแหน่ง",
    tourLeadLabelHighlights: "จุดเด่นของสถานที่ ข้อควรปฏิบัติ และคำแนะนำสำหรับผู้ร่วมทริป",
    tourLeadLabelGuideUrl: "ลิงก์กำหนดการ / คู่มือการศึกษาดูงาน (Google Drive / PDF)",
    tourLeadSuccessTitle: "บันทึกข้อมูลผู้นำทัศนศึกษาเรียบร้อยแล้ว!",
    tourLeadSuccessDesc: "ข้อมูลของท่านถูกบันทึกและแสดงในทำเนียบวิทยากรและผู้นำทัศนศึกษาเรียบร้อยแล้ว"
  },

  lo: {
    // Header & Brand
    directoryPageTitle: "ທຳນຽບຜູ້ເຂົ້າຮ່ວມສຳມະນາ | ASEAN Remote Sensing Seminar 2026",
    seminarBadge: "ASEAN RS 2026",
    datesHeader: "28 ຕຸລາ – 10 ພະຈິກ 2026",
    brandTitle: "ທຳນຽບຜູ້ເຂົ້າຮ່ວມສຳມະນາເຕັກໂນໂລຊີສຳຫຼວດໄລຍະໄກ",
    addProfileBtn: "ເພີ່ມໂປຣໄຟລ໌",
    googleSheetBtn: "Google Sheet",

    // Hero Section
    heroBadge: "Seminar on Remote Sensing Technology Empowering New Quality Productive Forces for ASEAN Countries",
    heroTitle: "ທຳນຽບຜູ້ເຂົ້າຮ່ວມສຳມະນາ ແລະ ຄູອາຈານວິທະຍາກອນ",
    heroDesc: "ລະບົບທຳນຽບອອນລາຍ ລວບລວມລາຍຊື່ຜູ້ເຂົ້າຮ່ວມສຳມະນາຈາກບັນດາປະເທດສະມາຊິກອາຊຽນ ແລະ ຊ່ຽວຊານ ພ້ອມຊ່ອງທາງຕິດຕໍ່ ຄວາມຊ່ຽວຊານ ແລະ ເຊື່ອມຕໍ່ Google Sheet ແບບເວລາຈິງ.",
    heroDates: "28 ຕຸລາ – 10 ພະຈິກ 2026",
    heroLocation: "ນະຄອນໜານໜິງ (ກວາງຊີ) ແລະ ປັກກິ່ງ, ປະເທດຈີນ",
    statParticipants: "ຜູ້ເຂົ້າຮ່ວມ",
    statCountries: "ປະເທດ",
    statLecturers: "ວິທະຍາກອນ & ຜູ້ນຳທົວຣ໌",

    // Tabs & Actions
    tabParticipants: "ຜູ້ເຂົ້າຮ່ວມສຳມະນາ (Participants)",
    tabLecturers: "ວິທະຍາກອນ ແລະ ຜູ້ນຳທັດສະນະສຶກສາ (Lecturers & Tour Leads)",
    btnAddLecturer: "ເພີ່ມວິທະຍາກອນ",
    btnAddTourLead: "ຟອມຜູ້ນຳທົວຣ໌",
    btnExportCsv: "ສົ່ງອອກ CSV",
    badgeTourLead: "ຜູ້ນຳທັດສະນະສຶກສາ",
    badgeLecturer: "ວິທະຍາກອນ",
    btnTourGuide: "ຄູ່ມືທັດສະນະສຶກສາ",
    lecturerModalTitle: "ເພີ່ມຂໍ້ມູນວິທະຍາກອນ ແລະ ຫົວຂໍ້ບັນຍາຍ",

    // Search & Filter
    searchPlaceholder: "ຄົ້ນຫາຕາມຊື່, ຊື່ຫຼິ້ນ, ປະເທດ, ອົງກອນ, ຫຼື ຄວາມຊ່ຽວຊານ...",
    sortByLabel: "ຈັດລຽງ:",
    sortNameAsc: "ຊື່ (A – Z)",
    sortNameDesc: "ຊື່ (Z – A)",
    sortCountryAsc: "ສັນຊາດ / ປະເທດ",
    filterNationalityLabel: "ກັ່ນຕອງຕາມປະເທດອາຊຽນ:",
    filterAllCountries: "ທັງໝົດ",
    filterExpertiseLabel: "ກັ່ນຕອງຕາມຄວາມຊ່ຽວຊານ:",
    filterAllExpertise: "ທຸກສາຂາ",
    showingText: "ສະແດງ",
    ofText: "ຈາກທັງໝົດ",
    membersText: "ທ່ານ",
    btnSyncSheet: "ຊິງຄ໌ຂໍ້ມູນ",

    // Participant Cards
    cardPreferred: "ຊື່ຫຼິ້ນ:",
    cardAffiliation: "ສັງກັດ / ອົງກອນ:",
    cardExpertise: "ຄວາມຊ່ຽວຊານ",
    btnSaveContact: "ບັນທຶກເບີ (vCard)",
    btnViewProfile: "ເບິ່ງໂປຣໄຟລ໌",

    // Lecturer Cards
    lecturerSession: "ຫົວຂໍ້ບັນຍາຍ",
    btnDownloadSlides: "ດາວໂຫລດສະໄລ້",
    btnContactLecturer: "ຕິດຕໍ່ວິທະຍາກອນ",

    // Participant Modal
    modalTitle: "ຂໍ້ມູນຜູ້ເຂົ້າຮ່ວມ",
    modalOffice: "ສະຖານທີ່ເຮັດວຽກ",
    modalContactHeader: "ຊ່ອງທາງຕິດຕໍ່",
    modalMessageHeader: "ຂໍ້ຄວາມເຖິງໝູ່ເພື່ອນ",
    modalClose: "ປິດ",

    // Empty States
    emptyTitle: "ບໍ່ພົບຂໍ້ມູນທີ່ກົງກັບການຄົ້ນຫາ",
    emptyDesc: "ກະລຸນາປ່ຽນຄຳຄົ້ນຫາ ຫຼື ລ້າງຕົວກັ່ນຕອງປະເທດ ແລະ ຄວາມຊ່ຽວຊານ",
    btnResetFilters: "ລ້າງຕົວກັ່ນຕອງ",

    // Settings Modal
    settingsTitle: "ຕັ້ງຄ່າເຊື່ອມຕໍ່ Google Sheet",
    settingsDesc: "ເຊື່ອມຕໍ່ Google Sheet ຫຼື Google Apps Script ເພື່ອດຶງຂໍ້ມູນອັດຕະໂນມັດ",
    settingsPartCsvLabel: "1. ລິ້ງ CSV ຜູ້ເຂົ້າຮ່ວມ (Publish to web)",
    settingsLecCsvLabel: "2. ລິ້ງ CSV ວິທະຍາກອນ (Publish to web)",
    settingsScriptLabel: "3. Google Apps Script Web App URL",
    settingsBtnSave: "ບັນທຶກ ແລະ ຊິງຄ໌",
    settingsBtnCancel: "ຍົກເລີກ",

    // Submit Page
    submitPageTitle: "ລົງທະບຽນທຳນຽບຜູ້ເຂົ້າຮ່ວມ | ASEAN Remote Sensing Seminar 2026",
    backToDir: "ກັບສູ່ໜ້າທຳນຽບ",
    submitFormBadge: "ແບບຟອມລົງທະບຽນ",
    submitFormTitle: "ລົງທະບຽນທຳນຽບຜູ້ເຂົ້າຮ່ວມສຳມະນາ",
    submitFormDesc: "Seminar on Remote Sensing Technology for ASEAN Countries (28 ຕຸລາ – 10 ພະຈິກ 2026). ກະລຸນາປ້ອນຂໍ້ມູນ ແລະ ອັບໂຫຼດຮູບພາບຂອງທ່ານ.",
    submitSectionPhoto: "1. ຮູບຖ່າຍປະຈຳຕົວ",
    submitPhotoPrompt: "ຄລິກ ຫຼື ລາກຮູບມາໃສ່ນີ້",
    submitPhotoHint: "ຮອງຮັບ JPG, PNG, WebP (ບໍ່ເກີນ 5MB)",
    submitChangePhoto: "ປ່ຽນຮູບພາບ",
    submitLabelNameEn: "2. Name in English (ຊື່ພາສາອັງກິດ)",
    submitLabelNameNative: "3. ຊື່ໃນພາສາທ້ອງຖິ່ນ (ພາສາລາວ / ໄທ / ຈີນ / ມຽນມາ / ຂະແມ)",
    submitLabelNickname: "4. ຊື່ຫຼິ້ນ ຫຼື ຊື່ທີ່ສະດວກເອີ້ນ",
    submitLabelCountry: "5. ສັນຊາດ / ປະເທດ",
    submitSelectCountry: "ເລືອກປະເທດຂອງທ່ານ",
    submitLabelAffiliation: "6. ສັງກັດ / ອົງກອນ",
    submitLabelPosition: "7. ຕຳແໜ່ງໜ້າທີ່",
    submitLabelExpertise: "8. ສາຂາຄວາມຊ່ຽວຊານ",
    submitExpertiseHint: "ຄລິກເລືອກຫົວຂໍ້ແນະນຳຂ້າງລຸ່ມ ຫຼື ພິມລະບຸຄວາມຊ່ຽວຊານຂອງຕົນເອງ",
    submitSelectedTags: "ຄວາມຊ່ຽວຊານທີ່ເລືອກໄວ້:",
    submitRemoveTagHint: "ຄລິກ × ເພື່ອລຶບອອກ",
    submitNoTagsSelected: "ຍັງບໍ່ໄດ້ເລືອກຄວາມຊ່ຽວຊານ ຄລິກເລືອກຫົວຂໍ້ແນະນຳຂ້າງລຸ່ມ ຫຼື ພິມລະບຸເອງໄດ້",
    submitSuggestedTags: "ຫົວຂໍ້ແນະນຳ (ຄລິກເພື່ອເລືອກ/ຍົກເລີກ):",
    submitCustomTagPlaceholder: "ພິມຄວາມຊ່ຽວຊານອື່ນໆ (ເຊັ່ນ LiDAR, InSAR, Google Earth Engine) ແລ້ວກົດ Enter",
    submitBtnAddTag: "ເພີ່ມແທັກ",
    submitLabelOffice: "9. ທີ່ຕັ້ງບ່ອນເຮັດວຽກ (ເມືອງ / ປະເທດ)",
    submitContactSection: "ຊ່ອງທາງການຕິດຕໍ່ ແລະ ໂຊຊຽວມີເດຍ",
    submitLabelEmail: "ອີເມວ",
    submitLabelPhone: "ເບີໂທລະສັບມືຖື",
    submitLabelWechat: "WeChat ID (ໄອດີວີແຊັດ)",
    badgeWechatRec: "ແນະນຳສຳລັບສຳມະນາທີ່ປະເທດຈີນ",
    submitLabelLine: "LINE ID (ໄລນ໌ໄອດີ)",
    submitLabelWhatsapp: "ເບີ WhatsApp",
    submitLabelFacebook: "ຊື່ Facebook / ລິ້ງໂປຣໄຟລ໌",
    submitLabelLinkedin: "ລິ້ງ LinkedIn",
    submitLabelWebsite: "ເວັບໄຊສ່ວນຕົວ / ຫ້ອງທົດລອງ / Portfolio",
    submitLabelMessage: "ຂໍ້ຄວາມທັກທາຍເຖິງເພື່ອນຮ່ວມຮຸ່ນ",
    submitBtnCancel: "ຍົກເລີກ",
    submitBtnSubmit: "ສົ່ງຂໍ້ມູນລົງທະບຽນ",
    submitBtnSubmitting: "ກຳລັງບັນທຶກ...",
    submitSuccessTitle: "ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ!",
    submitSuccessDesc: "ຍິນດີຕ້ອນຮັບເຂົ້າສູ່ທຳນຽບຜູ້ເຂົ້າຮ່ວມສຳມະນາເຕັກໂນໂລຊີສຳຫຼວດໄລຍະໄກ.",
    submitBtnViewDirectory: "ໄປທີ່ໜ້າທຳນຽບ",
    submitBtnAddAnother: "ລົງທະບຽນທ່ານອື່ນເພີ່ມ",

    // Tour Lead Form Page
    tourLeadPageTitle: "ລົງທະບຽນຜູ້ນຳທັດສະນະສຶກສາ | ASEAN Remote Sensing Seminar 2026",
    tourLeadFormBadge: "ຜູ້ປະສານງານ ແລະ ຜູ້ນຳທັດສະນະສຶກສາ",
    tourLeadFormTitle: "ລົງທະບຽນປະຫວັດຜູ້ນຳທັດສະນະສຶກສາ",
    tourLeadFormDesc: "Seminar on Remote Sensing Technology for ASEAN Countries (28 ຕຸລາ – 10 ພະຈິກ 2026). ກະລຸນາປ້ອນຂໍ້ມູນ ແລະ ລາຍລະອຽດການນຳທັດສະນະສຶກສາ.",
    tourLeadLabelTourName: "ຫົວຂໍ້ທັດສະນະສຶກສາ / ເສັ້ນທາງທີ່ຮັບຜິດຊອບ",
    tourLeadLabelTourDate: "ວັນທີ ແລະ ເວລາທັດສະນະສຶກສາ",
    tourLeadLabelRole: "ບົດບາດໜ້າທີ່ / ຕຳແໜ່ງ",
    tourLeadLabelHighlights: "ຈຸດເດັ່ນ ແລະ ຄຳແນະນຳສຳລັບຜູ້ຮ່ວມທຣິບ",
    tourLeadLabelGuideUrl: "ລິ້ງກຳນົດການ / ຄູ່ມືທັດສະນະສຶກສາ",
    tourLeadSuccessTitle: "ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ!",
    tourLeadSuccessDesc: "ຂໍ້ມູນຂອງທ່ານຖືກບັນທຶກລົງໃນທຳນຽບວິທະຍາກອນ ແລະ ຜູ້ນຳທັດສະນະສຶກສາຮຽບຮ້ອຍແລ້ວ"
  },

  zh: {
    // Header & Brand
    directoryPageTitle: "东盟遥感技术研讨会名录 | ASEAN Remote Sensing Seminar 2026",
    seminarBadge: "ASEAN RS 2026",
    datesHeader: "2026年10月28日 – 11月10日",
    brandTitle: "东盟国家遥感技术赋能新质生产力研修班通讯录",
    addProfileBtn: "添加档案",
    googleSheetBtn: "Google Sheet",

    // Hero Section
    heroBadge: "东盟国家遥感技术赋能新质生产力研修班",
    heroTitle: "研修班学员及专家讲师名录",
    heroDesc: "东盟国家遥感技术赋能新质生产力研修班在线名录系统。由广西国际商务职业技术学院承办，举办地为中国广西南宁市及考察城市北京市（2026年10月28日至11月10日）。",
    heroDates: "2026年10月28日 – 11月10日",
    heroLocation: "中国广西南宁市及北京市",
    statParticipants: "参会学员",
    statCountries: "代表国家",
    statLecturers: "讲师与考察领队",

    // Tabs & Actions
    tabParticipants: "学员名录 (Participants)",
    tabLecturers: "专家讲师与考察领队 (Lecturers & Tour Leads)",
    btnAddLecturer: "添加讲师",
    btnAddTourLead: "考察领队登记表",
    btnExportCsv: "导出 CSV",
    badgeTourLead: "考察领队",
    badgeLecturer: "授课专家",
    btnTourGuide: "考察行程指南 / 课件",
    lecturerModalTitle: "添加讲师与专题讲座信息",

    // Search & Filter
    searchPlaceholder: "搜索姓名（中英文）、昵称、国家、工作机构或专业专长...",
    sortByLabel: "排序:",
    sortNameAsc: "姓名 (A – Z)",
    sortNameDesc: "姓名 (Z – A)",
    sortCountryAsc: "国籍 / 国家",
    filterNationalityLabel: "按东盟国家筛选:",
    filterAllCountries: "全部国家",
    filterExpertiseLabel: "按专业领域筛选:",
    filterAllExpertise: "全部领域",
    showingText: "显示",
    ofText: "共",
    membersText: "位人员",
    btnSyncSheet: "同步数据",

    // Participant Cards
    cardPreferred: "常用称谓:",
    cardAffiliation: "所属机构:",
    cardExpertise: "专长领域",
    btnSaveContact: "保存名片 (vCard)",
    btnViewProfile: "查看详细档案",

    // Lecturer Cards
    lecturerSession: "专题讲座",
    btnDownloadSlides: "下载讲义课件",
    btnContactLecturer: "联系讲师",

    // Participant Modal
    modalTitle: "学员档案详情",
    modalOffice: "办公地点",
    modalContactHeader: "联系方式",
    modalMessageHeader: "寄语与交流留言",
    modalClose: "关闭",

    // Empty States
    emptyTitle: "未找到符合条件的档案",
    emptyDesc: "请尝试更改搜索关键词或重置国家与专业筛选条件。",
    btnResetFilters: "重置所有筛选",

    // Settings Modal
    settingsTitle: "Google Sheet 数据连接设置",
    settingsDesc: "连接您的 Google Sheet 或 Google Apps Script 网页应用以实现实时数据同步。",
    settingsPartCsvLabel: "1. 学员表 CSV 链接 (Publish to web)",
    settingsLecCsvLabel: "2. 讲师表 CSV 链接 (Publish to web)",
    settingsScriptLabel: "3. Google Apps Script Web App URL",
    settingsBtnSave: "保存并同步",
    settingsBtnCancel: "取消",

    // Submit Page
    submitPageTitle: "研讨会学员名录登记 | ASEAN Remote Sensing Seminar 2026",
    backToDir: "返回名录主页",
    submitFormBadge: "学员档案登记表",
    submitFormTitle: "研讨会学员个人档案登记",
    submitFormDesc: "东盟国家遥感技术赋能新质生产力研修班（2026年10月28日至11月10日，中国广西南宁市及北京市）。请填写您的个人信息并上传头像照片以载入在线名录。",
    submitSectionPhoto: "1. 个人照片",
    submitPhotoPrompt: "点击或拖拽照片到此处",
    submitPhotoHint: "支持 JPG, PNG, WebP 格式（文件不超过 5MB）",
    submitChangePhoto: "更换照片",
    submitLabelNameEn: "2. 英文姓名 (Name in English)",
    submitLabelNameNative: "3. 母语姓名 (中文 / ພາສາລາວ / ไทย / မြန်မာ / ភាសាខ្មែរ)",
    submitLabelNickname: "4. 常用称谓或昵称 (Preferred Name)",
    submitLabelCountry: "5. 国籍 / 所在国家",
    submitSelectCountry: "请选择您的国家",
    submitLabelAffiliation: "6. 工作单位 / 所属机构",
    submitLabelPosition: "7. 职务 / 职称",
    submitLabelExpertise: "8. 研究专长与技术领域",
    submitExpertiseHint: "可点击下方推荐标签，或输入您专属的研究专长",
    submitSelectedTags: "已选择的研究专长：",
    submitRemoveTagHint: "点击 × 移除",
    submitNoTagsSelected: "尚未选择研究专长。请点击下方建议标签或自行输入。",
    submitSuggestedTags: "推荐主题（点击选择或取消）：",
    submitCustomTagPlaceholder: "输入自定义专长（例如：LiDAR、InSAR、Google Earth Engine、蓝碳）并按回车",
    submitBtnAddTag: "添加标签",
    submitLabelOffice: "9. 办公地点（城市、建筑或国家）",
    submitContactSection: "联络方式与即时通讯",
    submitLabelEmail: "电子邮箱",
    submitLabelPhone: "手机号码",
    submitLabelWechat: "微信账号 (WeChat ID)",
    badgeWechatRec: "中国研修推荐使用",
    submitLabelLine: "LINE ID",
    submitLabelWhatsapp: "WhatsApp 号码",
    submitLabelFacebook: "Facebook 个人主页 / 姓名",
    submitLabelLinkedin: "LinkedIn 个人主页",
    submitLabelWebsite: "个人网站 / 实验室主页 / 作品集",
    submitLabelMessage: "给其他参会学者的留言/寄语",
    submitBtnCancel: "取消",
    submitBtnSubmit: "提交个人档案",
    submitBtnSubmitting: "正在保存档案...",
    submitSuccessTitle: "档案提交成功！",
    submitSuccessDesc: "欢迎加入东盟遥感技术研讨会学术通讯录。",
    submitBtnViewDirectory: "前往名录主页",
    submitBtnAddAnother: "继续添加下一位",

    // Tour Lead Form Page
    tourLeadPageTitle: "考察领队登记 | ASEAN Remote Sensing Seminar 2026",
    tourLeadFormBadge: "实地技术考察与现场研学协调员",
    tourLeadFormTitle: "考察领队个人档案登记",
    tourLeadFormDesc: "东盟国家遥感技术赋能新质生产力研修班（2026年10月28日至11月10日）。请填写考察领队及现场研学协调员信息，以载入名录。",
    tourLeadLabelTourName: "负责的实地考察 / 专题研学路线",
    tourLeadLabelTourDate: "考察日期与时间",
    tourLeadLabelRole: "担任角色 / 职务头衔",
    tourLeadLabelHighlights: "考察参访亮点、研学要点及行前注意事项",
    tourLeadLabelGuideUrl: "考察行程指南 / 研学手册链接 (Google Drive / PDF)",
    tourLeadSuccessTitle: "考察领队档案提交成功！",
    tourLeadSuccessDesc: "您的信息已成功加入讲师与考察领队名录。"
  },

  my: {
    // Header & Brand
    directoryPageTitle: "အာဆီယံ အဝေးအာရုံခံနည်းပညာ သင်တန်းသားလမ်းညွှန် | ASEAN Remote Sensing Seminar 2026",
    seminarBadge: "ASEAN RS 2026",
    datesHeader: "၂၈ အောက်တိုဘာ – ၁၀ နိုဝင်ဘာ ၂၀၂၆",
    brandTitle: "အာဆီယံ အဝေးအာရုံခံနည်းပညာ သင်တန်းသားလမ်းညွှန်",
    addProfileBtn: "ကိုယ်ရေးထည့်ရန်",
    googleSheetBtn: "Google Sheet",

    // Hero Section
    heroBadge: "Seminar on Remote Sensing Technology Empowering New Quality Productive Forces for ASEAN Countries",
    heroTitle: "သင်တန်းသားများနှင့် ဟောပြောပို့ချသူ ဆရာများလမ်းညွှန်",
    heroDesc: "အာဆီယံနိုင်ငံများနှင့် ပညာရှင်များအတွက် အွန်လိုင်းလမ်းညွှန်ဖြစ်ပြီး Google Sheet နှင့် အချိန်နှင့်တပြေးညီ ချိတ်ဆက်နိုင်ပါသည်။",
    heroDates: "၂၀၂၆ ခုနှစ်၊ အောက်တိုဘာ ၂၈ မှ နိုဝင်ဘာ ၁၀ ထိ",
    heroLocation: "နန်နင်းမြို့ (ကွမ်ရှီး) နှင့် ပေကျင်းမြို့၊ တရုတ်ပြည်သူ့သမ္မတနိုင်ငံ",
    statParticipants: "သင်တန်းသားများ",
    statCountries: "ပါဝင်နိုင်ငံများ",
    statLecturers: "ပို့ချသူများနှင့် ခေါင်းဆောင်များ",

    // Tabs & Actions
    tabParticipants: "သင်တန်းသားများ (Participants)",
    tabLecturers: "ဟောပြောပို့ချသူများနှင့် လေ့လာရေးခေါင်းဆောင်များ (Lecturers & Tour Leads)",
    btnAddLecturer: "ပို့ချသူထည့်ရန်",
    btnAddTourLead: "လေ့လာရေးခေါင်းဆောင်ပုံစံ",
    btnExportCsv: "CSV ထုတ်ယူရန်",
    badgeTourLead: "လေ့လာရေးခေါင်းဆောင်",
    badgeLecturer: "ဟောပြောပို့ချသူ",
    btnTourGuide: "လေ့လာရေးလမ်းညွှန် / အစီအစဉ်",
    lecturerModalTitle: "ဟောပြောပို့ချသူနှင့် သင်တန်းအကြောင်းအရာထည့်သွင်းရန်",

    // Search & Filter
    searchPlaceholder: "အမည်၊ နိုင်ငံ၊ ဌာန သို့မဟုတ် ကျွမ်းကျင်မှုဖြင့် ရှာဖွေပါ...",
    sortByLabel: "စီစဉ်ရန်:",
    sortNameAsc: "အမည် (A – Z)",
    sortNameDesc: "အမည် (Z – A)",
    sortCountryAsc: "နိုင်ငံအလိုက်",
    filterNationalityLabel: "အာဆီယံနိုင်ငံအလိုက် စစ်ထုတ်ရန်:",
    filterAllCountries: "အားလုံး",
    filterExpertiseLabel: "ကျွမ်းကျင်မှုနယ်ပယ် စစ်ထုတ်ရန်:",
    filterAllExpertise: "နယ်ပယ်အားလုံး",
    showingText: "ပြသနေသည်",
    ofText: "မှ",
    membersText: "ဦး",
    btnSyncSheet: "ဒေတာပြန်ချိန်ရန်",

    // Participant Cards
    cardPreferred: "အမည်ပြောင်:",
    cardAffiliation: "အဖွဲ့အစည်း:",
    cardExpertise: "ကျွမ်းကျင်မှု",
    btnSaveContact: "လိပ်စာသိမ်းရန် (vCard)",
    btnViewProfile: "အသေးစိတ်ကြည့်ရန်",

    // Lecturer Cards
    lecturerSession: "ပို့ချသည့်ခေါင်းစဉ်",
    btnDownloadSlides: "ဆလိုက်များဒေါင်းလုဒ်လုပ်ရန်",
    btnContactLecturer: "ပို့ချသူကို ဆက်သွယ်ရန်",

    // Participant Modal
    modalTitle: "သင်တန်းသား အသေးစိတ်အချက်အလက်",
    modalOffice: "ရုံးတည်နေရာ",
    modalContactHeader: "ဆက်သွယ်ရန် အချက်အလက်",
    modalMessageHeader: "အခြားသူများသို့ နှုတ်ခွန်းဆက်စကား",
    modalClose: "ပိတ်ရန်",

    // Empty States
    emptyTitle: "ကိုက်ညီသော အချက်အလက် မတွေ့ပါ",
    emptyDesc: "ရှာဖွေမှုစကားလုံးကို ပြင်ဆင်ပြီး ထပ်မံကြိုးစားပါ။",
    btnResetFilters: "အားလုံးပြန်လည်သတ်မှတ်ရန်",

    // Settings Modal
    settingsTitle: "Google Sheet ချိတ်ဆက်မှု ဆက်တင်များ",
    settingsDesc: "Google Sheet သို့မဟုတ် Apps Script နှင့် ချိတ်ဆက်ပါ",
    settingsPartCsvLabel: "၁။ သင်တန်းသားများ CSV လင့်ခ် (Publish to web)",
    settingsLecCsvLabel: "၂။ ပို့ချသူများ CSV လင့်ခ် (Publish to web)",
    settingsScriptLabel: "၃။ Google Apps Script Web App URL",
    settingsBtnSave: "သိမ်းဆည်းပြီး ချိန်ကိုက်ရန်",
    settingsBtnCancel: "မလုပ်တော့ပါ",

    // Submit Page
    submitPageTitle: "သင်တန်းသား မှတ်ပုံတင်ခြင်း | ASEAN Remote Sensing Seminar 2026",
    backToDir: "လမ်းညွှန်စာမျက်နှာသို့ ပြန်သွားရန်",
    submitFormBadge: "သင်တန်းသား မှတ်ပုံတင်ပုံစံ",
    submitFormTitle: "သင်တန်းသား ကိုယ်ရေးအချက်အလက် ဖြည့်သွင်းခြင်း",
    submitFormDesc: "Seminar on Remote Sensing Technology for ASEAN Countries (၂၈ အောက်တိုဘာ – ၁၀ နိုဝင်ဘာ ၂၀၂၆)။ ကျေးဇူးပြု၍ သင့်အချက်အလက်များကို ဖြည့်သွင်းပြီး ဓာတ်ပုံတင်ပေးပါ။",
    submitSectionPhoto: "၁။ မျက်နှာဓာတ်ပုံ",
    submitPhotoPrompt: "ဤနေရာတွင် ဓာတ်ပုံရွေးချယ်ပါ သို့မဟုတ် ဆွဲထည့်ပါ",
    submitPhotoHint: "JPG, PNG, WebP (အများဆုံး 5MB)",
    submitChangePhoto: "ဓာတ်ပုံပြောင်းရန်",
    submitLabelNameEn: "၂။ အင်္ဂလိပ်အမည် (Name in English)",
    submitLabelNameNative: "၃။ မိခင်ဘာသာဖြင့် အမည် (မြန်မာ / ไทย / ພາສາລາວ / 中文 / ខ្មែរ)",
    submitLabelNickname: "၄။ အမည်ပြောင် သို့မဟုတ် အလွယ်ခေါ်ရန် အမည်",
    submitLabelCountry: "၅။ နိုင်ငံသား / နိုင်ငံ",
    submitSelectCountry: "သင့်နိုင်ငံကို ရွေးပါ",
    submitLabelAffiliation: "6။ လုပ်ငန်းဌာန / အဖွဲ့အစည်း",
    submitLabelPosition: "၇။ ရာထူး / တာဝန်",
    submitLabelExpertise: "၈။ ကျွမ်းကျင်မှု နယ်ပယ်များ",
    submitExpertiseHint: "အောက်ပါအကြံပြုချက်များကို ရွေးပါ သို့မဟုတ် ကိုယ်ပိုင်ကျွမ်းကျင်မှုကို ရိုက်ထည့်ပါ",
    submitSelectedTags: "ရွေးချယ်ထားသော ကျွမ်းကျင်မှုများ -",
    submitRemoveTagHint: "ဖယ်ရှားရန် × ကိုနှိပ်ပါ",
    submitNoTagsSelected: "ကျွမ်းကျင်မှု မရွေးချယ်ရသေးပါ။ အောက်ပါအကြံပြုချက်များကို ရွေးပါ သို့မဟုတ် ကိုယ်တိုင်ရိုက်ထည့်ပါ။",
    submitSuggestedTags: "အကြံပြုခေါင်းစဉ်များ (ထည့်ရန်/ပယ်ဖျက်ရန် နှိပ်ပါ) -",
    submitCustomTagPlaceholder: "အခြားကျွမ်းကျင်မှု (ဥပမာ LiDAR, InSAR, Google Earth Engine) ရိုက်ထည့်ပြီး Enter နှိပ်ပါ",
    submitBtnAddTag: "တဂ်ထည့်ပါ",
    submitLabelOffice: "၉။ ရုံးတည်နေရာ (မြို့၊ နိုင်ငံ)",
    submitContactSection: "ဆက်သွယ်ရန် ချန်နယ်များ",
    submitLabelEmail: "အီးမေးလ် လိပ်စာ",
    submitLabelPhone: "ဖုန်းနံပါတ် / မိုဘိုင်းလ်",
    submitLabelWechat: "WeChat ID",
    badgeWechatRec: "တရုတ်သင်တန်းအတွက် အကြံပြုပါသည်",
    submitLabelLine: "LINE ID",
    submitLabelWhatsapp: "WhatsApp နံပါတ်",
    submitLabelFacebook: "Facebook အကောင့် / လင့်ခ်",
    submitLabelLinkedin: "LinkedIn လင့်ခ်",
    submitLabelWebsite: "ကိုယ်ပိုင်ဝဘ်ဆိုက် / ဓာတ်ခွဲခန်း / Portfolio",
    submitLabelMessage: "သင်တန်းသားများသို့ နှုတ်ခွန်းဆက်စကား",
    submitBtnCancel: "မလုပ်တော့ပါ",
    submitBtnSubmit: "အချက်အလက်များ ပေးပို့ရန်",
    submitBtnSubmitting: "သိမ်းဆည်းနေပါသည်...",
    submitSuccessTitle: "အောင်မြင်စွာ သိမ်းဆည်းပြီးပါပြီ!",
    submitSuccessDesc: "အာဆီယံ အဝေးအာရုံခံနည်းပညာ လမ်းညွှန်မှ ကြိုဆိုပါသည်။",
    submitBtnViewDirectory: "လမ်းညွှန်စာမျက်နှာသို့ သွားရန်",
    submitBtnAddAnother: "နောက်တစ်ဦး ထပ်မံဖြည့်ရန်",

    // Tour Lead Form Page
    tourLeadPageTitle: "လေ့လာရေးခေါင်းဆောင် မှတ်ပုံတင်ခြင်း | ASEAN Remote Sensing Seminar 2026",
    tourLeadFormBadge: "ကွင်းဆင်းလေ့လာရေးနှင့် နည်းပညာခရီးစဉ် ညှိနှိုင်းရေးမှူး",
    tourLeadFormTitle: "လေ့လာရေးခေါင်းဆောင် ကိုယ်ရေးမှတ်တမ်း ဖြည့်သွင်းခြင်း",
    tourLeadFormDesc: "Seminar on Remote Sensing Technology for ASEAN Countries (၂၈ အောက်တိုဘာ – ၁၀ နိုဝင်ဘာ ၂၀၂၆)။ ကျေးဇူးပြု၍ သင့်အချက်အလက်များနှင့် လေ့လာရေးခရီးစဉ်အသေးစိတ်ကို ဖြည့်သွင်းပေးပါ။",
    tourLeadLabelTourName: "တာဝန်ယူထားသော လေ့လာရေးခရီးစဉ် / အစီအစဉ်",
    tourLeadLabelTourDate: "လေ့လာရေးနေ့ရက်နှင့် အချိန်",
    tourLeadLabelRole: "တာဝန် / ရာထူး",
    tourLeadLabelHighlights: "ခရီးစဉ်အဓိကအချက်များ၊ လမ်းညွှန်ချက်များနှင့် သတိပြုရန်များ",
    tourLeadLabelGuideUrl: "ခရီးစဉ်အစီအစဉ် / လမ်းညွှန်စာအုပ် လင့်ခ်",
    tourLeadSuccessTitle: "လေ့လာရေးခေါင်းဆောင် အချက်အလက်များ သိမ်းဆည်းပြီးပါပြီ!",
    tourLeadSuccessDesc: "သင့်အချက်အလက်များကို ဟောပြောပို့ချသူများနှင့် လေ့လာရေးခေါင်းဆောင်များ လမ်းညွှန်တွင် ထည့်သွင်းပြီးပါပြီ။"
  },

  km: {
    // Header & Brand
    directoryPageTitle: "បញ្ជីឈ្មោះសិក្ខាកាម Remote Sensing អាស៊ាន ២០២៦",
    seminarBadge: "ASEAN RS 2026",
    datesHeader: "២៨ តុលា – ១០ វិច្ឆិកា ២០២៦",
    brandTitle: "បញ្ជីឈ្មោះសិក្ខាកាមបច្ចេកវិទ្យា Remote Sensing អាស៊ាន",
    addProfileBtn: "ចុះឈ្មោះ",
    googleSheetBtn: "Google Sheet",

    // Hero Section
    heroBadge: "Seminar on Remote Sensing Technology Empowering New Quality Productive Forces for ASEAN Countries",
    heroTitle: "បញ្ជីឈ្មោះសិក្ខាកាម និងសាស្រ្តាចារ្យឧទ្ទេសនាម",
    heroDesc: "ប្រព័ន្ធបញ្ជីឈ្មោះអនឡាញសម្រាប់បណ្តាប្រទេសសមាជិកអាស៊ាន និងអ្នកជំនាញបច្ចេកវិទ្យា Remote Sensing ភ្ជាប់ទិន្នន័យ Google Sheet ផ្ទាល់។",
    heroDates: "២៨ តុលា – ១០ វិច្ឆិកា ២០២៦",
    heroLocation: "ទីក្រុងណាននីង (ក្វាងស៊ី) និង ប៉េកាំង, ប្រទេសចិន",
    statParticipants: "សិក្ខាកាម",
    statCountries: "ប្រទេស",
    statLecturers: "សាស្ត្រាចារ្យ & អ្នកដឹកនាំ",

    // Tabs & Actions
    tabParticipants: "សិក្ខាកាម (Participants)",
    tabLecturers: "សាស្ត្រាចារ្យ និងអ្នកដឹកនាំទស្សនកិច្ច (Lecturers & Tour Leads)",
    btnAddLecturer: "បន្ថែមសាស្ត្រាចារ្យ",
    btnAddTourLead: "ទម្រង់អ្នកដឹកនាំទស្សនកិច្ច",
    btnExportCsv: "ទាញយក CSV",
    badgeTourLead: "អ្នកដឹកនាំទស្សនកិច្ច",
    badgeLecturer: "សាស្ត្រាចារ្យឧទ្ទេសនាម",
    btnTourGuide: "កាលវិភាគ / សៀវភៅណែនាំ",
    lecturerModalTitle: "បន្ថែមព័ត៌មានសាស្ត្រាចារ្យ និងប្រធានបទបង្រៀន",

    // Search & Filter
    searchPlaceholder: "ស្វែងរកតាមឈ្មោះ, ប្រទេស, អង្គភាព ឬ ជំនាញឯកទេស...",
    sortByLabel: "តម្រៀបតាម:",
    sortNameAsc: "ឈ្មោះ (A – Z)",
    sortNameDesc: "ឈ្មោះ (Z – A)",
    sortCountryAsc: "សញ្ជាតិ / ប្រទេស",
    filterNationalityLabel: "ចម្រាញ់តាមប្រទេសអាស៊ាន:",
    filterAllCountries: "ទាំងអស់",
    filterExpertiseLabel: "ចម្រាញ់តាមជំនាញឯកទេស:",
    filterAllExpertise: "គ្រប់ជំនាញ",
    showingText: "បង្ហាញ",
    ofText: "នៃ",
    membersText: "រូប",
    btnSyncSheet: "ធ្វើសមកាលកម្ម",

    // Participant Cards
    cardPreferred: "ឈ្មោះហៅក្រៅ:",
    cardAffiliation: "អង្គភាព / ស្ថាប័ន:",
    cardExpertise: "ជំនាញឯកទេស",
    btnSaveContact: "រក្សាទុកទំនាក់ទំនង (vCard)",
    btnViewProfile: "មើលព័ត៌មានលម្អិត",

    // Lecturer Cards
    lecturerSession: "ប្រធានបទឧទ្ទេសនាម",
    btnDownloadSlides: "ទាញយកឯកសារស្លាយ",
    btnContactLecturer: "ទាក់ទងសាស្ត្រាចារ្យ",

    // Participant Modal
    modalTitle: "ព័ត៌មានលម្អិតសិក្ខាកាម",
    modalOffice: "ទីតាំងកន្លែងធ្វើការ",
    modalContactHeader: "ព័ត៌មានទំនាក់ទំនង",
    modalMessageHeader: "សារជូនចំពោះសិក្ខាកាមដទៃទៀត",
    modalClose: "បិទ",

    // Empty States
    emptyTitle: "រកមិនឃើញទិន្នន័យដែលត្រូវគ្នាឡើយ",
    emptyDesc: "សូមព្យាយាមផ្លាស់ប្តូរពាក្យស្វែងរក ឬសម្អាតតម្រងប្រទេស និងជំនាញ។",
    btnResetFilters: "កំណត់តម្រងឡើងវិញ",

    // Settings Modal
    settingsTitle: "ការកំណត់តភ្ជាប់ Google Sheet",
    settingsDesc: "ភ្ជាប់ទៅកាន់ Google Sheet ឬ Google Apps Script ដើម្បីធ្វើបច្ចុប្បន្នភាពទិន្នន័យផ្ទាល់",
    settingsPartCsvLabel: "១. តំណភ្ជាប់ CSV សិក្ខាកាម (Publish to web)",
    settingsLecCsvLabel: "២. តំណភ្ជាប់ CSV សាស្ត្រាចារ្យ (Publish to web)",
    settingsScriptLabel: "៣. Google Apps Script Web App URL",
    settingsBtnSave: "រក្សាទុក និងភ្ជាប់",
    settingsBtnCancel: "បោះបង់",

    // Submit Page
    submitPageTitle: "ចុះឈ្មោះបញ្ជីសិក្ខាកាម | ASEAN Remote Sensing Seminar 2026",
    backToDir: "ត្រឡប់ទៅកាន់បញ្ជីឈ្មោះ",
    submitFormBadge: "ទម្រង់បែបបទចុះឈ្មោះ",
    submitFormTitle: "ចុះឈ្មោះព័ត៌មានសិក្ខាកាម",
    submitFormDesc: "Seminar on Remote Sensing Technology for ASEAN Countries (២៨ តុលា – ១០ វិច្ឆិកា ២០២៦)។ សូមបំពេញព័ត៌មាន និងបង្ហោះរូបថតរបស់អ្នក។",
    submitSectionPhoto: "១. រូបថតផ្ទាល់ខ្លួន",
    submitPhotoPrompt: "ចុច ឬ អូសរូបថតមកទីនេះ",
    submitPhotoHint: "គាំទ្រ JPG, PNG, WebP (អតិបរមា 5MB)",
    submitChangePhoto: "ប្តូររូបថត",
    submitLabelNameEn: "២. ឈ្មោះជាភាសាអង់គ្លេស (Name in English)",
    submitLabelNameNative: "៣. ឈ្មោះជាភាសាជាតិ (ខ្មែរ / ไทย / ພາສາລາວ / 中文 / မြန်မာ)",
    submitLabelNickname: "៤. ឈ្មោះហៅក្រៅ ឬ ឈ្មោះងាយស្រួលហៅ",
    submitLabelCountry: "៥. សញ្ជាតិ / ប្រទេស",
    submitSelectCountry: "ជ្រើសរើសប្រទេសរបស់អ្នក",
    submitLabelAffiliation: "៦. អង្គភាព / ស្ថាប័នបម្រើការងារ",
    submitLabelPosition: "៧. តួនាទី / មុខតំណែង",
    submitLabelExpertise: "៨. ជំនាញឯកទេស",
    submitExpertiseHint: "ជ្រើសរើសពីប្រធានបទណែនាំខាងក្រោម ឬវាយបញ្ចូលជំនាញផ្ទាល់ខ្លួន",
    submitSelectedTags: "ជំនាញឯកទេសដែលបានជ្រើសរើស៖",
    submitRemoveTagHint: "ចុច × ដើម្បីលុបចេញ",
    submitNoTagsSelected: "មិនទាន់បានជ្រើសរើសជំនាញឯកទេសនៅឡើយទេ។ សូមចុចលើប្រធានបទណែនាំខាងក្រោម ឬវាយបញ្ចូលដោយខ្លួនឯង។",
    submitSuggestedTags: "ប្រធានបទណែនាំ (ចុចដើម្បីបន្ថែម/លុបចេញ)៖",
    submitCustomTagPlaceholder: "វាយបញ្ចូលជំនាញផ្ទាល់ខ្លួន (ឧ. LiDAR, InSAR, Google Earth Engine) ហើយចុច Enter",
    submitBtnAddTag: "បន្ថែមស្លាក",
    submitLabelOffice: "៩. ទីតាំងកន្លែងធ្វើការ (ទីក្រុង, ប្រទេស)",
    submitContactSection: "ព័ត៌មានទំនាក់ទំនង",
    submitLabelEmail: "អាសយដ្ឋានអ៊ីមែល",
    submitLabelPhone: "លេខទូរស័ព្ទ / ទូរស័ព្ទដៃ",
    submitLabelWechat: "WeChat ID",
    badgeWechatRec: "ណែនាំសម្រាប់សិក្ខាសាលានៅប្រទេសចិន",
    submitLabelLine: "LINE ID",
    submitLabelWhatsapp: "លេខ WhatsApp",
    submitLabelFacebook: "Facebook Profile / ឈ្មោះ",
    submitLabelLinkedin: "តំណភ្ជាប់ LinkedIn",
    submitLabelWebsite: "គេហទំព័រផ្ទាល់ខ្លួន / មន្ទីរពិសោធន៍ / Portfolio",
    submitLabelMessage: "សារជូនពរ ឬ ស្វាគមន៍មិត្តរួមជំនាន់",
    submitBtnCancel: "បោះបង់",
    submitBtnSubmit: "ផ្ញើព័ត៌មានចុះឈ្មោះ",
    submitBtnSubmitting: "កំពុងរក្សាទុក...",
    submitSuccessTitle: "បានរក្សាទុកដោយជោគជ័យ!",
    submitSuccessDesc: "សូមស្វាគមន៍មកកាន់បញ្ជីឈ្មោះសិក្ខាកាមបច្ចេកវិទ្យា Remote Sensing អាស៊ាន។",
    submitBtnViewDirectory: "ទៅកាន់ទំព័របញ្ជីឈ្មោះ",
    submitBtnAddAnother: "ចុះឈ្មោះអ្នកផ្សេងទៀតបន្ថែម",

    // Tour Lead Form Page
    tourLeadPageTitle: "ចុះឈ្មោះអ្នកដឹកនាំទស្សនកិច្ច | ASEAN Remote Sensing Seminar 2026",
    tourLeadFormBadge: "អ្នកសម្របសម្រួល និងដឹកនាំទស្សនកិច្ចសិក្សាជាក់ស្តែង",
    tourLeadFormTitle: "ចុះឈ្មោះព័ត៌មានអ្នកដឹកនាំទស្សនកិច្ច",
    tourLeadFormDesc: "Seminar on Remote Sensing Technology for ASEAN Countries (២៨ តុលា – ១០ វិច្ឆិកា ២០២៦)។ សូមបំពេញព័ត៌មាន និងព័ត៌មានលម្អិតនៃដំណើរទស្សនកិច្ច។",
    tourLeadLabelTourName: "កម្មវិធីទស្សនកិច្ច / ទីតាំងចុះសិក្សាជាក់ស្តែង",
    tourLeadLabelTourDate: "កាលបរិច្ឆេទ និងពេលវេលាទស្សនកិច្ច",
    tourLeadLabelRole: "តួនាទី / មុខតំណែង",
    tourLeadLabelHighlights: "ចំណុចសំខាន់ៗនៃការទស្សនកិច្ច និងការណែនាំ",
    tourLeadLabelGuideUrl: "តំណភ្ជាប់កាលវិភាគ / សៀវភៅណែនាំ",
    tourLeadSuccessTitle: "បានរក្សាទុកព័ត៌មានអ្នកដឹកនាំទស្សនកិច្ច!",
    tourLeadSuccessDesc: "ព័ត៌មានរបស់អ្នកត្រូវបានបន្ថែមទៅក្នុងបញ្ជីឈ្មោះសាស្ត្រាចារ្យ និងអ្នកដឹកនាំទស្សនកិច្ចរួចរាល់ហើយ។"
  }
};

/**
 * Get current active language code (defaults to 'en' or saved choice)
 */
export function getCurrentLang() {
  const saved = localStorage.getItem('rs_selected_lang');
  if (saved && SUPPORTED_LANGUAGES[saved]) {
    return saved;
  }
  return 'en';
}

/**
 * Set active language code and save to localStorage
 */
export function setLanguage(langCode) {
  if (!SUPPORTED_LANGUAGES[langCode]) langCode = 'en';
  localStorage.setItem('rs_selected_lang', langCode);
  document.documentElement.lang = langCode;
  applyTranslations(langCode);
  
  // Dispatch custom event so app or other modules can re-render if needed
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: langCode } }));
}

/**
 * Translate a single key for a given language (falls back to English, then bare key)
 */
export function t(key, lang = getCurrentLang()) {
  if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key] !== undefined) {
    return TRANSLATIONS[lang][key];
  }
  if (TRANSLATIONS.en && TRANSLATIONS.en[key] !== undefined) {
    return TRANSLATIONS.en[key];
  }
  return key;
}

/**
 * Apply translations to all DOM elements marked with data-i18n, data-i18n-placeholder, data-i18n-title
 */
export function applyTranslations(lang = getCurrentLang()) {
  // Translate text content & document title
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = t(key, lang);
    if (translation && translation !== key) {
      if (el.tagName === 'TITLE') {
        document.title = translation;
      } else {
        el.textContent = translation;
      }
    }
  });

  // Translate placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translation = t(key, lang);
    if (translation && translation !== key) {
      el.setAttribute('placeholder', translation);
    }
  });

  // Translate titles / tooltips
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    const translation = t(key, lang);
    if (translation && translation !== key) {
      el.setAttribute('title', translation);
    }
  });

  // Update language switcher UI if present
  updateLanguageSwitcherUI(lang);
}

/**
 * Renders an interactive, accessible Language Switcher dropdown into a target container element
 */
export function renderLanguageSwitcher(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const currentLang = getCurrentLang();
  const currentLangObj = SUPPORTED_LANGUAGES[currentLang] || SUPPORTED_LANGUAGES.en;

  container.innerHTML = `
    <div class="relative inline-block text-left" id="langDropdownWrapper">
      <button 
        type="button" 
        id="btnLangDropdown" 
        class="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 backdrop-blur-md transition shadow-sm"
        aria-expanded="false" 
        aria-haspopup="true"
        title="Change Language"
      >
        ${getLangFlagImg(currentLangObj.countryCode, currentLangObj.flag)}
        <span class="hidden sm:inline font-medium">${currentLangObj.nativeName}</span>
        <svg class="w-3.5 h-3.5 text-slate-300 ml-0.5 transition-transform" id="langChevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      <div 
        id="langDropdownMenu" 
        class="hidden absolute right-0 mt-2 w-52 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl py-1.5 z-50 ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
      >
        <div class="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
          Select Language
        </div>
        ${Object.values(SUPPORTED_LANGUAGES).map(item => `
          <button 
            type="button" 
            class="lang-option-btn w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between hover:bg-cyan-500/15 transition ${item.code === currentLang ? 'text-cyan-400 font-bold bg-cyan-500/10' : 'text-slate-200'}"
            data-lang="${item.code}"
          >
            <div class="flex items-center gap-2.5">
              ${getLangFlagImg(item.countryCode, item.flag)}
              <span class="font-medium">${item.nativeName}</span>
              <span class="text-[10px] text-slate-400">(${item.name})</span>
            </div>
            ${item.code === currentLang ? '<svg class="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>' : ''}
          </button>
        `).join('')}
      </div>
    </div>
  `;

  const btn = container.querySelector('#btnLangDropdown');
  const menu = container.querySelector('#langDropdownMenu');
  const chevron = container.querySelector('#langChevron');

  if (btn && menu) {
    btn.onclick = (e) => {
      e.stopPropagation();
      const isHidden = menu.classList.contains('hidden');
      if (isHidden) {
        menu.classList.remove('hidden');
        if (chevron) chevron.classList.add('rotate-180');
      } else {
        menu.classList.add('hidden');
        if (chevron) chevron.classList.remove('rotate-180');
      }
    };

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) {
        menu.classList.add('hidden');
        if (chevron) chevron.classList.remove('rotate-180');
      }
    });

    // Option clicks
    container.querySelectorAll('.lang-option-btn').forEach(opt => {
      opt.onclick = () => {
        const lang = opt.getAttribute('data-lang');
        menu.classList.add('hidden');
        if (chevron) chevron.classList.remove('rotate-180');
        setLanguage(lang);
      };
    });
  }
}

/**
 * Update the switcher button display when language changes
 */
function updateLanguageSwitcherUI(lang) {
  const item = SUPPORTED_LANGUAGES[lang] || SUPPORTED_LANGUAGES.en;
  const containers = document.querySelectorAll('#langSwitcherContainer, #langSwitcherSubmit, [data-lang-switcher]');
  if (!containers || containers.length === 0) return;

  containers.forEach(container => {
    const btn = container.querySelector('#btnLangDropdown');
    if (btn) {
      btn.innerHTML = `
        ${getLangFlagImg(item.countryCode, item.flag)}
        <span class="hidden sm:inline font-medium">${item.nativeName}</span>
        <svg class="w-3.5 h-3.5 text-slate-300 ml-0.5 transition-transform" id="langChevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      `;
    }

    // Update checkmarks in menu
    container.querySelectorAll('.lang-option-btn').forEach(opt => {
      const code = opt.getAttribute('data-lang');
      if (code === lang) {
        opt.className = 'lang-option-btn w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-cyan-500/15 transition text-cyan-400 font-bold bg-cyan-500/10';
        if (!opt.querySelector('svg')) {
          opt.insertAdjacentHTML('beforeend', '<svg class="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>');
        }
      } else {
        opt.className = 'lang-option-btn w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-cyan-500/15 transition text-slate-200';
        const check = opt.querySelector('svg');
        if (check) check.remove();
      }
    });
  });
}

