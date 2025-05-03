import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WorkspaceState {
  name: string;
  email: string;
  location: string;
  address: string;
}

const initialState: WorkspaceState = {
  name: '',
  email: '',
  location: '',
  address: '',
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setWorkspace(state, action: PayloadAction<WorkspaceState>) {
      return action.payload;
    },
    clearWorkspace() {
      return initialState;
    },
  },
});

export const { setWorkspace, clearWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;
