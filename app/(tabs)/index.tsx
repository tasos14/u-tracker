import ChartHeader from '@/components/ChartHeader';
import { Theme } from '@/constants/theme';
import { getChartData, getDailySummary } from '@/db/db';
import { useFocusEffect } from 'expo-router';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import MonthlyCalendar from '@/components/MonthlyCalendar';
import { AppThemeContext } from '@/context/themeContext';

export default function Index() {
    const [dailySummary, setDailySummary] = useState({ waterIntake: 0, urineLoss: 0, catheterized: 0 });
    const [chartData, setChartData] = useState<{ value: number; label: string; frontColor: string }[]>([]);
    const [totalChartData, setTotalChartData] = useState<{ value: number; label: string; frontColor: string }[]>([]);
    const [date, setDate] = useState(new Date());
    const { theme } = useContext(AppThemeContext);

    const color = Theme[theme].colors.text;
    const backgroundColor = Theme[theme].colors.surface1;

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

    return (
        <>
            <MonthlyCalendar date={date} onChange={setDate} />
            <ScrollView>
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
                        verticalLinesColor={theme === 'dark' ? 'rgba(211, 211, 211, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
                        rulesColor={theme === 'dark' ? 'rgba(211, 211, 211, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
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
                                verticalLinesColor={
                                    theme === 'dark' ? 'rgba(211, 211, 211, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                                }
                                rulesColor={theme === 'dark' ? 'rgba(211, 211, 211, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
                                rulesType="solid"
                                showGradient
                                stepValue={500}
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
        </>
    );
}

const styles = StyleSheet.create({
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
