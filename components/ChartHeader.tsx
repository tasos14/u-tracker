import { ThemedText } from '@/components/ThemedText';
import { StyleSheet, View } from 'react-native';

function ChartHeader() {
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
                <ThemedText style={styles.chartItemType}>Water</ThemedText>
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
                <ThemedText style={styles.chartItemType}>Cath</ThemedText>
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
                <ThemedText style={styles.chartItemType}>Loss</ThemedText>
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
