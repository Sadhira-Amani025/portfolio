# Sadhira Amani – Personal Portfolio Website

A personal portfolio website for **Sadhira Amani** built using **Python Flask**, **HTML5**, **CSS3 (Vanilla)**, and **JavaScript**, faithfully recreating the modern dark navy & black cyber aesthetic with neon cyan and blue-purple glowing highlights.

---

## 🌟 Key Features

1. **High-Fidelity Re-Creation of Reference Design**:
   - Dark navy canvas (`#06080e` to `#0b0f19`) with soft cyan and violet radial ambient lighting.
   - Dual-color neon gradient highlights (`#00d2ff` cyan to `#a855f7` purple).
   - Signature glowing circular portrait avatar with futuristic curved neon wing tabs.
   - Fluid organic glowing portrait shape in the About Me section.
   - Rounded glassmorphism cards with subtle borders and radiant glow states on hover.

2. **100% Truthful, Resume-Backed Profile**:
   - Exact credentials, degree (B.Tech CSE at Kamala Institute of Technology and Science, CGPA: 9.07/10).
   - Real projects:
     - **StellarStore – E-Commerce Web Application** (Java, Spring Boot, MySQL, Cloudinary, REST APIs) with live deployment on Render.
     - **LABHANTE AUTOMOTIVE STUDIO** (MERN Stack, RBAC authentication, REST APIs).
     - **FIRST AID GUIDE** (HTML, CSS, JavaScript).
   - Real GitHub repositories linked to `https://github.com/Sadhira-Amani025`.
   - Real LinkedIn linked to `https://www.linkedin.com/in/sadhira-amani-b44781352`.

3. **Direct Resume Download**:
   - Powered by Flask endpoint `/download-resume` and static file delivery.
   - Serves the resume PDF (`Amani_Sadhira_Resume.pdf`).

4. **Interactive Contact & Functional Mailto**:
   - Direct click-to-copy email button with animated toast confirmation.
   - Direct phone link, LinkedIn link, and GitHub repository links.
   - Quick Email Composer opening user's native email client with pre-filled subject and body.

5. **Production Ready for Render**:
   - Includes `Procfile`, `render.yaml`, `requirements.txt`, and production `gunicorn` support.

---

## 📁 Project Structure

```
d:\portfolio\
├── app.py                      # Python Flask backend server and routes
├── requirements.txt            # Python dependencies (Flask, Gunicorn)
├── Procfile                    # Render/Heroku process configuration
├── render.yaml                 # Render infrastructure as code blueprint
├── README.md                   # Documentation and deployment guide
├── .gitignore                  # Git ignore rules
├── templates/
│   └── index.html              # Jinja2 HTML5 semantic template
└── static/
    ├── css/
    │   └── style.css           # Vanilla CSS design system & animations
    ├── js/
    │   └── main.js             # Scrollspy, clipboard copy, mobile toggle
    ├── images/
    │   ├── profile.png         # Sadhira Amani portrait photograph
    │   ├── logo.svg            # Futuristic monogram logo
    │   └── favicon.svg         # Browser favicon
    └── files/
        ├── Amani_Sadhira_Resume.pdf  # Actual Resume PDF
        └── resume.pdf                # PDF fallback copy
```

---

## 🚀 How to Run Locally

### Step 1: Open Terminal in Project Folder
```bash
cd d:\portfolio
```

### Step 2: (Optional but Recommended) Create & Activate Virtual Environment
```bash
# Windows PowerShell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Run the Flask Application
```bash
python app.py
```

### Step 5: Open in Your Browser
Open your browser and navigate to:
```
http://127.0.0.1:5000
```

---

## 🌐 How to Deploy to Render (Free Cloud Hosting)

### 1. Push Your Code to GitHub
1. Create a new repository on GitHub named `portfolio` at [https://github.com/new](https://github.com/new).
2. In your terminal, initialize and push your project:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Sadhira Amani Portfolio website"
   git branch -M main
   git remote add origin https://github.com/Sadhira-Amani025/portfolio.git
   git push -u origin main
   ```

### 2. Deploy on Render
1. Go to [https://dashboard.render.com](https://dashboard.render.com) and log in.
2. Click **New +** and select **Web Service**.
3. Select **Build and deploy from a Git repository**.
4. Connect your `portfolio` GitHub repository.
5. Fill in the following settings:
   - **Name**: `sadhira-amani-portfolio`
   - **Environment**: `Python 3`
   - **Region**: Closest to you (e.g. Singapore or Frankfurt)
   - **Branch**: `main`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Plan**: `Free`
6. Click **Deploy Web Service**.
7. Render will build and deploy your website automatically in 1–2 minutes and give you a live HTTPS link!

---

## ✏️ How to Update Your Information

- **Edit Profile Data / Projects / Skills**: Open [`app.py`](file:///d:/portfolio/app.py) and update the `PORTFOLIO_DATA` dictionary.
- **Update Resume PDF**: Replace the file at [`static/files/Amani_Sadhira_Resume.pdf`](file:///d:/portfolio/static/files/Amani_Sadhira_Resume.pdf).
- **Update Profile Photo**: Replace [`static/images/profile.png`](file:///d:/portfolio/static/images/profile.png).
- **Modify Styling / Colors**: Adjust CSS variables in [`static/css/style.css`](file:///d:/portfolio/static/css/style.css).

---

## 📱 Responsive & Mobile Device Testing

The website is fully optimized for all viewports from **320px to 4K displays**:

### 1. Test in Browser Developer Tools (Laptop / Desktop)
1. In Chrome, Edge, or Firefox, press `F12` (or `Ctrl + Shift + I`) to open Developer Tools.
2. Click the **Toggle Device Toolbar** icon (`Ctrl + Shift + M`).
3. Select presets or test custom widths:
   - **Small Mobile**: `320px` (iPhone SE)
   - **Standard Mobile**: `375px` (iPhone 12/13/14 mini)
   - **Large Mobile**: `480px` / `540px` (Samsung Galaxy, Pixel)
   - **Tablet Portrait**: `768px` (iPad Mini / Air)
   - **Tablet Landscape**: `1024px` (iPad Pro)
   - **Laptop**: `1366px` / `1440px`
   - **Wide Desktop**: `1920px+`

### 2. Test Directly on Your Physical Mobile Phone
1. Make sure your phone and laptop are connected to the same Wi-Fi network.
2. Find your laptop's local IP address (e.g., `192.168.x.x` or shown in the Flask startup output).
3. Open your mobile browser (Safari, Chrome) and navigate to:
   ```
   http://<YOUR_LOCAL_IP>:5000
   ```
   Example: `http://192.168.1.15:5000`
4. Test the smooth hamburger menu, swipe behavior, skill bar triggers, and one-click copy email feature.
