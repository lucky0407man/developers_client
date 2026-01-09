import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  _id: string;
  name: string;
  email: string;
  age: number;
}

export interface UserState {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Set all users
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.error = null;
    },
    // Set current user
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    // Add user to list
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      state.error = null;
    },
    // Update user in list
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex((u) => u._id === action.payload._id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
      if (state.currentUser?._id === action.payload._id) {
        state.currentUser = action.payload;
      }
      state.error = null;
    },
    // Delete user from list
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((u) => u._id !== action.payload);
      if (state.currentUser?._id === action.payload) {
        state.currentUser = null;
      }
      state.error = null;
    },
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setUsers,
  setCurrentUser,
  addUser,
  updateUser,
  deleteUser,
  setLoading,
  setError,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;
