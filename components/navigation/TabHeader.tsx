import { Theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { router } from 'expo-router';
import { StyleSheet, useColorScheme, Text, Appearance } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function TabHeader(props: BottomTabHeaderProps) {
    const colorScheme = Appearance.getColorScheme() || 'light';
    const color = Theme[colorScheme].colors.text;

    return (
        <SafeAreaView style={styles.wrapper}>
            <Text style={[styles.header, { color }]}>{props.options.title}</Text>

            {props.route.name === 'index' && (
                <Ionicons
                    style={styles.icon}
                    name="settings"
                    size={30}
                    color="#fff"
                    onPress={() => router.navigate('/settings')}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    header: {
        lineHeight: 30,
        fontWeight: 'bold',
        fontSize: 30,
    },
    icon: {},
});

export default TabHeader;
