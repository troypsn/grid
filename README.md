# Troy Pineda - Portfolio

A minimalist, high-performance personal portfolio and digital space built with Next.js, React, TypeScript, and Three.js.

---

## Overview

This repository contains the source code for the personal portfolio website of Troy Pineda. The application features a clean, typography-focused editorial layout, interactive 3D navigation, smooth page transitions, and responsive modal viewers for project showcases and credentials.

---

## Key Features

- **Interactive 3D Orbital Navigation**: Desktop interface featuring interactive WebGL orbital navigation powered by React Three Fiber and Three.js.
- **Adaptive Mobile Dock Navigation**: Fluid, responsive dock navigation optimized for touch and tablet viewports.
- **Orchestrated Page Transitions**: Seamless client-side page transitions featuring staged blur resolution and momentum-based easing curves.
- **Modal Viewers with React Portals**: Isolated modal overlays for project deep-dives, live certificate previews, and PDF documentation, mounted directly to the document root to prevent CSS stacking context conflicts.
- **Smooth Momentum Scrolling**: Integrated Lenis smooth scroll engine configured for natural inertia without breaking iframe interactivity.
- **Strict Linting & Build Optimization**: Fully compliant with React 19 and Next.js App Router static optimization standards.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js (App Router, Turbopack), React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS, Vanilla CSS Variables |
| **3D & Graphics** | Three.js, @react-three/fiber, @react-three/drei |
| **Smooth Scroll** | Lenis |
| **Typography** | Google Fonts (Kulim Park, Kode Mono, Geist) |
| **Deployment** | Vercel / Static Hosting |

---

## Project Structure

```
portfolio/
├── app/
│   ├── aboutme/           # About Me route
│   ├── components/        # Reusable UI, 3D, navigation, and modal components
│   │   ├── CircularNav.tsx       # 3D Orbit and Mobile Dock navigation
│   │   ├── ExperienceCard.tsx    # Experience and credential card
│   │   ├── ExperienceModal.tsx   # Experience document viewer portal
│   │   ├── HeroText.tsx          # Staged hero text entrance
│   │   ├── Navbar.tsx            # Responsive persistent navigation bar
│   │   ├── PageTransition.tsx    # Two-phase route transition wrapper
│   │   ├── ProjectCard.tsx       # Project showcase card
│   │   ├── ProjectModal.tsx      # Project detail modal portal
│   │   └── SmoothScroll.tsx      # Lenis smooth scroll initialization
│   ├── contact/           # Contact route
│   ├── designs/           # Design portfolio route
│   ├── education/         # Education & credentials route
│   ├── projects/          # Projects index route
│   ├── globals.css        # Design tokens, keyframe animations, scrollbar overrides
│   ├── layout.tsx         # Root layout, font definitions, and transition context
│   └── page.tsx           # Home landing page
├── public/                # Static assets (images, PDFs, video textures, icons)
├── package.json           # Dependencies and project scripts
├── tsconfig.json          # TypeScript configuration
└── next.config.ts         # Next.js configuration
```

---

## Getting Started

### Prerequisites

- Node.js (v18.17.0 or higher recommended)
- npm, yarn, or pnpm

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/troypsn/portfolio.git
cd portfolio/portfolio
npm install
```

### Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

Compile and optimize the application for production deployment:

```bash
npm run build
```

Run the production build locally:

```bash
npm run start
```

### Code Quality & Linting

Run ESLint to check for syntax and accessibility compliance:

```bash
npm run lint
```

---

## Contact

- **Website**: [troypineda.com](https://troypineda.com)
- **GitHub**: [github.com/troypsn](https://github.com/troypsn)
- **LinkedIn**: [linkedin.com/in/troy-pineda](https://www.linkedin.com/in/troy-pineda/)
- **Email**: troypineda.work@gmail.com

---

## License

This project is open source and available under the [MIT License](LICENSE).
