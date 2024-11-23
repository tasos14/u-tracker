import { Theme } from '@/constants/theme';
import { AppThemeContext } from '@/context/themeContext';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

function ListItem({ title, timestamp, onPress }: { title: string | number; timestamp: string; onPress?: () => void }) {
    const { theme } = useContext(AppThemeContext);
    const backgroundColor = Theme[theme].colors.surface1;
    const color = Theme[theme].colors.text;

    return (
        <Pressable onPress={onPress}>
            <View style={[styles.card, { backgroundColor }]}>
                <Text style={[styles.title, { color }]}>{title} ml</Text>
                <View style={styles.timestampWrapper}>
                    <Ionicons name="calendar" size={12} color={Theme[theme].colors.primary4} />
                    <Text style={[styles.timestamp, { color }]}>
                        {format(new Date(timestamp), 'dd MMM yyyy HH:mm')}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    timestampWrapper: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    timestamp: {
        fontSize: 12,
        lineHeight: 24,
    },
});

export default ListItem;
