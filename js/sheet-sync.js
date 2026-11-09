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
 * Fuzzy header mapping helper
 */
function findIndex(headers, matchers) {
  const normalized = headers.map(h => (h || '').toLowerCase().replace(/[^a-z0-9ก-๙]/g, ''));
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
  const idxWechat = findIndex(headers, ['wechat', 'wxid', 'weixin', '微信', 'wechatid']);
  const idxLine = findIndex(headers, ['lineid', 'line', 'ไลน์', 'ไลน์ไอดี']);
  const idxWhatsapp = findIndex(headers, ['whatsapp', 'wa', 'วอทส์แอพ']);
  const idxFacebook = findIndex(headers, ['facebook', 'fb', 'เฟซบุ๊ก', 'เฟสบุ๊ค']);
  const idxGenericChat = findIndex(headers, ['messaging', 'chat', 'contactapp', 'lineid/whatsapp/wechat/viber', 'line/whatsapp']);
  const idxMessage = findIndex(headers, ['message', 'note', 'littlebit', 'ข้อความ', 'คำทักทาย', 'notetoother']);
  const idxPhoto = findIndex(headers, ['photo', 'picture', 'image', 'avatar', 'upload', 'รูปถ่าย', 'รูปภาพ']);

  const participants = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    // Skip empty rows
    if (!row || row.length === 0 || !row.some(val => val && val.trim() !== '')) continue;

    const nameEnglish = (idxEnglish !== -1 && row[idxEnglish]) ? row[idxEnglish].trim() : (row[0] || 'Participant');
    const nameNative = (idxNative !== -1 && row[idxNative]) ? row[idxNative].trim() : nameEnglish;
    const nationalityRaw = (idxNationality !== -1 && row[idxNationality]) ? row[idxNationality].trim() : 'ASEAN';
    const countryMeta = getCountryMeta(nationalityRaw);

    let wechatVal = (idxWechat !== -1 && row[idxWechat]) ? row[idxWechat].trim() : '';
    let lineVal = (idxLine !== -1 && row[idxLine]) ? row[idxLine].trim() : '';
    let whatsappVal = (idxWhatsapp !== -1 && row[idxWhatsapp]) ? row[idxWhatsapp].trim() : '';
    let facebookVal = (idxFacebook !== -1 && row[idxFacebook]) ? row[idxFacebook].trim() : '';

    const combinedChat = (idxGenericChat !== -1 && row[idxGenericChat]) ? row[idxGenericChat].trim() : '';
    if (combinedChat) {
      if (!wechatVal && combinedChat.includes('WeChat:')) {
        const m = combinedChat.match(/WeChat:\s*([^|]+)/i);
        if (m) wechatVal = m[1].trim();
      }
      if (!lineVal && combinedChat.includes('LINE:')) {
        const m = combinedChat.match(/LINE:\s*([^|]+)/i);
        if (m) lineVal = m[1].trim();
      }
      if (!whatsappVal && combinedChat.includes('WhatsApp:')) {
        const m = combinedChat.match(/WhatsApp:\s*([^|]+)/i);
        if (m) whatsappVal = m[1].trim();
      }
      if (!facebookVal && (combinedChat.includes('FB:') || combinedChat.includes('Facebook:'))) {
        const m = combinedChat.match(/(?:FB|Facebook):\s*([^|]+)/i);
        if (m) facebookVal = m[1].trim();
      }
      if (!wechatVal && !lineVal && !whatsappVal && !facebookVal) {
        if (combinedChat.toLowerCase().includes('wx') || combinedChat.toLowerCase().includes('wechat')) {
          wechatVal = combinedChat.replace(/wechat[:\s]*/i, '');
        } else if (combinedChat.startsWith('+') || /^\d{9,15}$/.test(combinedChat.replace(/\s+/g, ''))) {
          whatsappVal = combinedChat;
        } else if (combinedChat.includes('facebook') || combinedChat.includes('fb.com')) {
          facebookVal = combinedChat;
        } else {
          lineVal = combinedChat;
        }
      }
    }

    participants.push({
      id: `sheet-p-${i}`,
      nameEnglish,
      nameNative,
      nickname: (idxNickname !== -1 && row[idxNickname]) ? row[idxNickname].trim() : '',
      nationality: countryMeta.name,
      countryCode: countryMeta.code,
      countryFlag: countryMeta.flag,
      affiliation: (idxAffiliation !== -1 && row[idxAffiliation]) ? row[idxAffiliation].trim() : 'Geospatial Agency',
      position: (idxPosition !== -1 && row[idxPosition]) ? row[idxPosition].trim() : 'Specialist',
      expertise: (idxExpertise !== -1 && row[idxExpertise]) ? row[idxExpertise].trim() : 'Remote Sensing & GIS',
      workingOffice: (idxOffice !== -1 && row[idxOffice]) ? row[idxOffice].trim() : '',
      phone: (idxPhone !== -1 && row[idxPhone]) ? row[idxPhone].trim() : '',
      email: (idxEmail !== -1 && row[idxEmail]) ? row[idxEmail].trim() : '',
      linkedin: (idxLinkedin !== -1 && row[idxLinkedin]) ? row[idxLinkedin].trim() : '',
      wechatId: wechatVal,
      lineId: lineVal,
      whatsapp: whatsappVal || ((idxPhone !== -1 && row[idxPhone] && row[idxPhone].includes('+')) ? row[idxPhone].trim() : ''),
      facebook: facebookVal,
      message: (idxMessage !== -1 && row[idxMessage]) ? row[idxMessage].trim() : '',
      photoUrl: (idxPhoto !== -1 && row[idxPhoto]) ? formatDrivePhotoUrl(row[idxPhoto]) : '',
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
  const idxWechat = findIndex(headers, ['wechat', 'wxid', 'weixin', '微信', 'wechatid']);
  const idxLine = findIndex(headers, ['lineid', 'line', 'ไลน์', 'ไลน์ไอดี']);
  const idxWhatsapp = findIndex(headers, ['whatsapp', 'wa', 'วอทส์แอพ']);
  const idxFacebook = findIndex(headers, ['facebook', 'fb', 'เฟซบุ๊ก', 'เฟสบุ๊ค']);
  const idxLab = findIndex(headers, ['website', 'lab', 'researchgate', 'เว็บ']);
  const idxSlides = findIndex(headers, ['slide', 'material', 'download', 'เอกสาร', 'สไลด์']);
  const idxNotes = findIndex(headers, ['note', 'remark', 'หมายเหตุ']);
  const idxPhoto = findIndex(headers, ['photo', 'picture', 'image', 'รูป']);

  const lecturers = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || !row.some(val => val && val.trim() !== '')) continue;

    const nameEnglish = (idxNameEnglish !== -1 && row[idxNameEnglish]) ? row[idxNameEnglish].trim() : `Lecturer ${i}`;
    const countryRaw = (idxCountry !== -1 && row[idxCountry]) ? row[idxCountry].trim() : 'ASEAN';
    const countryMeta = getCountryMeta(countryRaw);

    const titleVal = (idxTitle !== -1 && row[idxTitle]) ? row[idxTitle].trim() : 'Guest Lecturer / Specialist';
    const sessionVal = (idxSession !== -1 && row[idxSession]) ? row[idxSession].trim() : `Session ${i}`;
    const isTourLead = titleVal.toLowerCase().includes('tour lead') ||
                       titleVal.includes('ผู้นำทัศนศึกษา') ||
                       titleVal.includes('ผู้ประสานงานทัศนศึกษา') ||
                       sessionVal.toLowerCase().includes('field trip') ||
                       sessionVal.toLowerCase().includes('tour') ||
                       sessionVal.toLowerCase().includes('excursion');

    lecturers.push({
      id: `sheet-lec-${i}`,
      nameEnglish,
      nameNative: (idxNameNative !== -1 && row[idxNameNative]) ? row[idxNameNative].trim() : nameEnglish,
      title: titleVal,
      affiliation: (idxAffiliation !== -1 && row[idxAffiliation]) ? row[idxAffiliation].trim() : 'Partner Organization',
      country: countryMeta.name,
      countryCode: countryMeta.code,
      sessionTitle: sessionVal,
      sessionDate: (idxDate !== -1 && row[idxDate]) ? row[idxDate].trim() : 'Seminar Schedule',
      sessionDay: isTourLead ? 'Field Trip' : `Day ${i}`,
      topics: (idxTopics !== -1 && row[idxTopics]) ? row[idxTopics].trim() : '',
      email: (idxEmail !== -1 && row[idxEmail]) ? row[idxEmail].trim() : '',
      phone: (idxPhone !== -1 && row[idxPhone]) ? row[idxPhone].trim() : '',
      linkedin: (idxLinkedin !== -1 && row[idxLinkedin]) ? row[idxLinkedin].trim() : '',
      wechatId: (idxWechat !== -1 && row[idxWechat]) ? row[idxWechat].trim() : '',
      lineId: (idxLine !== -1 && row[idxLine]) ? row[idxLine].trim() : '',
      whatsapp: (idxWhatsapp !== -1 && row[idxWhatsapp]) ? row[idxWhatsapp].trim() : '',
      facebook: (idxFacebook !== -1 && row[idxFacebook]) ? row[idxFacebook].trim() : '',
      labWebsite: (idxLab !== -1 && row[idxLab]) ? row[idxLab].trim() : '',
      slidesUrl: (idxSlides !== -1 && row[idxSlides]) ? row[idxSlides].trim() : '',
      notes: (idxNotes !== -1 && row[idxNotes]) ? row[idxNotes].trim() : '',
      photoUrl: (idxPhoto !== -1 && row[idxPhoto]) ? formatDrivePhotoUrl(row[idxPhoto]) : '',
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
 * Races both endpoints in parallel using Promise.any for sub-2-second response
 */
export async function fetchLiveParticipants(csvUrl, scriptUrl) {
  const fetchers = [];

  if (csvUrl && csvUrl.trim()) {
    fetchers.push(
      fetch(csvUrl.trim()).then(async res => {
        if (!res.ok) throw new Error(`CSV HTTP ${res.status}`);
        const text = await res.text();
        const rows = parseCSV(text);
        const data = mapCsvToParticipants(rows);
        if (!data || data.length === 0) throw new Error('Empty CSV data');
        return data;
      })
    );
  }

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
        const data = mapCsvToParticipants(rows);
        if (!data || data.length === 0) throw new Error('Empty API data');
        return data;
      })
    );
  }

  if (fetchers.length === 0) return null;

  try {
    return await Promise.any(fetchers);
  } catch (err) {
    console.warn("Could not fetch live Google Sheet participants:", err);
    return null;
  }
}

/**
 * Fetch live lecturers from configured Google Sheet CSV or Apps Script API
 * Races both endpoints in parallel using Promise.any for sub-2-second response
 */
export async function fetchLiveLecturers(csvUrl, scriptUrl) {
  const fetchers = [];

  if (csvUrl && csvUrl.trim()) {
    fetchers.push(
      fetch(csvUrl.trim()).then(async res => {
        if (!res.ok) throw new Error(`CSV HTTP ${res.status}`);
        const text = await res.text();
        const rows = parseCSV(text);
        const data = mapCsvToLecturers(rows);
        if (!data || data.length === 0) throw new Error('Empty CSV data');
        return data;
      })
    );
  }

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
        const data = mapCsvToLecturers(rows);
        if (!data || data.length === 0) throw new Error('Empty API data');
        return data;
      })
    );
  }

  if (fetchers.length === 0) return null;

  try {
    return await Promise.any(fetchers);
  } catch (err) {
    console.warn("Could not fetch live Google Sheet lecturers:", err);
    return null;
  }
}

