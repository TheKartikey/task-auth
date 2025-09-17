# 📚 Student Management System

A full-stack **MERN** application to manage students with **encryption** support for sensitive data (name, email, phone, etc.).

---

## 🚀 Features

- 🔑 **Secure Authentication** (JWT-based login/logout)
- 📝 **Add / Update / Delete Students**
- 🔒 **AES-256-CBC Encryption** for sensitive data
- 📦 **MongoDB + Mongoose** for database
- 🎨 **React + TailwindCSS** frontend
- 🔗 **REST API** with Express.js
- 🔄 **CORS enabled** for cross-origin requests

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- CryptoJS (for decryption)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT (Authentication)
- Node `crypto` (AES-256 encryption)

---

## ⚙️ Installation

### 1. Clone the repo
```bash
git clone https://github.com/your-username/student-management-system.git
cd student-management-system

Backend Setup
cd Server
npm installJWT_SECRET_KEY=managerishere
JWT_REFRESH_SECRET=managerishere
DB_URI=mongodb://localhost:27017/MainManager
PORT=5000
ENCRYPTION_KEY=1234567890abcdef1234567890abcdef
