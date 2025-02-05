import DateInput from '@/components/DateInput';
import { Theme } from '@/constants/theme';
import { AppThemeContext } from '@/context/themeContext';
import { createUrineOutput } from '@/db/db';
import { router } from 'expo-router';
import { useContext, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function NewWaterIntake() {
    const [lossAmount, setLossAmount] = useState<string | undefined>();
    const [catheterizedAmount, setCatheterizedAmount] = useState<string | undefined>();
    const [timestamp, setTimestamp] = useState<Date>(new Date());
    const { theme } = useContext(AppThemeContext);
    const backgroundColor = Theme[theme].colors.primary5;
    const color = Theme[theme].colors.text;
    const invertedColor = Theme[theme].colors.invertedColor;

    const onCeateButtonPress = () => {
        createUrineOutput({
            catheterizedAmount: Number(catheterizedAmount ?? 0),
            lossAmount: Number(lossAmount ?? 0),
            timestamp: timestamp.toISOString(),
        });
        router.navigate('/urineOutput');
    };

    return (
        <View>
            <Text style={{ color }}>Catheterized Amount</Text>
            <TextInput
                style={[styles.input, { color, borderColor: backgroundColor }]}
                value={catheterizedAmount}
                inputMode="numeric"
                onChangeText={(text) => setCatheterizedAmount(text)}
            />

            <Text style={{ color }}>Loss Amount</Text>
            <TextInput
                style={[styles.input, { color, borderColor: backgroundColor }]}
                value={lossAmount}
                inputMode="numeric"
                onChangeText={(text) => setLossAmount(text)}
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
