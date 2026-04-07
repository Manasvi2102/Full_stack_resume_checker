# 🚀 ResumeGenius – Smart AI Resume Analyzer 🧠

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="Mongo" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />

</div>

<br />

ResumeGenius is a production-ready Full Stack AI Resume Analyzer Web Application. It leverages the MERN stack alongside the OpenAI API to dissect PDF resumes, scoring them against industry-standard ATS (Applicant Tracking System) rules, and providing strategic feedback to Job Seekers to massively increase their interview callback rates. 

---

## 🌟 Key Features

- **Permanent Sleek Dark Mode:** Built exclusively with a modern, distraction-free premium dark aesthetic.
- **Deep ATS Scoring:** Evaluates resumes out of 100 based on exact parameters used by Taleo, Workday, and Greenhouse.
- **AI Strategic Feedback:** Employs GPT-3.5-Turbo/GPT-4 to assess grammar, impact scale, and tone formulation. 
- **Skill Extraction Pipeline:** Automatically extracts soft and hard skills, matching against missing targeted keywords.
- **Responsive Dashboard:** Real-time upload interface allowing instant PDF processing.
- **Secured Authentication:** JWT-protected user sessions with Bcrypt encryption for passwords.

## 🛠️ Architecture Overview

The system architecture is decoupled entirely into a separate React front-end and a Node/Express RESTful API back-end.

```text
Full stack resume checker/
  ├── backend/               # Node.js + Express.js API
  │   ├── config/            # DB Configuration & Environment
  │   ├── controllers/       # Route Logic & OpenAI Integrations
  │   ├── models/            # Mongoose Schemas (User, Resume, Analysis)
  │   ├── routes/            # Exposed Endpoints
  │   ├── middleware/        # JWT Auth, File Upload Processing via Multer
  │   └── uploads/           # Transient PDF storage processing directory
  └── frontend/              # React + Vite Client
      ├── src/
      │   ├── components/    # Modular UI (Navbar, Route Guards)
      │   ├── context/       # Authentication State Context
      │   ├── pages/         # Dashboard, Landing, Auth, Report
      │   └── utils/         # Helper functions & API interceptors
      └── tailwind.config.js # Custom Design System Configurations
```

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
You need the following installed:
- Node.js (v18+)
- MongoDB Community Server (or an Atlas Cluster)
- An active OpenAI API Key

### 1. Backend Setup Checkout

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Initialize environment variables. Create a `.env` file in the `backend` root:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/resume-checker
   JWT_SECRET=super_secret_jwt_string_here
   OPENAI_API_KEY=sk-your-openai-api-key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup Checkout

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install client dependencies (legacy peer deps required for some chart libraries):
   ```bash
   npm install --legacy-peer-deps
   ```
3. Start the Vite server:
   ```bash
   npm run dev
   ```

Your backend should be running on `http://localhost:5000` and the frontend interface on `http://localhost:5173`.

---

## 🔒 Security Posture

- **Rate Limiting:** Global rate limiting enforced via express-rate-limit.
- **Data Sanitization:** NoSQL query injection prevention using express-mongo-sanitize.
- **Document Protection:** Uploaded PDFs are stored momentarily in a transient temp directory and strictly filtered via MIME types using Multer.
- **Header Security:** Implemented via Helmet.js.

## 📄 License
This codebase is completely open-source and free to be modified or commercially distributed under the MIT License constraints.
