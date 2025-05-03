// 
import { Request, Response, RequestHandler } from 'express';
import {
  insertStaticMediaItem,
  insertStreetPoleMediaItem,
  fetchAllMediaItems,
  fetchMediaItemById,
  updateMediaItemById,
  deleteMediaItemById,
  searchMediaItems,
} from '../models/mediaItem';

interface Params {
  id: string;
}

interface QueryParams {
  page?: string;
  limit?: string;
  q?: string;
  all?: string;
}

export const createStaticMedia: RequestHandler = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await insertStaticMediaItem(data);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createStreetPoleMedia: RequestHandler = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await insertStreetPoleMediaItem(data);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllMediaItems: RequestHandler = async (req: Request<{}, {}, {}, QueryParams>, res: Response) => {
  try {
    const { page, limit, all } = req.query;

    if (all === 'true' || (!page && !limit)) {
      const mediaItems = await fetchAllMediaItems();
      res.status(200).json({
        data: mediaItems.items,
        pagination: null
      });
    } else {
      // set defaults
      const pageNum = parseInt(page || '1', 10);
      const pageSize = parseInt(limit || '10', 10);

      if (pageNum < 1 || pageSize < 1) {
        res.status(400).json({ error: 'Invalid pagination parameters' });
        return;
      }

      const offset = (pageNum - 1) * pageSize;
      const { items, total } = await fetchAllMediaItems(pageSize, offset);

      // pages
      const totalPages = Math.ceil(total / pageSize);

      res.status(200).json({
        data: items,
        pagination: {
          currentPage: pageNum,
          pageSize,
          totalItems: total,
          totalPages,
          hasNext: pageNum < totalPages,
          hasPrevious: pageNum > 1
        }
      });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getMediaItemById: RequestHandler<Params> = async (req: Request<Params>, res: Response) => {
  const { id } = req.params;
  try {
    const data = await fetchMediaItemById(Number(id));
    if (!data) {
      res.status(404).json({ success: false, error: 'Media item not found' });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch media item', details: err });
  }
};

export const updateMediaItem: RequestHandler<Params> = async (req: Request<Params>, res: Response) => {
  const { id } = req.params;
  try {
    const updated = await updateMediaItemById(Number(id), req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to update media item', details: err });
  }
};

export const deleteMediaItem: RequestHandler<Params> = async (req: Request<Params>, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await deleteMediaItemById(Number(id));
    if (!result.success) {
      res.status(404).json({ success: false, error: result.message });
    } else {
      res.status(200).json({ success: true, message: 'Media item deleted' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to delete media item', details: err });
  }
};

export const searchMedia: RequestHandler = async (req: Request, res: Response) => {
  const { q } = req.query;
  try {
    const results = await searchMediaItems(q as string);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ success: false, error: 'Search failed', details: err });
  }
};