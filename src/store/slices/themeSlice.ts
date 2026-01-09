import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeState {
  mode: ThemeMode;
  effectiveTheme: 'light' | 'dark';
}

const initialState: ThemeState = {
  mode: (localStorage.getItem('theme') as ThemeMode) || 'system',
  effectiveTheme: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    setEffectiveTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.effectiveTheme = action.payload;
    },
  },
});

export const { setTheme, setEffectiveTheme } = themeSlice.actions;
export default themeSlice.reducer;
