import { Appearance, ColorSchemeName, useColorScheme } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

export enum IAppThemeMode {
    auto = 'auto',
    light = 'light',
    dark = 'dark',
}

SplashScreen.preventAutoHideAsync();

export function useTheme(): { themeMode: string; theme: 'light' | 'dark'; setThemeMode: (newTheme: string) => void } {
    const [themeMode, setThemeMode] = useState<IAppThemeMode>(IAppThemeMode.auto);
    const SystemTheme = useColorScheme() ?? 'light';
    const [theme, setTheme] = useState<'light' | 'dark'>(SystemTheme);

    if (themeMode === IAppThemeMode.auto) {
        Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme ?? 'light');
        });
    }

    useEffect(() => {
        const loadTheme = async () => {
            const storedTheme = await AsyncStorage.getItem('theme');
            if (storedTheme) {
                setThemeMode(storedTheme as IAppThemeMode);
                setTheme(storedTheme === 'auto' ? SystemTheme : (storedTheme as 'light' | 'dark'));
                Appearance.setColorScheme(storedTheme === 'auto' ? null : (storedTheme as 'light' | 'dark'));
            }
            setTimeout(() => {
                SplashScreen.hideAsync();
            }, 1000);
        };
        loadTheme();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateTheme = async (newTheme: string) => {
        setThemeMode(newTheme as IAppThemeMode);

        setTheme(newTheme === 'auto' ? SystemTheme : (newTheme as 'light' | 'dark'));
        Appearance.setColorScheme(newTheme === 'auto' ? null : (newTheme as ColorSchemeName));
        await AsyncStorage.setItem('theme', newTheme);
    };

    return {
        themeMode,
        theme,
        // theme: themeMode === 'auto' ? SystemTheme : themeMode,
        setThemeMode: updateTheme,
    };
}
