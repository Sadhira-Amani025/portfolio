import os
from flask import Flask, render_template, send_from_directory, abort

app = Flask(__name__)

# Portfolio profile data based directly on resume and verified links
PORTFOLIO_DATA = {
    "profile": {
        "name": "Sadhira Amani",
        "full_name": "Amani Sadhira",
        "role": "Software Engineer & Full Stack Developer",
        "headline": "Motivated and enthusiastic Computer Science and Engineering student seeking an entry-level opportunity as a Software Engineer to apply programming and web development skills.",
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
                {"name": "Python", "icon": "python"},
                {"name": "Java", "icon": "java"},
                {"name": "C", "icon": "c"}
            ]
        },
        {
            "name": "Frontend Development",
            "icon": "layout",
            "skills": [
                {"name": "HTML5", "icon": "html5"},
                {"name": "CSS3", "icon": "css3"},
                {"name": "JavaScript", "icon": "javascript"},
                {"name": "React JS", "icon": "react"}
            ]
        },
        {
            "name": "Databases & Storage",
            "icon": "database",
            "skills": [
                {"name": "MySQL", "icon": "mysql"},
                {"name": "MongoDB", "icon": "mongodb"},
                {"name": "Cloudinary", "icon": "cloud"}
            ]
        },
        {
            "name": "Developer Tools",
            "icon": "tool",
            "skills": [
                {"name": "Git", "icon": "git"},
                {"name": "GitHub", "icon": "github"},
                {"name": "Visual Studio Code", "icon": "vscode"}
            ]
        }
    ],
    "projects": [
        {
            "number": "01",
            "title": "Stellar Store",
            "category": "E-Commerce Web Application",
            "description": "An e-commerce web application for browsing and managing books and stationery products.",
            "tech_stack": ["Java", "Spring Boot", "MySQL", "HTML", "CSS", "JavaScript", "Cloudinary"],
            "image": "projects/stellarstore.png",
            "live_url": "https://mini-ecommerce-3g26.onrender.com",
            "github_url": "https://github.com/Sadhira-Amani025/mini_ecommerce",
            "primary_url": "https://mini-ecommerce-3g26.onrender.com"
        },
        {
            "number": "02",
            "title": "Labhante Automotive Studio",
            "category": "Mern stack Application",
            "description": "A full-stack automotive service platform with vehicle services, appointment scheduling, and booking management.",
            "tech_stack": ["React", "Node.js", "Express.js", "MongoDB"],
            "image": "projects/labhante.png",
            "live_url": None,
            "github_url": "https://github.com/Sadhira-Amani025/smartcar-solutions",
            "primary_url": "https://github.com/Sadhira-Amani025/smartcar-solutions"
        },
        {
            "number": "03",
            "title": "First Aid Guide",
            "category": "Web Application & Emergency Guide",
            "description": "A web application providing accessible first-aid information and guidance for common injuries and emergencies.",
            "tech_stack": ["HTML", "CSS", "JavaScript", "Responsive Design"],
            "image": "projects/firstaid.png",
            "live_url": "https://srinadh204.github.io/firstaidguides/",
            "github_url": "https://github.com/srinadh204/firstaidguides",
            "primary_url": "https://srinadh204.github.io/firstaidguides/"
        }
    ],
    "internships": [
        {
            "role": "AI-ML Virtual Internship",
            "type": "Virtual Internship",
            "description": "Completed 10-week intensive training program supported by Google for Developers and EduSkills, focusing on machine learning algorithms, computer vision, and practical AI implementations.",
            "skills": ["Artificial Intelligence", "Machine Learning", "Python", "Data Analysis"]
        },
        {
            "role": "Java Full Stack Developer",
            "type": "Virtual Internship",
            "description": "Completed extensive training and project implementation in Java Full Stack Development, covering core & advanced Java, relational databases (SQL), API design, and modern web technologies.",
            "skills": ["Java", "Web Technologies", "SQL", "API Development"]
        }
    ],
    "certifications": [
        {
            "title": "Centle Tri-City AI-Thon 2026",
            "credential": "Certificate of Participation",
            "focus": "Artificial Intelligence, Machine Learning, Innovation & Problem Solving"
        },
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
    "credentials": [
        {
            "id": "aiml-internship",
            "title": "AI-ML Virtual Internship",
            "issuer": "Google for Developers & EduSkills",
            "organization": "Supported By India Edu Program (AICTE & EduSkills)",
            "badge_type": "Virtual Internship",
            "date": "April – June 2025",
            "credential_id": "b56d252f1ecee2cfac83808c4377415a",
            "description": "Successfully completed 10-week intensive virtual internship in Artificial Intelligence and Machine Learning supported by Google for Developers, gaining practical skills in machine learning algorithms, model training, computer vision, and data engineering.",
            "skills": ["Artificial Intelligence", "Machine Learning", "Python", "Data Analysis", "Computer Vision"],
            "has_certificate": True,
            "certificate_image": "images/aiml internship.jpeg",
            "icon_type": "cpu"
        },
        {
            "id": "java-fullstack-internship",
            "title": "Java Full Stack Developer",
            "issuer": "EduSkills & AICTE",
            "organization": "Virtual Internship (National Internship Portal)",
            "badge_type": "Virtual Internship",
            "date": "Jan – Mar 2026",
            "credential_id": "407fb62ef09050e50db4",
            "description": "Completed extensive 10-week virtual internship covering core & advanced Java, relational databases (SQL), Spring Boot concepts, API design, and modern web technologies.",
            "skills": ["Java", "Web Technologies", "SQL", "API Development"],
            "has_certificate": True,
            "certificate_image": "images/java full stack.jpeg",
            "icon_type": "briefcase"
        },
        {
            "id": "tri-city-aithon",
            "title": "Centle Tri-City AI-Thon 2026",
            "issuer": "Centle Group & KITSW",
            "organization": "KITS Warangal (Dept. of CSE AI&ML)",
            "badge_type": "Certificate of Participation",
            "date": "2026",
            "description": "Active participation in India's First Tri-City AI-Thon 2026 held at KITSW, Warangal, demonstrating enthusiasm, creativity, and technical innovation in AI solutions.",
            "skills": ["Artificial Intelligence", "Machine Learning", "Innovation", "Problem-Solving"],
            "has_certificate": True,
            "certificate_image": "images/tri_city_aithon.jpeg",
            "icon_type": "certificate"
        },
        {
            "id": "dsa-deeptech-bootcamp",
            "title": "DSA DeepTech Bootcamp",
            "issuer": "Brainovision Solutions & AICTE",
            "organization": "Kamala Institute of Technology & Science",
            "badge_type": "Participation Certificate",
            "date": "May 2026",
            "credential_id": "DSA-BOV-KITS-010",
            "description": "Intensive training program focusing on Data Structures & Algorithms, algorithmic analysis, problem-solving methodologies, and computational problem-solving for DeepTech applications.",
            "skills": ["Data Structures", "Algorithms", "Problem-Solving", "Algorithmic Analysis"],
            "has_certificate": True,
            "certificate_image": "images/dsa.jpeg",
            "icon_type": "certificate"
        },
        {
            "id": "devops-fundamentals",
            "title": "DevOps Fundamentals",
            "issuer": "Infosys Springboard",
            "organization": "Infosys Limited",
            "badge_type": "Course Completion",
            "date": "July 2025",
            "description": "Comprehensive course covering CI/CD pipelines, version control workflows, automated infrastructure, and modern cloud deployment essentials.",
            "skills": ["DevOps", "CI/CD Pipelines", "Cloud Deployment", "Version Control"],
            "has_certificate": True,
            "certificate_image": "images/devops.jpeg",
            "icon_type": "cloud"
        }
    ],
    "highlights": [
        {
            "value": "9.07",
            "label": "CGPA in B.Tech CSE",
            "subtext": "Kamala Institute of Technology & Science"
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
