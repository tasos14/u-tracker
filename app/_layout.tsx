import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Theme } from '@/constants/theme';
import { useTheme } from '@/hooks/useTheme';
import { AppThemeContext } from '@/context/themeContext';

export default function RootLayout() {
    const { theme, themeMode, setThemeMode } = useTheme();

    return (
        <ThemeProvider value={theme === 'dark' ? Theme.dark : Theme.light}>
            <AppThemeContext.Provider value={{ theme, themeMode, setThemeMode }}>
                <StatusBar style="auto" />
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false, contentStyle: styles.wrapper }} />
                    <Stack.Screen
                        name="newWaterIntake"
                        options={{ title: 'New Water Intake', contentStyle: styles.wrapper }}
                    />
                    <Stack.Screen
                        name="editWaterIntake"
                        options={{ title: 'Edit Water Intake', contentStyle: styles.wrapper }}
                    />
                    <Stack.Screen
                        name="newUrineOutput"
                        options={{ title: 'New Urine Output', contentStyle: styles.wrapper }}
                    />
                    <Stack.Screen
                        name="editUrineOutput"
                        options={{ title: 'Edit Urine Output', contentStyle: styles.wrapper }}
                    />
                    <Stack.Screen name="settings" options={{ title: 'Settings', contentStyle: styles.wrapper }} />
                </Stack>
            </AppThemeContext.Provider>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        paddingLeft: 10,
        paddingRight: 10,
    },
});
