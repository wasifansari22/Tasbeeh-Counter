import styles from "./ProgressTargetCard.module.css";

const ProgressTargetCard = ({ count, target, onIncrease, onDecrease, }) => {

    const percentage = target > 0 ? Math.min((count / target) * 100, 100) : 0;

    return (
        <section className={styles.card}>

            <div className={styles.header}>
                <h3>📊 Progress</h3>
                <span>{Math.round(percentage)}%</span>
            </div>

            <div className={styles.progressBar}>
                <div
                    className={styles.progress}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <div className={styles.targetSection}>
                <span>🎯 Target</span>

                <div className={styles.controls}>
                    <button
                        className={styles.btn}
                        onClick={onDecrease}
                    >
                        −
                    </button>

                    <span className={styles.value}>
                        {target}
                    </span>

                    <button
                        className={styles.btn}
                        onClick={onIncrease}
                    >
                        +
                    </button>
                </div>
            </div>

        </section>
    );
};

export default ProgressTargetCard;