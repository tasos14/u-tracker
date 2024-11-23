import FloatingAction from '@/components/FloatingAction';
import { getWaterIntakes } from '@/db/db';
import { WaterIntake as WaterIntakeType } from '@/db/types';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ScrollView, SectionList, StyleSheet, Text, View } from 'react-native';
import ListItem from '@/components/ListItem';
import Pill from '@/components/Pill';
import { format } from 'date-fns';
import { AppThemeContext } from '@/context/themeContext';
import { Theme } from '@/constants/theme';

const filterOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'all', label: 'All Time' },
];

function WaterIntake() {
    const [groupedWaterIntakes, setGroupedWaterIntakes] = useState<{ date: string; data: WaterIntakeType[] }[]>([]);
    const [selectedFilter, setSelectedFilter] = useState('today');
    const { theme } = useContext(AppThemeContext);
    const color = Theme[theme].colors.text;

    const getData = useCallback((filter: string) => {
        const data = getWaterIntakes(filter);
        const groupedData = data.reduce((acc, intake) => {
            const date = format(intake.timestamp, 'iii dd');
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(intake);
            return acc;
        }, {} as { [key: string]: WaterIntakeType[] });

        setGroupedWaterIntakes(
            Object.keys(groupedData).map((date) => ({
                date,
                data: groupedData[date],
            }))
        );
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

            <SectionList
                sections={groupedWaterIntakes}
                keyExtractor={(item, i) => i.toString()}
                renderItem={({ item, index, section }) => (
                    <View
                        style={[
                            styles.itemContainer,
                            {
                                marginLeft: selectedFilter !== 'today' ? 90 : 0,
                                marginBottom: index === section.data.length - 1 ? 0 : 10,
                            },
                        ]}
                    >
                        <ListItem
                            title={item.amount}
                            timestamp={item.timestamp}
                            onPress={() => router.navigate(`/editWaterIntake?id=${item.id}`)}
                        />
                    </View>
                )}
                renderSectionHeader={({ section: { date } }) =>
                    selectedFilter !== 'today' ? (
                        <View style={styles.dateHeader}>
                            <Text style={[styles.dateText, { color }]}>{date}</Text>
                        </View>
                    ) : null
                }
                stickySectionHeadersEnabled
            />
            <FloatingAction handlePress={() => router.navigate('/newWaterIntake')} />
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        marginBottom: 10,
    },
    dateHeader: {
        width: 90,
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    wrapper: {
        position: 'relative',
        flex: 1,
    },
    optionsWrapper: {
        flexGrow: 0,
        flexShrink: 0,
        paddingTop: 20,
        paddingBottom: 20,
    },
});
export default WaterIntake;
