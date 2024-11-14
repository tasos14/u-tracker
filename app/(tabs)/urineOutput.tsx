import FloatingAction from '@/components/FloatingAction';
import ListItem from '@/components/ListItem';
import Pill from '@/components/Pill';
import { getUrineOutputs } from '@/db/db';
import { UrineOutput } from '@/db/types';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

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

function UineOutput() {
    const [urineOutputs, setUrineOutputs] = useState<UrineOutput[]>([]);
    const [selectedTimeFilter, setSelectedTimeFilter] = useState('today');
    const [selectedTypeFilter, setSelectedTypeFilter] = useState('catheterized');

    const getData = useCallback((timeFilter: string, typeFilter: string) => {
        const data = getUrineOutputs(timeFilter, typeFilter);
        setUrineOutputs(data);
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
            <ScrollView>
                <View style={styles.wrapper}>
                    {urineOutputs.map((output) => (
                        <ListItem
                            key={output.id}
                            title={
                                selectedTypeFilter === 'catheterized'
                                    ? output.catheterizedAmount
                                    : output.urineLossAmount
                            }
                            timestamp={output.timestamp}
                            onPress={() => router.navigate(`/editUrineOutput?id=${output.id}`)}
                        />
                    ))}
                </View>
            </ScrollView>

            <FloatingAction handlePress={() => router.navigate('/newUrineOutput')} />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        flex: 1,
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

export default UineOutput;
