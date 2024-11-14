import { Theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';

function ListItem({ title, timestamp, onPress }: { title: string | number; timestamp: string; onPress?: () => void }) {
    const colorScheme = useColorScheme() || 'light';
    const backgroundColor = Theme[colorScheme].colors.surface1;
    const color = Theme[colorScheme].colors.text;

    return (
        <Pressable onPress={onPress}>
            <View style={[styles.card, { backgroundColor }]}>
                <Text style={[styles.title, { color }]}>{title} ml</Text>
                <View style={styles.timestampWrapper}>
                    <Ionicons name="calendar" size={12} color={Theme[colorScheme].colors.primary4} />
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
        marginBottom: 10,
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
