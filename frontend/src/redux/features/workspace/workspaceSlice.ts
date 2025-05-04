import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WorkspaceState {
  workspaces: Workspace[];
}

interface Workspace {
  name: string;
  email: string;
  location: string;
  address: string;
}

const initialState: WorkspaceState = {
  workspaces: [],
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspace(state, action: PayloadAction<Workspace[]>) {
      state.workspaces = action.payload;
    },
    clearWorkspace(state) {
      state.workspaces = [];
    },
  },
});

export const { setWorkspace, clearWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;
