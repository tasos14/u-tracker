import { ReactElement, useEffect, useState } from 'react';
import { Pressable, StyleSheet, TextInput, useColorScheme, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Theme } from '@/constants/theme';

function DateInput({ onChange }: { onChange: (date: Date) => void }): ReactElement {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [combinedDate, setCombinedDate] = useState(new Date());
    const colorScheme = useColorScheme() || 'light';
    const color = Theme[colorScheme].colors.text;
    const backgroundColor = Theme[colorScheme].colors.primary5;

    useEffect(() => {
        onChange(combinedDate);
    }, [combinedDate, onChange]);

    const toggleDatePicker = () => {
        setShowDate(true);
    };

    const toggleTimePicker = () => {
        setShowTime(true);
    };

    const onDateChange = ({ type }: { type: string }, selectedDate: Date | undefined) => {
        if (type === 'set' && selectedDate) {
            setDate(selectedDate);
            const combinedDateTime = new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate(),
                time.getHours(),
                time.getMinutes()
            );
            setCombinedDate(combinedDateTime);
        }
        setShowDate(false);
    };

    const onTimeChange = ({ type }: { type: string }, selectedTime: Date | undefined) => {
        if (type === 'set' && selectedTime) {
            setTime(selectedTime);
            const combinedDateTime = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                selectedTime.getHours(),
                selectedTime.getMinutes()
            );
            setCombinedDate(combinedDateTime);
        }
        setShowTime(false);
    };

    return (
        <View style={styles.dateWrapper}>
            {!showDate && !showTime && (
                <View style={styles.inputWrapper}>
                    <Pressable onPress={toggleDatePicker}>
                        <TextInput
                            style={[styles.input, { color, borderColor: backgroundColor }]}
                            value={date.toDateString()}
                            editable={false}
                        />
                    </Pressable>
                </View>
            )}

            {!showDate && !showTime && (
                <View style={styles.inputWrapper}>
                    <Pressable onPress={toggleTimePicker}>
                        <TextInput
                            style={[styles.input, { color, borderColor: backgroundColor }]}
                            value={time.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                            })}
                            editable={false}
                        />
                    </Pressable>
                </View>
            )}

            {showDate && <DateTimePicker mode="date" value={date} onChange={onDateChange} />}
            {showTime && <DateTimePicker mode="time" value={time} onChange={onTimeChange} />}
        </View>
    );
}

const styles = StyleSheet.create({
    dateWrapper: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    inputWrapper: {
        flex: 1,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        marginTop: 10,
    },
});
export default DateInput;
