# 🛰️ ทำเนียบผู้เข้าร่วมสัมมนาและวิทยากร (Directory & Yearbook)
## Seminar on Remote Sensing Technology for ASEAN Countries
**Dates:** 28 October – 10 November 2026  
**Venue:** Bangkok & Space Technology Center, Thailand  
**Theme:** Earth Observation & Geospatial Innovations for ASEAN Sustainable Development

[![Deploy to GitHub Pages](https://github.com/actions/workflows/deploy.yml/badge.svg)](https://github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🌟 จุดเด่นและฟีเจอร์หลัก (Key Features)

1. **🔗 เชื่อมต่อ Google Sheet แบบ Real-time**:
   - ดึงข้อมูลผู้เข้าร่วมและวิทยากรสดจาก Google Sheet ได้ทันทีผ่านการ Publish to Web (CSV) หรือ Google Apps Script JSON API
   - เมื่อมีผู้กรอกข้อมูลเข้ามา ข้อมูลในหน้าเว็บทำเนียบจะอัปเดตโดยอัตโนมัติ

2. **📸 ฟอร์มลงทะเบียนพร้อมอัปโหลดรูปภาพ (Web Form & Google Form)**:
   - มีหน้าฟอร์ม `submit.html` ที่รองรับการลากวาง (Drag & Drop) รูปถ่าย และแปลงเข้าสู่ Google Drive
   - รองรับการเชื่อมต่อกับ Google Form มาตรฐานโดยอัตโนมัติ

3. **📋 ข้อมูลโปรไฟล์ครบถ้วนตามต้องการ**:
   - **Name in native language**: ชื่อในภาษาท้องถิ่นของตนเอง (ไทย, Bahasa Indonesia, Tiếng Việt, Khmer, Lao, ฯลฯ)
   - **Name in English**: ชื่อภาษาอังกฤษ
   - **Nickname or Preferred name**: ชื่อเล่น หรือชื่อเรียกที่สะดวก
   - **Nationalities**: ประเทศสมาชิกอาเซียน (ไทย, อินโดนีเซีย, ฟิลิปปินส์, เวียดนาม, มาเลเซีย, สิงคโปร์, กัมพูชา, ลาว, บรูไน, เมียนมา, ติมอร์-เลสเต) พร้อมไอคอนธงชาติ
   - **Affiliation**: หน่วยงาน, กรม, กระทรวง, สถาบันวิจัย, หรือมหาวิทยาลัย
   - **Position**: ตำแหน่งหน้าที่การงาน
   - **Expertise / Specialization**: สาขาความเชี่ยวชาญ (เช่น SAR / Radar, Optical, UAV/Drone, AI/Deep Learning for EO, GIS, Disaster Risk, Agriculture ฯลฯ)
   - **Working Office Location**: สถานที่ตั้งที่ทำงาน (เมือง, อาคาร, ประเทศ)
   - **Contact Channels**: เบอร์โทรศัพท์, อีเมล, LinkedIn, Line ID / WhatsApp
   - **Message / Note**: ข้อความทักทายและฝากถึงเพื่อนร่วมรุ่น
   - **Profile Photo**: รูปภาพผู้เข้าร่วมสัมมนา

4. **🔍 ระบบค้นหาและตัวกรองอัจฉริยะ (Search & Filter)**:
   - ค้นหาแบบเรียลไทม์ได้ทั้งชื่อภาษาไทย/ภาษาท้องถิ่น, ชื่ออังกฤษ, ชื่อเล่น, ประเทศ, หน่วยงาน, หรือคำสำคัญ
   - ตัวกรองแยกตามประเทศสมาชิกอาเซียน (Flag Filter Pills)
   - ตัวกรองแยกตามสาขาความเชี่ยวชาญ (Expertise Tag Pills)
   - เรียงลำดับชื่อ A-Z หรือตามประเทศ

5. **👨‍🏫 ทำเนียบวิทยากรและหัวข้อบรรยาย (Lecturers & Sessions)**:
   - รวบรวมข้อมูลคณาจารย์และผู้เชี่ยวชาญทุก Session ตลอด 2 สัปดาห์ของการสัมมนา
   - แสดงวันเวลาบรรยาย, หัวข้อบรรยาย, สรุปเนื้อหาสำคัญ
   - ลิงก์ดาวน์โหลดสไลด์ประกอบการบรรยาย (Presentation Slides)
   - ช่องทางติดต่อวิทยากรและลิงก์ห้องปฏิบัติการวิจัย

6. **📲 Save Contact (vCard) & Export CSV**:
   - กดปุ่ม **"Save Contact (vCard)"** เพื่อเซฟเบอร์โทรและข้อมูลผู้เข้าร่วมลงสมุดโทรศัพท์มือถือได้ทันทีในคลิกเดียว
   - ส่งออกข้อมูลทั้งหมดเป็นไฟล์ `.csv` สำหรับผู้จัดงาน

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```
asean-remote-sensing-directory/
├── index.html                   # หน้าหลักแสดงทำเนียบ, ระบบค้นหา, ตัวกรอง, สถิติ, และ Modal รายละเอียด
├── submit.html                  # หน้าฟอร์มลงทะเบียนผู้เข้าร่วมสัมมนา พร้อมระบบอัปโหลดรูปภาพ
├── css/
│   └── style.css                # ดีไซน์ธีมเทคโนโลยีอวกาศและภาพถ่ายดาวเทียม (Earth Observation)
├── js/
│   ├── config.js                # การตั้งค่าระบบ, รายชื่อประเทศอาเซียน, และแท็กความเชี่ยวชาญ
│   ├── data.js                  # ข้อมูลตัวอย่างสมจริงของผู้เข้าร่วมและวิทยากรอาเซียน
│   ├── sheet-sync.js            # ระบบดึงข้อมูลและแปลงค่าจาก Google Sheet CSV แบบอัตโนมัติ
│   ├── app.js                   # การทำงานหลัก: ค้นหา, กรอง, สลับแท็บ, บันทึก vCard, และ Modal
│   └── submit.js                # ควบคุมการอัปโหลดรูปภาพและการส่งข้อมูลเข้า Google Apps Script
├── google-apps-script/
│   ├── Code.gs                  # โค้ด Google Apps Script สำหรับรับส่งข้อมูลและบันทึกรูปเข้า Google Drive
│   └── README.md                # คู่มือการตั้งค่า Google Sheet และ Google Form ทีละขั้นตอน
├── assets/
│   ├── favicon.svg              # ไอคอนดาวเทียมโคจรรอบโลก
│   └── images/
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions สำหรับ Deploy ขึ้น GitHub Pages อัตโนมัติ
├── README.md                    # คู่มือการใช้งานฉบับสมบูรณ์
└── LICENSE                      # ใบอนุญาต MIT
```

---

## 🚀 วิธีเชื่อมต่อ Google Sheet & Google Form

อ่านคู่มือฉบับเต็มได้ที่ [`google-apps-script/README.md`](google-apps-script/README.md) โดยสรุปดังนี้:

### ทางเลือกที่ 1: ใช้ Google Form แบบมาตรฐาน (แนะนำสำหรับผู้เริ่มต้น)
1. สร้าง **Google Form** โดยมีคำถามตรงกับหัวข้อที่ต้องการ (ชื่อ, สัญชาติ, สังกัด, ตำแหน่ง, ความเชี่ยวชาญ, เบอร์โทร, อีเมล, ข้อความ, รูปถ่าย)
2. เชื่อมต่อ Response เข้ากับ **Google Sheet**
3. ไปที่ Google Sheet เมนู **File** ➡️ **Share** ➡️ **Publish to web** ➡️ เลือกแท็บ **Participants** ➡️ เลือกประเภทเป็น **Comma-separated values (.csv)** ➡️ กด **Publish**
4. เปิดหน้าเว็บทำเนียบ กดปุ่ม **"⚙️ Google Sheet"** นำลิงก์ CSV ไปวาง แล้วกด **Save & Sync** ข้อมูลจะแสดงผลทันที!

### ทางเลือกที่ 2: ใช้ Google Apps Script Web App (ฟอร์มหน้าเว็บส่งเข้า Drive & Sheet โดยตรง)
1. ใน Google Sheet ไปที่ **Extensions** ➡️ **Apps Script**
2. คัดลอกโค้ดจาก `google-apps-script/Code.gs` ไปวาง
3. คลิก **Deploy** ➡️ **New deployment** ➡️ เลือก **Web app**
4. ตั้งค่า **Who has access** เป็น **"Anyone"** แล้วกด Deploy
5. นำ **Web app URL** มาใส่ในหน้าเว็บทำเนียบที่ช่อง **Google Apps Script Web App URL**

---

## 💻 วิธีนำขึ้น GitHub และเปิดใช้งาน GitHub Pages

### 1. นำโค้ดขึ้น GitHub Repository
สร้าง Repository ใหม่บน GitHub ของคุณ (เช่น `asean-remote-sensing-directory`) จากนั้นรันคำสั่ง:

```bash
# อยู่ในโฟลเดอร์โปรเจกต์
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
git add .
git commit -m "Initial commit: ASEAN Remote Sensing Seminar 2026 Directory website"
git push -u origin main
```

### 2. เปิดใช้งาน GitHub Pages
1. ไปที่หน้า GitHub Repository ของคุณ ➡️ **Settings**
2. เลือกเมนู **Pages** ด้านซ้าย
3. ในส่วน **Build and deployment**:
   - Source: เลือก **GitHub Actions** (โปรเจกต์มีไฟล์ `.github/workflows/deploy.yml` เตรียมไว้แล้ว)
   - หรือเลือก **Deploy from a branch** ➡️ เลือกสาขา **main** ➡️ โฟลเดอร์ `/ (root)` ➡️ กด **Save**
4. เว็บไซต์ของคุณจะออนไลน์ทันทีที่:
   `https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPO_NAME>/`

---

## 🛠️ การเปิดทดสอบในเครื่องคอมพิวเตอร์ (Local Testing)

เนื่องจากโปรเจกต์นี้เขียนด้วย Pure Modern HTML5, ES Modules, และ Tailwind CSS จึงสามารถเปิดใช้งานได้ทันทีโดยไม่ต้องลง `npm` หรือ `node_modules`:

```bash
# สามารถเปิดด้วย Python HTTP server:
python -m http.server 8000

# หรือเปิดด้วย VS Code Extension "Live Server"
# หรือใช้ npx serve:
npx serve .
```
แล้วเปิดเบราว์เซอร์ไปที่ `http://localhost:8000`

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
Seminar on Remote Sensing Technology for ASEAN Countries (2026).
