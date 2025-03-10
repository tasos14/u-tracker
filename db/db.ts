import { UrineOutput, WaterIntake } from '@/db/types';
import { format, formatDate } from 'date-fns';
import Papa from 'papaparse';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import * as SQLite from 'expo-sqlite';

class Database {
    private static instance: SQLite.SQLiteDatabase;

    private constructor() {}

    private static initialize(): void {
        const db = Database.getInstance();
        db.runSync(`
            CREATE TABLE IF NOT EXISTS waterIntake (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                amount REAL NOT NULL,
                timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
        `);
        db.runSync(`
            CREATE TABLE IF NOT EXISTS urineOutput (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                urineLossAmount REAL NOT NULL,
                catheterizedAmount REAL NOT NULL,
                timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
        `);
    }

    public static getInstance(): SQLite.SQLiteDatabase {
        if (!Database.instance) {
            Database.instance = SQLite.openDatabaseSync('data.db');
            Database.instance.withTransactionSync(() => {
                Database.initialize();
            });
        }
        return Database.instance;
    }
}

export async function exportDatabaseToCSV(): Promise<void> {
    const db = Database.getInstance();

    // Fetch data from the database
    const urineOutputs = db.getAllSync<UrineOutput>('SELECT * FROM urineOutput');
    const waterIntakes = db.getAllSync<WaterIntake>('SELECT * FROM waterIntake');

    // Convert data to CSV format using PapaParse
    const urineOutputsCSV = Papa.unparse(urineOutputs);
    const waterIntakesCSV = Papa.unparse(waterIntakes);

    // Combine CSV data
    const csvData = `Urine Outputs\n${urineOutputsCSV}\n\nWater Intakes\n${waterIntakesCSV}`;

    // Save CSV data to a file
    const csvPath = `${FileSystem.documentDirectory}data_backup.csv`;
    await FileSystem.writeAsStringAsync(csvPath, csvData);

    // Share the CSV file
    await Sharing.shareAsync(csvPath, {
        mimeType: 'text/csv',
        dialogTitle: 'Share CSV Backup',
    });
}

export async function importDatabaseFromCSV(): Promise<void> {
    const { assets } = await DocumentPicker.getDocumentAsync();

    if (assets !== null) {
        const csvData = await FileSystem.readAsStringAsync(assets[0].uri);

        // Split the CSV data into sections
        const [urineOutputsSection, waterIntakesSection] = csvData.split('\n\n');

        const urineOutputs = Papa.parse(urineOutputsSection.split('\n').slice(1).join('\n'), { header: true }).data;
        const waterIntakes = Papa.parse(waterIntakesSection.split('\n').slice(1).join('\n'), { header: true }).data;

        const db = Database.getInstance();
        db.withTransactionSync(() => {
            urineOutputs.forEach((row: any) => {
                try {
                    db.runSync(
                        'INSERT OR REPLACE INTO urineOutput (id, urineLossAmount, catheterizedAmount, timestamp) VALUES (?, ?, ?, ?)',
                        row.id,
                        row.urineLossAmount,
                        row.catheterizedAmount,
                        row.timestamp
                    );
                    console.log('Inserted urine output');
                } catch (error) {
                    console.error('Error inserting urine output:', error);
                }
            });

            waterIntakes.forEach((row: any) => {
                try {
                    db.runSync(
                        'INSERT OR REPLACE INTO waterIntake (id, amount, timestamp) VALUES (?, ?, ?)',
                        row.id,
                        row.amount,
                        row.timestamp
                    );
                    console.log('Inserted water intake');
                } catch (error) {
                    console.error('Error inserting water intake:', error);
                }
            });
        });

        // Reinitialize the database to apply the imported data
        // Database.getInstance().close();
        // Database.initialize();
    }
}

export function getWaterIntakes(filter: string = 'today'): WaterIntake[] {
    const db = Database.getInstance();
    let result: WaterIntake[] = [];
    let query = `select * from waterIntake`;

    switch (filter) {
        case 'today':
            query += ` where timestamp >= CURRENT_DATE`;
            break;
        case 'week':
            query += ` where timestamp >= date('now', '-7 days')`;
            break;
        case 'month':
            query += ` where timestamp >= date('now', '-30 days')`;
        case 'all':
            break;
    }

    query += ` order by timestamp asc`;

    db.withTransactionSync(() => {
        result = db.getAllSync<WaterIntake>(query);
    });
    return result;
}

export function getUrineOutputs(timeFilter: string = 'today', typeFilter: string = 'catheterized'): UrineOutput[] {
    const db = Database.getInstance();
    let result: UrineOutput[] = [];
    let query = `select * from urineOutput`;

    switch (timeFilter) {
        case 'today':
            query += ` where timestamp >= CURRENT_DATE and`;
            break;
        case 'week':
            query += ` where timestamp >= date('now', '-7 days') and`;
            break;
        case 'month':
            query += ` where timestamp >= date('now', '-30 days') and`;
            break;
        case 'all':
            query += ` where`;
            break;
    }

    if (typeFilter === 'catheterized') {
        query += ` catheterizedAmount > 0`;
    } else {
        query += ` urineLossAmount > 0`;
    }

    query += ` order by timestamp asc`;

    db.withTransactionSync(() => {
        result = db.getAllSync<UrineOutput>(query);
    });
    return result;
}

export function getWaterIntakeById(id: string): WaterIntake | null {
    let result: WaterIntake | null = null;
    const db = Database.getInstance();
    db.withTransactionSync(() => {
        result = db.getFirstSync<WaterIntake>(`SELECT * FROM waterIntake WHERE id = ?`, id);
    });
    return result;
}

export function updateWaterIntake({ id, amount, timestamp }: { id: string; amount: number; timestamp: string }): void {
    const db = Database.getInstance();
    db.withTransactionSync(() => {
        db.runSync('UPDATE waterIntake SET amount = ?, timestamp = ? WHERE id = ?', amount, timestamp, id);
    });
}

export function deleteWaterIntake(id: string): void {
    const db = Database.getInstance();
    db.withTransactionSync(() => {
        db.runSync('DELETE FROM waterIntake WHERE id = ?', id);
    });
}

export function createWaterIntake({ amount, timestamp }: { amount: number; timestamp: string }): void {
    const db = Database.getInstance();
    db.withTransactionSync(() => {
        db.runSync('INSERT INTO waterIntake (amount, timestamp) VALUES (?, ?)', amount, timestamp);
    });
}

export function getUrineOutputById(id: string): UrineOutput | null {
    let result: UrineOutput | null = null;
    const db = Database.getInstance();
    db.withTransactionSync(() => {
        result = db.getFirstSync<UrineOutput>(`SELECT * FROM urineOutput WHERE id = ?`, id);
    });
    return result;
}

export function updateUrineOutput({
    id,
    urineLossAmount,
    catheterizedAmount,
    timestamp,
}: {
    id: string;
    urineLossAmount: number;
    catheterizedAmount: number;
    timestamp: string;
}): void {
    const db = Database.getInstance();
    db.withTransactionSync(() => {
        db.runSync(
            'UPDATE urineOutput SET urineLossAmount = ?, catheterizedAmount = ?, timestamp = ? WHERE id = ?',
            urineLossAmount,
            catheterizedAmount,
            timestamp,
            id
        );
    });
}

export function deleteUrineOutput(id: string): void {
    const db = Database.getInstance();
    db.withTransactionSync(() => {
        db.runSync('DELETE FROM urineOutput WHERE id = ?', id);
    });
}

export function createUrineOutput({
    lossAmount,
    catheterizedAmount,
    timestamp,
}: {
    lossAmount: number;
    catheterizedAmount: number;
    timestamp: string;
}): void {
    const db = Database.getInstance();
    db.withTransactionSync(() => {
        db.runSync(
            'INSERT INTO urineOutput (urineLossAmount, catheterizedAmount, timestamp) VALUES (?, ?, ?)',
            lossAmount,
            catheterizedAmount,
            timestamp
        );
    });
}

export function getDailySummary(date: Date): { waterIntake: number; urineLoss: number; catheterized: number } {
    const db = Database.getInstance();
    let result = { waterIntake: 0, urineLoss: 0, catheterized: 0 };
    const formattedDate = format(date, 'yyyy-MM-dd');

    db.withTransactionSync(() => {
        result.waterIntake =
            db.getFirstSync<{ totalAmount: number }>(
                `select sum(amount) as totalAmount from waterIntake where DATE(timestamp) = ?`,
                formattedDate
            )?.totalAmount || 0;
        result.urineLoss =
            db.getFirstSync<{ totalLoss: number }>(
                `select sum(urineLossAmount) as totalLoss from urineOutput where DATE(timestamp) = ?`,
                formattedDate
            )?.totalLoss || 0;
        result.catheterized =
            db.getFirstSync<{ totalCatheterized: number }>(
                `select sum(catheterizedAmount) as totalCatheterized from urineOutput where DATE(timestamp) = ?`,
                formattedDate
            )?.totalCatheterized || 0;
    });
    return result;
}

function getFontColor(type: string): string {
    switch (type) {
        case 'waterIntake':
            return '#177AD5';
        case 'urineLoss':
            return '#ED6665';
        case 'catheterized':
            return '#FFD700';
        default:
            return '#000';
    }
}

function getGradientColor(type: string): string {
    switch (type) {
        case 'waterIntake':
            return '#00BFFF';
        case 'urineLoss':
            return '#FF9999';
        case 'catheterized':
            return '#FFEA70';
        default:
            return '#000';
    }
}

export function getChartData(date: Date): {
    chartData: { value: number; label: string; frontColor: string }[];
    totalChartData: { value: number; label: string; frontColor: string }[];
    lineChartData: { value: number; dataPointText: string }[];
} {
    const db = Database.getInstance();
    let waterIntake: { amount: number; timestamp: string }[] = [];
    let urineLoss: { amount: number; timestamp: string }[] = [];
    let catheterized: { amount: number; timestamp: string }[] = [];
    const formattedDate = formatDate(date, 'yyyy-MM-dd');

    db.withTransactionSync(() => {
        waterIntake = db.getAllSync<{ timestamp: string; amount: number }>(
            `select timestamp, amount from waterIntake where Date(timestamp) = ?`,
            formattedDate
        );
        urineLoss = db.getAllSync<{ timestamp: string; amount: number }>(
            `select timestamp, urineLossAmount as amount from urineOutput where urineLossAmount > 0 and Date(timestamp) = ?`,
            formattedDate
        );
        catheterized = db.getAllSync<{ timestamp: string; amount: number }>(
            `select timestamp, catheterizedAmount as amount from urineOutput where catheterizedAmount > 0 and Date(timestamp) = ?`,
            formattedDate
        );
    });

    const totalChartData = [
        {
            value: waterIntake.reduce((acc, curr) => acc + curr.amount, 0) || 1,
            label: '',
            frontColor: getFontColor('waterIntake'),
            gadientColor: getFontColor('waterIntake'),
        },
        {
            value: urineLoss.reduce((acc, curr) => acc + curr.amount, 0) || 1,
            label: '',
            frontColor: getFontColor('urineLoss'),
            gadientColor: getFontColor('urineLoss'),
        },
        {
            value: catheterized.reduce((acc, curr) => acc + curr.amount, 0) || 1,
            label: '',
            frontColor: getFontColor('catheterized'),
            gadientColor: getFontColor('catheterized'),
        },
    ];

    // combine the data into a single array of objects ordered by timestamp ascending, add a type property
    const chartData = [
        ...waterIntake.map((intake) => ({ ...intake, type: 'waterIntake' })),
        ...urineLoss.map((loss) => ({ ...loss, type: 'urineLoss' })),
        ...catheterized.map((cath) => ({ ...cath, type: 'catheterized' })),
    ]
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
        .map((item) => ({
            value: item.amount,
            label: format(new Date(item.timestamp), 'HH:mm'),
            frontColor: getFontColor(item.type),
            gradientColor: getGradientColor(item.type),
        }));

    const lineChartData: { value: number; dataPointText: string }[] = waterIntake.reduce(
        (acc, curr) => {
            const lastValue = acc.length > 0 ? acc[acc.length - 1].value || 0 : 0;
            return [
                ...acc,
                {
                    value: lastValue + curr.amount,
                    dataPointText: `${lastValue + curr.amount}`,
                    label: format(new Date(curr.timestamp), 'HH:mm'),
                },
            ];
        },
        [{ value: 0, dataPointText: '0' }]
    );

    return { chartData, totalChartData, lineChartData };
}

// Export the singleton instance
const db = Database.getInstance();
export default db;
