# MINI Notes

A full-stack Notes application built with React, Node.js/Express, and MongoDB.

## Features

- Create notes with title and description
- View all notes in a responsive card grid
- Edit existing notes
- Delete notes with loading feedback
- Search notes by title prefix (server-side)
- Loading indicators for all async operations
- Toast notifications for all actions
- Beautiful landing page

## Project Structure

```
mini-notes/
├── backend/
│   ├── models/Note.js
│   ├── routes/notes.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── public/index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx / .css
    │   │   ├── NoteCard.jsx / .css
    │   │   ├── LoadingBar.jsx / .css
    │   │   └── Toast.jsx / .css
    │   ├── pages/
    │   │   ├── LandingPage.jsx / .css
    │   │   ├── NotesPage.jsx / .css
    │   │   ├── CreatePage.jsx / .css
    │   │   └── SearchPage.jsx / .css
    │   ├── hooks/useNotes.js
    │   ├── utils/api.js
    │   ├── App.jsx
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## Setup Instructions

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and set your MongoDB URI:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/mini-notes
```

Start the backend:
```bash
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

The frontend runs on `http://localhost:3000` and proxies API calls to `http://localhost:5000`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/notes | Get all notes (supports ?search=query) |
| GET | /api/notes/:id | Get a single note |
| POST | /api/notes | Create a new note |
| PUT | /api/notes/:id | Update a note |
| DELETE | /api/notes/:id | Delete a note |
| GET | /api/health | Health check |

## Tech Stack

- **Frontend**: React 18, Axios, DM Sans + Playfair Display fonts
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
