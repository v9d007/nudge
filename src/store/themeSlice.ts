import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeMode } from '../types';

interface ThemeState {
  mode: ThemeMode;
  effectiveTheme: 'light' | 'dark';
}

const initialState: ThemeState = {
  mode: 'dark',
  effectiveTheme: 'dark',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      if (action.payload === 'system') {
        state.effectiveTheme = 'dark';
      } else {
        state.effectiveTheme = action.payload;
      }
    },
    toggleTheme: (state) => {
      const nextTheme = state.effectiveTheme === 'dark' ? 'light' : 'dark';
      state.mode = nextTheme;
      state.effectiveTheme = nextTheme;
    },
  },
});

export const { setThemeMode, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
