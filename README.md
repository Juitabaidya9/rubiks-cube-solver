# 🎯 Cube Solver Pro

A modern web-based Rubik's Cube solver with beautiful glassmorphism design.

![Python](https://img.shields.io/badge/Python-3.8%2B-blue)
![Flask](https://img.shields.io/badge/Flask-2.0%2B-lightgrey)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow)
![HTML5](https://img.shields.io/badge/HTML5-Modern-orange)
![CSS3](https://img.shields.io/badge/CSS3-Glassmorphism-blueviolet)

## ✨ Features
- Modern glassmorphism UI design
- Real-time cube solving
- Scramble generator
- Responsive design
- Face color mapping guide

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.8 or higher
- pip package manager
- Modern web browser

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/Juitabaidya9/rubiks-cube-solver.git
cd rubiks-cube-solver

# Install backend dependencies
cd backend
pip install -r requirements.txt

# Start the Flask server
python app.py
```
*Server will start at: http://127.0.0.1:5000*

### Frontend Setup
```bash
# Open frontend in browser (from project root)
cd frontend

# Option 1: Directly open index.html in browser
# Option 2: Use Python local server
python -m http.server 8000
```
*Then open: http://localhost:8000*

## 🎮 How to Use

1. **Start the backend server** (runs on port 5000)
2. **Open the frontend** in your browser (port 8000)
3. **Enter a 54-character cube string** in the input box
   - Example: `UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB`
4. **Click "Solve Cube"** to get the solution
5. **Use "Generate Scramble"** to create practice scrambles

## 🎨 Face Color Mapping
| Letter | Face | Color |
|--------|------|-------|
| **U** | Up | White |
| **R** | Right | Red |
| **F** | Front | Green |
| **D** | Down | Yellow |
| **L** | Left | Orange |
| **B** | Back | Blue |

## 🧩 Cube String Format
The 54-character string represents cube faces in this order:
- **First 9 chars**: U face (White)
- **Next 9 chars**: R face (Red)
- **Next 9 chars**: F face (Green)
- **Next 9 chars**: D face (Yellow)
- **Next 9 chars**: L face (Orange)
- **Last 9 chars**: B face (Blue)

## 🚀 Live Demo
[Click here to try the live demo](https://juitabaidya9.github.io/rubiks-cube-solver)

## 🛠️ Technologies Used
- **Backend**: Python, Flask, Flask-CORS
- **Frontend**: HTML5, CSS3, JavaScript
- **Design**: Modern Glassmorphism UI
- **Fonts**: Inter from Google Fonts

## 📝 License
This project is licensed under the MIT License.

## 🤝 Contributing
Feel free to submit issues and pull requests!

---

⭐ **If you find this project useful, please give it a star!**
