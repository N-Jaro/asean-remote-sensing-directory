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

