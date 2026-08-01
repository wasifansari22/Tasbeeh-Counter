import styles from "./StreakCard.module.css";
import { FaFire } from "react-icons/fa";

const StreakCard = ({ streak }) => {
    return (
        <section className={styles.card}>
            <div className={styles.header}>
                <FaFire className={styles.icon} />
                <h3>Daily Streak</h3>
            </div>

            <div className={styles.content}>
                <div className={styles.row}>
                    <div className={styles.current}>
                        <span>Current Streak</span>

                        <div className={styles.streakValue}>
                            <h2>{streak.current}</h2>
                            <FaFire className={styles.fire} />
                        </div>
                    </div>

                    <div className={styles.lastCompleted}>
                        <span>Last Completed</span>
                        <h4>{streak.lastCompleted || "Never"}</h4>
                    </div>
                </div>

                <p className={styles.message}>Keep your streak alive!</p>
            </div>
        </section>
    );
};

export default StreakCard;