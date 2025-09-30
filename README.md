# GreenQuest

> An environmental sustainability platform that gamifies eco-friendly actions through daily challenges, community engagement, and 3D visualizations.
> 
## 🎯 Project Overview

GreenQuest is a full-stack web application designed to promote environmental consciousness through gamification. Users can participate in daily sustainability challenges, track their progress, earn achievements, and engage with a community of like-minded individuals. The platform features an immersive 3D environment built with Three.js to create an engaging user experience.

### Live Demo
If you want to access a live demo of this application to try out Greenquest for yourself. Here is the link: https://greenquest-gxov.onrender.com/

### Key Features

- **Daily Challenges**: Personalized sustainability tasks that users can complete
- **Community Challenges**: Collaborative environmental initiatives
- **Progress Tracking**: Visual progress bars and achievement systems
- **3D Environment**: Interactive 3D world with environmental themes
- **Social Feed**: Share and view sustainability posts from the community
- **User Authentication**: Secure login and registration system

## 🛠️ Technologies Used

### Frontend

- **React 18** - Modern UI framework with hooks and context
- **Vite** - Fast build tool and development server
- **Three.js** - 3D graphics library for immersive environments
- **CSS3** - Custom styling with modern CSS features
- **React Router** - Client-side routing

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Knex.js** - SQL query builder and migration tool
- **PostgreSQL** - Relational database
- **Cookie Sessions** - User authentication and session management

### Development Tools

- **ESLint** - Code quality and consistency
- **Git** - Version control
- **npm** - Package management

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database
- Git

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd GreenQuest
   ```

2. **Install backend dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up the database**

   ```bash
   cd ../server
   # Update knexfile.js with your database credentials
   npm run migrate
   npm run seed
   ```

5. **Configure environment variables**
   Create a `.env` file in the server directory with:

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/greenquest
   SESSION_SECRET=your-secret-key-here
   PORT=3001
   ```

6. **Start the backend server**

   ```bash
   cd server
   npm start
   ```

7. **Start the frontend development server**

   ```bash
   cd frontend
   npm run dev
   ```

8. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 📁 Project Structure

```
GreenQuest/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── components3D/    # Three.js 3D components
│   │   ├── contexts/        # React context providers
│   │   ├── pages/           # Application pages
│   │   ├── styles/          # CSS stylesheets
│   │   └── utils/           # Utility functions
│   └── public/              # Static assets
├── server/                   # Node.js backend application
│   ├── controllers/         # API route handlers
│   ├── models/              # Data models
│   ├── middleware/          # Express middleware
│   ├── services/            # Business logic
│   └── db/                  # Database migrations and seeds
└── documentation/            # Project documentation
```

## 🔧 Available Scripts

### Backend (server/)

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed the database with sample data

### Frontend (frontend/)

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

## 📚 Documentation

- [Project Architecture](documentation/project-architecture.md)
- [Project Proposal](PROPOSAL.md)
- [API Documentation](documentation/api-docs.md)

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions about setting up the project locally, please:

1. Check the existing documentation
2. Review the project structure and configuration files
3. Ensure all dependencies are properly installed
4. Verify your database connection and credentials

---

**Note**: This project was developed as a learning experience and demonstration of full-stack development capabilities. The 3D environment and gamification features showcase modern web technologies and creative approaches to environmental education.
