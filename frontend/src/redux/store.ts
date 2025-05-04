import { configureStore } from '@reduxjs/toolkit';
import workspaceSlice from './features/workspace/workspaceSlice';
import mediaItemSlice from './features/mediaItem/mediaItemSlice';

export const store = configureStore({
  reducer: {
    workspace: workspaceSlice,
    mediaItem: mediaItemSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
