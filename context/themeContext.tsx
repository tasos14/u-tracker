import { createContext } from 'react';

export type ThemeContextType = {
    themeMode: string;
    theme: 'light' | 'dark';
    setThemeMode: (newTheme: string) => void;
};

export const AppThemeContext = createContext<ThemeContextType>({
    themeMode: 'auto',
    theme: 'light',
    setThemeMode: () => {},
});
