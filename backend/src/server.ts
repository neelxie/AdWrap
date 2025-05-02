import express, { Request, Response } from 'express';
import cors from 'cors';
import mediaRoutes from './routes/media';
import workspaceRoutes from './routes/workspaceRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/media', mediaRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('AdWrap API by Derrick is running.');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
