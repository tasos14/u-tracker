import FloatingAction from '@/components/FloatingAction';
import { getWaterIntakes } from '@/db/db';
import { WaterIntake as WaterIntakeType } from '@/db/types';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ListItem from '@/components/ListItem';
import Pill from '@/components/Pill';

const filterOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'all', label: 'All Time' },
];

function WaterIntake() {
    const [waterIntakes, setWaterIntakes] = useState<WaterIntakeType[]>([]);
    const [selectedFilter, setSelectedFilter] = useState('today');

    const getData = useCallback((filter: string) => {
        const data = getWaterIntakes(filter);
        setWaterIntakes(data);
    }, []);

    useFocusEffect(
        useCallback(() => {
            getData(selectedFilter);
        }, [selectedFilter, getData])
    );

    useEffect(() => {
        getData(selectedFilter);
    }, [selectedFilter, getData]);

    return (
        <View style={styles.wrapper}>
            <ScrollView horizontal style={styles.optionsWrapper}>
                {filterOptions.map((option) => (
                    <Pill
                        key={option.value}
                        label={option.label}
                        isActive={selectedFilter === option.value}
                        onPress={() => setSelectedFilter(option.value)}
                    />
                ))}
            </ScrollView>
            <ScrollView>
                <View style={styles.wrapper}>
                    {waterIntakes.map((intake) => (
                        <ListItem
                            key={intake.id}
                            title={intake.amount}
                            timestamp={intake.timestamp}
                            onPress={() => router.navigate(`/editWaterIntake?id=${intake.id}`)}
                        />
                    ))}
                </View>
            </ScrollView>
            <FloatingAction handlePress={() => router.navigate('/newWaterIntake')} />
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
        paddingTop: 20,
        paddingBottom: 20,
    },
});
export default WaterIntake;
