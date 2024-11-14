import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import TabHeader from '@/components/navigation/TabHeader';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ header: TabHeader }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ focused }) => <TabBarIcon name={focused ? 'home' : 'home-outline'} color="#fff" />,
                    tabBarLabelStyle: { color: '#fff' },
                }}
            />
            <Tabs.Screen
                name="waterIntake"
                options={{
                    title: 'Water Intake',
                    tabBarIcon: ({ focused }) => <TabBarIcon name={focused ? 'water' : 'water-outline'} color="#fff" />,
                    tabBarLabelStyle: { color: '#fff' },
                }}
            />
            <Tabs.Screen
                name="urineOutput"
                options={{
                    title: 'Urine Output',
                    tabBarIcon: ({ focused }) => <TabBarIcon name={focused ? 'flask' : 'flask-outline'} color="#fff" />,
                    tabBarLabelStyle: { color: '#fff' },
                }}
            />
        </Tabs>
    );
}
