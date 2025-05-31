# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GreenQuest is a gamified eco-social media platform where users earn points and rewards by posting real-world sustainable actions. The platform combines social networking with environmental challenges to encourage eco-friendly behaviors.

## Common Development Commands

### Initial Setup
```bash
# Full project setup (install deps, build frontend, setup database)
npm run kickstart

# Manual setup steps
cd frontend && npm install && npm run build
cd ../server && npm install && npm run migrate && npm run seed
```

### Development
```bash
# Start both servers (run in separate terminals)
npm run dev:frontend    # Frontend on http://localhost:5173
npm run dev            # Backend on http://localhost:3000

# Code quality
npm run lint           # Fix linting issues
```

### Database
```bash
# Migration commands (from root or server directory)
npm run migrate                    # Apply pending migrations
npm run seed                       # Seed initial data
cd server && npm run migrate:make <name>  # Create new migration
cd server && npm run migrate:rollback      # Rollback last batch
```

### Production Build
```bash
npm run build:frontend    # Build frontend for production
npm start                 # Start production server
```

## Architecture Overview

### Tech Stack
- **Frontend**: React 19 + Vite, React Router, Three.js for 3D graphics, Styled Components
- **Backend**: Express.js, PostgreSQL with Knex ORM, bcrypt authentication, cookie-session
- **Real-time**: Socket.io (infrastructure present but not actively used)
- **AI**: Google Generative AI for challenge generation

### Project Structure
```
/frontend/
  /src/
    /adapters/        # API communication layer
    /components/      # React UI components
    /components3D/    # Three.js 3D components
    /contexts/        # React contexts (CurrentUserContext)
    /pages/           # Route page components
    /styles/          # CSS files per component
    /utils/           # Helper functions

/server/
  /controllers/       # Route handlers
  /models/           # Database models
  /middleware/       # Express middleware
  /services/         # Business logic
  /scheduler/        # Cron jobs for challenges
  /db/
    /migrations/     # Database schema changes
    /seeds/          # Initial data
```

### Key Architectural Patterns

1. **Frontend Architecture**
   - Functional React components with hooks
   - Context API for global state management
   - Adapter pattern for API calls
   - CSS modules for component styling

2. **Backend Architecture**
   - RESTful API design
   - Controller → Model → Database flow
   - Service layer for complex business logic
   - Middleware for auth, sessions, and logging

3. **Database Schema**
   - Users with authentication
   - Posts linked to challenges
   - Challenge system (daily, weekly, community)
   - Points and leveling system
   - Social features (likes, comments, friends)

### API Endpoints Pattern
- `/api/auth/*` - Authentication (register, login, logout, me)
- `/api/users/*` - User management
- `/api/posts/*` - Post CRUD operations
- `/api/challenges/*` - Challenge management

### Environment Variables
Create `/server/.env` with:
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - For cookie encryption
- `GEMINI_API_KEY` - For AI challenge generation (optional)

### Development Notes
- Frontend dev server proxies `/api` requests to backend
- Database uses Knex migrations for schema management
- Challenge scheduler runs via node-cron
- Authentication uses cookie-based sessions
- Points system: +50 for posts, +10 for likes, varies for challenges