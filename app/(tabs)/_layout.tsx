import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import TabHeader from '@/components/navigation/TabHeader';
import { Theme } from '@/constants/theme';
import { AppThemeContext } from '@/context/themeContext';
import { Tabs } from 'expo-router';
import { useContext } from 'react';

export default function TabLayout() {
    const { theme } = useContext(AppThemeContext);
    const color = Theme[theme].colors.text;

    return (
        <Tabs
            screenOptions={{
                header: (props) => <TabHeader {...props} theme={theme} />,
                tabBarStyle: { elevation: 0, borderTopWidth: 0 },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ focused }) => <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />,
                    tabBarLabelStyle: { color },
                }}
            />
            <Tabs.Screen
                name="waterIntake"
                options={{
                    title: 'Water Intake',
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon name={focused ? 'water' : 'water-outline'} color={color} />
                    ),
                    tabBarLabelStyle: { color },
                }}
            />
            <Tabs.Screen
                name="urineOutput"
                options={{
                    title: 'Urine Output',
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon name={focused ? 'flask' : 'flask-outline'} color={color} />
                    ),
                    tabBarLabelStyle: { color },
                }}
            />
        </Tabs>
    );
}
