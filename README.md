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

- Node.js
- Express
- PostgreSQL
- TypeScript

### Features

- Workspace management (create, update, delete, list)
- Media item management (static and street pole types)
- Media ID auto-increment scoped per workspace and media type (e.g., BB-1, SP-1)
- Search functionality for media items
- Input validation and structured types

### Getting Started

Go to the backend readme for instructions

```

```

Configure environment variables in `.env`:

```
DATABASE_URL=postgres://username:password@localhost:5432/yourdb
PORT=5000
```

---

## Frontend

### Tech Stack

- React
- Vite
- TypeScript
- Redux Toolkit
- Tailwind CSS
- ShadCN UI

### Features

- Multi-step form for workspace and media item setup
- Dashboard view of workspaces
- Search functionality for media items by face, location, etc.
- Pagination, filtering, and tabbed interface for media types

### Getting Started

```bash
cd frontend
npm install
npm run dev
```

Configure environment variables in `.env`:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

Sample of how the app looks like:

![Add workspace bottom](./mock-data/AddpageBottom.png)
![Add workspace bottom](./mock-data/Addpagebottom1.png)
![Add static media](./mock-data/AddStaticmedia.png)
![Add streetpole](./mock-data/Addstreetpole.png)
![Add workspace ](./mock-data/createworkspace.png)
![Media Items unclicked](./mock-data/mediaUnclicked.png)
![Media Items clicked](./mock-data/mediaItemsclicked.png)
![workspace search](./mock-data/searchfunctionality.png)
![Static Media clicked](./mock-data/staicmediaClicked.png)
![Static workspace](./mock-data/staticworkspace.png)
![workspaces](./mock-data/workspaces.png)
![workspace](./mock-data/workspaceview.png)
![workspace update/delete](./mock-data/updatedeletefunction.png)
