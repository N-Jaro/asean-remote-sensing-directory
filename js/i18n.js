/**
 * Internationalization (i18n) Module for ASEAN Remote Sensing Seminar 2026 Directory
 * Supports: English (en), Thai (th), Lao (lo), Chinese (zh), Myanmar (my), Khmer/Cambodia (km)
 */

export const SUPPORTED_LANGUAGES = {
  en: { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  th: { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
  lo: { code: 'lo', name: 'Lao', nativeName: 'ພາສາລາວ', flag: '🇱🇦' },
  zh: { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  my: { code: 'my', name: 'Myanmar', nativeName: 'မြန်မာစာ', flag: '🇲🇲' },
  km: { code: 'km', name: 'Khmer', nativeName: 'ភាសាខ្មែរ', flag: '🇰🇭' }
};

export const TRANSLATIONS = {
  en: {
    // Header & Brand
    seminarBadge: "ASEAN RS 2026",
    datesHeader: "28 Oct – 10 Nov 2026",
    brandTitle: "ASEAN Remote Sensing Directory",
    addProfileBtn: "Add Profile",
    googleSheetBtn: "Google Sheet",

    // Hero Section
    heroBadge: "Seminar on Remote Sensing Technology for ASEAN Countries",
    heroTitle: "Directory & Yearbook of Participants & Lecturers",
    heroDesc: "Online yearbook connecting Earth Observation and geospatial researchers across ASEAN member states and partner institutions with real-time Google Sheet synchronization.",
    heroDates: "28 October – 10 November 2026",
    heroLocation: "Bangkok & Space Technology Center, Thailand",
    statParticipants: "Participants",
    statCountries: "Countries",
    statLecturers: "Lecturers",

    // Tabs & Actions
    tabParticipants: "Participants",
    tabLecturers: "Lecturers & Sessions",
    btnAddLecturer: "Add Lecturer",
    btnExportCsv: "Export CSV",

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
    submitFormDesc: "Seminar on Remote Sensing Technology for ASEAN Countries (28 Oct – 10 Nov 2026). Please enter your details and upload a photo to be included in the live directory.",
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
    submitExpertiseHint: "Click tags to select, or type additional fields separated by commas (,)",
    submitLabelOffice: "9. Working Office Location (City, Country)",
    submitContactSection: "Contact Information",
    submitLabelPhone: "10. Phone Number / WhatsApp",
    submitLabelEmail: "11. Email Address",
    submitLabelLinkedin: "12. LinkedIn Profile URL",
    submitLabelLine: "13. Line ID / WhatsApp / WeChat / Viber",
    submitLabelMessage: "14. Message to Other Participants",
    submitBtnCancel: "Cancel",
    submitBtnSubmit: "Submit Profile",
    submitBtnSubmitting: "Saving to Google Sheet...",
    submitSuccessTitle: "Registration Successful!",
    submitSuccessDesc: "Welcome to the ASEAN Remote Sensing Directory.",
    submitBtnViewDirectory: "Go to Directory",
    submitBtnAddAnother: "Submit Another Profile"
  },

  th: {
    // Header & Brand
    seminarBadge: "ASEAN RS 2026",
    datesHeader: "28 ต.ค. – 10 พ.ย. 2569",
    brandTitle: "ทำเนียบผู้เข้าร่วมสัมมนาเทคโนโลยีสำรวจระยะไกล",
    addProfileBtn: "เพิ่มโปรไฟล์",
    googleSheetBtn: "Google Sheet",

    // Hero Section
    heroBadge: "Seminar on Remote Sensing Technology for ASEAN Countries",
    heroTitle: "ทำเนียบผู้เข้าร่วมสัมมนาและคณาจารย์วิทยากร",
    heroDesc: "ระบบทำเนียบรุ่นออนไลน์ รวบรวมรายชื่อผู้เข้าร่วมสัมมนาจากกลุ่มประเทศสมาชิกอาเซียนและวิทยากรผู้เชี่ยวชาญ พร้อมช่องทางการติดต่อ ความเชี่ยวชาญ และเชื่อมต่อข้อมูลแบบเรียลไทม์กับ Google Sheet",
    heroDates: "28 ตุลาคม – 10 พฤศจิกายน 2569",
    heroLocation: "กรุงเทพฯ และศูนย์เทคโนโลยีอวกาศ ประเทศไทย",
    statParticipants: "ผู้เข้าร่วม",
    statCountries: "ประเทศ",
    statLecturers: "วิทยากร",

    // Tabs & Actions
    tabParticipants: "ผู้เข้าร่วมสัมมนา (Participants)",
    tabLecturers: "วิทยากรและการบรรยาย (Lecturers)",
    btnAddLecturer: "เพิ่มวิทยากร",
    btnExportCsv: "Export CSV",

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
    submitFormDesc: "Seminar on Remote Sensing Technology for ASEAN Countries (28 ต.ค. – 10 พ.ย. 2569) กรุณากรอกข้อมูลและอัปโหลดรูปภาพของท่านเพื่อแสดงในทำเนียบออนไลน์",
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
    submitExpertiseHint: "คลิกเลือกหัวข้อที่ตรงกับท่าน หรือพิมพ์เพิ่มเติมคั่นด้วยเครื่องหมายจุลภาค (,)",
    submitLabelOffice: "9. สถานที่ตั้งที่ทำงาน (เมือง / ประเทศ)",
    submitContactSection: "ช่องทางการติดต่อ",
    submitLabelPhone: "10. เบอร์โทรศัพท์ / WhatsApp",
    submitLabelEmail: "11. อีเมล",
    submitLabelLinkedin: "12. ลิงก์ LinkedIn",
    submitLabelLine: "13. Line ID / WhatsApp / WeChat / Viber",
    submitLabelMessage: "14. ข้อความทักทายเพื่อนร่วมรุ่น",
    submitBtnCancel: "ยกเลิก",
    submitBtnSubmit: "ส่งข้อมูลลงทะเบียน",
    submitBtnSubmitting: "กำลังบันทึกข้อมูล...",
    submitSuccessTitle: "บันทึกข้อมูลเรียบร้อยแล้ว!",
    submitSuccessDesc: "ยินดีต้อนรับเข้าสู่ทำเนียบผู้เข้าร่วมสัมมนาเทคโนโลยีสำรวจระยะไกล",
    submitBtnViewDirectory: "ไปยังหน้าทำเนียบผู้เข้าร่วม",
    submitBtnAddAnother: "กรอกข้อมูลท่านอื่นเพิ่ม"
  },

  lo: {
    // Header & Brand
    seminarBadge: "ASEAN RS 2026",
    datesHeader: "28 ຕຸລາ – 10 ພະຈິກ 2026",
    brandTitle: "ທຳນຽບຜູ້ເຂົ້າຮ່ວມສຳມະນາເຕັກໂນໂລຊີສຳຫຼວດໄລຍະໄກ",
    addProfileBtn: "ເພີ່ມໂປຣໄຟລ໌",
    googleSheetBtn: "Google Sheet",

    // Hero Section
    heroBadge: "Seminar on Remote Sensing Technology for ASEAN Countries",
    heroTitle: "ທຳນຽບຜູ້ເຂົ້າຮ່ວມສຳມະນາ ແລະ ຄູອາຈານວິທະຍາກອນ",
    heroDesc: "ລະບົບທຳນຽບອອນລາຍ ລວບລວມລາຍຊື່ຜູ້ເຂົ້າຮ່ວມສຳມະນາຈາກບັນດາປະເທດສະມາຊິກອາຊຽນ ແລະ ຊ່ຽວຊານ ພ້ອມຊ່ອງທາງຕິດຕໍ່ ຄວາມຊ່ຽວຊານ ແລະ ເຊື່ອມຕໍ່ Google Sheet ແບບເວລາຈິງ.",
    heroDates: "28 ຕຸລາ – 10 ພະຈິກ 2026",
    heroLocation: "ບາງກອກ ແລະ ສູນເຕັກໂນໂລຊີອາວະກາດ, ປະເທດໄທ",
    statParticipants: "ຜູ້ເຂົ້າຮ່ວມ",
    statCountries: "ປະເທດ",
    statLecturers: "ວິທະຍາກອນ",

    // Tabs & Actions
    tabParticipants: "ຜູ້ເຂົ້າຮ່ວມສຳມະນາ (Participants)",
    tabLecturers: "ວິທະຍາກອນ ແລະ ຫົວຂໍ້ບັນຍາຍ (Lecturers)",
    btnAddLecturer: "ເພີ່ມວິທະຍາກອນ",
    btnExportCsv: "ສົ່ງອອກ CSV",

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
    submitExpertiseHint: "ຄລິກເລືອກຫົວຂໍ້ ຫຼື ພິມເພີ່ມເຕີມໂດຍຂັ້ນດ້ວຍຈຸດ (,)",
    submitLabelOffice: "9. ທີ່ຕັ້ງບ່ອນເຮັດວຽກ (ເມືອງ / ປະເທດ)",
    submitContactSection: "ຊ່ອງທາງການຕິດຕໍ່",
    submitLabelPhone: "10. ເບີໂທລະສັບ / WhatsApp",
    submitLabelEmail: "11. ອີເມວ",
    submitLabelLinkedin: "12. LinkedIn URL",
    submitLabelLine: "13. Line ID / WhatsApp / WeChat / Viber",
    submitLabelMessage: "14. ຂໍ້ຄວາມທັກທາຍເຖິງເພື່ອນຮ່ວມຮຸ່ນ",
    submitBtnCancel: "ຍົກເລີກ",
    submitBtnSubmit: "ສົ່ງຂໍ້ມູນລົງທະບຽນ",
    submitBtnSubmitting: "ກຳລັງບັນທຶກ...",
    submitSuccessTitle: "ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ!",
    submitSuccessDesc: "ຍິນດີຕ້ອນຮັບເຂົ້າສູ່ທຳນຽບຜູ້ເຂົ້າຮ່ວມສຳມະນາເຕັກໂນໂລຊີສຳຫຼວດໄລຍະໄກ.",
    submitBtnViewDirectory: "ໄປທີ່ໜ້າທຳນຽບ",
    submitBtnAddAnother: "ລົງທະບຽນທ່ານອື່ນເພີ່ມ"
  },

  zh: {
    // Header & Brand
    seminarBadge: "ASEAN RS 2026",
    datesHeader: "2026年10月28日 – 11月10日",
    brandTitle: "东盟遥感技术研讨会学员与专家名录",
    addProfileBtn: "添加档案",
    googleSheetBtn: "Google Sheet",

    // Hero Section
    heroBadge: "Seminar on Remote Sensing Technology for ASEAN Countries",
    heroTitle: "研讨会学员及授课讲师通讯录",
    heroDesc: "在线交流名录，汇集东盟各成员国及合作机构的遥感与空间技术专家，支持实时Google Sheet同步、联络方式交换及研究领域检索。",
    heroDates: "2026年10月28日 – 11月10日",
    heroLocation: "泰国曼谷及国家航天科技中心",
    statParticipants: "参会学员",
    statCountries: "代表国家",
    statLecturers: "授课专家",

    // Tabs & Actions
    tabParticipants: "学员名录 (Participants)",
    tabLecturers: "讲师与专题 (Lecturers)",
    btnAddLecturer: "添加讲师",
    btnExportCsv: "导出 CSV",

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
    submitFormDesc: "东盟国家遥感技术研讨会（2026年10月28日–11月10日）。请填写您的个人信息并上传头像照片以载入在线名录。",
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
    submitExpertiseHint: "点击选择专长标签，或输入其他研究方向（以英文逗号分隔）",
    submitLabelOffice: "9. 办公地点（城市、建筑或国家）",
    submitContactSection: "联系方式",
    submitLabelPhone: "10. 联系电话 / WhatsApp",
    submitLabelEmail: "11. 电子邮箱",
    submitLabelLinkedin: "12. LinkedIn 个人主页",
    submitLabelLine: "13. 微信 / WhatsApp / Line / Viber",
    submitLabelMessage: "14. 给其他参会学者的留言/寄语",
    submitBtnCancel: "取消",
    submitBtnSubmit: "提交个人档案",
    submitBtnSubmitting: "正在保存档案...",
    submitSuccessTitle: "档案提交成功！",
    submitSuccessDesc: "欢迎加入东盟遥感技术研讨会学术通讯录。",
    submitBtnViewDirectory: "前往名录主页",
    submitBtnAddAnother: "继续添加下一位"
  },

  my: {
    // Header & Brand
    seminarBadge: "ASEAN RS 2026",
    datesHeader: "၂၈ အောက်တိုဘာ – ၁၀ နိုဝင်ဘာ ၂၀၂၆",
    brandTitle: "အာဆီယံ အဝေးအာရုံခံနည်းပညာ သင်တန်းသားလမ်းညွှန်",
    addProfileBtn: "ကိုယ်ရေးထည့်ရန်",
    googleSheetBtn: "Google Sheet",

    // Hero Section
    heroBadge: "Seminar on Remote Sensing Technology for ASEAN Countries",
    heroTitle: "သင်တန်းသားများနှင့် ဟောပြောပို့ချသူ ဆရာများလမ်းညွှန်",
    heroDesc: "အာဆီယံနိုင်ငံများနှင့် ပညာရှင်များအတွက် အွန်လိုင်းလမ်းညွှန်ဖြစ်ပြီး Google Sheet နှင့် အချိန်နှင့်တပြေးညီ ချိတ်ဆက်နိုင်ပါသည်။",
    heroDates: "၂၀၂၆ ခုနှစ်၊ အောက်တိုဘာ ၂၈ မှ နိုဝင်ဘာ ၁၀ ထိ",
    heroLocation: "ဘန်ကောက်နှင့် အာကာသနည်းပညာဗဟိုဌာန၊ ထိုင်းနိုင်ငံ",
    statParticipants: "သင်တန်းသားများ",
    statCountries: "ပါဝင်နိုင်ငံများ",
    statLecturers: "ဟောပြောပို့ချသူများ",

    // Tabs & Actions
    tabParticipants: "သင်တန်းသားများ (Participants)",
    tabLecturers: "ပို့ချသူများနှင့် ခေါင်းစဉ်များ (Lecturers)",
    btnAddLecturer: "ပို့ချသူထည့်ရန်",
    btnExportCsv: "CSV ထုတ်ယူရန်",

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
    submitExpertiseHint: "ကျွမ်းကျင်မှုခေါင်းစဉ်များကို ရွေးပါ သို့မဟုတ် ကော်မာ (,) ခြား၍ ရိုက်ထည့်ပါ",
    submitLabelOffice: "၉။ ရုံးတည်နေရာ (မြို့၊ နိုင်ငံ)",
    submitContactSection: "ဆက်သွယ်ရန် အချက်အလက်များ",
    submitLabelPhone: "၁၀။ ဖုန်းနံပါတ် / WhatsApp",
    submitLabelEmail: "၁၁။ အီးမေးလ်",
    submitLabelLinkedin: "၁၂။ LinkedIn လင့်ခ်",
    submitLabelLine: "၁၃။ Viber / WhatsApp / Line / WeChat",
    submitLabelMessage: "၁၄။ သင်တန်းသားများသို့ နှုတ်ခွန်းဆက်စကား",
    submitBtnCancel: "မလုပ်တော့ပါ",
    submitBtnSubmit: "အချက်အလက်များ ပေးပို့ရန်",
    submitBtnSubmitting: "သိမ်းဆည်းနေပါသည်...",
    submitSuccessTitle: "အောင်မြင်စွာ သိမ်းဆည်းပြီးပါပြီ!",
    submitSuccessDesc: "အာဆီယံ အဝေးအာရုံခံနည်းပညာ လမ်းညွှန်မှ ကြိုဆိုပါသည်။",
    submitBtnViewDirectory: "လမ်းညွှန်စာမျက်နှာသို့ သွားရန်",
    submitBtnAddAnother: "နောက်တစ်ဦး ထပ်မံဖြည့်ရန်"
  },

  km: {
    // Header & Brand
    seminarBadge: "ASEAN RS 2026",
    datesHeader: "២៨ តុលា – ១០ វិច្ឆិកា ២០២៦",
    brandTitle: "បញ្ជីឈ្មោះសិក្ខាកាមបច្ចេកវិទ្យា Remote Sensing អាស៊ាន",
    addProfileBtn: "ចុះឈ្មោះ",
    googleSheetBtn: "Google Sheet",

    // Hero Section
    heroBadge: "Seminar on Remote Sensing Technology for ASEAN Countries",
    heroTitle: "បញ្ជីឈ្មោះសិក្ខាកាម និងសាស្រ្តាចារ្យឧទ្ទេសនាម",
    heroDesc: "ប្រព័ន្ធបញ្ជីឈ្មោះអនឡាញសម្រាប់បណ្តាប្រទេសសមាជិកអាស៊ាន និងអ្នកជំនាញបច្ចេកវិទ្យា Remote Sensing ភ្ជាប់ទិន្នន័យ Google Sheet ផ្ទាល់។",
    heroDates: "២៨ តុលា – ១០ វិច្ឆិកា ២០២៦",
    heroLocation: "បាងកក និង មជ្ឈមណ្ឌលបច្ចេកវិទ្យាអវកាស ប្រទេសថៃ",
    statParticipants: "សិក្ខាកាម",
    statCountries: "ប្រទេស",
    statLecturers: "សាស្ត្រាចារ្យ",

    // Tabs & Actions
    tabParticipants: "សិក្ខាកាម (Participants)",
    tabLecturers: "សាស្ត្រាចារ្យ និងប្រធានបទ (Lecturers)",
    btnAddLecturer: "បន្ថែមសាស្ត្រាចារ្យ",
    btnExportCsv: "ទាញយក CSV",

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
    submitExpertiseHint: "ចុចជ្រើសរើសប្រធានបទ ឬវាយបញ្ចូលបន្ថែមដោយខណ្ឌសញ្ញាក្បៀស (,)",
    submitLabelOffice: "៩. ទីតាំងកន្លែងធ្វើការ (ទីក្រុង, ប្រទេស)",
    submitContactSection: "ព័ត៌មានទំនាក់ទំនង",
    submitLabelPhone: "១០. លេខទូរស័ព្ទ / WhatsApp",
    submitLabelEmail: "១១. អ៊ីមែល",
    submitLabelLinkedin: "១២. តំណភ្ជាប់ LinkedIn",
    submitLabelLine: "១៣. Telegram / WhatsApp / Line / WeChat",
    submitLabelMessage: "១៤. សារជូនពរ ឬ ស្វាគមន៍មិត្តរួមជំនាន់",
    submitBtnCancel: "បោះបង់",
    submitBtnSubmit: "ផ្ញើព័ត៌មានចុះឈ្មោះ",
    submitBtnSubmitting: "កំពុងរក្សាទុក...",
    submitSuccessTitle: "បានរក្សាទុកដោយជោគជ័យ!",
    submitSuccessDesc: "សូមស្វាគមន៍មកកាន់បញ្ជីឈ្មោះសិក្ខាកាមបច្ចេកវិទ្យា Remote Sensing អាស៊ាន។",
    submitBtnViewDirectory: "ទៅកាន់ទំព័របញ្ជីឈ្មោះ",
    submitBtnAddAnother: "ចុះឈ្មោះអ្នកផ្សេងទៀតបន្ថែម"
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
  // Translate text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = t(key, lang);
    if (translation) {
      el.textContent = translation;
    }
  });

  // Translate placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translation = t(key, lang);
    if (translation) {
      el.setAttribute('placeholder', translation);
    }
  });

  // Translate titles / tooltips
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    const translation = t(key, lang);
    if (translation) {
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
        class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 backdrop-blur-md transition shadow-sm"
        aria-expanded="false" 
        aria-haspopup="true"
        title="Change Language"
      >
        <span class="text-base leading-none">${currentLangObj.flag}</span>
        <span class="hidden sm:inline font-medium">${currentLangObj.nativeName}</span>
        <svg class="w-3.5 h-3.5 text-slate-300 ml-0.5 transition-transform" id="langChevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      <div 
        id="langDropdownMenu" 
        class="hidden absolute right-0 mt-2 w-48 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl py-1.5 z-50 ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
      >
        <div class="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
          Select Language
        </div>
        ${Object.values(SUPPORTED_LANGUAGES).map(item => `
          <button 
            type="button" 
            class="lang-option-btn w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-cyan-500/15 transition ${item.code === currentLang ? 'text-cyan-400 font-bold bg-cyan-500/10' : 'text-slate-200'}"
            data-lang="${item.code}"
          >
            <div class="flex items-center gap-2.5">
              <span class="text-base leading-none">${item.flag}</span>
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
        <span class="text-base leading-none">${item.flag}</span>
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

