# Fitness Tracker - Setup & Deploy Guide

แอพ Fitness Tracker ที่คุณขอให้เขียน — สามารถตั้ง goal เองได้ + track progress ทุกวัน

## 📱 Features

- ✅ **Custom Goals** — ตั้ง goal เองได้ (ชื่อ, target, unit)
- ✅ **Daily Progress** — กรอกแต่เลขจำนวนไป, ไม่มี slider
- ✅ **Progress Bars** — visual progress indicator
- ✅ **Date Selector** — เลือกวันแต่ละวัน
- ✅ **Data Persistence** — บันทึกข้อมูลใน localStorage (ไม่เสียหาย)
- ✅ **Responsive** — ใช้ได้บน mobile + desktop
- ✅ **No Backend** — ใช้เลย ไม่ต้องมี server

---

## 🚀 Deploy ขั้นตอน 3 นาที

### **Step 1: Clone / ตั้งค่า**

```bash
# 1. ไปที่ folder ที่เก็บ file
cd /path/to/fitness-tracker

# 2. Install dependencies
npm install

# 3. Run locally (ทดสอบก่อน)
npm run dev
# → เปิด http://localhost:3000
```

### **Step 2: Push ขึ้น GitHub**

```bash
# 1. สร้าง repo ใหม่บน github.com
# → ชื่อ: fitness-tracker

# 2. ใน terminal
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fitness-tracker.git
git push -u origin main
```

### **Step 3: Deploy ที่ Vercel (Free!)**

1. ไปที่ https://vercel.com
2. Click **"New Project"** → select **GitHub**
3. ค้นหา `fitness-tracker` → click **Import**
4. Vercel จะ build + deploy อัตโนมัติ
5. ได้ URL ประมาณ: `https://fitness-tracker.vercel.app`

---

## 📝 Structure

```
fitness-tracker/
├── app.jsx              # Next.js wrapper
├── fitness-tracker.jsx  # Main app component
├── package.json         # Dependencies
├── next.config.js       # Next.js config
└── SETUP_GUIDE.md       # Guide นี้
```

---

## 🎯 How to Use

1. **Add Goal** → Click "+ Add new goal"
2. **Fill in:**
   - Goal name (e.g., "Push-ups", "Running distance")
   - Target amount (e.g., 30, 1.5)
   - Unit (e.g., reps, km, minutes) — optional
3. **Track** → กรอกตัวเลขวันนี้เท่าไหร่
4. **Progress** → มันจะ auto-calculate % completion
5. **Change date** → เลือกวันอื่นก็ได้ (ข้อมูลแยกต่อเนื่องต่อวัน)

---

## 🛠️ Development

### **Add Features**

ถ้าอยากแก้ไข / เพิ่ม feature:

1. Edit `fitness-tracker.jsx`
2. Run `npm run dev`
3. Test ที่ localhost:3000
4. Push ขึ้น GitHub → Vercel auto-deploy

### **Popular Additions** (อยากทำเพิ่มเติม?)

- 📊 Weekly/Monthly statistics
- 📈 Chart showing progress over time
- 💾 Export data as CSV
- 🎯 Achievement badges (e.g., "Completed 7 days")
- 🌙 Dark mode
- 📱 PWA support (work offline)

---

## 💡 Portfolio Tips

- **Add README** ที่ GitHub มี screenshots + features
- **Add demo link** ที่ portfolio/resume
- **Clean code** — comment ที่ complex logic
- **Responsive design** — ใช้ได้บน mobile
- **Data persistence** — ไม่หาย

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm install` error | ลบ `node_modules` + `package-lock.json` → install อีกครั้ง |
| localhost:3000 ไม่เปิด | ลอง port อื่น: `npm run dev -- -p 3001` |
| Vercel build fail | Check console → อาจ missing `"use client"` |
| Data หาย | ลบ localStorage: `localStorage.clear()` ใน browser console |

---

## 📧 Support

- Vercel docs: https://vercel.com/docs
- Next.js: https://nextjs.org/docs
- React: https://react.dev

---

**Ready? Deploy now! 🚀**
