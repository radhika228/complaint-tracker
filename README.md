# 🚨 Complaint Tracker

A full-stack complaint management web application where users can register, file complaints with image attachments, and track their resolution status in real time.


📂 **GitHub:** [github.com/radhika228/complaint-tracker](https://github.com/radhika228/complaint-tracker)

---

## 📸 Screenshots

> *(Add screenshots of your app here)*

---

## ✨ Features

- 🔐 **User Authentication** — Secure signup & login using JWT and bcrypt
- 📝 **File Complaints** — Submit complaints with title, description, and image
- 🖼️ **Image Upload** — Attach images up to 5MB using drag & drop
- 📊 **Status Tracking** — Track complaints as Pending, In Review, or Resolved
- 🔍 **Filter Complaints** — Filter by status on the complaints page
- 🗑️ **Delete & Update** — Owners can update status or delete their complaints
- 📱 **Responsive Design** — Works on all screen sizes

---

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, Vanilla JavaScript
- LocalStorage for token management

### Backend
- Node.js, Express.js
- JWT (jsonwebtoken) for authentication
- bcryptjs for password hashing
- Multer for image file uploads
- CORS, dotenv

### Database
- MongoDB with Mongoose ODM
- MongoDB Atlas (Cloud)

### Deployment
- Backend → Railway
- Frontend → Vercel
- Database → MongoDB Atlas

---

## 📁 Project Structure

```
complaint-tracker/
├── backend/
│   ├── middleware/
│   │   └── auth.js          # JWT verification middleware
│   ├── models/
│   │   ├── User.js          # User schema
│   │   └── Complaint.js     # Complaint schema
│   ├── routes/
│   │   ├── auth.js          # Signup & Login routes
│   │   └── complaints.js    # CRUD routes + image upload
│   ├── uploads/             # Uploaded images
│   ├── .env                 # Environment variables
│   ├── package.json
│   └── server.js            # Entry point
│
└── frontend/
    ├── css/
    │   └── main.css
    ├── js/
    │   ├── auth.js          # Auth helper functions
    │   └── main.js          # Homepage stats
    ├── pages/
    │   ├── login.html       # Login & Signup
    │   ├── add-complaint.html
    │   └── complaints.html  # All complaints list
    └── index.html           # Homepage
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/radhika228/complaint-tracker.git

# Go to backend folder
cd complaint-tracker/backend

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Run the App

```bash
npm run dev
```

Open your browser and go to: `http://localhost:5000`

---

## 🔗 API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/auth/signup | ❌ | Register new user |
| POST | /api/auth/login | ❌ | Login, returns JWT |
| GET | /api/complaints | ❌ | Get all complaints |
| GET | /api/complaints/mine | ✅ | Get my complaints |
| POST | /api/complaints | ✅ | File new complaint |
| PATCH | /api/complaints/:id/status | ✅ | Update status |
| DELETE | /api/complaints/:id | ✅ | Delete complaint |

---

## 🔐 Security

- Passwords hashed using **bcrypt** — never stored as plain text
- **JWT tokens** expire after 7 days
- Protected routes verify token via middleware
- Only complaint **owner** can update or delete
- File type & size validation on uploads
- HTML escaping to prevent **XSS attacks**

---

## 🌱 Future Improvements

- [ ] Admin dashboard to manage all complaints
- [ ] Email notifications on status change
- [ ] Pagination for large complaint lists
- [ ] Search functionality
- [ ] Rate limiting to prevent API abuse

---

## 👩‍💻 Author

**Radhika Gupta**  
📧 [radhikagupta0891@gmail.com]  
🔗 [LinkedIn](https://www.linkedin.com/in/radhika-gupta-060b94276/)  
🐙 [GitHub](https://github.com/radhika228)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
