/**
 * Google Apps Script Backend for ASEAN Remote Sensing Seminar 2026 Directory
 * Seminar on Remote Sensing Technology for ASEAN Countries (28 Oct – 10 Nov 2026)
 *
 * This script:
 * 1. Handles web form submissions with photo upload directly into Google Drive
 * 2. Saves all participant details neatly into Google Sheets
 * 3. Serves as a JSON API endpoint for real-time syncing
 */

// Target Folder Name in Google Drive to store uploaded photos
const PHOTO_FOLDER_NAME = "ASEAN_Remote_Sensing_2026_Photos";
const PARTICIPANTS_SHEET_NAME = "Participants";
const LECTURERS_SHEET_NAME = "Lecturers";

// Standard Column Headers matching the updated Google Sheet
const PARTICIPANT_HEADERS = [
  "Timestamp",
  "Name (English)",
  "Name (Native Language)",
  "Nickname / Preferred Name",
  "Nationality / Country",
  "Affiliation / Organization",
  "Position / Title",
  "Expertise / Specialization",
  "Working Office Location",
  "Phone Number",
  "Email",
  "LinkedIn Profile",
  "Line ID / WhatsApp",
  "Message to Other Participants",
  "Photo URL",
  "WeChat ID",
  "LINE ID",
  "WhatsApp Number",
  "Facebook Profile",
  "Personal Website"
];

const LECTURER_HEADERS = [
  "Session / Course Title",
  "Date & Time",
  "Lecturer Name (English)",
  "Lecturer Name (Native)",
  "Title / Position",
  "Affiliation",
  "Country",
  "Key Topics Covered",
  "Email",
  "Phone",
  "WeChat ID",
  "LINE ID",
  "WhatsApp Number",
  "Facebook Profile",
  "LinkedIn",
  "Lab or Website URL",
  "Presentation Slides Link",
  "Photo URL"
];

/**
 * One-Click Setup Function: Run this function directly from the Apps Script toolbar (select 'setupDatabase' and click 'Run')
 * to automatically create and format the 'Participants' and 'Lecturers' sheets, add dedicated contact columns
 * (WeChat ID, LINE ID, WhatsApp Number, Facebook Profile), and configure the Google Drive photo folder.
 */
function setupDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Setup Participants Sheet
  let partSheet = ss.getSheetByName(PARTICIPANTS_SHEET_NAME);
  if (!partSheet) {
    partSheet = ss.insertSheet(PARTICIPANTS_SHEET_NAME, 0);
  }
  
  if (partSheet.getLastRow() === 0) {
    partSheet.appendRow(PARTICIPANT_HEADERS);
    partSheet.getRange(1, 1, 1, PARTICIPANT_HEADERS.length)
      .setFontWeight("bold")
      .setBackground("#0f172a")
      .setFontColor("#ffffff")
      .setFontSize(10);
    partSheet.setFrozenRows(1);
  } else {
    ensureContactColumns(partSheet, PARTICIPANT_HEADERS);
  }

  // If sheet only has headers, seed the sample rows
  if (partSheet.getLastRow() <= 1) {
    const sampleRows = [
      [
        new Date(),
        "Khamphanh Sengsavang",
        "ຄຳພັນ แສງສະຫວ່າງ",
        "Kham",
        "Laos",
        "National Geographic Department (NGD), Lao PDR",
        "Remote Sensing Specialist",
        "Forestry & Biomass Estimation, GIS & Spatial Modeling",
        "Vientiane, Lao PDR",
        "+856 21 214567",
        "khamphanh.s@ngd.gov.la",
        "kham_ngd",
        "kham_laos",
        "+85621214567",
        "",
        "https://linkedin.com",
        "Looking forward to collaborating on Mekong basin EO data sharing!",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
      ],
      [
        new Date(),
        "Dr. Thanapat Rattanavong",
        "ดร. ธนภัทร รัตนวงศ์",
        "Pat",
        "Thailand",
        "Geo-Informatics and Space Technology Development Agency (GISTDA)",
        "Senior Remote Sensing Scientist",
        "SAR / Radar Remote Sensing, Disaster Risk & Early Warning",
        "Space Krenovation Park, Chonburi, Thailand",
        "+66 81 234 5678",
        "thanapat@gistda.or.th",
        "",
        "pat_gistda",
        "+66812345678",
        "facebook.com/thanapat.gistda",
        "https://linkedin.com",
        "Welcome all ASEAN colleagues to Bangkok and Space Technology Center!",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
      ],
      [
        new Date(),
        "Sophea Chea",
        "ជា សុភា",
        "Phia",
        "Cambodia",
        "Ministry of Environment (MoE), Cambodia",
        "GIS & Remote Sensing Officer",
        "Optical & Multispectral Imagery, Precision Agriculture",
        "Phnom Penh, Cambodia",
        "+855 23 721012",
        "sophea.chea@moe.gov.kh",
        "sophea_moe",
        "",
        "+85523721012",
        "",
        "https://linkedin.com",
        "Warm greetings to all ASEAN remote sensing researchers!",
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
      ],
      [
        new Date(),
        "Aung Kyaw Moe",
        "အောင်ကျော်မိုး",
        "Moe",
        "Myanmar",
        "Department of Meteorology and Hydrology (DMH), Myanmar",
        "Satellite Oceanography & Earth Observation Officer",
        "Disaster Risk & Early Warning, Climate Change & Meteorology",
        "Naypyidaw, Myanmar",
        "+95 67 411031",
        "aungkyaw.moe@dmh.gov.mm",
        "",
        "",
        "+9567411031",
        "facebook.com/aungkyaw.moe",
        "https://linkedin.com",
        "Excited to learn new SAR and EO techniques for disaster monitoring.",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
      ],
      [
        new Date(),
        "Dr. Li Wei",
        "李伟",
        "David",
        "China",
        "Aerospace Information Research Institute (AIR), Chinese Academy of Sciences (CAS)",
        "Associate Professor in Earth Observation",
        "AI / Deep Learning for EO, Hyperspectral Sensing",
        "Haidian District, Beijing, China",
        "+86 10 8217 8000",
        "liwei@aircas.ac.cn",
        "liwei_aircas",
        "",
        "",
        "",
        "https://linkedin.com",
        "Glad to exchange AI geospatial modeling insights with ASEAN partners!",
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"
      ]
    ];
    
    sampleRows.forEach(row => partSheet.appendRow(row));
  }
  
  // 2. Setup Lecturers Sheet
  let lecSheet = ss.getSheetByName(LECTURERS_SHEET_NAME);
  if (!lecSheet) {
    lecSheet = ss.insertSheet(LECTURERS_SHEET_NAME, 1);
  }
  
  if (lecSheet.getLastRow() === 0) {
    lecSheet.appendRow(LECTURER_HEADERS);
    lecSheet.getRange(1, 1, 1, LECTURER_HEADERS.length)
      .setFontWeight("bold")
      .setBackground("#0f172a")
      .setFontColor("#ffffff")
      .setFontSize(10);
    lecSheet.setFrozenRows(1);
  } else {
    ensureContactColumns(lecSheet, LECTURER_HEADERS);
  }

  // If sheet only has headers, seed the sample lecturer rows
  if (lecSheet.getLastRow() <= 1) {
    lecSheet.appendRow([
      "Session 1: Advanced SAR & Interferometry (InSAR) for Geohazards",
      "29 Oct 2026, 09:00 – 12:00",
      "Prof. Dr. Suwit Ongsomwang",
      "ศ.ดร. สุวิทย์ องสมหวัง",
      "Professor of Geoinformatics",
      "Suranaree University of Technology (SUT)",
      "Thailand",
      "Principles of Synthetic Aperture Radar, Sentinel-1 InSAR processing, Land subsidence and flood mapping",
      "suwit@sut.ac.th",
      "+66 44 224 350",
      "",
      "suwit_sut",
      "+6644224350",
      "",
      "https://linkedin.com",
      "https://sut.ac.th",
      "https://drive.google.com",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
    ]);

    lecSheet.appendRow([
      "Tour Lead: Technical Field Trip & Facilities Visit",
      "Seminar Period (28 Oct – 10 Nov 2026)",
      "Chaiwat Supamongkol",
      "ชัยวัฒน์ ศุภมงคล",
      "Senior Tour Lead & Space Operations Engineer",
      "Geo-Informatics and Space Technology Development Agency (GISTDA)",
      "Thailand",
      "Leading technical visit to satellite telemetry ground receiving antennas, clean room assembly facilities, and test center. Please wear comfortable shoes.",
      "chaiwat.s@gistda.or.th",
      "+66 89 123 4567",
      "chaiwat_wx",
      "chaiwat_gistda",
      "+66891234567",
      "facebook.com/chaiwat.gistda",
      "https://linkedin.com",
      "https://www.gistda.or.th",
      "https://drive.google.com",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
    ]);
  }
  
  // 3. Ensure Google Drive photo folder exists
  let folder;
  const folders = DriveApp.getFoldersByName(PHOTO_FOLDER_NAME);
  if (folders.hasNext()) {
    folder = folders.next();
  } else {
    folder = DriveApp.createFolder(PHOTO_FOLDER_NAME);
  }
  folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  
  try {
    SpreadsheetApp.getUi().alert("✅ Success!", "Database sheets ('Participants' and 'Lecturers') are now fully configured with dedicated contact columns: WeChat ID, LINE ID, WhatsApp Number, and Facebook Profile!", SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {
    Logger.log("setupDatabase executed successfully.");
  }
}

/**
 * Checks and appends any missing contact columns to row 1 of an existing sheet without affecting existing data
 */
function ensureContactColumns(sheet, requiredHeaders) {
  if (!sheet || sheet.getLastRow() === 0) return;
  const lastCol = Math.max(sheet.getLastColumn(), 1);
  const currentHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(h => String(h).trim());

  requiredHeaders.forEach(colName => {
    const exists = currentHeaders.some(h => h.toLowerCase() === colName.toLowerCase());
    if (!exists) {
      const nextCol = sheet.getLastColumn() + 1;
      const cell = sheet.getRange(1, nextCol);
      cell.setValue(colName)
        .setFontWeight("bold")
        .setBackground("#0f172a")
        .setFontColor("#ffffff")
        .setFontSize(10);
      currentHeaders.push(colName);
    }
  });
}

/**
 * Helper to append row dynamically by matching whatever column names exist in the sheet
 */
function appendRowByHeaders(sheet, fieldMap, defaultHeaders) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(defaultHeaders);
    sheet.getRange(1, 1, 1, defaultHeaders.length)
      .setFontWeight("bold")
      .setBackground("#0f172a")
      .setFontColor("#ffffff")
      .setFontSize(10);
    sheet.setFrozenRows(1);
  }

  const lastCol = Math.max(sheet.getLastColumn(), defaultHeaders.length);
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const rowData = [];

  for (let c = 0; c < headers.length; c++) {
    const h = String(headers[c] || '').toLowerCase().trim();
    let val = "";

    if (h.includes("timestamp") || h === "date" || h === "เวลา") {
      val = fieldMap.timestamp || new Date();
    }
    // WeChat ID
    else if (h.includes("wechat") || h.includes("wx") || h.includes("微信")) {
      val = fieldMap.wechatId || "";
    }
    // Dedicated LINE ID (not combined with whatsapp)
    else if (h.includes("line") && !h.includes("whatsapp")) {
      val = fieldMap.lineId || "";
    }
    // Dedicated WhatsApp Number (not combined with line)
    else if (h.includes("whatsapp") && !h.includes("line")) {
      val = fieldMap.whatsapp || "";
    }
    // Facebook
    else if (h.includes("facebook") || h.includes("fb")) {
      val = fieldMap.facebook || "";
    }
    // LinkedIn
    else if (h.includes("linkedin")) {
      val = fieldMap.linkedin || "";
    }
    // Personal greeting / message to other participants (distinct from messaging app)
    else if (h.includes("message to other") || h.includes("greeting") || h === "message" || h.includes("notetoother")) {
      val = fieldMap.message || "";
    }
    // Combined / Legacy Line ID & WhatsApp column
    else if (h.includes("line") && h.includes("whatsapp")) {
      val = fieldMap.messaging || [
        fieldMap.wechatId ? 'WeChat: ' + fieldMap.wechatId : '',
        fieldMap.lineId ? 'LINE: ' + fieldMap.lineId : '',
        fieldMap.whatsapp ? 'WhatsApp: ' + fieldMap.whatsapp : '',
        fieldMap.facebook ? 'FB: ' + fieldMap.facebook : ''
      ].filter(Boolean).join(' | ') || fieldMap.lineId || "";
    }
    // Generic messaging / chat app
    else if (h === "messaging" || h === "chat" || h.includes("contact app") || h.includes("channels")) {
      val = fieldMap.messaging || "";
    }
    else if (h.includes("native") || h.includes("local") || h.includes("ภาษาไทย")) val = fieldMap.nameNative || "";
    else if (h.includes("name") || h.includes("fullname") || h.includes("ชื่อ")) val = fieldMap.nameEnglish || "";
    else if (h.includes("nick") || h.includes("preferred") || h.includes("ชื่อเล่น")) val = fieldMap.nickname || "";
    else if (h.includes("nation") || h.includes("country") || h.includes("ประเทศ")) val = fieldMap.nationality || fieldMap.country || "";
    else if (h.includes("affil") || h.includes("organ") || h.includes("หน่วยงาน")) val = fieldMap.affiliation || "";
    else if (h.includes("pos") || h.includes("title") || h.includes("ตำแหน่ง")) val = fieldMap.position || fieldMap.title || "";
    else if (h.includes("expert") || h.includes("special") || h.includes("ความเชี่ยวชาญ")) val = fieldMap.expertise || "";
    else if (h.includes("office") || h.includes("location") || h.includes("ที่ทำงาน")) val = fieldMap.workingOffice || "";
    else if (h.includes("phone") || h.includes("tel") || h.includes("mobile") || h.includes("เบอร์")) val = fieldMap.phone || "";
    else if (h.includes("email") || h.includes("mail") || h.includes("อีเมล")) val = fieldMap.email || "";
    else if (h.includes("photo") || h.includes("picture") || h.includes("image") || h.includes("รูป")) val = fieldMap.photoUrl || "";
    else if (h.includes("session") || h.includes("course") || h.includes("topic") || h.includes("tour")) val = fieldMap.sessionTitle || fieldMap.tourName || "";
    else if (h.includes("date") || h.includes("วัน")) val = fieldMap.sessionDate || fieldMap.tourDate || "";
    else if (h.includes("key") || h.includes("highlight")) val = fieldMap.topics || fieldMap.tourHighlights || "";
    else if (h.includes("slide") || h.includes("guide")) val = fieldMap.slidesUrl || fieldMap.guideUrl || "";
    else if (h.includes("web") || h.includes("lab") || h.includes("portfolio")) val = fieldMap.website || fieldMap.personalWebsite || fieldMap.labWebsite || "";
    else if (h.includes("note") || h.includes("other") || h.includes("ข้อความ")) val = fieldMap.message || "";

    rowData.push(val);
  }

  sheet.appendRow(rowData);
}

/**
 * Handle GET requests - Can output live JSON data or HTML Form
 */
function doGet(e) {
  const action = e.parameter.action;
  
  if (action === "getParticipants") {
    return getSheetDataAsJson(PARTICIPANTS_SHEET_NAME);
  } else if (action === "getLecturers") {
    return getSheetDataAsJson(LECTURERS_SHEET_NAME);
  } else if (action === "setupDatabase") {
    setupDatabase();
    return ContentService.createTextOutput(JSON.stringify({
      status: "ok",
      message: "Database setup completed successfully."
    })).setMimeType(ContentService.MimeType.JSON);
  }

  // Default response
  return ContentService.createTextOutput(JSON.stringify({
    status: "ok",
    message: "ASEAN Remote Sensing Seminar 2026 API is active.",
    usage: "POST with multipart/json to submit participant or GET with ?action=getParticipants"
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle POST submissions from the web directory form
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(PARTICIPANTS_SHEET_NAME);
    
    // Auto-create sheet with headers if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(PARTICIPANTS_SHEET_NAME);
      sheet.appendRow(PARTICIPANT_HEADERS);
      sheet.getRange(1, 1, 1, PARTICIPANT_HEADERS.length).setFontWeight("bold").setBackground("#0f172a").setFontColor("#ffffff");
      sheet.setFrozenRows(1);
    }

    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter;
    }

    // Handle Photo upload to Google Drive if provided as base64
    let photoUrl = data.photoUrl || "";
    if (data.photoBase64 && data.photoBase64.length > 50) {
      photoUrl = savePhotoToDrive(data.photoBase64, data.photoFileName || `${data.nameEnglish || 'profile'}_photo.jpg`);
    }

    // Check if submission is for Tour Leads / Lecturers
    if (data.targetSheet === "Lecturers" || data.role === "Tour Lead" || data.role === "Lecturer") {
      let lecSheet = ss.getSheetByName(LECTURERS_SHEET_NAME);
      if (!lecSheet) {
        lecSheet = ss.insertSheet(LECTURERS_SHEET_NAME);
      }

      appendRowByHeaders(lecSheet, {
        sessionTitle: data.sessionTitle || data.tourName || (data.role === "Tour Lead" ? "Tour Lead Coordinator" : "Field Trip / Seminar Session"),
        sessionDate: data.sessionDate || data.tourDate || "",
        nameEnglish: data.nameEnglish || "",
        nameNative: data.nameNative || "",
        title: data.title || data.position || (data.role === "Tour Lead" ? "Tour Lead & Field Trip Coordinator" : "Lecturer"),
        affiliation: data.affiliation || "",
        country: data.country || data.nationality || "",
        topics: data.topics || data.tourHighlights || "",
        email: data.email || "",
        phone: data.phone || "",
        wechatId: data.wechatId || "",
        lineId: data.lineId || "",
        whatsapp: data.whatsapp || "",
        facebook: data.facebook || "",
        linkedin: data.linkedin || "",
        website: data.labWebsite || data.website || "",
        slidesUrl: data.slidesUrl || data.guideUrl || "",
        photoUrl: photoUrl
      }, LECTURER_HEADERS);

      return ContentService.createTextOutput(JSON.stringify({
        result: "success",
        message: "Tour Lead / Lecturer profile recorded successfully!",
        photoUrl: photoUrl
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Otherwise append to Participants sheet dynamically matching headers
    appendRowByHeaders(sheet, {
      timestamp: new Date(),
      nameEnglish: data.nameEnglish || "",
      nameNative: data.nameNative || "",
      nickname: data.nickname || "",
      nationality: data.nationality || "",
      affiliation: data.affiliation || "",
      position: data.position || "",
      expertise: data.expertise || "",
      workingOffice: data.workingOffice || "",
      phone: data.phone || "",
      email: data.email || "",
      wechatId: data.wechatId || "",
      lineId: data.lineId || "",
      whatsapp: data.whatsapp || "",
      facebook: data.facebook || "",
      linkedin: data.linkedin || "",
      website: data.website || data.personalWebsite || data.labWebsite || "",
      messaging: data.messaging || "",
      message: data.message || "",
      photoUrl: photoUrl
    }, PARTICIPANT_HEADERS);

    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      message: "Participant profile recorded successfully!",
      photoUrl: photoUrl
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Save Base64 Photo into Google Drive and set sharing permissions to public
 */
function savePhotoToDrive(base64Data, filename) {
  try {
    // Strip data URL header if present (e.g. data:image/jpeg;base64,...)
    const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, "");
    const decodedBytes = Utilities.base64Decode(cleanBase64);
    
    // Find or create target folder
    let folder;
    const folders = DriveApp.getFoldersByName(PHOTO_FOLDER_NAME);
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(PHOTO_FOLDER_NAME);
    }

    // Create file
    const blob = Utilities.newBlob(decodedBytes, "image/jpeg", `${Date.now()}_${filename}`);
    const file = folder.createFile(blob);
    
    // Set permission to anyone with link can view
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    // Return direct thumbnail / preview URL
    return `https://drive.google.com/thumbnail?id=${file.getId()}&sz=w600`;
  } catch (e) {
    Logger.log("Error saving photo to drive: " + e.toString());
    return "";
  }
}

/**
 * Return Sheet Rows as JSON
 */
function getSheetDataAsJson(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify([])).setMimeType(ContentService.MimeType.JSON);
  }

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) {
    return ContentService.createTextOutput(JSON.stringify([])).setMimeType(ContentService.MimeType.JSON);
  }

  const headers = values[0];
  const items = [];

  for (let r = 1; r < values.length; r++) {
    const row = values[r];
    const obj = {};
    for (let c = 0; c < headers.length; c++) {
      obj[headers[c]] = row[c];
    }
    items.push(obj);
  }

  return ContentService.createTextOutput(JSON.stringify(items)).setMimeType(ContentService.MimeType.JSON);
}

