import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/Calculate.module.css';

export default function Calculate() {
    const [method, setMethod] = useState('DCF');
    const [inputs, setInputs] = useState({
        freeCashFlow: '',
        growthRate: '',
        discountRate: '10',
        terminalMultiple: '10',
        years: '10',
        earnings: '',
        marginOfSafety: '25'
    });
    const [result, setResult] = useState<{ intrinsicValue: number; marginOfSafetyPrice: number } | null>(null);
    const { user } = useAuth();
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    };

    const handleCalculate = async () => {
        if (!user) {
            setError('You must be logged in to perform calculations.');
            return;
        }

        try {
            const response = await fetch('/api/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ method, inputs }),
            });

            if (!response.ok) {
                throw new Error('Calculation failed');
            }

            const data = await response.json();
            setResult(data);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>Calculate Intrinsic Value</h1>
                <div className={styles.methodToggle}>
                    <button onClick={() => setMethod('DCF')} className={method === 'DCF' ? styles.active : ''}>DCF</button>
                    <button onClick={() => setMethod('Multiples')} className={method === 'Multiples' ? styles.active : ''}>Multiples</button>
                </div>
                {method === 'DCF' ? (
                    <div className={styles.inputs}>
                        <input type="number" name="freeCashFlow" placeholder="Free Cash Flow" value={inputs.freeCashFlow} onChange={handleChange} />
                        <input type="number" name="growthRate" placeholder="Growth Rate (%)" value={inputs.growthRate} onChange={handleChange} />
                        <input type="number" name="discountRate" placeholder="Discount Rate (%)" value={inputs.discountRate} onChange={handleChange} />
                        <input type="number" name="terminalMultiple" placeholder="Terminal Multiple" value={inputs.terminalMultiple} onChange={handleChange} />
                        <input type="number" name="years" placeholder="Number of Years" value={inputs.years} onChange={handleChange} />
                    </div>
                ) : (
                    <div className={styles.inputs}>
                        <input type="number" name="earnings" placeholder="Earnings" value={inputs.earnings} onChange={handleChange} />
                        <input type="number" name="terminalMultiple" placeholder="Terminal Multiple" value={inputs.terminalMultiple} onChange={handleChange} />
                    </div>
                )}
                <input type="number" name="marginOfSafety" placeholder="Margin of Safety (%)" value={inputs.marginOfSafety} onChange={handleChange} />
                <button onClick={handleCalculate} className={styles.calculateButton}>Calculate</button>
                {error && <p className={styles.error}>{error}</p>}
                {result && (
                    <div className={styles.result}>
                        <p>Intrinsic Value: ${result.intrinsicValue.toFixed(2)}</p>
                        <p>Margin of Safety Price: ${result.marginOfSafetyPrice.toFixed(2)}</p>
                    </div>
                )}
            </main>
        </div>
    );
}