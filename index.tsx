import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>Stock Intrinsic Value Calculator</h1>
                <p className={styles.description}>
                    Calculate the intrinsic value of a stock based on Warren Buffett’s value investing principles.
                </p>
                <Link href="/calculate">
                    <a className={styles.button}>Start Calculating</a>
                </Link>
            </main>
        </div>
    );
}