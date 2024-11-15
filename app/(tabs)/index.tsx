import ChartHeader from '@/components/ChartHeader';
import { Theme } from '@/constants/theme';
import { getChartData, getDailySummary } from '@/db/db';
import { Ionicons } from '@expo/vector-icons';
import { addDays, format, subDays } from 'date-fns';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Index() {
    const [dailySummary, setDailySummary] = useState({ waterIntake: 0, urineLoss: 0, catheterized: 0 });
    const [chartData, setChartData] = useState<{ value: number; label: string; frontColor: string }[]>([]);
    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const colorScheme = useColorScheme() || 'light';

    const color = Theme[colorScheme].colors.text;
    const backgroundColor = Theme[colorScheme].colors.surface1;

    const getData = useCallback((date: Date) => {
        const summary = getDailySummary(date);
        setDailySummary(summary);
        const chartData = getChartData(date);
        setChartData(chartData);
    }, []);
    useFocusEffect(
        useCallback(() => {
            getData(date);
        }, [date, getData])
    );

    useEffect(() => {
        getData(date);
    }, [date, getData]);

    const handlePreviousDay = () => {
        setDate((prevDate) => subDays(prevDate, 1));
    };

    const handleNextDay = () => {
        setDate((prevDate) => addDays(prevDate, 1));
    };

    const onDateChange = (event: any, selectedDate: Date | undefined) => {
        if (event === 'set' && selectedDate) {
            setDate(selectedDate);
        }
        setShowDate(false);
    };

    return (
        <View>
            <View style={styles.dateWrapper}>
                <Pressable onPress={handlePreviousDay}>
                    <Ionicons name="arrow-back" size={24} color={color} />
                </Pressable>

                <Pressable onPress={() => setShowDate(true)}>
                    <Text style={[styles.dateText, { color }]}>{format(date, 'iii dd MMM')}</Text>
                </Pressable>
                {showDate && <DateTimePicker mode="date" value={date} onChange={onDateChange} />}

                <Pressable onPress={handleNextDay}>
                    <Ionicons name="arrow-forward" size={24} color={color} />
                </Pressable>
            </View>

            <Text style={[styles.sectionTitle, { color }]}>Daily Summary</Text>
            <View style={[styles.totalCard, { backgroundColor }]}>
                <Text style={[styles.totalValue, { color }]}>{dailySummary.waterIntake} ml</Text>
                <Text style={[styles.totalTitle, { color }]}>Daily Water Intake</Text>
            </View>
            <View style={[styles.totalCard, { backgroundColor }]}>
                <Text style={[styles.totalValue, { color }]}>{dailySummary.urineLoss} ml</Text>
                <Text style={[styles.totalTitle, { color }]}>Daily Urine Loss</Text>
            </View>
            <View style={[styles.totalCard, { backgroundColor }]}>
                <Text style={[styles.totalValue, { color }]}>{dailySummary.catheterized} ml</Text>
                <Text style={[styles.totalTitle, { color }]}>Daily Catheterized</Text>
            </View>

            <Text style={[styles.sectionTitle, { color }]}>Daily Summary Chart</Text>
            <View style={[styles.chartContainer, { backgroundColor }]}>
                <ChartHeader />
                <BarChart
                    data={chartData}
                    isAnimated
                    roundedTop
                    showVerticalLines
                    verticalLinesColor="rgba(211, 211, 211, 0.1)"
                    rulesColor="rgba(211, 211, 211, 0.1)"
                    rulesType="solid"
                    showGradient
                    stepValue={100}
                    noOfSections={8}
                    barWidth={10}
                    labelWidth={35}
                    yAxisThickness={0}
                    xAxisThickness={0}
                    yAxisTextStyle={{ color }}
                    xAxisLabelTextStyle={{ color, transform: 'rotate(50deg)' }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    dateWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 16,
        marginBottom: 10,
    },
    totalTitle: {
        fontSize: 16,
    },
    totalValue: {
        marginBottom: 5,
        fontSize: 20,
        fontWeight: 'bold',
    },
    totalCard: {
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    chartContainer: {
        borderRadius: 10,
        padding: 10,
        paddingBottom: 20,
        paddingTop: 20,
    },
    chartHeaderWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    dot: {
        height: 12,
        width: 12,
        borderRadius: 6,
        marginRight: 8,
    },
    chartItemType: {
        color: 'lightgray',
    },
});
