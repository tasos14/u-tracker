import DateInput from '@/components/DateInput';
import { Theme } from '@/constants/theme';
import { AppThemeContext } from '@/context/themeContext';
import { createWaterIntake } from '@/db/db';
import { router } from 'expo-router';
import { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function NewWaterIntake() {
    const [amount, setAmount] = useState<string | undefined>();
    const [timestamp, setTimestamp] = useState<Date>(new Date());
    const { theme } = useContext(AppThemeContext);
    const backgroundColor = Theme[theme].colors.primary5;
    const color = Theme[theme].colors.text;
    const invertedColor = Theme[theme].colors.invertedColor;

    const onCeateButtonPress = () => {
        createWaterIntake({ amount: Number(amount), timestamp: timestamp.toISOString() });
        router.navigate('/waterIntake');
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
            <DateInput onChange={(date) => setTimestamp(date)} />

            <Pressable onPress={onCeateButtonPress} style={[styles.button, { backgroundColor }]}>
                <Text style={[styles.buttonText, { color: invertedColor }]}>Create</Text>
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
    inputWrapper: {
        flex: 1,
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
