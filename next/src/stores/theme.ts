'use client';

import { create } from 'zustand';
import { LS_KEY } from '~/constants/key';

type Mode = 'light' | 'dark';
type ThemeModeStore = {
	mode: Mode;
	setTheme: (mode: Mode) => void;
	toggleTheme: () => void;
};

export const useThemeMode = create<ThemeModeStore>((set, get) => ({
	mode:
		typeof localStorage !== 'undefined'
			? localStorage.getItem(LS_KEY.THEME) === 'light'
				? 'light'
				: 'dark'
			: 'dark',
	setTheme: mode => {
		set({ mode });
		localStorage.setItem(LS_KEY.THEME, mode);
		document.documentElement.setAttribute('data-theme', mode);
	},

	toggleTheme: () => {
		get().setTheme(get().mode === 'light' ? 'dark' : 'light');
	},
}));
