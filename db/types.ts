export interface WaterIntake {
    id: number;
    amount: number;
    timestamp: string;
}

export interface UrineOutput {
    id: number;
    urineLossAmount: number;
    catheterizedAmount: number;
    timestamp: string;
}
