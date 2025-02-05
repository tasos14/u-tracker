import { Theme } from '@/constants/theme';
import { AppThemeContext } from '@/context/themeContext';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

function ChartHeader() {
    const { theme } = useContext(AppThemeContext);

    const color = Theme[theme].colors.text;

    return (
        <View style={styles.chartHeaderWrapper}>
            <View style={styles.chartDetail}>
                <View
                    style={[
                        styles.dot,
                        {
                            backgroundColor: '#177AD5',
                        },
                    ]}
                />
                <Text style={[styles.chartItemType, { color }]}>Water</Text>
            </View>
            <View style={styles.chartDetail}>
                <View
                    style={[
                        styles.dot,
                        {
                            backgroundColor: '#FFEA70',
                        },
                    ]}
                />
                <Text style={[styles.chartItemType, { color }]}>Cath</Text>
            </View>
            <View style={styles.chartDetail}>
                <View
                    style={[
                        styles.dot,
                        {
                            backgroundColor: '#ED6665',
                        },
                    ]}
                />
                <Text style={[styles.chartItemType, { color }]}>Loss</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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

export default ChartHeader;
