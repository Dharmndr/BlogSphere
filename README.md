# 📝 BlogSphere

BlogSphere is a Full-Stack blogging platform where users can securely create, manage, and publish their own blog posts.

It features custom authentication, rich text editing, image uploads to Cloudinary, and protected routes.

## 🚀 Features

- 🔐 User Authentication (Signup, Login, Logout) with JWT
- ✍️ Create Blog Posts with Rich Text Editor (TinyMCE)
- 🖼 Upload Featured Images (Cloudinary)
- 📝 Edit & Update Posts
- 🗑 Delete Own Posts
- 👀 View All Active Posts
- 🛡 Protected Routes (Only author can create/edit/delete)
- 📱 Responsive UI with Tailwind CSS

## 🛠 Tech Stack

### Frontend
- **Framework:** React
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **Routing:** React Router
- **Form Handling:** React Hook Form
- **Editor:** TinyMCE

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **File Uploads:** Multer & Cloudinary

### Build Tool
- ⚡ Vite

## 📂 Project Structure 

```text
BlogSphere/
├── backend/
│   ├── config/          # DB connection & Cloudinary config
│   ├── controllers/     # Route logic
│   ├── middleware/      # Auth & file upload middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints
│   └── server.js        # Entry point
└── frontend/
    ├── src/
    │   ├── api/         # Axios service layers
    │   ├── components/  # Reusable UI components
    │   ├── conf/        # Centralized configuration
    │   ├── pages/       # Page components
    │   └── store/       # Redux store & slices
    └── index.html       # Entry point
```

## 🔐 Authentication Flow

- **User registers** → Account created in MongoDB.
- **Secure Login** → JWT token generated and stored in LocalStorage.
- **Session Sync** → Redux stores user state and authentication status.
- **Access Control** → Protected routes restrict unauthorized access.
- **Logout** → Clears tokens and resets Redux state.

## 📝 Post Management

### Users can:
- **Create posts** with title, slug, content & featured image.
- **Upload images** securely to Cloudinary.
- **Edit/Update** their own blog posts.
- **Delete posts** (Removes entry from database and cleans up image from Cloudinary).
- **View all** public/active posts on the platform.



## ⚙️ Environment Variables

### Backend (.env)
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_URL=your_cloudinary_url
```

### Frontend (.env)
Create a `.env` file in the `frontend/` directory:
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_TINYMCE_KEY=your_tinymce_api_key
```


## ▶️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Dharmndr/BlogSphere.git
cd BlogSphere
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
# Configure .env file
npm start
```

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
# Configure .env file
npm run dev
```


## 🎯 Key Highlights

- **Slug auto-generation** from title for SEO-friendly URLs.
- **Rich Text Editor** (TinyMCE) for professional content creation.
- **Image preview** support before uploading.
- **Secure session handling** using JWT and HTTP headers.
- **Clean reusable component** architecture for scalability.
- **Fully responsive layout** for mobile and desktop views.

## 🧩 Future Improvements

- 🔎 **Search & filter** posts by category or keyword.
- ❤️ **Like & comment** system for user engagement.
- 👤 **User profile** page with bio and post history.
- 📊 **Post analytics** for authors.

- 📌 **Pagination** support for better performance.

## 👨‍💻 Author

Dharmendra Kumar

## 📜 License

This project is open-source and available under the MIT License.