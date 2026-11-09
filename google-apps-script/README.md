# 📡 Google Sheet & Google Form Integration Guide
## ทำเนียบผู้เข้าร่วมสัมมนา Seminar on Remote Sensing Technology for ASEAN Countries (2026)

คุณสามารถเชื่อมต่อเว็บไซต์ทำเนียบนี้เข้ากับ **Google Sheet** และ **Google Form** เพื่อให้ผู้เข้าร่วมสัมมนาและวิทยากรสามารถกรอกข้อมูลพร้อมอัปโหลดรูปภาพได้สะดวก โดยมี 2 วิธีหลักที่คุณเลือกใช้ได้ตามความสะดวก:

---

### วิธีที่ 1: ใช้ Google Form แบบมาตรฐาน (ง่ายที่สุด ไม่ต้องเขียนโค้ด) ⭐ แนะนำสำหรับผู้เริ่มต้น

1. **สร้าง Google Form ใหม่**:
   - ตั้งชื่อฟอร์ม: `Registration Form: Seminar on Remote Sensing Technology for ASEAN Countries (2026)`
   - เพิ่มคำถามตามหัวข้อที่ต้องการ:
     1. **Name in English** (Short answer - Required)
     2. **Name in your native language** / ชื่อในภาษาท้องถิ่น (Short answer)
     3. **Nickname or Preferred name** / ชื่อเล่น (Short answer)
     4. **Nationality** / สัญชาติ (Dropdown หรือ Multiple choice รายชื่อประเทศอาเซียน: Thailand, Indonesia, Philippines, Vietnam, Malaysia, Singapore, Cambodia, Laos, Brunei, Myanmar, Timor-Leste, Other)
     5. **Affiliation / Organization** / สังกัด/หน่วยงาน (Short answer)
     6. **Position / Title** / ตำแหน่ง (Short answer)
     7. **Expertise / Specialization** / สาขาความเชี่ยวชาญ (Short answer หรือ Checkboxes เช่น SAR, Optical, UAV/Drone, GIS, Disaster, Agriculture ฯลฯ)
     8. **Working Office Location** / สถานที่ตั้งที่ทำงาน (Paragraph / Short answer)
     9. **Phone Number** (Short answer)
     10. **Email Address** (Short answer - Email)
     11. **LinkedIn Profile URL** (Short answer)
     12. **Line ID / WhatsApp** (Short answer)
     13. **Message or Note to other participants** / ข้อความทักทายเพื่อนร่วมรุ่น (Paragraph)
     14. **Upload your Photo / รูปถ่าย** (File Upload - Allow only images, saved to Google Drive)

2. **เชื่อมต่อ Google Form กับ Google Sheet**:
   - ในแท็บ **Responses** ของ Google Form คลิกไอคอนสีเขียว **"Link to Sheets"**
   - เลือก **Create a new spreadsheet**
   - ตั้งชื่อชีต: `ASEAN Remote Sensing Seminar 2026 Directory`

3. **เผยแพร่ชีตเป็น CSV (Publish to web)**:
   - เปิด Google Sheet ที่เชื่อมต่อแล้ว
   - ไปที่เมนู **File (ไฟล์)** ➡️ **Share (แชร์)** ➡️ **Publish to web (เผยแพร่ไปยังเว็บ)**
   - ในกล่องข้อความ ให้เลือกชีตที่ต้องการ (เช่น `Form Responses 1` หรือเปลี่ยนชื่อเป็น `Participants`)
   - เปลี่ยนจาก `Web page` เป็น **Comma-separated values (.csv)**
   - คลิกปุ่ม **Publish**
   - คัดลอกลิงก์ CSV ที่ได้ เช่น:
     `https://docs.google.com/spreadsheets/d/e/2PACX-1v.../pub?gid=0&single=true&output=csv`

4. **นำลิงก์ไปใส่ในเว็บไซต์ทำเนียบ**:
   - เปิดเว็บไซต์ทำเนียบขึ้นมา
   - คลิกปุ่ม **"⚙️ Settings / เชื่อมต่อ Google Sheet"** ที่มุมขวาบน
   - วางลิงก์ CSV ลงในช่อง **Participants Google Sheet CSV URL**
   - คลิก **Save & Sync** เว็บไซต์จะดึงข้อมูลสดพร้อมรูปถ่ายมาแสดงผลทันที!

---

### วิธีที่ 2: ใช้ Google Apps Script Web App (ฟอร์มอยู่ในหน้าเว็บโดยตรง พร้อมอัปโหลดรูปเข้า Google Drive)

หากต้องการให้ผู้เข้าร่วมกรอกข้อมูลและอัปโหลดรูปภาพผ่านหน้าเว็บ `submit.html` ของเว็บไซต์โดยตรง:

1. **เปิด Google Sheet ของคุณ**
2. ไปที่เมนู **Extensions (ส่วนขยาย)** ➡️ **Apps Script**
3. ลบโค้ดเดิมออกทั้งหมด แล้วคัดลอกโค้ดจากไฟล์ `google-apps-script/Code.gs` ไปวาง
4. บันทึกโปรเจกต์ (ตั้งชื่อโปรเจกต์ เช่น `ASEAN RS 2026 Directory API`)
5. คลิกปุ่ม **Deploy (การทำให้ใช้งานได้)** ➡️ **New deployment (การทำให้ใช้งานได้รายการใหม่)**
6. คลิกไอคอนรูปเฟือง ⚙️ ด้านซ้าย เลือกประเภทเป็น **Web app (เว็บแอป)**
7. ตั้งค่าการ Deploy:
   - **Description**: `Participant Submission API v1`
   - **Execute as**: `Me (อีเมลของคุณ)`
   - **Who has access**: **`Anyone (ทุกคน)`** *(สำคัญมาก เพื่อให้หน้าเว็บส่งข้อมูลเข้ามาได้โดยไม่ต้องล็อกอิน)*
8. คลิก **Deploy** และกดยอมรับสิทธิ์การเข้าถึง (Authorize access)
9. คัดลอก **Web app URL** ที่ได้ (ลงท้ายด้วย `/exec`)
10. นำ Web app URL ไปใส่ในเว็บไซต์ทำเนียบที่ช่อง **Apps Script Webhook URL**

---

### สำหรับแท็บ "วิทยากร" (Lecturers & Sessions):
ใน Google Sheet เล่มเดิม ให้สร้าง Sheet แท็บที่ 2 ชื่อ **`Lecturers`** โดยมีหัวคอลัมน์ดังนี้:
1. `Session / Course Title` (เช่น Session 1: Optical & Hyperspectral Remote Sensing)
2. `Date & Time` (เช่น 28 Oct 2026, 09:00 - 12:00)
3. `Lecturer Name (English)` (เช่น Prof. Dr. Suwit Ongsomwang)
4. `Lecturer Name (Native)` (เช่น ศ.ดร. สุวิทย์ องสมหวัง)
5. `Title / Position` (เช่น Professor in Geoinformatics)
6. `Affiliation` (เช่น Suranaree University of Technology)
7. `Country` (เช่น Thailand)
8. `Key Topics Covered` (สรุปเนื้อหาบรรยาย)
9. `Email`
10. `Phone`
11. `LinkedIn`
12. `Lab or Website URL`
13. `Presentation Slides Link` (ลิงก์ดาวน์โหลดสไลด์หรือ Google Drive)
14. `Photo URL`

จากนั้นไปที่ **File** ➡️ **Publish to web** ➡️ เลือกแท็บ `Lecturers` ➡️ เลือกเป็น **CSV** แล้วนำลิงก์มาวางในเว็บทำเนียบ!

