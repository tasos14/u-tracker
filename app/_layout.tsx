import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Theme } from '@/constants/theme';

export default function RootLayout() {
    return (
        <ThemeProvider value={Theme.dark}>
            <StatusBar style="auto" />
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false, contentStyle: styles.wrapper }} />
                <Stack.Screen
                    name="newWaterIntake"
                    options={{ title: 'New Water Intake', contentStyle: styles.wrapper }}
                />
                <Stack.Screen
                    name="newUrineOutput"
                    options={{ title: 'New Urine Output', contentStyle: styles.wrapper }}
                />
                <Stack.Screen name="settings" options={{ title: 'Settings', contentStyle: styles.wrapper }} />
            </Stack>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        paddingLeft: 10,
        paddingRight: 10,
    },
});
