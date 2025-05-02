
CREATE TABLE IF NOT EXISTS workspaces (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  address TEXT,
  location TEXT
);

CREATE TABLE IF NOT EXISTS media_items (
  id SERIAL PRIMARY KEY,
  workspace_id INTEGER NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('static', 'streetpole')),
  code TEXT NOT NULL,
  format TEXT,
  location TEXT,
  closest_landmark TEXT,
  availability TEXT,
  number_of_faces INTEGER,
  number_of_street_poles INTEGER,
  side_route TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS static_media_faces (
  id SERIAL PRIMARY KEY,
  media_item_id INTEGER REFERENCES media_items(id) ON DELETE CASCADE,
  description TEXT,
  availability TEXT,
  images TEXT[],
  rent INTEGER
);

CREATE TABLE IF NOT EXISTS routes (
  id SERIAL PRIMARY KEY,
  media_item_id INTEGER REFERENCES media_items(id) ON DELETE CASCADE,
  side_route TEXT,
  description TEXT,
  number_of_street_poles INTEGER,
  price_per_street_pole INTEGER,
  images TEXT[]
);

CREATE TABLE IF NOT EXISTS media_item_counters (
  workspace_id INTEGER PRIMARY KEY REFERENCES workspaces(id) ON DELETE CASCADE,
  static_counter INTEGER DEFAULT 0,
  streetpole_counter INTEGER DEFAULT 0
);
