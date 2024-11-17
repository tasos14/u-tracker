import { Theme } from '@/constants/theme';
import { exportDatabaseToCSV, importDatabaseFromCSV } from '@/db/db';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

function Settings() {
    const colorScheme = useColorScheme() || 'light';

    const color = Theme[colorScheme].colors.text;
    const backgroundColor = Theme[colorScheme].colors.surface1;
    const borderColor = Theme[colorScheme].colors.surface2;

    const handleExportToCSV = async () => {
        await exportDatabaseToCSV();
        alert('Exported to CSV');
    };

    const handleImportFromCSV = async () => {
        await importDatabaseFromCSV();
        alert('Imported from CSV');
    };

    return (
        <ScrollView>
            <Text style={[styles.sectionTitle, { color }]}>Data</Text>
            <View style={[styles.section, { backgroundColor }]}>
                <TouchableOpacity style={[styles.option, { backgroundColor }]} onPress={handleImportFromCSV}>
                    <Text style={[styles.optionLabel, { color }]}>Import</Text>
                    <Ionicons color={color} name="cloud-download-sharp" size={20} />
                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: borderColor }} />
                <TouchableOpacity style={[styles.option, { backgroundColor }]} onPress={handleExportToCSV}>
                    <Text style={[styles.optionLabel, { color }]}>Export</Text>
                    <Ionicons color={color} name="cloud-upload-sharp" size={20} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 16,
        marginBottom: 10,
    },
    section: {
        borderRadius: 10,
        marginBottom: 10,
        overflow: 'hidden',
    },
    option: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    optionLabel: {
        fontSize: 16,
    },
});
export default Settings;
