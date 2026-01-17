# BrainArena

A full-stack web application built with React, Node.js/Express, and MySQL.

## Tech Stack

- **Frontend**: React with Vite, HTML, CSS (no frameworks)
- **Backend**: Node.js with Express
- **Database**: MySQL
- **Routing**: React Router DOM

## Project Structure

```
BrainArena/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx        # Main App component
│   │   ├── main.jsx       # Entry point
│   │   └── *.css          # Bare CSS files
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/                # Express backend
│   ├── database/          # Database schemas
│   ├── server.js          # Main server file
│   ├── .env.example       # Environment variables template
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd BrainArena
   ```

2. **Set up the database**
   - Create a MySQL database named `brainarena`
   - Run the schema file:
     ```bash
     mysql -u root -p brainarena < server/database/schema.sql
     ```

3. **Configure environment variables**
   ```bash
   cd server
   cp .env.example .env
   ```
   Edit `.env` and add your MySQL credentials

4. **Install dependencies**
   
   Backend:
   ```bash
   cd server
   npm install
   ```
   
   Frontend:
   ```bash
   cd client
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   Server runs on http://localhost:5000

2. **Start the frontend** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```
   Frontend runs on http://localhost:3000

## API Endpoints

- `GET /api` - Welcome message
- `GET /api/health` - Health check and database status
- `GET /api/data` - Fetch sample data from database

## Development

- Frontend uses Vite for fast development and hot module replacement
- Backend uses Node.js `--watch` flag for auto-restart on file changes
- All CSS is written from scratch without any frameworks

## License

MIT
