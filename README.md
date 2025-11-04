# 🌌 Dimension - Interactive 3D Dimensional Odyssey

An immersive web-based experience that guides you through dimensions from the simplest 1D point to the mind-bending 5D space. Explore how dimensions build upon each other through interactive 3D visualizations .
## ✨ Features

- **Five Dimensional Visualizations**
  - **1D (The Lonely Point)** - A single point pulsing in one-dimensional space
  - **2D (Flatland)** - Geometric shapes (triangle, square, pentagon) rotating in flat space
  - **3D (Our Reality)** - 3D objects (cone, pyramid, cube, torus, sphere) with realistic materials and lighting
  - **4D (The Tesseract)** - A 4D hypercube projection with interactive 6DOF camera controls (WASD + Mouse)
  - **5D (The Penteract)** - A 5D hypercube dynamically rendered and rotated in real-time

- **Interactive Controls**
  - Arrow keys to navigate between dimensions
  - WASD + Mouse for 4D exploration
  - Click progress dots to jump to any dimension
  - Touch joystick support for mobile devices

- **Immersive Audio Experience**
  - Unique ambient tracks for each dimension
  - Dimension-specific sound effects and transitions
  - Audio context system with master gain control

- **Retro-Neon Aesthetic**
  - Cyberpunk visual design with neon colors (cyan, pink, purple)
  - CRT overlay with scanlines and flicker effects
  - Smooth animations and glowing effects
  - Particle background system

- **Responsive Design**
  - Desktop, tablet, and mobile support
  - Virtual joystick for touch devices
  - Adaptive UI for different screen sizes

## 🚀 Quick Start

### Installation

Download and install manually:
1. Click the three dots in the top right of the Code Project
2. Select "Download ZIP"
3. Extract and follow the shadcn setup instructions


## 🎮 How to Use

1. **Start the Experience** - Click the "START" button on the title screen
2. **Navigate Dimensions** - Use arrow keys (← →) to move between dimensions
3. **4D Exploration** - In the Tesseract dimension:
   - Use WASD to move forward/backward/strafe
   - Move your mouse to look around
   - Hold SPACE to move up, CTRL to move down
4. **Mobile** - Use the on-screen joystick for movement
5. **Jump to Any Dimension** - Click the progress dots on the right side

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with React 19.2.0
- **3D Graphics**: Three.js (r128)
- **Styling**: Tailwind CSS v4 with custom neon color scheme
- **UI Components**: shadcn/ui with Radix UI primitives
- **Audio**: Web Audio API with HTMLAudioElement
- **Language**: JavaScript with form validation (Zod)
- **Fonts**: Orbitron (headings), VT323 & Share Tech Mono (body/UI)


## 🎨 Design System

### Color Palette (Neon Cyberpunk)
- **Primary**: Cyan (#00d4ff)
- **Secondary**: Pink (#ff006e)
- **Accent**: Purple (#8000ff)
- **Accent**: Amber (#ffb000)
- **Accent**: Neon Green (#00ff41)
- **Background**: Deep Black (#0a0a0f)

### Typography
- **Headings**: Orbitron (400, 700, 900 weights)
- **UI Text**: VT323, Share Tech Mono
- **Body**: Orbitron (fallback monospace)

## 🔊 Audio System

The project includes a sophisticated audio management system:

Audio files should be placed in the `/public/audio/` directory:
- `1d.mp3` - 1D Point ambience
- `2d.mp3` - 2D Flatland ambience
- `3d.mp3` / `maintheme.mp3` - 3D Reality main theme
- `4d.mp3` - 4D Tesseract ambience
- `5d.mp3` - 5D Penteract ambience

## 🎯 Mathematical Concepts

### Dimension Projections

**4D Tesseract**: 
- Rendered as nested wireframe cubes
- Vertices are 8-bit coordinate representations
- Edges connect vertices differing by 1 bit

**5D Penteract**:
- 32 vertices (2^5) representing 5D hypercube
- Dynamic 5D-to-3D projection using rotation matrices
- Edges dynamically calculated based on Hamming distance


### Environment Variables

Currently, the project doesn't require environment variables. Audio files should be served from `/audio/`.

## 🐛 Known Issues & Limitations
- Audio files may require user interaction before playback (browser autoplay restrictions)
- 5D visualization may be demanding on low-end devices
- Mobile 5D exploration works best with joystick
- Safari may have slight audio latency, we prefer to use Edge or Chrome web broswer

## 🎓 Learning Resources
- **Dimensional Mathematics**: [4D Wikipedia](https://en.wikipedia.org/wiki/Tesseract)
- **Web Audio**: [Web Audio](youtube.com)

## 👥 Credits

**Developers:**
- **Atharv** ([@iblameatharv](https://github.com/iblameatharv)) - 3D Visualization & Simulation
- **Poornav** ([@chad-debug-tech](https://github.com/chad-debug-tech)) - Webpage Developer & Data Manager

**Created**: November 2, 2025

**License**: GNU GENERAL PUBLIC LICENSE

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs and issues
- Suggest new dimensions or visualizations
- Improve performance optimizations
- Add new audio tracks or sound effects


## 📝 Notes

This project showcases the power of complex 3D visualizations combined with modern web development. The dimensional concepts blend theoretical mathematics with engaging interactive experiences.

---

**Enjoy exploring the dimensions!** 🌌✨
