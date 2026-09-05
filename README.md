# 🏐 Amelie's VIP Lounge & Interactive Memory Website ✨

A bespoke, creative, interactive website built for **Amelie** — celebrating her love for volleyball 🏐, ice-cold Jägermeister 🦌🥃, her legendary energy, and a subtle nod to our time together in the KBTU Admissions office 🎓.

---

## 🌟 Key Features & Highlights

1. **White & Pink Aesthetic Theme**:
   - Chic soft blush pinks, crisp whites, rose-gold accents, and glassmorphism.
   - Cute animated floating volleyballs, Jäger stags, shot glasses, and sparkles.
2. **Interactive Mini-Game #1: Volleyball Spike Timing Arcade 🏐**:
   - Amelie is on the court! Watch the timing gauge oscillate and hit **SPIKE** (or press the **Spacebar**) when the indicator lands in the **Sweet Spot**.
   - Score rallies and points to unlock hidden photos, videos, and the "Admissions MVP Whistle" badge!
3. **Interactive Mini-Game #2: The -18°C Jägermeister Pour Challenge 🦌**:
   - An interactive bar counter with a frosted Jäger bottle and chilled shot glass.
   - Press and hold **"HOLD TO POUR JÄGER"** and release exactly in the green "Perfect Shot" zone!
   - Nails the pour -> Trigger confetti explosion, clinking glass sound, and unlocks celebration media!
4. **Instant Unlock Button ⚡**:
   - If you or Amelie want to view all media and secrets immediately without playing through the games, click **"⚡ Instant Unlock All"** on the rewards shelf.
5. **Classified Dossier (KBTU Admissions Department) 📂**:
   - A playful, subtle inside-joke file celebrating her role as an admissions veteran, multitasking powerhouse, and irreplaceable friend.
   - Click **"🔓 Declassify Confidential Record"** to stamp the file and reveal the official *Certificate of Admission to the Hall of Legendary Friends*.
6. **Scratch-Off Mystery Card 💌**:
   - An interactive canvas with pink & silver glitter. Rub or drag with your mouse/finger to scratch away the glitter and reveal a personal note for Amelie.
7. **Interactive Soundboard 🎶**:
   - Built-in sound effects (volleyball spikes, Jäger clinks, stamps, cheers) generated directly via browser **Web Audio API** — zero external audio files required!
8. **1:1 Square Photo Scrapbook & 9:16 Vertical Phone Video Player 📸 📱**:
   - Tailored specifically to your specifications:
     - **Photos**: Exact **1:1 square ratio** with polaroid borders, hover tilts, and glitter frames.
     - **Videos**: Native **9:16 vertical phone ratio** in realistic smartphone frames with notch, controls, and full-screen modal expansion.

---

## 📁 How to Add Your Photos & Videos

All media files live inside the `assets/` directory:

```
pk/
├── index.html               <-- Main webpage (double-click to open)
├── style.css                <-- Pink & white theme styling
├── script.js                <-- Mini-games, audio synthesizer & logic
├── README.md                <-- Documentation
└── assets/
    ├── photos/              <-- DROP SQUARE PHOTOS HERE (1:1)
    │   ├── photo1.jpg       <-- Volleyball Ace photo
    │   ├── photo2.jpg       <-- Ice-cold Jäger photo
    │   ├── photo3.jpg       <-- Admissions crew memory photo
    │   ├── photo4.jpg       <-- Golden hour candid photo
    │   ├── photo5.jpg       <-- Victory match point photo
    │   └── photo6.jpg       <-- Certified icon photo
    │
    └── videos/              <-- DROP VERTICAL VIDEOS HERE (9:16)
        ├── video1.mp4       <-- Vertical phone video: Volleyball
        ├── video2.mp4       <-- Vertical phone video: Jäger toast
        └── video3.mp4       <-- Vertical phone video: Office & campus fun
```

### 📸 Adding Photos (Square 1:1)
1. Drop your images into `assets/photos/` named:
   - `photo1.jpg` (or `.png`, `.webp`)
   - `photo2.jpg`
   - `photo3.jpg`
   - `photo4.jpg`
   - `photo5.jpg`
   - `photo6.jpg`
2. **Auto-Detection**: The website's smart loader will automatically detect your files!
3. If you want to change the captions, open `index.html` and look for the clear comments:
   ```html
   <!-- ✍️ EDIT PHOTO 1 TITLE & TEXT HERE -->
   <h5>The Volleyball Ace 🏐</h5>
   <p>Ruling the court with lethal spikes and legendary energy.</p>
   ```

### 📱 Adding Videos (Vertical 9:16 Phone Ratio)
1. Drop your vertical smartphone video recordings into `assets/videos/` named:
   - `video1.mp4`
   - `video2.mp4`
   - `video3.mp4`
2. They will automatically play inside the sleek phone frames!
3. Click any phone screen to expand the video into the theater modal.

---

## 🚀 How to Run the Website

### Option 1: Direct Double-Click (Easiest)
Simply double-click `index.html` on your Mac. It will open instantly in Safari, Chrome, or any browser.

### Option 2: Local Web Server (Recommended for Videos)
Open Terminal in this folder and run:
```bash
python3 -m http.server 8000
```
Then visit: [http://localhost:8000](http://localhost:8000)

---

## 💌 How to Personalize the Messages

Open `index.html` in your text editor and look for the `✍️` markers:
- **Hero subtitle**: Around line 70
- **Admissions field agent note**: Around line 380
- **Scratch-off mystery note**: Around line 430
- **Captions & descriptions**: Under each photo and video slot

Enjoy celebrating Amelie! 🏐🦌💖
