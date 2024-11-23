import { Theme } from '@/constants/theme';
import { exportDatabaseToCSV, importDatabaseFromCSV } from '@/db/db';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useContext } from 'react';
import { AppThemeContext } from '@/context/themeContext';

function Settings() {
    const { themeMode, setThemeMode, theme } = useContext(AppThemeContext);

    const color = Theme[theme].colors.text;
    const backgroundColor = Theme[theme].colors.surface1;
    const borderColor = Theme[theme].colors.surface2;

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
            <Text style={[styles.sectionTitle, { color }]}>Theme</Text>
            <View style={[styles.section, { backgroundColor, borderColor }]}>
                <TouchableOpacity style={[styles.option, { backgroundColor }]} onPress={() => setThemeMode('auto')}>
                    <View style={styles.themeLabel}>
                        <Ionicons color={color} name="contrast" size={20} />
                        <Text style={[styles.optionLabel, { color, marginLeft: 10 }]}>Auto</Text>
                    </View>
                    <Ionicons
                        color={color}
                        name={themeMode === 'auto' ? 'radio-button-on' : 'radio-button-off'}
                        size={20}
                    />
                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: borderColor }} />
                <TouchableOpacity style={[styles.option, { backgroundColor }]} onPress={() => setThemeMode('light')}>
                    <View style={styles.themeLabel}>
                        <Ionicons color={color} name="sunny" size={20} />
                        <Text style={[styles.optionLabel, { color, marginLeft: 10 }]}>Light</Text>
                    </View>
                    <Ionicons
                        color={color}
                        name={themeMode === 'light' ? 'radio-button-on' : 'radio-button-off'}
                        size={20}
                    />
                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: borderColor }} />
                <TouchableOpacity style={[styles.option, { backgroundColor }]} onPress={() => setThemeMode('dark')}>
                    <View style={styles.themeLabel}>
                        <Ionicons color={color} name="moon" size={20} />
                        <Text style={[styles.optionLabel, { color, marginLeft: 10 }]}>Dark</Text>
                    </View>
                    <Ionicons
                        color={color}
                        name={themeMode === 'dark' ? 'radio-button-on' : 'radio-button-off'}
                        size={20}
                    />
                </TouchableOpacity>
            </View>

            <Text style={[styles.sectionTitle, { color }]}>Data</Text>
            <View style={[styles.section, { backgroundColor, borderColor }]}>
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
        borderWidth: 1,
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
    themeLabel: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
export default Settings;
