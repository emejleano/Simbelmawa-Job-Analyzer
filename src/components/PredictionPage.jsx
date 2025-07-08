import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Users,
  GraduationCap,
  Code,
  MapPin,
  Search,
  Star,
  TrendingUp,
  Award,
  Target,
  Lightbulb,
  BarChart3,
} from "lucide-react";
import Navbar from "./Navbar";

// Enhanced keywords dengan sinonim dan variasi
const skillKeywords = {
  programming: [
    // Core languages
    "javascript",
    "js",
    "typescript",
    "ts",
    "python",
    "java",
    "php",
    "c++",
    "c#",
    "csharp",
    "golang",
    "go",
    "rust",
    "kotlin",
    "swift",
    "ruby",
    "scala",
    "perl",
    "lua",
    // Framework & Libraries
    "react",
    "vue",
    "angular",
    "svelte",
    "jquery",
    "express",
    "fastapi",
    "spring",
    "django",
    "flask",
    "laravel",
    "symfony",
    "rails",
    "asp.net",
    "dotnet",
    // Concepts
    "programming",
    "pemrograman",
    "coding",
    "koding",
    "software development",
    "pengembangan perangkat lunak",
    "algoritma",
    "algorithm",
    "data structure",
    "struktur data",
    "oop",
    "functional programming",
  ],
  web: [
    // Frontend
    "html",
    "html5",
    "css",
    "css3",
    "sass",
    "scss",
    "less",
    "bootstrap",
    "tailwind",
    "bulma",
    "material ui",
    "ant design",
    "chakra ui",
    "semantic ui",
    // Backend
    "node.js",
    "nodejs",
    "express",
    "koa",
    "nestjs",
    "laravel",
    "codeigniter",
    "yii",
    "django",
    "flask",
    "fastapi",
    "spring boot",
    "asp.net",
    "ruby on rails",
    // Full Stack
    "full stack",
    "fullstack",
    "mern",
    "mean",
    "lamp",
    "lemp",
    // Web concepts
    "web development",
    "pengembangan web",
    "frontend",
    "backend",
    "responsive design",
    "website",
    "web app",
    "web application",
    "aplikasi web",
  ],
  mobile: [
    // Native
    "android",
    "ios",
    "swift",
    "objective-c",
    "kotlin",
    "java android",
    // Cross-platform
    "flutter",
    "dart",
    "react native",
    "xamarin",
    "ionic",
    "cordova",
    "phonegap",
    "unity",
    "unreal engine",
    "cocos2d",
    // Concepts
    "mobile development",
    "pengembangan mobile",
    "aplikasi mobile",
    "mobile app",
    "smartphone app",
    "tablet app",
    "hybrid app",
    "native app",
  ],
  data: [
    // Languages & Tools
    "python",
    "r",
    "sql",
    "matlab",
    "sas",
    "spss",
    "stata",
    "julia",
    "pandas",
    "numpy",
    "scipy",
    "scikit-learn",
    "tensorflow",
    "pytorch",
    "keras",
    "tableau",
    "power bi",
    "qlik",
    "looker",
    "grafana",
    "d3.js",
    "apache spark",
    "hadoop",
    "kafka",
    "airflow",
    "dbt",
    // Concepts
    "data science",
    "data scientist",
    "data analysis",
    "analisis data",
    "machine learning",
    "artificial intelligence",
    "ai",
    "deep learning",
    "neural network",
    "nlp",
    "computer vision",
    "big data",
    "data mining",
    "statistical analysis",
    "business intelligence",
    "bi",
    "data visualization",
    "visualisasi data",
    "predictive analytics",
    "data engineer",
    "data analyst",
  ],
  design: [
    // UI/UX
    "ui",
    "ux",
    "ui/ux",
    "user interface",
    "user experience",
    "design thinking",
    "wireframe",
    "prototype",
    "mockup",
    "user research",
    "usability testing",
    // Tools
    "figma",
    "sketch",
    "adobe xd",
    "invision",
    "principle",
    "framer",
    "zeplin",
    "photoshop",
    "illustrator",
    "after effects",
    "premiere",
    "canva",
    // Concepts
    "graphic design",
    "desain grafis",
    "visual design",
    "web design",
    "mobile design",
    "brand design",
    "logo design",
    "typography",
    "color theory",
    "design system",
    "interaction design",
    "motion design",
    "3d design",
    "product design",
  ],
  database: [
    // Relational
    "mysql",
    "postgresql",
    "oracle",
    "sql server",
    "sqlite",
    "mariadb",
    "db2",
    // NoSQL
    "mongodb",
    "cassandra",
    "redis",
    "elasticsearch",
    "neo4j",
    "dynamodb",
    "couchdb",
    // Concepts
    "database",
    "basis data",
    "sql",
    "nosql",
    "database design",
    "data modeling",
    "database administration",
    "dba",
    "data warehouse",
    "etl",
    "olap",
    "oltp",
  ],
  cloud: [
    // Providers
    "aws",
    "amazon web services",
    "azure",
    "microsoft azure",
    "google cloud",
    "gcp",
    "digital ocean",
    "linode",
    "vultr",
    "alibaba cloud",
    // Technologies
    "docker",
    "kubernetes",
    "k8s",
    "jenkins",
    "gitlab ci",
    "github actions",
    "terraform",
    "ansible",
    "puppet",
    "chef",
    "vagrant",
    // Concepts
    "cloud computing",
    "devops",
    "ci/cd",
    "microservices",
    "containerization",
    "serverless",
    "infrastructure as code",
    "iac",
    "monitoring",
    "logging",
  ],
  security: [
    // Domains
    "cyber security",
    "information security",
    "network security",
    "web security",
    "application security",
    "mobile security",
    "cloud security",
    // Testing
    "penetration testing",
    "pentest",
    "ethical hacking",
    "vulnerability assessment",
    "security audit",
    "code review",
    "security testing",
    // Tools & Concepts
    "firewall",
    "ids",
    "ips",
    "siem",
    "soc",
    "incident response",
    "cryptography",
    "encryption",
    "authentication",
    "authorization",
    "owasp",
    "iso 27001",
    "compliance",
    "risk management",
  ],
  marketing: [
    // Digital Marketing
    "digital marketing",
    "pemasaran digital",
    "online marketing",
    "internet marketing",
    "content marketing",
    "social media marketing",
    "email marketing",
    "affiliate marketing",
    // SEO/SEM
    "seo",
    "search engine optimization",
    "sem",
    "search engine marketing",
    "google ads",
    "facebook ads",
    "instagram ads",
    "linkedin ads",
    "tiktok ads",
    // Analytics
    "google analytics",
    "google tag manager",
    "facebook pixel",
    "conversion tracking",
    "a/b testing",
    "growth hacking",
    "marketing automation",
    "crm",
    // Content
    "copywriting",
    "content creation",
    "social media management",
    "influencer marketing",
    "brand management",
    "public relations",
    "pr",
    "event marketing",
  ],
  business: [
    // Analysis
    "business analysis",
    "analisis bisnis",
    "business analyst",
    "system analyst",
    "requirements gathering",
    "process improvement",
    "business process",
    // Management
    "project management",
    "manajemen proyek",
    "product management",
    "program management",
    "agile",
    "scrum",
    "kanban",
    "waterfall",
    "lean",
    "six sigma",
    // Strategy
    "business strategy",
    "strategic planning",
    "market research",
    "competitive analysis",
    "business development",
    "sales",
    "account management",
    "customer success",
    // Finance
    "financial analysis",
    "budgeting",
    "forecasting",
    "accounting",
    "finance",
    "business intelligence",
    "reporting",
    "kpi",
    "metrics",
    "dashboard",
  ],
  // Additional categories
  devops: [
    "devops",
    "site reliability engineering",
    "sre",
    "infrastructure",
    "automation",
    "monitoring",
    "logging",
    "deployment",
    "release management",
    "configuration management",
  ],
  qa: [
    "quality assurance",
    "qa",
    "testing",
    "test automation",
    "manual testing",
    "selenium",
    "cypress",
    "junit",
    "testng",
    "cucumber",
    "postman",
    "api testing",
    "performance testing",
    "load testing",
    "security testing",
    "regression testing",
  ],
  sales: [
    "sales",
    "penjualan",
    "business development",
    "account executive",
    "sales representative",
    "lead generation",
    "prospecting",
    "closing",
    "negotiation",
    "crm",
    "salesforce",
  ],
  hr: [
    "human resources",
    "hr",
    "talent acquisition",
    "recruitment",
    "hiring",
    "employee relations",
    "performance management",
    "training",
    "compensation",
    "benefits",
  ],
  finance: [
    "finance",
    "keuangan",
    "accounting",
    "akuntansi",
    "financial planning",
    "investment",
    "banking",
    "insurance",
    "audit",
    "tax",
    "budget",
    "financial analysis",
  ],
  operations: [
    "operations",
    "operasional",
    "supply chain",
    "logistics",
    "procurement",
    "inventory management",
    "process optimization",
    "lean manufacturing",
    "quality control",
  ],
};

// Sinonim dan variasi kata
const synonyms = {
  "web development": ["pengembangan web", "web dev", "web programming"],
  "mobile development": [
    "pengembangan mobile",
    "mobile dev",
    "app development",
  ],
  "data science": ["ilmu data", "data scientist", "data analytics"],
  "machine learning": [
    "ml",
    "pembelajaran mesin",
    "artificial intelligence",
    "ai",
  ],
  "user interface": ["ui", "antarmuka pengguna", "interface design"],
  "user experience": ["ux", "pengalaman pengguna", "usability"],
  database: ["basis data", "db", "data storage"],
  programming: ["pemrograman", "coding", "koding", "software development"],
  marketing: ["pemasaran", "promosi", "advertising"],
  management: ["manajemen", "pengelolaan", "leadership"],
};

// Fungsi untuk normalisasi teks
const normalizeText = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ") // Remove punctuation
    .replace(/\s+/g, " ") // Multiple spaces to single
    .trim();
};

// Fungsi untuk fuzzy matching sederhana
const fuzzyMatch = (word1, word2, threshold = 0.8) => {
  if (word1 === word2) return true;
  if (Math.abs(word1.length - word2.length) > 2) return false;

  // Simple character similarity
  const longer = word1.length > word2.length ? word1 : word2;
  const shorter = word1.length > word2.length ? word2 : word1;

  if (longer.length === 0) return true;

  let matches = 0;
  for (let i = 0; i < shorter.length; i++) {
    if (longer.includes(shorter[i])) matches++;
  }

  return matches / longer.length >= threshold;
};

// Fungsi untuk mendapatkan semua keyword termasuk sinonim
const getAllKeywords = (category) => {
  const baseKeywords = skillKeywords[category] || [];
  const expandedKeywords = [...baseKeywords];

  // Tambahkan sinonim
  baseKeywords.forEach((keyword) => {
    if (synonyms[keyword]) {
      expandedKeywords.push(...synonyms[keyword]);
    }
  });

  return [...new Set(expandedKeywords)];
};

// Enhanced bidang mapping dengan lebih banyak kategori
const bidangMapping = {
  // Teknologi
  "teknologi informasi": [
    "programming",
    "web",
    "mobile",
    "data",
    "database",
    "cloud",
    "security",
    "devops",
    "qa",
  ],
  "sistem informasi": [
    "programming",
    "web",
    "database",
    "business",
    "data",
    "qa",
  ],
  "teknik informatika": [
    "programming",
    "web",
    "mobile",
    "data",
    "cloud",
    "security",
    "devops",
  ],
  "ilmu komputer": [
    "programming",
    "web",
    "mobile",
    "data",
    "database",
    "cloud",
    "security",
  ],
  "teknik komputer": [
    "programming",
    "web",
    "mobile",
    "data",
    "cloud",
    "devops",
  ],
  "rekayasa perangkat lunak": ["programming", "web", "mobile", "qa", "devops"],
  "keamanan siber": ["security", "programming", "web", "cloud"],

  // Desain & Kreatif
  desain: ["design"],
  "desain grafis": ["design", "marketing"],
  "desain komunikasi visual": ["design", "marketing"],
  "seni rupa": ["design"],
  multimedia: ["design", "web", "mobile"],
  animasi: ["design", "web"],
  fotografi: ["design", "marketing"],
  film: ["design", "marketing"],

  // Bisnis & Manajemen
  manajemen: ["business", "operations", "hr", "finance"],
  "administrasi bisnis": ["business", "operations", "hr"],
  "manajemen bisnis": ["business", "operations", "finance"],
  "manajemen operasional": ["business", "operations"],
  "manajemen sumber daya manusia": ["business", "hr"],
  "manajemen keuangan": ["business", "finance"],
  "manajemen pemasaran": ["business", "marketing", "sales"],
  kewirausahaan: ["business", "marketing", "sales"],

  // Ekonomi & Keuangan
  ekonomi: ["business", "data", "finance"],
  akuntansi: ["finance", "business"],
  keuangan: ["finance", "business"],
  perbankan: ["finance", "business"],
  asuransi: ["finance", "business"],
  "ekonomi pembangunan": ["business", "data", "finance"],

  // Matematika & Statistik
  matematika: ["data", "programming", "finance"],
  statistika: ["data", "programming", "business"],
  aktuaria: ["data", "finance", "programming"],
  fisika: ["data", "programming"],
  kimia: ["data", "programming"],

  // Komunikasi & Media
  komunikasi: ["marketing", "design", "business"],
  jurnalistik: ["marketing", "design"],
  "public relations": ["marketing", "business"],
  "hubungan masyarakat": ["marketing", "business"],
  broadcasting: ["marketing", "design"],
  "media digital": ["marketing", "design", "web"],

  // Psikologi & Sosial
  psikologi: ["hr", "business", "marketing"],
  sosiologi: ["hr", "business", "marketing"],
  antropologi: ["hr", "business", "marketing"],
  "ilmu politik": ["business", "marketing"],

  // Hukum
  hukum: ["business", "hr"],
  "ilmu hukum": ["business", "hr"],

  // Pendidikan
  pendidikan: ["hr", "business"],
  "pendidikan matematika": ["data", "programming"],
  "pendidikan komputer": ["programming", "web", "data"],

  // Teknik lainnya
  "teknik industri": ["operations", "business", "data"],
  "teknik mesin": ["operations", "data"],
  "teknik elektro": ["programming", "data", "devops"],
  "teknik sipil": ["operations", "data"],
  "teknik kimia": ["operations", "data"],
  arsitektur: ["design", "operations"],

  // Bahasa & Sastra
  "sastra inggris": ["marketing", "business"],
  "bahasa inggris": ["marketing", "business"],
  linguistik: ["data", "programming", "marketing"],

  // Farmasi & Kesehatan
  farmasi: ["operations", "data", "business"],
  "kesehatan masyarakat": ["data", "business"],
  gizi: ["data", "business"],

  // Pertanian & Kehutanan
  agribisnis: ["business", "operations", "marketing"],
  pertanian: ["operations", "data", "business"],
  kehutanan: ["operations", "data", "business"],

  // Geografi & Lingkungan
  geografi: ["data", "programming", "business"],
  lingkungan: ["data", "business", "operations"],
  planologi: ["data", "business", "operations"],
};

const PredictionPage = () => {
  const [userProfile, setUserProfile] = useState({
    nama: "",
    jurusan: "",
    skills: "",
    lokasi: "",
  });

  const [jobData, setJobData] = useState([]);
  const [userKeywords, setUserKeywords] = useState([]);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [defaultApplicants, setDefaultApplicants] = useState(200);

  // Load job data saat komponen mount
  useEffect(() => {
    loadJobData();
  }, []);

  const loadJobData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.BASE_URL}lowongan_all_20250625_090649.json`
      );
      const data = await response.json();
      setJobData(data);
    } catch (error) {
      console.error("Error loading job data:", error);
      // Fallback ke sample data jika file tidak ditemukan
      setJobData([
        {
          id: 1,
          posisi: "Web Developer",
          mitra: "PT Teknologi Indonesia",
          bidang: "Teknologi Informasi",
          provinsi: "DKI Jakarta",
          kabupaten_kota: "Jakarta Selatan",
          deskripsi: "Mengembangkan aplikasi web menggunakan React dan Node.js",
        },
        {
          id: 2,
          posisi: "UI/UX Designer",
          mitra: "PT Digital Creative",
          bidang: "Desain Grafis",
          provinsi: "DKI Jakarta",
          kabupaten_kota: "Jakarta Pusat",
          deskripsi: "Mendesain interface aplikasi mobile dengan Figma",
        },
      ]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateAcceptanceRate = (job, matchPercentage) => {
    // Ambil jumlah posisi yang tersedia
    const availablePositions = job.jumlah || 1;

    // Estimasi jumlah pendaftar berdasarkan popularitas bidang dan lokasi
    let estimatedApplicants = defaultApplicants;

    // Adjust berdasarkan bidang populer
    const popularFields = ["Teknologi Informasi", "Marketing", "Desain"];
    const jobField = job.kategori_posisi || job.bidang || job.Bidang || "";
    if (
      popularFields.some((field) =>
        jobField.toLowerCase().includes(field.toLowerCase())
      )
    ) {
      estimatedApplicants = Math.round(estimatedApplicants * 1.5); // +50% untuk bidang populer
    }

    // Adjust berdasarkan lokasi populer (Jakarta, Surabaya, Bandung)
    const popularLocations = ["Jakarta", "Surabaya", "Bandung"];
    const jobLocation =
      job.lokasi_penempatan || job.provinsi || job.Provinsi || "";
    if (
      popularLocations.some((loc) =>
        jobLocation.toLowerCase().includes(loc.toLowerCase())
      )
    ) {
      estimatedApplicants = Math.round(estimatedApplicants * 1.3); // +30% untuk lokasi populer
    }

    // Base acceptance rate
    const baseAcceptanceRate = (availablePositions / estimatedApplicants) * 100;

    // Boost berdasarkan match percentage user
    let adjustedRate = baseAcceptanceRate;
    if (matchPercentage >= 70) {
      adjustedRate = baseAcceptanceRate * 2.5; // Sangat tinggi
    } else if (matchPercentage >= 50) {
      adjustedRate = baseAcceptanceRate * 2; // Tinggi
    } else if (matchPercentage >= 30) {
      adjustedRate = baseAcceptanceRate * 1.5; // Sedang
    } else {
      adjustedRate = baseAcceptanceRate * 1.2; // Rendah tapi masih ada boost
    }

    // Cap maksimum 95% dan minimum 1%
    adjustedRate = Math.min(Math.max(adjustedRate, 1), 95);

    return {
      acceptanceRate: Math.round(adjustedRate * 10) / 10, // Round to 1 decimal
      availablePositions,
      estimatedApplicants,
      baseRate: Math.round(baseAcceptanceRate * 10) / 10,
    };
  };

  const generateUserKeywords = () => {
    let keywords = [];

    // Normalize jurusan input
    const normalizedJurusan = normalizeText(userProfile.jurusan);

    // Add keywords based on jurusan dengan fuzzy matching
    let matchedJurusan = null;
    Object.keys(bidangMapping).forEach((jurusan) => {
      const normalizedBidang = normalizeText(jurusan);
      if (
        normalizedJurusan.includes(normalizedBidang) ||
        normalizedBidang.includes(normalizedJurusan) ||
        fuzzyMatch(normalizedJurusan, normalizedBidang, 0.7)
      ) {
        matchedJurusan = jurusan;
        const relatedSkills = bidangMapping[jurusan];
        relatedSkills.forEach((skillCategory) => {
          const categoryKeywords = getAllKeywords(skillCategory);
          keywords.push(...categoryKeywords);
        });
      }
    });

    console.log("Matched jurusan:", matchedJurusan);

    // Add user-specified skills dengan normalisasi dan sinonim
    const userSkills = userProfile.skills
      .toLowerCase()
      .split(",")
      .map((s) => normalizeText(s))
      .filter((s) => s.length > 0);

    userSkills.forEach((skill) => {
      keywords.push(skill);

      // Tambahkan sinonim untuk skill user
      if (synonyms[skill]) {
        keywords.push(...synonyms[skill]);
      }

      // Cari skill dalam kategori yang ada
      Object.entries(skillKeywords).forEach(([category, categorySkills]) => {
        categorySkills.forEach((categorySkill) => {
          if (
            skill.includes(categorySkill) ||
            categorySkill.includes(skill) ||
            fuzzyMatch(skill, categorySkill, 0.8)
          ) {
            keywords.push(categorySkill);
            // Tambahkan keyword related dari kategori yang sama
            keywords.push(...categorySkills.slice(0, 5)); // Limit untuk performa
          }
        });
      });
    });

    // Remove duplicates dan filter keyword yang terlalu pendek
    keywords = [...new Set(keywords)]
      .filter((keyword) => keyword.length > 2)
      .sort((a, b) => b.length - a.length); // Prioritas keyword yang lebih panjang

    console.log("Generated enhanced keywords:", keywords.slice(0, 20));
    setUserKeywords(keywords);
    return keywords;
  };
  const findMatchingJobs = () => {
    const keywords = generateUserKeywords();
    const userSkills = userProfile.skills
      .toLowerCase()
      .split(",")
      .map((s) => normalizeText(s))
      .filter((s) => s.length > 0);

    console.log("Generated keywords:", keywords.slice(0, 15));
    console.log("User skills:", userSkills);
    console.log("Job data sample:", jobData[0]);

    const matchingJobs = jobData
      .map((job) => {
        // Normalize job data fields
        const posisi = normalizeText(
          job.posisi_magang || job.posisi || job.Posisi || ""
        );
        const bidang = normalizeText(
          job.kategori_posisi || job.bidang || job.Bidang || ""
        );
        const deskripsi = normalizeText(job.deskripsi || job.Deskripsi || "");
        const mitra = job.mitra || job.Mitra || "";

        const jobText = `${posisi} ${bidang} ${deskripsi}`;

        let matchScore = 0;
        let matchedKeywords = [];
        let positionMatches = 0;
        let fieldMatches = 0;
        let descriptionMatches = 0;

        // Enhanced keyword matching dengan bobot dan fuzzy matching
        keywords.forEach((keyword) => {
          const normalizedKeyword = normalizeText(keyword);
          let keywordMatch = false;
          let matchWeight = 0;

          // Exact match dalam posisi (bobot tertinggi)
          if (posisi.includes(normalizedKeyword)) {
            matchWeight = 5;
            positionMatches++;
            keywordMatch = true;
          }
          // Fuzzy match dalam posisi
          else if (fuzzyMatch(posisi, normalizedKeyword, 0.7)) {
            matchWeight = 4;
            positionMatches++;
            keywordMatch = true;
          }
          // Exact match dalam bidang
          else if (bidang.includes(normalizedKeyword)) {
            matchWeight = 3;
            fieldMatches++;
            keywordMatch = true;
          }
          // Fuzzy match dalam bidang
          else if (fuzzyMatch(bidang, normalizedKeyword, 0.7)) {
            matchWeight = 2.5;
            fieldMatches++;
            keywordMatch = true;
          }
          // Exact match dalam deskripsi
          else if (deskripsi.includes(normalizedKeyword)) {
            matchWeight = 2;
            descriptionMatches++;
            keywordMatch = true;
          }
          // Fuzzy match dalam deskripsi (untuk keyword penting)
          else if (
            normalizedKeyword.length > 4 &&
            fuzzyMatch(deskripsi, normalizedKeyword, 0.8)
          ) {
            matchWeight = 1.5;
            descriptionMatches++;
            keywordMatch = true;
          }

          if (keywordMatch) {
            matchScore += matchWeight;
            matchedKeywords.push(keyword);
          }
        });

        // Bonus untuk user skills yang spesifik
        let userSkillMatches = 0;
        userSkills.forEach((skill) => {
          if (jobText.includes(skill) || fuzzyMatch(jobText, skill, 0.8)) {
            matchScore += 3; // Bonus tinggi untuk user skills
            userSkillMatches++;
            if (!matchedKeywords.includes(skill)) {
              matchedKeywords.push(skill);
            }
          }
        });

        // Location bonus dengan fuzzy matching
        const lokasi = normalizeText(
          job.lokasi_penempatan || job.provinsi || job.Provinsi || ""
        );
        if (userProfile.lokasi) {
          const userLokasi = normalizeText(userProfile.lokasi);
          if (
            lokasi.includes(userLokasi) ||
            fuzzyMatch(lokasi, userLokasi, 0.7)
          ) {
            matchScore += 2;
          }
        }

        // Calculate enhanced match percentage
        const totalUserSkills = userSkills.length;
        const skillMatchPercentage =
          totalUserSkills > 0
            ? Math.round((userSkillMatches / totalUserSkills) * 100)
            : 0;

        // Bonus untuk distribusi match yang baik
        let distributionBonus = 0;
        if (positionMatches > 0) distributionBonus += 2;
        if (fieldMatches > 0) distributionBonus += 1.5;
        if (descriptionMatches > 0) distributionBonus += 1;

        const finalMatchScore = matchScore + distributionBonus;

        // Calculate acceptance rate
        const acceptanceInfo = calculateAcceptanceRate(
          job,
          skillMatchPercentage
        );

        return {
          ...job,
          matchScore: finalMatchScore,
          matchedKeywords: [...new Set(matchedKeywords)],
          matchPercentage: skillMatchPercentage,
          // Match details for debugging
          positionMatches,
          fieldMatches,
          descriptionMatches,
          userSkillMatches,
          // Normalize fields for display
          displayPosisi: job.posisi_magang || job.posisi || job.Posisi || "",
          displayBidang: job.kategori_posisi || job.bidang || job.Bidang || "",
          displayMitra: mitra,
          displayLokasi:
            job.lokasi_penempatan || job.provinsi || job.Provinsi || "",
          // Add acceptance rate info
          acceptanceRate: acceptanceInfo.acceptanceRate,
          availablePositions: acceptanceInfo.availablePositions,
          estimatedApplicants: acceptanceInfo.estimatedApplicants,
          baseAcceptanceRate: acceptanceInfo.baseRate,
        };
      })
      .filter((job) => job.matchScore > 0 && job.matchPercentage > 0) // Only include jobs with actual matches and percentage > 0
      .sort((a, b) => {
        // Sort by match score first, then by match percentage, then by acceptance rate
        if (Math.abs(b.matchScore - a.matchScore) > 0.5) {
          return b.matchScore - a.matchScore;
        }
        if (Math.abs(b.matchPercentage - a.matchPercentage) > 5) {
          return b.matchPercentage - a.matchPercentage;
        }
        return b.acceptanceRate - a.acceptanceRate;
      });

    console.log("Enhanced matching jobs found:", matchingJobs.length);
    console.log(
      "Top 3 matches with details:",
      matchingJobs.slice(0, 3).map((job) => ({
        posisi: job.displayPosisi,
        matchScore: job.matchScore,
        matchPercentage: job.matchPercentage,
        positionMatches: job.positionMatches,
        fieldMatches: job.fieldMatches,
        userSkillMatches: job.userSkillMatches,
        keywords: job.matchedKeywords.slice(0, 5),
      }))
    );

    return matchingJobs;
  };

  const analyzeSkillGaps = (matchingJobs) => {
    const allJobTexts = matchingJobs
      .map((job) => {
        const posisi = job.posisi_magang || job.posisi || job.Posisi || "";
        const bidang = job.kategori_posisi || job.bidang || job.Bidang || "";
        const deskripsi = job.deskripsi || job.Deskripsi || "";
        return `${posisi} ${bidang} ${deskripsi}`.toLowerCase();
      })
      .join(" ");

    const skillGaps = [];
    const userSkills = userProfile.skills
      .toLowerCase()
      .split(",")
      .map((s) => s.trim());

    // Find skills that appear frequently in job descriptions but user doesn't have
    Object.values(skillKeywords)
      .flat()
      .forEach((skill) => {
        if (
          !userSkills.includes(skill.toLowerCase()) &&
          allJobTexts.includes(skill.toLowerCase())
        ) {
          // Count frequency
          const frequency = (
            allJobTexts.match(new RegExp(skill.toLowerCase(), "g")) || []
          ).length;
          if (frequency > 2) {
            // Only suggest skills that appear multiple times
            skillGaps.push(skill);
          }
        }
      });

    return skillGaps;
  };

  const analyzeLocationInsights = (matchingJobs) => {
    const locationCount = {};
    matchingJobs.forEach((job) => {
      // Extract province from lokasi_penempatan or use other location fields
      let provinsi = "";
      if (job.lokasi_penempatan) {
        const match = job.lokasi_penempatan.match(/Provinsi\s*:\s*([^\n\r]+)/);
        if (match) {
          provinsi = match[1].trim();
        }
      }
      if (!provinsi) {
        provinsi = job.provinsi || job.Provinsi || "Tidak Diketahui";
      }

      locationCount[provinsi] = (locationCount[provinsi] || 0) + 1;
    });

    return Object.entries(locationCount)
      .sort(([, a], [, b]) => b - a)
      .map(([location]) => location);
  };

  const analyzeFieldInsights = (matchingJobs) => {
    const fieldCount = {};
    matchingJobs.forEach((job) => {
      const bidang = job.kategori_posisi || job.bidang || job.Bidang || "";
      fieldCount[bidang] = (fieldCount[bidang] || 0) + 1;
    });

    return Object.entries(fieldCount)
      .sort(([, a], [, b]) => b - a)
      .map(([field]) => field);
  };

  const analyzeProfile = async () => {
    if (!userProfile.nama || !userProfile.jurusan || !userProfile.skills) {
      alert("Mohon lengkapi semua field yang wajib diisi!");
      return;
    }

    console.log("Starting analysis with profile:", userProfile);
    console.log("Available job data count:", jobData.length);

    setIsAnalyzing(true);

    // Simulate loading time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const matchingJobs = findMatchingJobs();
      const topMatches = matchingJobs.slice(0, 5);

      console.log("Analysis complete. Total matches:", matchingJobs.length);
      console.log("Top matches:", topMatches);

      setAnalysisResult({
        totalMatches: matchingJobs.length,
        topMatches,
        allMatches: matchingJobs, // Menampilkan semua lowongan yang cocok
      });

      // Generate recommendations
      const skillGaps = analyzeSkillGaps(matchingJobs);
      const locationInsights = analyzeLocationInsights(matchingJobs);
      const fieldInsights = analyzeFieldInsights(matchingJobs);

      console.log("Recommendations generated:", {
        skillGaps,
        locationInsights,
        fieldInsights,
      });

      setRecommendations({
        skillGaps: skillGaps.slice(0, 5),
        locationInsights: locationInsights.slice(0, 3),
        fieldInsights: fieldInsights.slice(0, 3),
      });

      // Force re-render
      setIsAnalyzing(false);
    } catch (error) {
      console.error("Error during analysis:", error);
      alert("Terjadi kesalahan saat melakukan analisis. Silakan coba lagi.");
      setIsAnalyzing(false);
    }
  };

  const resetForm = () => {
    setUserProfile({
      nama: "",
      jurusan: "",
      skills: "",
      lokasi: "",
    });
    setAnalysisResult(null);
    setRecommendations(null);
    setUserKeywords([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎯 Prediksi Lowongan Magang
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            Analisis profil Anda dan dapatkan rekomendasi lowongan magang yang
            paling sesuai dengan keahlian, jurusan, dan preferensi lokasi Anda.
          </p>

          {/* Enhanced Features Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 max-w-4xl mx-auto mb-4">
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-center">
                <div className="bg-blue-100 rounded-full p-2 mr-2">
                  <Search className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-gray-700">
                  <strong>Smart Matching</strong>
                  <br />
                  AI dengan fuzzy search & sinonim
                </span>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-green-100 rounded-full p-2 mr-2">
                  <BarChart3 className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-gray-700">
                  <strong>Analisis Mendalam</strong>
                  <br />
                  100+ kategori skill & bidang
                </span>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-purple-100 rounded-full p-2 mr-2">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-gray-700">
                  <strong>Prediksi Akurat</strong>
                  <br />
                  Peluang diterima & rekomendasi
                </span>
              </div>
            </div>
          </div>

          {/* Disclaimer Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-4xl mx-auto">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="bg-amber-100 rounded-full p-2">
                  <Lightbulb className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-amber-800 mb-2">
                  📋 Cara Kerja Prediksi & Disclaimer
                </h3>
                <div className="text-sm text-amber-700 space-y-2">
                  <p>
                    <strong>Prediksi berdasarkan:</strong> Analisis kesesuaian
                    keyword antara profil Anda (jurusan, skills, lokasi) dengan
                    deskripsi lowongan menggunakan AI matching dengan database
                    1000+ keyword dan sinonim.
                  </p>
                  <p>
                    <strong>Peluang diterima dihitung dari:</strong> Estimasi
                    jumlah pendaftar, posisi tersedia, tingkat kesesuaian
                    profil, dan faktor popularitas bidang/lokasi.
                  </p>
                  <p className="font-medium">
                    ⚠️ <strong>Disclaimer:</strong> Ini hanya prediksi berbasis
                    algoritma untuk membantu Anda memilih lowongan yang relevan.
                    Hasil sebenarnya tergantung banyak faktor lain seperti
                    portofolio, interview, dan kriteria khusus perusahaan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <div className="flex items-center mb-6">
              <User className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Profil Anda
              </h2>
            </div>

            <div className="space-y-6">
              {/* Nama */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  name="nama"
                  value={userProfile.nama}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              {/* Jurusan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <GraduationCap className="inline h-4 w-4 mr-1" />
                  Jurusan/Program Studi *
                </label>
                <input
                  type="text"
                  name="jurusan"
                  value={userProfile.jurusan}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Contoh: Teknik Informatika, Sistem Informasi"
                />
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Code className="inline h-4 w-4 mr-1" />
                  Keahlian/Skills *
                </label>
                <textarea
                  name="skills"
                  value={userProfile.skills}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Pisahkan dengan koma. Contoh: JavaScript, React, Python, UI/UX Design"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Tuliskan keahlian Anda dipisahkan dengan koma
                </p>
              </div>

              {/* Lokasi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Preferensi Lokasi
                </label>
                <input
                  type="text"
                  name="lokasi"
                  value={userProfile.lokasi}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Contoh: Jakarta, Bandung, Remote"
                />
              </div>

              {/* Estimasi Pendaftar */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="inline h-4 w-4 mr-1" />
                  Estimasi Jumlah Pendaftar (Default)
                </label>
                <input
                  type="number"
                  value={defaultApplicants}
                  onChange={(e) => setDefaultApplicants(Number(e.target.value))}
                  min="50"
                  max="1000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="200"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Jumlah estimasi pendaftar untuk menghitung peluang diterima
                  (50-1000 orang)
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={analyzeProfile}
                  disabled={isAnalyzing}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isAnalyzing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Menganalisis...
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5 mr-2" />
                      Analisis Profil
                    </>
                  )}
                </button>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <div className="space-y-6">
            {/* Analysis Results */}
            {analysisResult && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-xl p-6"
              >
                <div className="flex items-center mb-6">
                  <Target className="h-6 w-6 text-green-600 mr-3" />
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Hasil Analisis
                  </h3>
                </div>

                <div
                  className={`border rounded-lg p-4 mb-6 ${
                    analysisResult.totalMatches > 0
                      ? "bg-green-50 border-green-200"
                      : "bg-yellow-50 border-yellow-200"
                  }`}
                >
                  <h4
                    className={`text-lg font-semibold mb-2 ${
                      analysisResult.totalMatches > 0
                        ? "text-green-800"
                        : "text-yellow-800"
                    }`}
                  >
                    {analysisResult.totalMatches > 0
                      ? "✅ Analisis Selesai!"
                      : "⚠️ Hasil Analisis"}
                  </h4>
                  <p
                    className={
                      analysisResult.totalMatches > 0
                        ? "text-green-700"
                        : "text-yellow-700"
                    }
                  >
                    Ditemukan{" "}
                    <span className="font-bold">
                      {analysisResult.totalMatches}
                    </span>{" "}
                    lowongan yang cocok dengan profil Anda.
                  </p>
                  <p
                    className={`text-sm mt-1 ${
                      analysisResult.totalMatches > 0
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    Berdasarkan: {userProfile.skills}
                  </p>
                  {analysisResult.totalMatches === 0 && (
                    <div className="mt-3 p-3 bg-yellow-100 rounded-lg">
                      <p className="text-yellow-800 text-sm">
                        <strong>Tips:</strong> Coba gunakan kata kunci yang
                        lebih umum seperti "web", "design", "programming",
                        "marketing", atau sesuaikan dengan bidang yang tersedia.
                      </p>
                    </div>
                  )}

                  {/* Additional disclaimer */}
                  <div className="mt-3 p-3 bg-blue-100 rounded-lg">
                    <p className="text-blue-800 text-xs">
                      💡 <strong>Catatan:</strong> Prediksi ini berdasarkan
                      analisis kesesuaian keyword dan algoritma matching.
                      Gunakan sebagai panduan awal untuk memilih lowongan yang
                      relevan. Kesuksesan aplikasi bergantung pada banyak faktor
                      lain.
                    </p>
                  </div>
                </div>

                {analysisResult.allMatches.length > 0 && (
                  <>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 mr-2" />
                      Semua Lowongan yang Cocok (
                      {analysisResult.allMatches.length})
                    </h4>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {analysisResult.allMatches.map((job, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-semibold text-gray-800">
                              {job.displayPosisi ||
                                job.posisi_magang ||
                                job.posisi ||
                                job.Posisi}
                            </h5>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                job.matchPercentage >= 50
                                  ? "bg-green-100 text-green-800"
                                  : job.matchPercentage >= 25
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {job.matchPercentage}% match
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">
                            <strong>
                              {job.displayMitra || job.mitra || job.Mitra}
                            </strong>{" "}
                            -{" "}
                            {job.displayLokasi
                              ? job.displayLokasi
                                  .split("\n")[0]
                                  .replace("Provinsi :", "")
                                  .trim()
                              : job.provinsi ||
                                job.Provinsi ||
                                "Tidak Diketahui"}
                          </p>
                          <p className="text-sm text-gray-500 mb-2">
                            Bidang:{" "}
                            {job.displayBidang ||
                              job.kategori_posisi ||
                              job.bidang ||
                              job.Bidang}
                          </p>

                          {/* Enhanced Match Details */}
                          <div className="bg-gray-50 rounded-lg p-3 mb-2">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium text-gray-700">
                                Peluang Diterima:
                              </span>
                              <span
                                className={`text-sm font-bold ${
                                  job.acceptanceRate >= 20
                                    ? "text-green-600"
                                    : job.acceptanceRate >= 10
                                    ? "text-yellow-600"
                                    : "text-red-600"
                                }`}
                              >
                                {job.acceptanceRate}%
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mb-2 italic">
                              * Estimasi berdasarkan algoritma, bukan jaminan
                            </p>

                            {/* Match Quality Indicators */}
                            <div className="grid grid-cols-2 gap-2 mb-2">
                              <div className="text-xs">
                                <span className="text-gray-500">Score: </span>
                                <span className="font-medium text-blue-600">
                                  {Math.round(job.matchScore * 10) / 10}
                                </span>
                              </div>
                              <div className="text-xs">
                                <span className="text-gray-500">Skills: </span>
                                <span className="font-medium text-purple-600">
                                  {job.userSkillMatches || 0}/
                                  {userProfile.skills.split(",").length}
                                </span>
                              </div>
                            </div>

                            {/* Match Distribution */}
                            {(job.positionMatches > 0 ||
                              job.fieldMatches > 0 ||
                              job.descriptionMatches > 0) && (
                              <div className="flex gap-2 mb-2">
                                {job.positionMatches > 0 && (
                                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                    Posisi: {job.positionMatches}
                                  </span>
                                )}
                                {job.fieldMatches > 0 && (
                                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                    Bidang: {job.fieldMatches}
                                  </span>
                                )}
                                {job.descriptionMatches > 0 && (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                    Desc: {job.descriptionMatches}
                                  </span>
                                )}
                              </div>
                            )}

                            <div className="text-xs text-gray-500 space-y-1">
                              <div className="flex justify-between">
                                <span>Posisi tersedia:</span>
                                <span>{job.availablePositions} orang</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Est. pendaftar:</span>
                                <span>{job.estimatedApplicants} orang</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Base rate:</span>
                                <span>{job.baseAcceptanceRate}%</span>
                              </div>
                            </div>
                          </div>

                          {job.matchedKeywords.length > 0 && (
                            <p className="text-sm text-blue-600">
                              Matched:{" "}
                              {job.matchedKeywords.slice(0, 5).join(", ")}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* Recommendations */}
            {recommendations && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-xl p-6"
              >
                <div className="flex items-center mb-6">
                  <Lightbulb className="h-6 w-6 text-yellow-600 mr-3" />
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Rekomendasi Pengembangan
                  </h3>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    💡 Tips Pengembangan Karir
                  </h4>
                  <ul className="space-y-3 text-blue-700">
                    {recommendations.skillGaps.length > 0 && (
                      <li className="flex items-start">
                        <Award className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Skill yang Perlu Dikembangkan:</strong>
                          <span className="ml-1">
                            {recommendations.skillGaps.join(", ")}
                          </span>
                        </div>
                      </li>
                    )}
                    {recommendations.locationInsights.length > 0 && (
                      <li className="flex items-start">
                        <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Lokasi dengan Peluang Terbanyak:</strong>
                          <span className="ml-1">
                            {recommendations.locationInsights.join(", ")}
                          </span>
                        </div>
                      </li>
                    )}
                    {recommendations.fieldInsights.length > 0 && (
                      <li className="flex items-start">
                        <BarChart3 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Bidang dengan Permintaan Tinggi:</strong>
                          <span className="ml-1">
                            {recommendations.fieldInsights.join(", ")}
                          </span>
                        </div>
                      </li>
                    )}
                    <li className="flex items-start">
                      <Target className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                      <strong>Saran Umum:</strong>
                      <span className="ml-1">
                        Update LinkedIn, buat portofolio online, ikuti webinar
                        industri
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Users className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                      <strong>Networking:</strong>
                      <span className="ml-1">
                        Bergabung dengan komunitas profesional di bidang Anda
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;
