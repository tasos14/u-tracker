import DateInput from '@/components/DateInput';
import { Theme } from '@/constants/theme';
import { deleteUrineOutput, getUrineOutputById, updateUrineOutput } from '@/db/db';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';

export default function EditUrineOutput() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [lossAmount, setLossAmount] = useState<string | undefined>();
    const [catheterizedAmount, setCatheterizedAmount] = useState<string | undefined>();
    const [timestamp, setTimestamp] = useState<Date | undefined>();
    const colorScheme = useColorScheme() || 'light';
    const backgroundColor = Theme[colorScheme].colors.primary5;
    const color = Theme[colorScheme].colors.text;
    const notificationColor = Theme[colorScheme].colors.notification;

    useEffect(() => {
        if (id) {
            const urineOutput = getUrineOutputById(id);
            if (urineOutput) {
                setLossAmount(urineOutput.urineLossAmount.toString());
                setCatheterizedAmount(urineOutput.catheterizedAmount.toString());
                setTimestamp(new Date(urineOutput.timestamp));
            }
        }
    }, [id]);

    const onSaveButtonPress = () => {
        if (id && lossAmount && catheterizedAmount && timestamp) {
            updateUrineOutput({
                id,
                urineLossAmount: Number(lossAmount),
                catheterizedAmount: Number(catheterizedAmount),
                timestamp: timestamp.toISOString(),
            });
            router.navigate('/urineOutput');
        }
    };

    const onDeleteButtonPress = () => {
        if (id) {
            deleteUrineOutput(id);
            router.navigate('/urineOutput');
        }
    };

    return (
        <View>
            <Text style={[styles.label, { color }]}>Catheterized Amount</Text>
            <TextInput
                style={[styles.input, { color, borderColor: backgroundColor }]}
                value={catheterizedAmount}
                inputMode="numeric"
                onChangeText={(text) => setCatheterizedAmount(text)}
            />

            <Text style={[styles.label, { color }]}>Loss Amount</Text>
            <TextInput
                style={[styles.input, { color, borderColor: backgroundColor }]}
                value={lossAmount}
                inputMode="numeric"
                onChangeText={(text) => setLossAmount(text)}
            />

            <Text style={[styles.label, { color }]}>Timestamp</Text>
            <DateInput onChange={(date) => setTimestamp(date)} value={timestamp} />

            <Pressable onPress={onDeleteButtonPress} style={[styles.button, { backgroundColor: notificationColor }]}>
                <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
            <Pressable onPress={onSaveButtonPress} style={[styles.button, { backgroundColor }]}>
                <Text style={styles.buttonText}>Save</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
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
        color: '#000',
    },
});
