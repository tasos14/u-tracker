import React, { useContext, useEffect, useRef, useState } from 'react';
import { eachDayOfInterval, endOfMonth, format, getDate, startOfMonth } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Theme } from '@/constants/theme';
import { AppThemeContext } from '@/context/themeContext';

const getDaysOfCurrentMonth = (date: Date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return eachDayOfInterval({ start, end });
};

function MonthlyCalendar({ date, onChange }: { date: Date; onChange: (date: Date) => void }) {
    const [showDate, setShowDate] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const days = getDaysOfCurrentMonth(date);
    const [scrollViewWidth, setScrollViewWidth] = useState(0);
    const { theme } = useContext(AppThemeContext);

    const color = Theme[theme].colors.text;

    useEffect(() => {
        const selectedIndex = days.findIndex((day) => day.getDate() === getDate(date));
        if (scrollViewRef.current && selectedIndex !== -1) {
            const itemWidth = 60;
            const scrollPosition = selectedIndex * itemWidth - scrollViewWidth / 2 + itemWidth / 2;
            scrollViewRef.current.scrollTo({ x: scrollPosition, animated: false });
        }
    }, [days, date, scrollViewWidth]);

    const onDateChange = ({ type }: any, selectedDate: Date | undefined) => {
        if (type === 'set' && selectedDate) {
            onChange(selectedDate);
        }
        setShowDate(false);
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={() => setShowDate(true)}>
                <Text style={[styles.dateText, { color }]}>{format(date, 'MMM, yyyy')}</Text>
            </Pressable>
            {showDate && <DateTimePicker mode="date" value={date} onChange={onDateChange} />}
            <ScrollView
                style={{ position: 'relative' }}
                horizontal
                showsHorizontalScrollIndicator={false}
                ref={scrollViewRef}
                onLayout={(event) => setScrollViewWidth(event.nativeEvent.layout.width)}
            >
                {days.map((day) => {
                    const isSelected = day.getDate() === getDate(date);
                    return (
                        <TouchableOpacity onPress={() => onChange(day)} key={day.getDate()} style={[styles.day]}>
                            <Text style={[styles.dayText, { color }, isSelected ? styles.selectedDayText : {}]}>
                                {day.getDate()}
                            </Text>
                            <Text style={[styles.weekdayText, { color }, isSelected ? styles.selectedWeekDayText : {}]}>
                                {day.toDateString().split(' ')[0]}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingBottom: 10,
    },
    dateText: {
        fontSize: 16,
        marginTop: 8,
    },
    day: {
        width: 44,
        marginHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedDayText: {
        fontSize: 26,
        opacity: 1,
        fontWeight: 'bold',
    },
    dayText: {
        fontSize: 24,
        fontWeight: 400,
        opacity: 0.5,
    },
    selectedWeekDayText: {
        opacity: 1,
        fontWeight: 'bold',
    },
    weekdayText: {
        fontSize: 18,
        opacity: 0.5,
    },
});

export default MonthlyCalendar;
