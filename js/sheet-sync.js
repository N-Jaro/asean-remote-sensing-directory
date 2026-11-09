/**
 * Google Sheet Sync & Parser for ASEAN Remote Sensing Directory
 * Supports:
 * 1. Google Sheets "Publish to Web" CSV URL
 * 2. Automatic column header normalization (supports English & Thai headers)
 * 3. Automatic Google Drive image URL conversion to direct embeddable thumbnails
 */

/**
 * Robust CSV Line Parser handling quotes, commas, and newlines
 */
export function parseCSV(csvText) {
  const rows = [];
  let currentRow = [];
  let currentVal = '';
  let insideQuote = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (insideQuote && nextChar === '"') {
        // Escaped quote
        currentVal += '"';
        i++;
      } else {
        // Toggle quote status
        insideQuote = !insideQuote;
      }
    } else if (char === ',' && !insideQuote) {
      currentRow.push(currentVal.trim());
      currentVal = '';
    } else if ((char === '\r' || char === '\n') && !insideQuote) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentVal.trim());
      if (currentRow.some(cell => cell.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentVal = '';
    } else {
      currentVal += char;
    }
  }

  if (currentVal.length > 0 || currentRow.length > 0) {
    currentRow.push(currentVal.trim());
    if (currentRow.some(cell => cell.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Convert any Google Drive view or share URL into a high-speed direct image preview URL
 */
export function formatDrivePhotoUrl(url) {
  if (!url || typeof url !== 'string') return '';
  url = url.trim();

  // If already a direct image link or placeholder
  if (url.startsWith('data:image') || url.includes('unsplash.com') || url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.webp')) {
    return url;
  }

  // Google Drive patterns:
  // 1. https://drive.google.com/open?id=FILE_ID
  // 2. https://drive.google.com/file/d/FILE_ID/view?usp=drivesdk
  // 3. https://drive.google.com/uc?id=FILE_ID
  // 4. https://docs.google.com/uc?id=FILE_ID
  const driveRegex = /(?:id=|file\/d\/)([a-zA-Z0-9_-]{20,})/;
  const match = url.match(driveRegex);

  if (match && match[1]) {
    const fileId = match[1];
    // lh3.googleusercontent.com/d/FILE_ID or drive.google.com/thumbnail is universally embeddable without cookie restrictions
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w600`;
  }

  return url;
}

/**
 * Country code to Flag CDN image helper
 * Solves Windows OS limitation where country flag emojis render as 2-letter ISO text codes (e.g. BN, KH, TH)
 */
export function getCountryFlagImg(code, fallbackEmoji = '🌐', className = 'w-4.5 h-3 object-cover rounded-[2px] shadow-xs inline-block align-middle') {
  if (!code || code === 'OTHER' || code === 'ALL') {
    return `<span class="inline-block text-xs align-middle">${fallbackEmoji}</span>`;
  }
  const clean = code.toLowerCase().trim();
  return `<img src="https://flagcdn.com/24x18/${clean}.png" srcset="https://flagcdn.com/48x36/${clean}.png 2x" class="${className}" alt="${code}" loading="lazy" onerror="this.outerHTML='<span class=\\'inline-block text-xs\\'>${fallbackEmoji}</span>'"/>`;
}

/**
 * Determine country code and flag from nationality / country name
 */
export function getCountryMeta(countryStr) {
  if (!countryStr) {
    const meta = { code: "OTHER", flag: "🌐", name: "International" };
    meta.flagHtml = getCountryFlagImg(meta.code, meta.flag);
    return meta;
  }
  const s = countryStr.toLowerCase().trim();

  let res;
  if (s.includes('thai') || s.includes('ไทย') || s.includes('thailand')) res = { code: 'TH', flag: '🇹🇭', name: 'Thailand' };
  else if (s.includes('cambod') || s.includes('khmer') || s.includes('กัมพูชา') || s.includes('កម្ពុជា')) res = { code: 'KH', flag: '🇰🇭', name: 'Cambodia' };
  else if (s.includes('lao') || s.includes('ลาว') || s.includes('ລາວ')) res = { code: 'LA', flag: '🇱🇦', name: 'Laos' };
  else if (s.includes('myan') || s.includes('burm') || s.includes('พม่า') || s.includes('မြန်မာ')) res = { code: 'MM', flag: '🇲🇲', name: 'Myanmar' };
  else if (s.includes('china') || s.includes('chinese') || s.includes('中国') || s.includes('จีน')) res = { code: 'CN', flag: '🇨🇳', name: 'China' };
  else if (s.includes('indonesia')) res = { code: 'ID', flag: '🇮🇩', name: 'Indonesia' };
  else if (s.includes('philip') || s.includes('filipino')) res = { code: 'PH', flag: '🇵🇭', name: 'Philippines' };
  else if (s.includes('viet')) res = { code: 'VN', flag: '🇻🇳', name: 'Vietnam' };
  else if (s.includes('malay')) res = { code: 'MY', flag: '🇲🇾', name: 'Malaysia' };
  else if (s.includes('singapor')) res = { code: 'SG', flag: '🇸🇬', name: 'Singapore' };
  else if (s.includes('brunei')) res = { code: 'BN', flag: '🇧🇳', name: 'Brunei Darussalam' };
  else if (s.includes('timor')) res = { code: 'TL', flag: '🇹🇱', name: 'Timor-Leste' };
  else if (s.includes('japan')) res = { code: 'OTHER', flag: '🇯🇵', name: 'Japan' };
  else if (s.includes('australia')) res = { code: 'OTHER', flag: '🇦🇺', name: 'Australia' };
  else res = { code: 'OTHER', flag: '🌐', name: countryStr };

  res.flagHtml = getCountryFlagImg(res.code, res.flag);
  return res;
}

/**
 * Parse combined messaging channel strings (e.g. "WeChat: wxid_123 | LINE: myline | WhatsApp: +66... | FB: https://...")
 * into clean separated key-value pairs
 */
export function parseMessagingChannels(raw) {
  const result = {
    wechat: '',
    line: '',
    whatsapp: '',
    facebook: ''
  };

  if (!raw) return result;
  const str = String(raw).trim();
  if (!str) return result;

  // Check if it's a multi-channel concatenated string
  if (str.includes('|') || /(?:wechat|line|whatsapp|wa|fb|facebook):/i.test(str)) {
    const wechatMatch = str.match(/(?:wechat|weixin|微信号?)[:\s]+([^|]+)/i);
    if (wechatMatch) result.wechat = wechatMatch[1].trim();

    const lineMatch = str.match(/line(?:\s*id)?[:\s]+([^|]+)/i);
    if (lineMatch) result.line = lineMatch[1].trim();

    const waMatch = str.match(/(?:whatsapp|wa)[:\s]+([^|]+)/i);
    if (waMatch) result.whatsapp = waMatch[1].trim();

    const fbMatch = str.match(/(?:facebook|fb)(?:\s*profile|\s*url)?[:\s]+([^|]+)/i);
    if (fbMatch) result.facebook = fbMatch[1].trim();
  } else {
    // Single-channel heuristics
    const lower = str.toLowerCase();
    if (lower.startsWith('wx') || lower.includes('wechat')) {
      result.wechat = str.replace(/wechat[:\s]*/i, '').trim();
    } else if (str.startsWith('+') || /^\d{8,15}$/.test(str.replace(/[\s-]/g, ''))) {
      result.whatsapp = str;
    } else if (lower.includes('facebook.com') || lower.includes('fb.com')) {
      result.facebook = str;
    } else {
      result.line = str;
    }
  }

  return result;
}

/**
 * Fuzzy header mapping helper with support for excluding specific keywords
 */
function findIndex(headers, matchers, excludedWords = []) {
  const normalized = headers.map(h => (h || '').toLowerCase().replace(/[^a-z0-9ก-๙]/g, ''));
  const excludedClean = excludedWords.map(w => w.toLowerCase().replace(/[^a-z0-9ก-๙]/g, ''));

  // 1. First priority: match target while ensuring none of the excluded words exist in header
  for (const matcher of matchers) {
    const target = matcher.toLowerCase().replace(/[^a-z0-9ก-๙]/g, '');
    const idx = normalized.findIndex(h => {
      if (!h.includes(target)) return false;
      return !excludedClean.some(ex => h.includes(ex));
    });
    if (idx !== -1) return idx;
  }

  // 2. Fallback: match without exclusion
  for (const matcher of matchers) {
    const target = matcher.toLowerCase().replace(/[^a-z0-9ก-๙]/g, '');
    const idx = normalized.findIndex(h => h.includes(target));
    if (idx !== -1) return idx;
  }

  return -1;
}

/**
 * Transform parsed CSV rows into structured Participant objects
 */
export function mapCsvToParticipants(rows) {
  if (!rows || rows.length < 2) return [];

  const headers = rows[0];

  const idxNative = findIndex(headers, ['namelanguage', 'namenative', 'localname', 'ชื่อภาษาท้องถิ่น', 'ชื่อภาษาไทย', 'ชื่อในภาษาของคุณ']);
  const idxEnglish = findIndex(headers, ['nameenglish', 'fullname', 'englishname', 'ชื่อภาษาอังกฤษ', 'ชื่อภาษาสากล', 'name']);
  const idxNickname = findIndex(headers, ['nickname', 'preferredname', 'ชื่อเล่น', 'ชื่อเรียก']);
  const idxNationality = findIndex(headers, ['nationality', 'country', 'สัญชาติ', 'ประเทศ']);
  const idxAffiliation = findIndex(headers, ['affiliation', 'organization', 'agency', 'institute', 'company', 'หน่วยงาน', 'สังกัด']);
  const idxPosition = findIndex(headers, ['position', 'jobtitle', 'title', 'ตำแหน่ง']);
  const idxExpertise = findIndex(headers, ['expertise', 'specialization', 'field', 'skill', 'ความเชี่ยวชาญ', 'สาขา']);
  const idxOffice = findIndex(headers, ['workingoffice', 'office', 'whereisyour', 'officelocation', 'address', 'สถานที่ทำงาน', 'ที่อยู่']);
  const idxPhone = findIndex(headers, ['phone', 'tel', 'mobile', 'telephone', 'เบอร์โทร', 'เบอร์ติดต่อ']);
  const idxEmail = findIndex(headers, ['email', 'mail', 'อีเมล']);
  const idxLinkedin = findIndex(headers, ['linkedin', 'linkedinurl', 'ลิงก์linkedin']);
  
  // Dedicated single-channel headers (explicitly exclude combined headers)
  const idxWechat = findIndex(headers, ['wechatid', 'wechat', 'wxid', 'weixin', '微信']);
  const idxLine = findIndex(headers, ['lineid', 'line', 'ไลน์', 'ไลน์ไอดี'], ['whatsapp', 'wechat']);
  const idxWhatsapp = findIndex(headers, ['whatsappnumber', 'whatsapp', 'wa', 'วอทส์แอพ'], ['line', 'wechat']);
  const idxFacebook = findIndex(headers, ['facebookprofile', 'facebook', 'fb', 'เฟซบุ๊ก', 'เฟสบุ๊ค']);
  
  // Generic / combined chat header (e.g. 'Line ID / WhatsApp' or 'Messaging')
  const idxGenericChat = findIndex(headers, ['lineidwhatsapp', 'linewhatsapp', 'messaging', 'chat', 'contactapp', 'channels']);
  const idxMessage = findIndex(headers, ['messagetoother', 'greeting', 'note', 'littlebit', 'ข้อความ', 'คำทักทาย', 'notetoother', 'message']);
  const idxPhoto = findIndex(headers, ['photo', 'picture', 'image', 'avatar', 'upload', 'รูปถ่าย', 'รูปภาพ']);

  const participants = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    // Skip empty rows
    if (!row || row.length === 0 || !row.some(val => val && String(val).trim() !== '')) continue;

    const nameEnglish = (idxEnglish !== -1 && row[idxEnglish]) ? String(row[idxEnglish]).trim() : (String(row[0]) || 'Participant');
    const nameNative = (idxNative !== -1 && row[idxNative]) ? String(row[idxNative]).trim() : nameEnglish;
    const nationalityRaw = (idxNationality !== -1 && row[idxNationality]) ? String(row[idxNationality]).trim() : 'ASEAN';
    const countryMeta = getCountryMeta(nationalityRaw);

    let wechatVal = (idxWechat !== -1 && row[idxWechat]) ? String(row[idxWechat]).trim() : '';
    let lineVal = (idxLine !== -1 && row[idxLine]) ? String(row[idxLine]).trim() : '';
    let whatsappVal = (idxWhatsapp !== -1 && row[idxWhatsapp]) ? String(row[idxWhatsapp]).trim() : '';
    let facebookVal = (idxFacebook !== -1 && row[idxFacebook]) ? String(row[idxFacebook]).trim() : '';

    // If any channel value contains concatenated multi-channel text (e.g. 'WeChat: ... | LINE: ...'), parse and extract each field
    const rawToParse = [
      (idxGenericChat !== -1 && row[idxGenericChat]) ? String(row[idxGenericChat]).trim() : '',
      lineVal,
      whatsappVal,
      wechatVal
    ].find(str => str && (str.includes('|') || /(?:wechat|line|whatsapp|wa|fb|facebook):/i.test(str)));

    if (rawToParse) {
      const parsed = parseMessagingChannels(rawToParse);
      if (!wechatVal && parsed.wechat) wechatVal = parsed.wechat;
      if (parsed.line) lineVal = parsed.line;
      if (parsed.whatsapp) whatsappVal = parsed.whatsapp;
      if (!facebookVal && parsed.facebook) facebookVal = parsed.facebook;
    }

    // Safety clean-up: Ensure lineVal and whatsappVal do NOT contain leftover concatenated strings
    if (lineVal && (lineVal.includes('|') || /(?:wechat|whatsapp|fb):/i.test(lineVal))) {
      const p = parseMessagingChannels(lineVal);
      lineVal = p.line || '';
      if (!wechatVal && p.wechat) wechatVal = p.wechat;
      if (!whatsappVal && p.whatsapp) whatsappVal = p.whatsapp;
      if (!facebookVal && p.facebook) facebookVal = p.facebook;
    }

    if (whatsappVal && (whatsappVal.includes('|') || /(?:wechat|line|fb):/i.test(whatsappVal))) {
      const p = parseMessagingChannels(whatsappVal);
      whatsappVal = p.whatsapp || '';
      if (!wechatVal && p.wechat) wechatVal = p.wechat;
      if (!lineVal && p.line) lineVal = p.line;
      if (!facebookVal && p.facebook) facebookVal = p.facebook;
    }

    // If whatsapp is empty but phone looks like an international mobile number, provide it as WhatsApp fallback
    const rawPhone = (idxPhone !== -1 && row[idxPhone]) ? String(row[idxPhone]).trim() : '';
    if (!whatsappVal && (rawPhone.startsWith('+') || rawPhone.startsWith('66') || rawPhone.length >= 10)) {
      whatsappVal = rawPhone.startsWith('+') ? rawPhone : (rawPhone.startsWith('66') ? `+${rawPhone}` : rawPhone);
    }

    participants.push({
      id: `sheet-p-${i}`,
      nameEnglish,
      nameNative,
      nickname: (idxNickname !== -1 && row[idxNickname]) ? String(row[idxNickname]).trim() : '',
      nationality: countryMeta.name,
      countryCode: countryMeta.code,
      countryFlag: countryMeta.flag,
      affiliation: (idxAffiliation !== -1 && row[idxAffiliation]) ? String(row[idxAffiliation]).trim() : 'Geospatial Agency',
      position: (idxPosition !== -1 && row[idxPosition]) ? String(row[idxPosition]).trim() : 'Specialist',
      expertise: (idxExpertise !== -1 && row[idxExpertise]) ? String(row[idxExpertise]).trim() : 'Remote Sensing & GIS',
      workingOffice: (idxOffice !== -1 && row[idxOffice]) ? String(row[idxOffice]).trim() : '',
      phone: rawPhone,
      email: (idxEmail !== -1 && row[idxEmail]) ? String(row[idxEmail]).trim() : '',
      linkedin: (idxLinkedin !== -1 && row[idxLinkedin]) ? String(row[idxLinkedin]).trim() : '',
      wechatId: wechatVal,
      lineId: lineVal,
      whatsapp: whatsappVal,
      facebook: facebookVal,
      message: (idxMessage !== -1 && row[idxMessage]) ? String(row[idxMessage]).trim() : '',
      photoUrl: (idxPhoto !== -1 && row[idxPhoto]) ? formatDrivePhotoUrl(String(row[idxPhoto])) : '',
      role: "Participant"
    });
  }

  return participants;
}

/**
 * Transform parsed CSV rows into structured Lecturer objects
 */
export function mapCsvToLecturers(rows) {
  if (!rows || rows.length < 2) return [];

  const headers = rows[0];

  const idxNameEnglish = findIndex(headers, ['nameenglish', 'lecturername', 'fullname', 'ชื่อวิทยากร', 'ชื่ออาจารย์', 'name']);
  const idxNameNative = findIndex(headers, ['namenative', 'localname', 'ชื่อภาษาไทย', 'ชื่อท้องถิ่น']);
  const idxTitle = findIndex(headers, ['title', 'academic', 'position', 'ตำแหน่ง']);
  const idxAffiliation = findIndex(headers, ['affiliation', 'institution', 'university', 'agency', 'หน่วยงาน', 'สังกัด']);
  const idxCountry = findIndex(headers, ['country', 'nationality', 'ประเทศ']);
  const idxSession = findIndex(headers, ['session', 'topic', 'หัวข้อ', 'หัวข้อบรรยาย', 'course']);
  const idxDate = findIndex(headers, ['date', 'time', 'day', 'วันที่', 'วันเวลา']);
  const idxTopics = findIndex(headers, ['keytopics', 'summary', 'detail', 'รายละเอียด', 'เนื้อหา']);
  const idxEmail = findIndex(headers, ['email', 'อีเมล']);
  const idxPhone = findIndex(headers, ['phone', 'tel', 'เบอร์']);
  const idxLinkedin = findIndex(headers, ['linkedin', 'ลิงก์linkedin']);
  const idxWechat = findIndex(headers, ['wechatid', 'wechat', 'wxid', 'weixin', '微信']);
  const idxLine = findIndex(headers, ['lineid', 'line', 'ไลน์', 'ไลน์ไอดี'], ['whatsapp', 'wechat']);
  const idxWhatsapp = findIndex(headers, ['whatsappnumber', 'whatsapp', 'wa', 'วอทส์แอพ'], ['line', 'wechat']);
  const idxFacebook = findIndex(headers, ['facebookprofile', 'facebook', 'fb', 'เฟซบุ๊ก', 'เฟสบุ๊ค']);
  const idxGenericChat = findIndex(headers, ['lineidwhatsapp', 'linewhatsapp', 'messaging', 'chat', 'contactapp', 'channels']);
  const idxLab = findIndex(headers, ['website', 'lab', 'researchgate', 'เว็บ']);
  const idxSlides = findIndex(headers, ['slide', 'material', 'download', 'เอกสาร', 'สไลด์']);
  const idxNotes = findIndex(headers, ['note', 'remark', 'หมายเหตุ']);
  const idxPhoto = findIndex(headers, ['photo', 'picture', 'image', 'รูป']);

  const lecturers = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || !row.some(val => val && String(val).trim() !== '')) continue;

    const nameEnglish = (idxNameEnglish !== -1 && row[idxNameEnglish]) ? String(row[idxNameEnglish]).trim() : `Lecturer ${i}`;
    const countryRaw = (idxCountry !== -1 && row[idxCountry]) ? String(row[idxCountry]).trim() : 'ASEAN';
    const countryMeta = getCountryMeta(countryRaw);

    const titleVal = (idxTitle !== -1 && row[idxTitle]) ? String(row[idxTitle]).trim() : 'Guest Lecturer / Specialist';
    const sessionVal = (idxSession !== -1 && row[idxSession]) ? String(row[idxSession]).trim() : `Session ${i}`;
    const isTourLead = titleVal.toLowerCase().includes('tour lead') ||
                       titleVal.includes('ผู้นำทัศนศึกษา') ||
                       titleVal.includes('ผู้ประสานงานทัศนศึกษา') ||
                       sessionVal.toLowerCase().includes('field trip') ||
                       sessionVal.toLowerCase().includes('tour') ||
                       sessionVal.toLowerCase().includes('excursion');

    let wechatVal = (idxWechat !== -1 && row[idxWechat]) ? String(row[idxWechat]).trim() : '';
    let lineVal = (idxLine !== -1 && row[idxLine]) ? String(row[idxLine]).trim() : '';
    let whatsappVal = (idxWhatsapp !== -1 && row[idxWhatsapp]) ? String(row[idxWhatsapp]).trim() : '';
    let facebookVal = (idxFacebook !== -1 && row[idxFacebook]) ? String(row[idxFacebook]).trim() : '';

    const rawToParse = [
      (idxGenericChat !== -1 && row[idxGenericChat]) ? String(row[idxGenericChat]).trim() : '',
      lineVal,
      whatsappVal,
      wechatVal
    ].find(str => str && (str.includes('|') || /(?:wechat|line|whatsapp|wa|fb|facebook):/i.test(str)));

    if (rawToParse) {
      const p = parseMessagingChannels(rawToParse);
      if (!wechatVal && p.wechat) wechatVal = p.wechat;
      if (p.line) lineVal = p.line;
      if (p.whatsapp) whatsappVal = p.whatsapp;
      if (!facebookVal && p.facebook) facebookVal = p.facebook;
    }

    if (lineVal && (lineVal.includes('|') || /(?:wechat|whatsapp|fb):/i.test(lineVal))) {
      const p = parseMessagingChannels(lineVal);
      lineVal = p.line || '';
      if (!wechatVal && p.wechat) wechatVal = p.wechat;
      if (!whatsappVal && p.whatsapp) whatsappVal = p.whatsapp;
      if (!facebookVal && p.facebook) facebookVal = p.facebook;
    }

    if (whatsappVal && (whatsappVal.includes('|') || /(?:wechat|line|fb):/i.test(whatsappVal))) {
      const p = parseMessagingChannels(whatsappVal);
      whatsappVal = p.whatsapp || '';
      if (!wechatVal && p.wechat) wechatVal = p.wechat;
      if (!lineVal && p.line) lineVal = p.line;
      if (!facebookVal && p.facebook) facebookVal = p.facebook;
    }

    const rawPhone = (idxPhone !== -1 && row[idxPhone]) ? String(row[idxPhone]).trim() : '';
    if (!whatsappVal && (rawPhone.startsWith('+') || rawPhone.startsWith('66') || rawPhone.length >= 10)) {
      whatsappVal = rawPhone.startsWith('+') ? rawPhone : (rawPhone.startsWith('66') ? `+${rawPhone}` : rawPhone);
    }

    lecturers.push({
      id: `sheet-lec-${i}`,
      nameEnglish,
      nameNative: (idxNameNative !== -1 && row[idxNameNative]) ? String(row[idxNameNative]).trim() : nameEnglish,
      title: titleVal,
      affiliation: (idxAffiliation !== -1 && row[idxAffiliation]) ? String(row[idxAffiliation]).trim() : 'Partner Organization',
      country: countryMeta.name,
      countryCode: countryMeta.code,
      sessionTitle: sessionVal,
      sessionDate: (idxDate !== -1 && row[idxDate]) ? String(row[idxDate]).trim() : 'Seminar Schedule',
      sessionDay: isTourLead ? 'Field Trip' : `Day ${i}`,
      topics: (idxTopics !== -1 && row[idxTopics]) ? String(row[idxTopics]).trim() : '',
      email: (idxEmail !== -1 && row[idxEmail]) ? String(row[idxEmail]).trim() : '',
      phone: rawPhone,
      linkedin: (idxLinkedin !== -1 && row[idxLinkedin]) ? String(row[idxLinkedin]).trim() : '',
      wechatId: wechatVal,
      lineId: lineVal,
      whatsapp: whatsappVal,
      facebook: facebookVal,
      labWebsite: (idxLab !== -1 && row[idxLab]) ? String(row[idxLab]).trim() : '',
      slidesUrl: (idxSlides !== -1 && row[idxSlides]) ? String(row[idxSlides]).trim() : '',
      notes: (idxNotes !== -1 && row[idxNotes]) ? String(row[idxNotes]).trim() : '',
      photoUrl: (idxPhoto !== -1 && row[idxPhoto]) ? formatDrivePhotoUrl(String(row[idxPhoto])) : '',
      role: isTourLead ? "Tour Lead" : "Lecturer"
    });
  }

  return lecturers;
}

/**
 * Convert JSON array from Apps Script API into 2D table array compatible with mapCsvTo...
 */
export function jsonToRows(jsonArray) {
  if (!Array.isArray(jsonArray) || jsonArray.length === 0) return [];
  const headers = Object.keys(jsonArray[0]);
  const rows = [headers];
  for (let i = 0; i < jsonArray.length; i++) {
    const item = jsonArray[i];
    rows.push(headers.map(h => String(item[h] ?? '')));
  }
  return rows;
}

/**
 * Fetch live data from configured Google Sheet CSV or Apps Script API
 * Races both endpoints in parallel using Promise.allSettled and selects the best/freshest live dataset
 */
export async function fetchLiveParticipants(csvUrl, scriptUrl) {
  const fetchers = [];

  if (scriptUrl && scriptUrl.trim()) {
    const cleanUrl = scriptUrl.trim();
    const apiUrl = cleanUrl.includes('?') 
      ? `${cleanUrl}&action=getParticipants` 
      : `${cleanUrl}?action=getParticipants`;
    fetchers.push(
      fetch(apiUrl, { redirect: 'follow' }).then(async res => {
        if (!res.ok) throw new Error(`API HTTP ${res.status}`);
        const json = await res.json();
        const rows = jsonToRows(json);
        return mapCsvToParticipants(rows);
      })
    );
  }

  if (csvUrl && csvUrl.trim()) {
    fetchers.push(
      fetch(csvUrl.trim()).then(async res => {
        if (!res.ok) throw new Error(`CSV HTTP ${res.status}`);
        const text = await res.text();
        const rows = parseCSV(text);
        return mapCsvToParticipants(rows);
      })
    );
  }

  if (fetchers.length === 0) return null;

  try {
    const results = await Promise.allSettled(fetchers);
    const successful = results
      .filter(r => r.status === 'fulfilled' && Array.isArray(r.value))
      .map(r => r.value);

    if (successful.length === 0) return null;

    // Pick the dataset with the most records, or return empty array if valid response from Google Sheet
    successful.sort((a, b) => b.length - a.length);
    return successful[0];
  } catch (err) {
    console.warn("Could not fetch live Google Sheet participants:", err);
    return null;
  }
}

/**
 * Fetch live lecturers from configured Google Sheet CSV or Apps Script API
 * Races both endpoints in parallel using Promise.allSettled and selects the best/freshest live dataset
 */
export async function fetchLiveLecturers(csvUrl, scriptUrl) {
  const fetchers = [];

  if (scriptUrl && scriptUrl.trim()) {
    const cleanUrl = scriptUrl.trim();
    const apiUrl = cleanUrl.includes('?') 
      ? `${cleanUrl}&action=getLecturers` 
      : `${cleanUrl}?action=getLecturers`;
    fetchers.push(
      fetch(apiUrl, { redirect: 'follow' }).then(async res => {
        if (!res.ok) throw new Error(`API HTTP ${res.status}`);
        const json = await res.json();
        const rows = jsonToRows(json);
        return mapCsvToLecturers(rows);
      })
    );
  }

  if (csvUrl && csvUrl.trim()) {
    fetchers.push(
      fetch(csvUrl.trim()).then(async res => {
        if (!res.ok) throw new Error(`CSV HTTP ${res.status}`);
        const text = await res.text();
        const rows = parseCSV(text);
        return mapCsvToLecturers(rows);
      })
    );
  }

  if (fetchers.length === 0) return null;

  try {
    const results = await Promise.allSettled(fetchers);
    const successful = results
      .filter(r => r.status === 'fulfilled' && Array.isArray(r.value))
      .map(r => r.value);

    if (successful.length === 0) return null;

    successful.sort((a, b) => b.length - a.length);
    return successful[0];
  } catch (err) {
    console.warn("Could not fetch live Google Sheet lecturers:", err);
    return null;
  }
}

