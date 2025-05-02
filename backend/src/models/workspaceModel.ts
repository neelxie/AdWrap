import { db } from '../db';
import { Workspace } from '../types/workspace';

export const getAllWorkspaces = async (): Promise<Workspace[]> => {
  const result = await db.query('SELECT * FROM workspaces ORDER BY id');
  return result.rows;
};

export const getWorkspaceById = async (id: number): Promise<Workspace | null> => {
  const result = await db.query('SELECT * FROM workspaces WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const createWorkspace = async (workspace: Omit<Workspace, 'id'>): Promise<Workspace> => {
  const { name, email, address, location } = workspace;
  const result = await db.query(
    'INSERT INTO workspaces (name, email, address, location) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, address, location]
  );
  return result.rows[0];
};

export const deleteWorkspace = async (id: number): Promise<void> => {
  await db.query('DELETE FROM workspaces WHERE id = $1', [id]);
};
