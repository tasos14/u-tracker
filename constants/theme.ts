/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Theme = {
    light: {
        light: true,
        colors: {
            ...DefaultTheme.colors,
            primary: '#e0e0e0',
            primary4: '#9092a9',
            primary5: '#a4a4a4',
            background: '#f8f8f8',
            card: '#f8f8f8',
            surface1: '#e8e8e8',
            surface2: '#d8d8d8',
            invertedColor: '#fff',
        },
        fonts: DefaultTheme.fonts,
        tabIconSelected: tintColorLight,
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
        },
        fonts: DarkTheme.fonts,
        text: '#ECEDEE',
        background: '#20202a',
        tint: tintColorDark,
        icon: '#9BA1A6',
        tabIconDefault: '#9BA1A6',
        tabIconSelected: tintColorDark,
    },
};

// body {
//     /** Dark theme primary colors */
//     --color-primary-a0: #3f4469;
//     --color-primary-a10: #535679;
//     --color-primary-a20: #676a89;
//     --color-primary-a30: #7b7d99;
//     --color-primary-a40: #9092a9;
//     --color-primary-a50: #a6a7ba;

//     /** Dark theme surface colors */
//     --color-surface-a0: #121212;
//     --color-surface-a10: #282828;
//     --color-surface-a20: #3f3f3f;
//     --color-surface-a30: #575757;
//     --color-surface-a40: #717171;
//     --color-surface-a50: #8b8b8b;

//     /** Dark theme mixed surface colors */
//     --color-surface-mixed-a0: #20202a;
//     --color-surface-mixed-a10: #35353e;
//     --color-surface-mixed-a20: #4b4b54;
//     --color-surface-mixed-a30: #62626a;
//     --color-surface-mixed-a40: #7a7a81;
//     --color-surface-mixed-a50: #939399;
// }

// body {
//     /** Light theme primary colors */
//     --color-primary-a0: #e0e0e0;
//     --color-primary-a10: #d4d4d4;
//     --color-primary-a20: #c8c8c8;
//     --color-primary-a30: #bcbcbc;
//     --color-primary-a40: #b0b0b0;
//     --color-primary-a50: #a4a4a4;

//     /** Light theme surface colors */
//     --color-surface-a0: #ffffff;
//     --color-surface-a10: #f0f0f0;
//     --color-surface-a20: #e0e0e0;
//     --color-surface-a30: #d0d0d0;
//     --color-surface-a40: #c0c0c0;
//     --color-surface-a50: #b0b0b0;

//     /** Light theme mixed surface colors */
//     --color-surface-mixed-a0: #f8f8f8;
//     --color-surface-mixed-a10: #e8e8e8;
//     --color-surface-mixed-a20: #d8d8d8;
//     --color-surface-mixed-a30: #c8c8c8;
//     --color-surface-mixed-a40: #b8b8b8;
//     --color-surface-mixed-a50: #a8a8a8;
// }
