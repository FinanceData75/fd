export function calculateDCF(
    freeCashFlow: number,
    growthRate: number,
    discountRate: number,
    terminalMultiple: number,
    years: number,
    marginOfSafety: number
): { intrinsicValue: number; marginOfSafetyPrice: number } {
    let totalDCF = 0;

    // Calculate the DCF for each year
    for (let i = 1; i <= years; i++) {
        const discountedCashFlow = freeCashFlow * Math.pow(1 + growthRate, i) / Math.pow(1 + discountRate, i);
        totalDCF += discountedCashFlow;
    }

    // Calculate the terminal value
    const terminalValue = (freeCashFlow * Math.pow(1 + growthRate, years) * terminalMultiple) / Math.pow(1 + discountRate, years);

    // Calculate the intrinsic value
    const intrinsicValue = totalDCF + terminalValue;

    // Apply margin of safety
    const marginOfSafetyPrice = intrinsicValue * (1 - marginOfSafety / 100);

    return { intrinsicValue, marginOfSafetyPrice };
}

export function calculateMultiples(
    earnings: number,
    terminalMultiple: number,
    marginOfSafety: number
): { intrinsicValue: number; marginOfSafetyPrice: number } {
    // Calculate the intrinsic value
    const intrinsicValue = earnings * terminalMultiple;

    // Apply margin of safety
    const marginOfSafetyPrice = intrinsicValue * (1 - marginOfSafety / 100);

    return { intrinsicValue, marginOfSafetyPrice };
}