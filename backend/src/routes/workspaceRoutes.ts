import express, { Request, Response } from "express";
import {
  listWorkspaces,
  getWorkspace,
  addWorkspace,
  removeWorkspace,
  searchWorkspaces,
} from "../controllers/workspaceController";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const workspaces = await listWorkspaces();
    res.json(workspaces);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/search", async (req: Request, res: Response) => {
  try {
    const workspaces = await searchWorkspaces(req);
    res.json(workspaces);
  } catch (err: any) {
    console.error(err);
    if (err.message === "Search query is required and must be a string") {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const workspace = await getWorkspace(req);
    res.json(workspace);
  } catch (err: any) {
    console.error(err);
    if (err.message === "Workspace not found") {
      res.status(404).json({ message: "Workspace not found" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const workspace = await addWorkspace(req);
    res.status(201).json(workspace);
  } catch (err: any) {
    console.error(err);
    if (err.code === "23505") {
      res.status(409).json({ message: "Duplicate workspace ID detected" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const workspace = await removeWorkspace(req);
    res.json({ message: "Workspace deleted", workspace });
  } catch (err: any) {
    console.error(err);
    if (err.message === "Workspace not found") {
      res.status(404).json({ message: "Workspace not found" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
});

export default router;
