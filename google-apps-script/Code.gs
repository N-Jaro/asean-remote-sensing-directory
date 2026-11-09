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

/**
 * One-Click Setup Function: Run this function directly from the Apps Script toolbar (select 'setupDatabase' and click 'Run')
 * to automatically create and format the 'Participants' and 'Lecturers' sheets, plus create the Drive folder.
 */
function setupDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Setup Participants Sheet
  let partSheet = ss.getSheetByName(PARTICIPANTS_SHEET_NAME);
  if (!partSheet) {
    partSheet = ss.insertSheet(PARTICIPANTS_SHEET_NAME, 0);
  }
  
  const partHeaders = [
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
    "Photo URL"
  ];
  
  if (partSheet.getLastRow() === 0) {
    partSheet.appendRow(partHeaders);
    partSheet.getRange(1, 1, 1, partHeaders.length)
      .setFontWeight("bold")
      .setBackground("#0f172a")
      .setFontColor("#ffffff")
      .setFontSize(10);
    partSheet.setFrozenRows(1);
    
    // Insert multilingual sample rows (Laos, Thailand, China, Myanmar, Cambodia)
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
        "https://linkedin.com",
        "Line: kham_ngd",
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
        "https://linkedin.com",
        "Line: pat_gistda",
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
        "https://linkedin.com",
        "WhatsApp: +85523721012",
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
        "https://linkedin.com",
        "Viber / WhatsApp: +9567411031",
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
        "https://linkedin.com",
        "WeChat: liwei_aircas",
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
  
  const lecHeaders = [
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
    "LinkedIn",
    "Lab or Website URL",
    "Presentation Slides Link",
    "Photo URL"
  ];
  
  if (lecSheet.getLastRow() === 0) {
    lecSheet.appendRow(lecHeaders);
    lecSheet.getRange(1, 1, 1, lecHeaders.length)
      .setFontWeight("bold")
      .setBackground("#0f172a")
      .setFontColor("#ffffff")
      .setFontSize(10);
    lecSheet.setFrozenRows(1);
    
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
      "https://linkedin.com",
      "https://sut.ac.th",
      "https://drive.google.com",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
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
  
  SpreadsheetApp.getUi().alert("✅ Success!", "Database sheets ('Participants' and 'Lecturers') and Google Drive photo folder are now fully configured with multilingual support (Laos, Thai, Chinese, Myanmar, Cambodia)!", SpreadsheetApp.getUi().ButtonSet.OK);
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
      sheet.appendRow([
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
        "Photo URL"
      ]);
      sheet.getRange(1, 1, 1, 15).setFontWeight("bold").setBackground("#0f172a").setFontColor("#ffffff");
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
      photoUrl = savePhotoToDrive(data.photoBase64, data.photoFileName || `${data.nameEnglish || 'participant'}_photo.jpg`);
    }

    // Append new participant row
    sheet.appendRow([
      new Date(),
      data.nameEnglish || "",
      data.nameNative || "",
      data.nickname || "",
      data.nationality || "",
      data.affiliation || "",
      data.position || "",
      data.expertise || "",
      data.workingOffice || "",
      data.phone || "",
      data.email || "",
      data.linkedin || "",
      data.lineId || "",
      data.message || "",
      photoUrl
    ]);

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

