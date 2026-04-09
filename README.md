# 💍 Sam & Sofia Wedding Invitation Website

A premium, mobile-first, interactive wedding invitation website featuring Modern European Elegance design with Burgundy, Cream/Ivory, and Gold color palette.

## 🎨 Features

### Interactive Elements
- **Curtain Reveal**: Swipe or drag the red velvet curtains to reveal the couple's names with confetti burst
- **Scratch-to-Reveal Date**: Scratch three gold circles to reveal the wedding date (10 / Sept / 2027)
- **Live Countdown Timer**: Real-time countdown to the wedding day
- **Interactive Map**: Click the hand-drawn villa illustration to open Google Maps
- **Animated Dress Code**: Visual gallery with elegant fashion illustrations
- **RSVP Form**: Integrated form with validation for guest responses

### Visual Effects
- Smooth scroll-triggered animations using Intersection Observer
- Parallax effects on background illustrations
- Cinematic transitions and fade-ins
- Confetti burst animation using Canvas API
- Optional background music player

## 🚀 Getting Started

### Quick Start
1. Open `index.html` in a modern web browser
2. No build process or dependencies required!

### File Structure
```
wedding-invitation/
├── index.html          # Main HTML file
├── styles.css          # All styling with CSS custom properties
├── script.js           # Vanilla JavaScript for interactivity
├── README.md           # This file
└── assets/
    ├── images/         # Place custom images here
    └── audio/          # Place background music here
```

## 🎵 Adding Background Music

1. Add your audio file to `assets/audio/` folder
2. Name it `romantic-instrumental.mp3` (or update the path in `index.html` line 17)
3. Supported formats: MP3, WAV, OGG

**Recommended**: Use a romantic instrumental track (e.g., "Sailor Song" or similar)

## 🎨 Customization

### Colors
Edit CSS custom properties in `styles.css` (lines 6-14):
```css
--burgundy: #800020;
--cream: #f5f5dc;
--gold: #d4af37;
```

### Wedding Details
Update in `index.html`:
- **Couple Names**: Lines 38-40
- **Wedding Date**: Line 56 (display) and `script.js` line 318 (countdown)
- **Venue Details**: Lines 127-131

### RSVP Form Backend
The form currently logs data to console. To connect to a backend:

1. **Option 1 - Formspree** (Easiest):
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

2. **Option 2 - Google Sheets** (via Apps Script):
   - Create a Google Apps Script web app
   - Update the fetch URL in `script.js` line 407

3. **Option 3 - Custom Backend**:
   - Uncomment lines 407-421 in `script.js`
   - Replace `/api/rsvp` with your endpoint

## 📱 Mobile Responsive

The website is fully responsive and optimized for:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ⚡ Performance Tips

1. **Optimize Images**: Use WebP format for faster loading
2. **Compress Audio**: Keep audio file under 5MB
3. **Lazy Loading**: Images load as you scroll
4. **Minify**: Use CSS/JS minifiers for production

## 🎯 Key Interactions

### Curtain Reveal
- **Desktop**: Click or drag curtains apart
- **Mobile**: Swipe or tap curtains

### Scratch Cards
- **Desktop**: Click and drag to scratch
- **Mobile**: Touch and drag to reveal

### Audio Player
- Click the music icon (top-right) to toggle background music
- Auto-plays after curtain reveal (if browser allows)

## 🔧 Troubleshooting

### Curtains won't open
- Try clicking directly on the curtain
- Ensure JavaScript is enabled

### Audio won't play
- Check browser autoplay policies
- Click the audio toggle button manually
- Verify audio file path is correct

### Scratch effect not working
- Ensure you're using a modern browser with Canvas support
- Try using mouse/touch directly on the gold circles

## 📝 Customization Checklist

- [ ] Update couple names
- [ ] Set correct wedding date
- [ ] Update venue information and Google Maps link
- [ ] Add background music file
- [ ] Customize color scheme (optional)
- [ ] Connect RSVP form to backend
- [ ] Add custom images (optional)
- [ ] Test on mobile devices
- [ ] Share the link with guests!

## 🎉 Credits

**Design Concept**: Modern European Elegance  
**Color Palette**: Burgundy (Wine), Cream/Ivory, Gold  
**Typography**: Playfair Display (serif) + Montserrat (sans-serif)  
**Built With**: Pure HTML5, CSS3, Vanilla JavaScript (No frameworks!)

## 📄 License

This is a custom wedding invitation template. Feel free to use and modify for your special day!

---

**Made with ❤️ for Sam & Sofia**  
*September 10, 2027 | Villa Medicea di Artimino, Italy*