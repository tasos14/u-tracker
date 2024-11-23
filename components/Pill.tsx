import { Pressable, StyleSheet, Text } from 'react-native';
import { Theme } from '@/constants/theme';
import { AppThemeContext } from '@/context/themeContext';
import { useContext } from 'react';

function Pill({ label, isActive, onPress }: { label: string; isActive: boolean; onPress: () => void }) {
    const { theme } = useContext(AppThemeContext);
    const backgroundColor = isActive ? Theme[theme].colors.primary5 : Theme[theme].colors.surface2;
    const color = isActive ? Theme[theme].colors.invertedColor : Theme[theme].colors.text;

    return (
        <Pressable onPress={onPress} style={[styles.pill, { backgroundColor }]}>
            <Text style={[styles.pillText, { color }]}>{label}</Text>
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
});

export default Pill;
