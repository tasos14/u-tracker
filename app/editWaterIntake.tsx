import DateInput from '@/components/DateInput';
import { Theme } from '@/constants/theme';
import { AppThemeContext } from '@/context/themeContext';
import { deleteWaterIntake, getWaterIntakeById, updateWaterIntake } from '@/db/db';
import { router, useLocalSearchParams } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function EditWaterIntake() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [amount, setAmount] = useState<string | undefined>();
    const [timestamp, setTimestamp] = useState<Date | undefined>();
    const { theme } = useContext(AppThemeContext);
    const backgroundColor = Theme[theme].colors.primary5;
    const color = Theme[theme].colors.text;
    const notificationColor = Theme[theme].colors.notification;
    const invertedColor = Theme[theme].colors.invertedColor;

    useEffect(() => {
        if (id) {
            const waterIntake = getWaterIntakeById(id);
            if (waterIntake) {
                setAmount(waterIntake.amount.toString());
                setTimestamp(new Date(waterIntake.timestamp));
            }
        }
    }, [id]);

    const onSaveButtonPress = () => {
        if (id && amount && timestamp) {
            updateWaterIntake({
                id,
                amount: Number(amount),
                timestamp: timestamp.toISOString(),
            });
            router.navigate('/waterIntake');
        }
    };

    const onDeleteButtonPress = () => {
        if (id) {
            deleteWaterIntake(id);
            router.navigate('/waterIntake');
        }
    };

    return (
        <View>
            <Text style={{ color }}>Amount</Text>
            <TextInput
                style={[styles.input, { color, borderColor: backgroundColor }]}
                value={amount}
                inputMode="numeric"
                onChangeText={(text) => setAmount(text)}
            />
            <Text style={{ color }}>Timestamp</Text>
            <DateInput onChange={(date) => setTimestamp(date)} value={timestamp} />
            <Pressable onPress={onDeleteButtonPress} style={[styles.button, { backgroundColor: notificationColor }]}>
                <Text style={[styles.buttonText, { color: invertedColor }]}>Delete</Text>
            </Pressable>
            <Pressable onPress={onSaveButtonPress} style={[styles.button, { backgroundColor }]}>
                <Text style={[styles.buttonText, { color: invertedColor }]}>Save</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        marginTop: 10,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        marginTop: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
