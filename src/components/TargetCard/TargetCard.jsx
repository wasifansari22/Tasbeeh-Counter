import styles from "./TargetCard.module.css";
import { useEffect, useState } from "react";

// canDecrease
const TargetCard = ({ count, target, showToast, onIncrease, onDecrease, onTargetChange }) => {
    const [inputValue, setInputValue] = useState(target.toString());
    const percentage = target > 0 ? Math.min((count / target) * 100, 100) : 0;

    // keep input synchronized with parent state
    useEffect(() => {
        setInputValue(target.toString());
    }, [target]);

    const handleBlur = () => {
        const value = Number(inputValue);

        // empty or invalid input
        if (inputValue === "" || value < 1) {
            setInputValue(target.toString());
            return;
        }
        // onTargetChange(value);

        // prevent target below completed count
        if (value < count) {
            showToast(`Your target must be at least ${count}.`);
            setInputValue(target.toString());
            return;
        }
        onTargetChange(value);
    };

    return (
        <section className={styles.card}>
            <div className={styles.progressHeader}>
                <h3>📊 Progress</h3>
                <span>
                    {Math.round(percentage)}%
                </span>
            </div>

            <div className={styles.progressBar}>
                <div
                    className={styles.progress}
                    style={{
                        width: `${percentage}%`,
                    }}
                />
            </div>

            <h3 className={styles.targetHeading}>
                🎯 Set Your Target
            </h3>

            <div className={styles.controls}>
                {/* disabled={!canDecrease} */}
                <button className={styles.btn} onClick={onDecrease}  >-</button>
                <input type="number"
                    value={inputValue}
                    className={styles.input}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.target.blur();
                        }
                    }} />
                <button className={styles.btn} onClick={onIncrease}>+</button>
            </div>
        </section>
    )
}

export default TargetCard   