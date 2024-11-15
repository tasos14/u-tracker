import ChartHeader from '@/components/ChartHeader';
import { Theme } from '@/constants/theme';
import { getChartData, getDailySummary } from '@/db/db';
import { Ionicons } from '@expo/vector-icons';
import { addDays, format, subDays } from 'date-fns';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Index() {
    const [dailySummary, setDailySummary] = useState({ waterIntake: 0, urineLoss: 0, catheterized: 0 });
    const [chartData, setChartData] = useState<{ value: number; label: string; frontColor: string }[]>([]);
    const [totalChartData, setTotalChartData] = useState<{ value: number; label: string; frontColor: string }[]>([]);
    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const colorScheme = useColorScheme() || 'light';

    const color = Theme[colorScheme].colors.text;
    const backgroundColor = Theme[colorScheme].colors.surface1;

    const getData = useCallback((date: Date) => {
        const summary = getDailySummary(date);
        setDailySummary(summary);
        const { chartData, totalChartData } = getChartData(date);
        setChartData(chartData);
        setTotalChartData(totalChartData);
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

    const onDateChange = ({ type }: any, selectedDate: Date | undefined) => {
        if (type === 'set' && selectedDate) {
            setDate(selectedDate);
        }
        setShowDate(false);
    };

    return (
        <ScrollView>
            <View style={styles.dateWrapper}>
                <Pressable onPress={handlePreviousDay}>
                    <Ionicons name="arrow-back" size={28} color={color} />
                </Pressable>

                <Pressable onPress={() => setShowDate(true)}>
                    <Text style={[styles.dateText, { color }]}>{format(date, 'iii dd MMM')}</Text>
                </Pressable>
                {showDate && <DateTimePicker mode="date" value={date} onChange={onDateChange} />}

                <Pressable onPress={handleNextDay}>
                    <Ionicons name="arrow-forward" size={28} color={color} />
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
                    xAxisColor={color}
                    yAxisColor={color}
                    yAxisTextStyle={{ color }}
                    xAxisLabelTextStyle={{
                        color,
                        transform: chartData.length > 0 ? 'rotate(50deg) translate(5px, 5px)' : null,
                    }}
                />
            </View>
            <View style={[styles.chartContainer, { backgroundColor }]}>
                <ChartHeader />
                <View style={styles.doubleChartContainer}>
                    <View style={styles.chartWrapper}>
                        <BarChart
                            data={totalChartData}
                            isAnimated
                            roundedTop
                            showVerticalLines
                            verticalLinesColor="rgba(211, 211, 211, 0.1)"
                            rulesColor="rgba(211, 211, 211, 0.1)"
                            rulesType="solid"
                            showGradient
                            stepValue={250}
                            noOfSections={8}
                            barWidth={10}
                            labelWidth={10}
                            yAxisLabelWidth={40}
                            xAxisColor={color}
                            yAxisColor={color}
                            yAxisTextStyle={{ color }}
                            xAxisLabelTextStyle={{ color }}
                        />
                    </View>
                    <View style={styles.chartWrapper}>
                        <PieChart
                            radius={80}
                            data={totalChartData.map((item) => ({ value: item.value, color: item.frontColor }))}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
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
        fontSize: 24,
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
        marginBottom: 10,
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
    doubleChartContainer: {
        flexDirection: 'row',
    },
    chartWrapper: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
