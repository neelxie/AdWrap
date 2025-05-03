# AdWrap

This is a full-stack application for managing media items (such as static billboards and street poles) within workspaces. 

## Project Structure

```
adwrap/
│
├── backend/       # Node.js + Express + PostgreSQL backend
├── frontend/      # React + Vite + Redux Toolkit + Tailwind CSS frontend
```

---

## Backend

### Tech Stack

* Node.js
* Express
* PostgreSQL
* TypeScript

### Features

* Workspace management (create, update, delete, list)
* Media item management (static and street pole types)
* Media ID auto-increment scoped per workspace and media type (e.g., BB-1, SP-1)
* Search functionality for media items
* Input validation and structured types

### Getting Started

```bash
cd backend
npm install
npm run dev
```

Configure environment variables in `.env`:

```
DATABASE_URL=postgres://username:password@localhost:5432/yourdb
PORT=5000
```

---

## Frontend

### Tech Stack

* React
* Vite
* TypeScript
* Redux Toolkit
* Tailwind CSS
* ShadCN UI

### Features

* Multi-step form for workspace and media item setup
* Dashboard view of workspaces
* Search functionality for media items by face, location, etc.
* Pagination, filtering, and tabbed interface for media types

### Getting Started

```bash
cd frontend
npm install
npm run dev
```

Configure environment variables in `.env`:

```
VITE_API_BASE_URL=http://localhost:5000
```
