# LightChan 🌟

A modern, minimalist imageboard inspired by 4chan, built with Next.js and Node.js. LightChan provides a clean, fast, and responsive platform for anonymous discussions across different boards.

## ✨ Features

- **Multiple Boards**: Support for different discussion boards (anime/wallpapers, rant, etc.)
- **File Uploads**: Upload images with your posts
- **Thread System**: Create new threads and reply to existing ones
- **Anonymous Posting**: No registration required
- **Real-time Updates**: Fresh content loading


## 🚀 Live Demo

**Frontend**: [https://lightchan-git-master-lights-projects-4f485bb8.vercel.app/](https://lightchan-git-master-lights-projects-4f485bb8.vercel.app/)

**Backend API**: [https://lightchan.onrender.com/api](https://lightchan.onrender.com/api)

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form management
- **Axios** - HTTP client


### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Multer** - File upload handling
- **Cloudinary** - Image hosting and optimization


## 📁 Project Structure

```
lightchan/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   │   ├── [board]/     # Dynamic board pages
│   │   │   └── thread/      # Thread pages
│   │   └── components/      # Reusable components
│   ├── public/              # Static assets
│   └── package.json
├── backend/                 # Node.js backend API
│   ├── routes/              # API routes
│   ├── models/              # Database models
│   ├── utils/               # Utility functions
│   └── package.json
└── README.md
```

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ and npm/pnpm
- MongoDB instance (local or cloud)
- Cloudinary account (for image uploads)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Farhan291/lightchan.git
   cd lightchan/backend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGO_URL=your_mongodb_connection_string
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   FRONT_URL=http://localhost:3000
   secretKey=your_jwt_secret_key
   ```

4. **Start the backend server**
   ```bash
   pnpm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the frontend directory:
   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Usage

### Creating a New Thread
1. Visit any board (e.g., `/w` for anime/wallpapers)
2. Click the "New Thread" button
3. Fill in the subject and comment
4. Upload an image (required)
5. Click "Post" to create your thread

### Browsing Threads
- Navigate between boards using the board links
- Click on thread previews to view full threads
- Threads display with image thumbnails and preview text

### Supported Boards
- `/w/` - Anime/Wallpapers
- `/r/` - Rant
- More boards can be easily added

## 🔧 Configuration

### Adding New Boards
Update the `validBoards` object in:
- `frontend/src/app/[board]/page.tsx`
- Backend route handlers

### File Upload Settings
- Supported formats: PDF, JPG, PNG
- File size limits configured in backend
- Images automatically optimized via Cloudinary

## 🌐 Deployment

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy with Node.js runtime

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set `NEXT_PUBLIC_BACKEND_URL` environment variable
3. Deploy with Next.js preset

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 API Documentation

### Endpoints
- `GET /api/threads/:board` - Get all threads for a board
- `POST /api/post/thread` - Create a new thread
- `POST /api/post/comment` - Reply to a thread
- `GET /api/thread/:id` - Get specific thread with replies

### Response Format
```json
{
  "success": true,
  "data": [...],
  "message": "Success"
}
```
 
## 📄 License

This project is licensed under the MIT License 

## 👤 Author

**Farhan291**
- GitHub: [@Farhan291](https://github.com/Farhan291)

## 🙏 Acknowledgments

- Inspired by 4chan's imageboard format
- Built with modern web technologies
- Community-driven development

---

⭐ **Star this repository if you find it useful!**