import os
from flask import Flask, render_template, send_from_directory, abort

app = Flask(__name__)

# Portfolio profile data based directly on resume and verified links
PORTFOLIO_DATA = {
    "profile": {
        "name": "Sadhira Amani",
        "full_name": "Amani Sadhira",
        "role": "Software Engineer & Full Stack Developer",
        "headline": "Motivated and enthusiastic Computer Science and Engineering student seeking an entry-levelopportunity as a Software Engineer to apply programming and web development skills.",
        "about_intro": "I'm a passionate Computer Science and Engineering student at Kamala Institute of Technology and Science with a strong academic foundation (9.07 CGPA). I specialize in developing end-to-end full stack web applications using Java Spring Boot, the MERN stack, MySQL, and modern JavaScript. I love transforming real-world problems into clean, scalable, and elegant digital solutions.",
        "email": "amanisadhira64@gmail.com",
        "phone": "+91 9493005538",
        "phone_clean": "+919493005538",
        "location": "Telangana, India",
        "github": "https://github.com/Sadhira-Amani025",
        "linkedin": "https://www.linkedin.com/in/sadhira-amani-b44781352",
        "status": "Fourth Year (4-1) B.Tech CSE",
        "cgpa": "9.07 / 10",
        "resume_file": "Amani_Sadhira_Resume.pdf"
    },
    "education": [
        {
            "degree": "Bachelor of Technology (B. Tech) – Computer Science and Engineering",
            "institution": "Kamala Institute of Technology and Science",
            "location": "Singapur, Karimnagar",
            "duration": "2023 – 2027",
            "status": "Currently Pursuing - Fourth Year (4-1)",
            "score": "CGPA: 9.07 / 10",
            "description": "Comprehensive coursework in Object-Oriented Programming, Database Management Systems, Web Development, and Software Engineering principles."
        }
    ],
    "skill_categories": [
        {
            "name": "Programming Languages",
            "icon": "code",
            "skills": [
                {"name": "Python", "level": "Proficient", "icon": "python"},
                {"name": "Java", "level": "Advanced", "icon": "java"},
                {"name": "C", "level": "Intermediate", "icon": "c"}
            ]
        },
        {
            "name": "Frontend Development",
            "icon": "layout",
            "skills": [
                {"name": "HTML5", "level": "Advanced", "icon": "html5"},
                {"name": "CSS3", "level": "Advanced", "icon": "css3"},
                {"name": "JavaScript", "level": "Proficient", "icon": "javascript"},
                {"name": "React JS", "level": "Proficient", "icon": "react"}
            ]
        },
        {
            "name": "Databases & Storage",
            "icon": "database",
            "skills": [
                {"name": "MySQL", "level": "Proficient", "icon": "mysql"},
                {"name": "MongoDB", "level": "Proficient", "icon": "mongodb"},
                {"name": "Cloudinary", "level": "Integration", "icon": "cloud"}
            ]
        },
        {
            "name": "Developer Tools",
            "icon": "tool",
            "skills": [
                {"name": "Git", "level": "Proficient", "icon": "git"},
                {"name": "GitHub", "level": "Proficient", "icon": "github"},
                {"name": "Visual Studio Code", "level": "Proficient", "icon": "vscode"}
            ]
        }
    ],
    "projects": [
        {
            "title": "StellarStore – E-Commerce Web Application",
            "category": "Full Stack Application",
            "badge": "Full Stack • E-Commerce",
            "tech_stack": ["Java", "Spring Boot", "MySQL", "HTML", "CSS", "JavaScript", "Cloudinary"],
            "description": "A full-featured e-commerce platform designed for browsing, ordering, and managing books and stationery items with seamless product inventory workflows.",
            "bullet_points": [
                "Developed a full-stack e-commerce web application for browsing and managing books and stationery products.",
                "Integrated Cloudinary for robust, scalable product image storage and media asset management.",
                "Designed REST APIs and relational database integration to manage product information and transactions efficiently."
            ],
            "live_url": "https://mini-ecommerce-3g26.onrender.com",
            "github_url": "https://github.com/Sadhira-Amani025/mini_ecommerce",
            "status": "Live on Render"
        },
        {
            "title": "LABHANTE AUTOMOTIVE STUDIO",
            "category": "MERN Stack Project",
            "badge": "MERN Stack • Booking System",
            "tech_stack": ["React JS", "Node JS", "Express JS", "MongoDB", "REST APIs"],
            "description": "A full-stack automotive service application enabling clients to explore vehicle services, schedule appointments, and manage service bookings seamlessly.",
            "bullet_points": [
                "Developed a full-stack automotive service web application using the MERN stack with a responsive, modern interface.",
                "Implemented secure user authentication and role-based access control (Admin/User), allowing administrators to manage products and bookings securely.",
                "Designed responsive user interfaces and integrated RESTful APIs with MongoDB for high-performance data retrieval."
            ],
            "live_url": None,
            "github_url": "https://github.com/Sadhira-Amani025/smartcar-solutions",
            "status": "Completed Repository"
        },
        {
            "title": "FIRST AID GUIDE",
            "category": "Web Development",
            "badge": "Web Application • Emergency Guide",
            "tech_stack": ["HTML", "CSS", "JavaScript", "Responsive Design"],
            "description": "An emergency first-aid resource platform providing immediate, structured guidance for medical situations and injuries.",
            "bullet_points": [
                "Developed a web-based First Aid Guide to provide quick access to emergency first-aid procedures for common injuries and medical emergencies.",
                "Collaborated with teammates and implemented intuitive content categorization and rapid navigation to assist users during critical scenarios."
            ],
            "live_url": None,
            "github_url": "https://github.com/Sadhira-Amani025/SCT_WD_1",
            "status": "Completed Project"
        }
    ],
    "internships": [
        {
            "role": "Java Full Stack Developer",
            "type": "Virtual Internship",
            "description": "Completed extensive training and project implementation in Java Full Stack Development, covering core & advanced Java, relational databases (SQL), API design, and modern web technologies.",
            "skills": ["Java", "Web Technologies", "SQL", "API Development"]
        }
    ],
    "certifications": [
        {
            "title": "DSA DeepTech Bootcamp",
            "credential": "Participation Certificate",
            "focus": "Data Structures & Algorithms, Problem-Solving, Algorithmic Analysis"
        },
        {
            "title": "DevOps Fundamentals",
            "credential": "Infosys Springboard",
            "focus": "CI/CD Pipelines, Version Control, Infrastructure & Cloud Deployment Essentials"
        }
    ],
    "highlights": [
        {
            "value": "9.07",
            "label": "CGPA in B.Tech CSE",
            "subtext": "Kamala Institute of Tech & Science"
        },
        {
            "value": "3+",
            "label": "Full-Stack Projects",
            "subtext": "Spring Boot, MERN & Web Apps"
        },
        {
            "value": "2027",
            "label": "Graduation Year",
            "subtext": "Currently in 4th Year (4-1)"
        }
    ]
}

@app.route("/")
def home():
    return render_template("index.html", data=PORTFOLIO_DATA)

@app.route("/download-resume")
def download_resume():
    files_dir = os.path.join(app.root_path, "static", "files")
    filename = PORTFOLIO_DATA["profile"]["resume_file"]
    filepath = os.path.join(files_dir, filename)
    
    if not os.path.exists(filepath):
        # Fallback to resume.pdf if named differently
        if os.path.exists(os.path.join(files_dir, "resume.pdf")):
            filename = "resume.pdf"
        else:
            abort(404)
            
    return send_from_directory(
        files_dir,
        filename,
        as_attachment=True,
        download_name="Amani_Sadhira_Resume.pdf"
    )

@app.route("/health")
def health():
    return {"status": "healthy", "service": "portfolio-sadhira-amani"}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
