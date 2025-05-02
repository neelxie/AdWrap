import { Request, Response } from "express";
import {
  getAllWorkspaces,
  getWorkspaceById,
  createWorkspace,
  deleteWorkspace,
} from "../models/workspaceModel";
import { db } from "../db";
import { Workspace } from "types/workspace";

export const listWorkspaces = async (): Promise<Workspace[]> => {
  try {
    const result = await db.query('SELECT * FROM workspaces');
    return result.rows as Workspace[];
  } catch (err) {
    console.error(err);
    throw new Error('Failed to fetch workspaces');
  }
};

export const getWorkspace = async (req: Request): Promise<Workspace> => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM workspaces WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      throw new Error('Workspace not found');
    }

    return result.rows[0] as Workspace;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addWorkspace = async (req: Request): Promise<Workspace> => {
  try {
    const { name, email, address, location } = req.body;
    const result = await db.query(
      'INSERT INTO workspaces (name, email, address, location) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, address, location]
    );
    return result.rows[0] as Workspace;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to create workspace');
  }
};

export const removeWorkspace = async (req: Request): Promise<Workspace> => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM workspaces WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      throw new Error('Workspace not found');
    }

    return result.rows[0] as Workspace;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const searchWorkspaces = async (req: Request): Promise<Workspace[]> => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== 'string') {
      throw new Error('Search query is required and must be a string');
    }

    const searchTerm = `%${q}%`;
    const result = await db.query(
      'SELECT * FROM workspaces WHERE location ILIKE $1',
      [searchTerm]
    );

    return result.rows as Workspace[];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
