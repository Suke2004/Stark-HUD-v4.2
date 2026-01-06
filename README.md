# ⚛️ STARK HUD // MARK 85

> "Sometimes you gotta run before you can walk." — Tony Stark

![Project Status](https://img.shields.io/badge/System-ONLINE-00f0ff?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-ffd700?style=for-the-badge)
![Tech](https://img.shields.io/badge/Powered%20By-Three.js%20%2B%20MediaPipe-ff0033?style=for-the-badge)

## 📜 Overview
Welcome to the **Stark HUD Mark 85**. This is a browser-based Augmented Reality (AR) spatial computing interface. It uses your webcam to track your hand movements, allowing you to build, manipulate, and destroy 3D voxel structures in real-time, just like the holographic tables in Stark Industries.

No VR headset required—just you, your webcam, and a browser.

## ✨ System Capabilities
* **Biometric Hand Tracking:** Powered by MediaPipe, the system renders a cybernetic exoskeleton over your real hands.
* **Spatial Construction:** Pinch your fingers to draw 3D structures in mid-air.
* **Repulsor Physics:** Grab the entire model and move it around your screen using a fist gesture.
* **J.A.R.V.I.S. Interface:** Fully immersive UI with "Arc Reactor" color palettes, sound visualization (visual only), and status updates.
* **Axis Locking:** Smart-snapping system that detects if you are drawing a straight line and locks the axis for precision.

## 🚀 Flight Manual (Installation)

Since this project runs entirely in the browser using CDNs, you don't need to install heavy software like Node.js or Python.

### Option 1: The Quick Start
1.  Download the `index.html` file from this repository.
2.  Double-click `index.html` to open it in Chrome, Edge, or Firefox.
3.  **Allow Camera Access** when prompted (The browser needs this to track your hands).

### Option 2: The Developer Way (Recommended)
If you want to edit the code, it is best to run a local server to avoid browser security restrictions.
1.  Install [VS Code](https://code.visualstudio.com/).
2.  Install the **Live Server** extension.
3.  Open the project folder in VS Code.
4.  Right-click `index.html` and select **"Open with Live Server"**.

## 🎮 Controls (Gesture Guide)

The Mark 85 interface relies on specific hand gestures. Ensure your room is **well-lit** for the best tracking.

| Gesture | Hand | Action | Description |
| :--- | :---: | :--- | :--- |
| **Pinch** (Index + Thumb) | ✋ Right | **Fabricate** | Creates voxels. Drag to draw lines. |
| **Fist** (Closed Hand) | ✊ Left | **Repulsor Grip** | Grabs the entire model to move it. |
| **Pinch + Point** | 👉 Left + Right | **Destruct Mode** | Erases voxels at the cursor location. |
| **Dual Fists** | ✊ + ✊ | **Clean Slate** | Hold both hands in fists to delete everything. |
| **Dual Palms** | ✋ + ✋ | **Rotate** | Hold both palms open to rotate the model. |

## 🛠️ Tech Stack
* **HTML5 / CSS3:** Structure and the "Stark" UI styling.
* **JavaScript (ES6):** Logic and gesture recognition.
* **[Three.js](https://threejs.org/):** 3D rendering engine.
* **[MediaPipe Hands](https://google.github.io/mediapipe/solutions/hands.html):** Machine Learning for hand tracking.

## ⚠️ Troubleshooting
* **"System Offline" / Nothing appears:** Make sure you allowed camera access. Check if another app (Zoom/Discord) is using the camera.
* **Jittery Hands:** Improvements in lighting usually fix this. Avoid backlighting (windows behind you).

## 📄 License
This project is licensed under the MIT License - feel free to fork, modify, and build your own Iron Legion.

---
*Built by Suke2004*
