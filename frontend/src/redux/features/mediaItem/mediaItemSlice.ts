import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface mediaItemState {
  mediaItems: mediaItem[];
}

interface mediaItem {
  format: any;
  number_of_street_poles: any;
  number_of_faces: ReactNode;
  code: ReactNode;
  closest_landmark: ReactNode;
  media_format: ReactNode;
  availability: ReactNode;
  rent: ReactNode;
  id: string;
  name: string;
  description: string;
  type: string;
  location: string;
  workspaceId: string;
}

const initialState: mediaItemState = {
  mediaItems: [],
};

const mediaItemSlice = createSlice({
  name: "mediaItem",
  initialState,
  reducers: {
    setMediaItem(state, action: PayloadAction<mediaItem[]>) {
      state.mediaItems = action.payload;
    },
    clearMediaItem(state) {
      state.mediaItems = [];
    },
  },
});

export const { setMediaItem, clearMediaItem } = mediaItemSlice.actions;
export default mediaItemSlice.reducer;
