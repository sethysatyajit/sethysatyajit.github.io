/* ==========================================================
   DATA FILE  -  edit projects & skills here only.
   Every page reads from this file automatically.
   ========================================================== */

const PROJECTS = [
  {
    title: "Real-Time Chat Web Application",
    description:
      "A real-time chat web app that lets users securely log in, find online users, and exchange private messages instantly.",
    image: "img/Real-Time Chat Web Application.jpeg",
    categories: ["Web Development"],
    tags: ["Real-Time", "Authentication", "Full Stack", "Private Messaging"],
    github: "https://github.com/sethysatyajit/Chat-Web-App",
    live: ""
  },
  {
    title: "Google Dorking Tool",
    description:
      "A Google Dorking tool to generate advanced search queries for security research, OSINT, and ethical hacking. Built with HTML, CSS, and JavaScript.",
    image: "img/Google Dorking Tool.png",
    categories: ["Cybersecurity", "Web Development"],
    tags: ["OSINT", "Ethical Hacking", "Security Research", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/sethysatyajit/Google-Dorking-Tool",
    live: "https://sethysatyajit.github.io/Google-Dorking-Tool/"
  },
  {
    title: "Form Builder Web Application",
    description:
      "A full-featured, production-ready web app that lets users create, manage, and share custom forms. Clean, modern interface with an intuitive builder similar to Google Forms.",
    image: "img/Form Builder Web Application.jpeg",
    categories: ["Web Development"],
    tags: ["Full Stack", "Forms", "Web App", "Dashboard"],
    github: "https://github.com/sethysatyajit/Form-Builder-Web-App",
    live: ""
  },
  {
    title: "Nginx Website Deployment Script",
    description:
      "A professional-grade Bash script that automates Nginx website deployments from Git repositories. Built for quick staging and production deployments.",
    image: "img/Nginx Website Deployment Script.png",
    categories: ["DevOps"],
    tags: ["Bash", "Nginx", "Automation", "Deployment", "Linux", "Git"],
    github: "https://github.com/sethysatyajit/Nginx-Website-Deployer",
    live: ""
  },
  {
    title: "Number Converter",
    description:
      "A professional number converter tool supporting conversions between Decimal, Binary, Hexadecimal, and Octal.",
    image: "img/Number Converter.png",
    categories: ["Tools", "Web Development"],
    tags: ["Binary", "Hexadecimal", "Octal", "Decimal", "JavaScript"],
    github: "https://github.com/sethysatyajit/Number-Converter",
    live: "https://sethysatyajit.github.io/Number-Converter/"
  }
];

/* Filter buttons shown on the Projects page */
const PROJECT_FILTERS = ["All", "Web Development", "Cybersecurity", "DevOps", "Tools"];

/* level = 0-100 (edit to match your real confidence) */
const SKILLS = [
  {
    group: "Cybersecurity",
    blurb: "Finding weak spots before someone else does.",
    items: [
      { name: "Ethical Hacking", level: 75 },
      { name: "OSINT", level: 80 },
      { name: "Vulnerability Assessment", level: 70 },
      { name: "Network Security", level: 70 },
      { name: "Linux & Bash", level: 78 }
    ]
  },
  {
    group: "Programming",
    blurb: "Python for problem solving, JavaScript for the web.",
    items: [
      { name: "Python", level: 85 },
      { name: "JavaScript", level: 82 },
      { name: "Node.js", level: 78 },
      { name: "HTML & CSS", level: 88 }
    ]
  },
  {
    group: "Databases",
    blurb: "Storing data the right way, SQL or NoSQL.",
    items: [
      { name: "MySQL", level: 75 },
      { name: "MongoDB", level: 75 }
    ]
  },
  {
    group: "Tools & DevOps",
    blurb: "Shipping and automating.",
    items: [
      { name: "Git & GitHub", level: 85 },
      { name: "Nginx", level: 70 },
      { name: "Shell Scripting", level: 75 }
    ]
  }
];