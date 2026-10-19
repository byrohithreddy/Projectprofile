# Mushke Rohith Reddy - Developer Portfolio

An interactive, personal developer portfolio featuring a 3D WebGL physics lanyard simulation, interactive project bento grid, skill stack, timeline journey, milestone highlights, and contact hub.

## 🚀 Built With

- **React 19** + **TypeScript**
- **Vite 8**
- **Three.js** (3D Interactive Lanyard badge physics)
- **Motion (Framer Motion)** & **GSAP** (Smooth animations and micro-interactions)
- **Tailwind CSS v4** & Custom Vanilla CSS

## 📁 Project Structure

```text
Projectprofile/
├── public/                 # Static assets (favicons, og images, CV)
│   ├── cv.pdf
│   ├── dev.svg
│   └── preview.png
├── src/
│   ├── assets/             # Bundled visual assets
│   │   ├── achievements/   # Hackathon and milestone images
│   │   ├── contact/        # Resume PDF
│   │   ├── fonts/          # Custom typography (Game, Surgena)
│   │   ├── profile/        # Lanyard card textures and strap
│   │   ├── projects/       # Featured work screenshots
│   │   └── skills/         # Technical tool icons
│   ├── components/         # Modular UI components
│   │   ├── AchievementStack/
│   │   ├── BorderGlow/
│   │   ├── ContactSection/
│   │   ├── Dock/
│   │   ├── GrowthJourney/
│   │   ├── Lanyard/
│   │   ├── LoadingScreen/
│   │   ├── MagicBento/
│   │   ├── ProgressBar/
│   │   ├── SkillColorStack/
│   │   ├── StatusBadge/
│   │   ├── TextType/
│   │   └── Toast/
│   ├── data/               # Centralized portfolio data
│   │   └── portfolioData.ts
│   ├── App.tsx             # Root application assembly
│   ├── index.css           # Global typography, resets, and themes
│   ├── main.tsx            # React entry point
│   └── vite-env.d.ts       # Asset declarations
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run TypeScript checks
npm run lint

# Build for production
npm run build
```
