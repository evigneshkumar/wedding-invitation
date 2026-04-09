# 🚀 Quick Start Guide

## Immediate Steps to View Your Wedding Invitation

### 1. Open the Website
Simply double-click `index.html` or right-click and select "Open with Browser"

### 2. Test All Features

#### ✅ Curtain Reveal
- **Desktop**: Click or drag the red curtains apart
- **Mobile**: Swipe or tap the curtains
- Watch for the confetti burst and couple names reveal!

#### ✅ Scratch Cards
- Scroll down to "Save the Date" section
- **Desktop**: Click and drag on the gold circles
- **Mobile**: Touch and drag to scratch off
- Reveal: **08 / May / 2026**

#### ✅ Countdown Timer
- Live countdown to May 08, 2026
- Updates every second automatically

#### ✅ Interactive Map
- Click the venue illustration to open Google Maps
- Location: **ECR Mahal, Veppampattu, Chennai**

#### ✅ RSVP Form
- Fill in your details
- Select attendance (Yes/No)
- If "Yes", number of guests field appears
- Submit to see confirmation message

#### ✅ Audio Player
- Click the music icon (top-right corner)
- Add your music file to: `assets/audio/romantic-instrumental.mp3`

---

## 📝 Customization Checklist

### Already Updated ✓
- [x] Couple Names: Vignesh Kumar & Venmani Sekar
- [x] Wedding Date: May 08, 2026
- [x] Venue: ECR Mahal, Veppampattu, Chennai
- [x] RSVP Deadline: April 15, 2026
- [x] Removed unnecessary form fields

### Optional Customizations

#### Change Colors
Edit `styles.css` lines 6-14:
```css
--burgundy: #800020;  /* Main color */
--cream: #f5f5dc;     /* Background */
--gold: #d4af37;      /* Accents */
```

#### Add Background Music
1. Get a romantic instrumental MP3 file
2. Name it `romantic-instrumental.mp3`
3. Place in `assets/audio/` folder
4. Refresh the page

#### Connect RSVP to Email/Database
See README.md section "RSVP Form Backend" for options:
- Formspree (easiest)
- Google Sheets
- Custom backend

---

## 🎨 Design Features

### Color Palette
- **Burgundy (Wine)**: #800020 - Main theme color
- **Cream/Ivory**: #f5f5dc - Soft background
- **Gold**: #d4af37 - Elegant accents

### Typography
- **Headings**: Playfair Display (Serif) - Elegant and classic
- **Body**: Montserrat (Sans-serif) - Clean and modern

### Animations
- Smooth scroll-triggered fade-ins
- Parallax effects on venue illustration
- Confetti burst on curtain reveal
- Hover effects on interactive elements

---

## 📱 Mobile Responsive

The website automatically adapts to:
- **Desktop**: Full interactive experience
- **Tablet**: Optimized layout
- **Mobile**: Touch-friendly controls

---

## 🔧 Troubleshooting

### Curtains Won't Open?
- Try clicking directly on the curtain
- Refresh the page
- Ensure JavaScript is enabled

### Scratch Effect Not Working?
- Use Chrome, Firefox, or Safari (latest versions)
- Try clicking and dragging more vigorously
- Mobile: Use your finger directly on screen

### Audio Won't Play?
- Add the audio file first: `assets/audio/romantic-instrumental.mp3`
- Click the music button manually
- Some browsers block autoplay - this is normal

### Countdown Shows Wrong Time?
- Check your system date/time
- Countdown is set to May 08, 2026, 6:00 PM

---

## 🌐 Sharing Your Invitation

### Option 1: Host Online (Recommended)
Upload to:
- **Netlify** (Free, easiest): Just drag & drop the folder
- **GitHub Pages** (Free)
- **Vercel** (Free)
- Your own web hosting

### Option 2: Share as Files
- Zip the entire `wedding-invitation` folder
- Share via Google Drive, Dropbox, etc.
- Recipients open `index.html` in their browser

### Option 3: Create a QR Code
1. Host online (Option 1)
2. Generate QR code from the URL
3. Print on physical invitations

---

## 💡 Pro Tips

1. **Test on Multiple Devices**: Check on phone, tablet, and desktop
2. **Add Real Photos**: Replace SVG illustrations with actual venue photos
3. **Customize Messages**: Update the tagline "Together Forever" to your own
4. **Set RSVP Deadline**: Currently set to April 15, 2026
5. **Share Early**: Give guests time to plan (2-3 months before wedding)

---

## 📞 Need Help?

Check the main `README.md` for detailed documentation on:
- File structure
- Customization options
- Backend integration
- Performance optimization

---

**Your wedding invitation is ready! 🎉**

Open `index.html` in your browser to see it in action!