import { ReactElement, useContext, useEffect, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Theme } from '@/constants/theme';
import { AppThemeContext } from '@/context/themeContext';

function DateInput({ value, onChange }: { value?: Date; onChange: (date: Date) => void }): ReactElement {
    const [date, setDate] = useState(value ? value : new Date());
    const [time, setTime] = useState(value ? value : new Date());
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [combinedDate, setCombinedDate] = useState<Date | undefined>();
    const { theme } = useContext(AppThemeContext);
    const color = Theme[theme].colors.text;
    const backgroundColor = Theme[theme].colors.primary5;

    useEffect(() => {
        if (value) {
            setDate(value);
            setTime(value);
            setCombinedDate(value);
        }
    }, [value]);

    useEffect(() => {
        if (combinedDate) {
            onChange(combinedDate);
        }
    }, [combinedDate, onChange]);

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
                    <Pressable onPress={() => setShowDate(true)}>
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
                    <Pressable onPress={() => setShowTime(true)}>
                        <TextInput
                            style={[styles.input, { color, borderColor: backgroundColor }]}
                            value={
                                time &&
                                time.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                })
                            }
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
