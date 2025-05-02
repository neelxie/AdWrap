This project provides a RESTful API for managing media items (Static Billboards and Street Poles), each scoped under independent workspaces. It supports creation, retrieval, update, deletion, and searching of media items.

## Project Structure

src/
├── controllers/
│   └── mediaItemsController.ts
├── db/
│   └── index.ts
├── models/
│   └── mediaItemsModel.ts
├── routes/
│   └── mediaItemsRoutes.ts
├── scripts/
│   └── seed.ts
├── types/
│   ├── staticmedia.ts
│   ├── streetpole.ts
│   ├── types.ts
│   └── workspace.ts
└── server.ts

## Technologies
Node.js + Express 

PostgreSQL

TypeScript

## Setup Instructions
Clone the repo

git clone <your-repo-url>
cd <project-folder>
Install dependencies

npm install
Configure environment variables

Create a .env file in the root and add:

DATABASE_URL=postgres://<username>:<password>@localhost:5432/<database_name>
PORT=5000

Create tables and seed the database

sh scripts/setup.sh
npm run seed
The setup.sh file automatically creates tables before seeding the database with workspaces and media items.

Run the server

npm run dev
Server will run at: http://localhost:3001

## Features

Full CRUD operations

Search functionality by location/availability


### API Endpoints
## Create Static Media

POST /api/media/static

## Create Street Pole Media
POST /api/media/streetpole

## Get All Media Items
GET /api/media/
Optional query parameters:

page – Page number (e.g. 1)

limit – Items per page (e.g. 10)

Example:

GET /api/media?page=1&limit=5
## Search Media Items
GET /api/media/search?q=<term>
Searches by location or availability.

Example:

GET /api/media/search?q=Wuse
## Get Media Item by ID
GET /api/media/:id
Example:

GET /api/media/2
## Update Media Item
PUT /api/media/:id
Payload depends on whether it’s a static or streetpole media item.

## Delete Media Item
DELETE /api/media/:id

## Workspace-Scoped Counters
Each workspace tracks its own counters for:

Static Media IDs

Street Pole Media IDs

This ensures each workspace has unique reference IDs starting from 1, like:

Workspace 1: BB-1, SP-1, BB-2

Workspace 2: BB-1, SP-1

## Testing Tools
You can test the API with:

Postman

## Author
Derrick

