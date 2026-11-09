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
 * Determine country code and flag from nationality / country name
 */
export function getCountryMeta(countryStr) {
  if (!countryStr) return { code: "OTHER", flag: "🌐", name: "International" };
  const s = countryStr.toLowerCase().trim();

  if (s.includes('thai') || s.includes('ไทย') || s.includes('thailand')) return { code: 'TH', flag: '🇹🇭', name: 'Thailand' };
  if (s.includes('cambod') || s.includes('khmer') || s.includes('กัมพูชา') || s.includes('កម្ពុជា')) return { code: 'KH', flag: '🇰🇭', name: 'Cambodia' };
  if (s.includes('lao') || s.includes('ลาว') || s.includes('ລາວ')) return { code: 'LA', flag: '🇱🇦', name: 'Laos' };
  if (s.includes('myan') || s.includes('burm') || s.includes('พม่า') || s.includes('မြန်မာ')) return { code: 'MM', flag: '🇲🇲', name: 'Myanmar' };
  if (s.includes('china') || s.includes('chinese') || s.includes('中国') || s.includes('จีน')) return { code: 'CN', flag: '🇨🇳', name: 'China' };
  if (s.includes('indonesia')) return { code: 'ID', flag: '🇮🇩', name: 'Indonesia' };
  if (s.includes('philip') || s.includes('filipino')) return { code: 'PH', flag: '🇵🇭', name: 'Philippines' };
  if (s.includes('viet')) return { code: 'VN', flag: '🇻🇳', name: 'Vietnam' };
  if (s.includes('malay')) return { code: 'MY', flag: '🇲🇾', name: 'Malaysia' };
  if (s.includes('singapor')) return { code: 'SG', flag: '🇸🇬', name: 'Singapore' };
  if (s.includes('brunei')) return { code: 'BN', flag: '🇧🇳', name: 'Brunei Darussalam' };
  if (s.includes('timor')) return { code: 'TL', flag: '🇹🇱', name: 'Timor-Leste' };
  if (s.includes('japan')) return { code: 'OTHER', flag: '🇯🇵', name: 'Japan' };
  if (s.includes('australia')) return { code: 'OTHER', flag: '🇦🇺', name: 'Australia' };

  return { code: 'OTHER', flag: '🌐', name: countryStr };
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
  const idxLine = findIndex(headers, ['line', 'lineid', 'whatsapp', 'ไลน์', 'ไลน์ไอดี']);
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
      lineId: (idxLine !== -1 && row[idxLine]) ? row[idxLine].trim() : '',
      whatsapp: (idxLine !== -1 && row[idxLine] && row[idxLine].includes('+')) ? row[idxLine].trim() : '',
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

    lecturers.push({
      id: `sheet-lec-${i}`,
      nameEnglish,
      nameNative: (idxNameNative !== -1 && row[idxNameNative]) ? row[idxNameNative].trim() : nameEnglish,
      title: (idxTitle !== -1 && row[idxTitle]) ? row[idxTitle].trim() : 'Guest Lecturer / Specialist',
      affiliation: (idxAffiliation !== -1 && row[idxAffiliation]) ? row[idxAffiliation].trim() : 'Partner Organization',
      country: countryMeta.name,
      countryCode: countryMeta.code,
      sessionTitle: (idxSession !== -1 && row[idxSession]) ? row[idxSession].trim() : `Session ${i}`,
      sessionDate: (idxDate !== -1 && row[idxDate]) ? row[idxDate].trim() : 'Seminar Schedule',
      sessionDay: `Day ${i}`,
      topics: (idxTopics !== -1 && row[idxTopics]) ? row[idxTopics].trim() : '',
      email: (idxEmail !== -1 && row[idxEmail]) ? row[idxEmail].trim() : '',
      phone: (idxPhone !== -1 && row[idxPhone]) ? row[idxPhone].trim() : '',
      linkedin: (idxLinkedin !== -1 && row[idxLinkedin]) ? row[idxLinkedin].trim() : '',
      labWebsite: (idxLab !== -1 && row[idxLab]) ? row[idxLab].trim() : '',
      slidesUrl: (idxSlides !== -1 && row[idxSlides]) ? row[idxSlides].trim() : '',
      notes: (idxNotes !== -1 && row[idxNotes]) ? row[idxNotes].trim() : '',
      photoUrl: (idxPhoto !== -1 && row[idxPhoto]) ? formatDrivePhotoUrl(row[idxPhoto]) : '',
      role: "Lecturer"
    });
  }

  return lecturers;
}

/**
 * Fetch live data from configured Google Sheet CSV
 */
export async function fetchLiveParticipants(csvUrl) {
  if (!csvUrl) return null;

  try {
    const response = await fetch(csvUrl, { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(`Failed to fetch Google Sheet CSV: HTTP ${response.status}`);
    }
    const text = await response.text();
    const rows = parseCSV(text);
    return mapCsvToParticipants(rows);
  } catch (err) {
    console.warn("Could not fetch live Google Sheet participants:", err);
    return null;
  }
}

/**
 * Fetch live lecturers from configured Google Sheet CSV
 */
export async function fetchLiveLecturers(csvUrl) {
  if (!csvUrl) return null;

  try {
    const response = await fetch(csvUrl, { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(`Failed to fetch Google Sheet Lecturers CSV: HTTP ${response.status}`);
    }
    const text = await response.text();
    const rows = parseCSV(text);
    return mapCsvToLecturers(rows);
  } catch (err) {
    console.warn("Could not fetch live Google Sheet lecturers:", err);
    return null;
  }
}

