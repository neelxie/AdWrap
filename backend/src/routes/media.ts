import express from 'express';
import {
  createStaticMedia,
  createStreetPoleMedia,
  getAllMediaItems,
  getMediaItemById,
  updateMediaItem,
  deleteMediaItem,
  searchMedia,
} from '../controllers/mediaController';

const mediaRoutes = express.Router();

mediaRoutes.post('/static', createStaticMedia);
mediaRoutes.post('/streetpole', createStreetPoleMedia);

mediaRoutes.get('/', getAllMediaItems);
mediaRoutes.get('/search', searchMedia);
mediaRoutes.get('/:id', getMediaItemById);

mediaRoutes.put('/:id', updateMediaItem);

mediaRoutes.delete('/:id', deleteMediaItem);

export default mediaRoutes;
