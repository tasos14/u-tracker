/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const Theme = {
    light: {
        dark: false,
        colors: {
            ...DefaultTheme.colors,
            primary: '#e0e0e0',
            primary4: '#9092a9',
            primary5: '#3f4469',
            background: '#e6e8ff',
            card: '#e6e8ff',
            surface1: '#d9dcf2',
            surface2: '#9ca1c9',
            invertedColor: '#fff',
            notification: '#ff4e25',
            text: '#3f4469',
        },
        fonts: DefaultTheme.fonts,
    },
    dark: {
        dark: true,
        colors: {
            ...DarkTheme.colors,
            primary: '#3f4469',
            primary4: '#9092a9',
            primary5: '#a6a7ba',
            background: '#20202a',
            card: '#20202a',
            surface1: '#35353e',
            surface2: '#4b4b54',
            invertedColor: '#000',
            notification: '#ff4e25',
            text: '#bbbbbb',
        },
        fonts: DarkTheme.fonts,
    },
};
