import styles from '../styles/Faq.module.css';

export default function Faq() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>FAQ</h1>
                <div className={styles.faq}>
                    <h2>What is value investing?</h2>
                    <p>Value investing is an investment strategy where stocks are selected that trade for less than their intrinsic values.</p>
                    <h2>What is Discounted Cash Flow (DCF)?</h2>
                    <p>DCF is a valuation method used to estimate the value of an investment based on its expected future cash flows.</p>
                    <h2>What is a terminal multiple?</h2>
                    <p>A terminal multiple is a value used to estimate the future value of a business beyond the forecast period.</p>
                    <h2>What is a margin of safety?</h2>
                    <p>Margin of safety is a principle of investing in which an investor only purchases securities when their market price is significantly below their intrinsic value.</p>
                </div>
            </main>
        </div>
    );
}