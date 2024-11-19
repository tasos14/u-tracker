import FloatingAction from '@/components/FloatingAction';
import ListItem from '@/components/ListItem';
import Pill from '@/components/Pill';
import { getUrineOutputs } from '@/db/db';
import { UrineOutput as UrineOutputType } from '@/db/types';
import { format } from 'date-fns';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, SectionList, StyleSheet, Text, View } from 'react-native';

const timeFilterOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'all', label: 'All Time' },
];

const typeFilterOptions = [
    { value: 'catheterized', label: 'Catheterized' },
    { value: 'urineLoss', label: 'Urine Loss' },
];

function UrineOutput() {
    const [groupedUrineOutputs, setGroupedUrineOutputs] = useState<{ date: string; data: UrineOutputType[] }[]>([]);
    const [selectedTimeFilter, setSelectedTimeFilter] = useState('today');
    const [selectedTypeFilter, setSelectedTypeFilter] = useState('catheterized');

    const getData = useCallback((timeFilter: string, typeFilter: string) => {
        const data = getUrineOutputs(timeFilter, typeFilter);
        const groupedData = data.reduce((acc, output) => {
            const date = format(output.timestamp, 'iii dd');
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(output);
            return acc;
        }, {} as { [key: string]: UrineOutputType[] });

        setGroupedUrineOutputs(
            Object.keys(groupedData).map((date) => ({
                date,
                data: groupedData[date],
            }))
        );
    }, []);

    useFocusEffect(
        useCallback(() => {
            getData(selectedTimeFilter, selectedTypeFilter);
        }, [selectedTimeFilter, selectedTypeFilter, getData])
    );

    useEffect(() => {
        getData(selectedTimeFilter, selectedTypeFilter);
    }, [selectedTimeFilter, selectedTypeFilter, getData]);

    return (
        <View style={styles.wrapper}>
            <ScrollView horizontal style={[styles.optionsWrapper, styles.timeOptionsWrapper]}>
                {timeFilterOptions.map((option) => (
                    <Pill
                        key={option.value}
                        label={option.label}
                        onPress={() => setSelectedTimeFilter(option.value)}
                        isActive={selectedTimeFilter === option.value}
                    />
                ))}
            </ScrollView>
            <ScrollView horizontal style={[styles.optionsWrapper, styles.typeOptionsWrapper]}>
                {typeFilterOptions.map((option) => (
                    <Pill
                        key={option.value}
                        label={option.label}
                        onPress={() => setSelectedTypeFilter(option.value)}
                        isActive={selectedTypeFilter === option.value}
                    />
                ))}
            </ScrollView>
            <SectionList
                sections={groupedUrineOutputs}
                keyExtractor={(item, i) => i.toString()}
                renderItem={({ item, index, section }) => (
                    <View
                        style={[
                            styles.itemContainer,
                            {
                                marginLeft: selectedTimeFilter !== 'today' ? 90 : 0,
                                marginBottom: index === section.data.length - 1 ? 0 : 10,
                            },
                        ]}
                    >
                        <ListItem
                            title={
                                selectedTypeFilter === 'catheterized' ? item.catheterizedAmount : item.urineLossAmount
                            }
                            timestamp={item.timestamp}
                            onPress={() => router.navigate(`/editUrineOutput?id=${item.id}`)}
                        />
                    </View>
                )}
                renderSectionHeader={({ section: { date } }) =>
                    selectedTimeFilter !== 'today' ? (
                        <View style={styles.dateHeader}>
                            <Text style={styles.dateText}>{date}</Text>
                        </View>
                    ) : null
                }
                stickySectionHeadersEnabled
            />
            <FloatingAction handlePress={() => router.navigate('/newUrineOutput')} />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        flex: 1,
    },
    itemContainer: {
        marginBottom: 10,
    },
    dateHeader: {
        width: 90,
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginRight: 10,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    optionsWrapper: {
        flexGrow: 0,
        flexShrink: 0,
    },
    timeOptionsWrapper: {
        paddingTop: 20,
        paddingBottom: 10,
    },
    typeOptionsWrapper: {
        paddingBottom: 20,
    },
});

export default UrineOutput;
