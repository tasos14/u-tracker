import { Pressable, StyleSheet, Text, useColorScheme } from 'react-native';
import { Theme } from '@/constants/theme';

function Pill({ label, isActive, onPress }: { label: string; isActive: boolean; onPress: () => void }) {
    const colorScheme = useColorScheme() || 'light';
    const backgroundColor = isActive ? '#fff' : Theme[colorScheme].colors.surface2;

    return (
        <Pressable onPress={onPress} style={[styles.pill, { backgroundColor }]}>
            <Text style={[styles.pillText, isActive && styles.activePillText]}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pill: {
        padding: 10,
        borderRadius: 20,
        marginRight: 10,
    },
    pillText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
    },
    activePillText: {
        color: '#000',
    },
});

export default Pill;
