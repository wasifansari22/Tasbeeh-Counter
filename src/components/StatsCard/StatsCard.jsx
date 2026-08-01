import React from "react";
import styles from "./StatsCard.module.css";
import { motion } from "framer-motion";

const StatsCard = ({ count, target, totalCount, lifetimeCount }) => {
    const remaining = Math.max(target - count, 0);
    const percentage = target === 0 ? 0 : Math.round((count / target) * 100);

    return (
        <section className={styles.card}>

            <h3 className={styles.heading}>
                📊 Today's Progress
            </h3>

            <div className={styles.progress}>
                <strong>
                    {count} / {target}
                </strong>

                <span>
                    {percentage}% Completed
                </span>

                <div className={styles.progressBar}>
                    <motion.div
                        className={styles.progressFill}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                        }}
                    />
                </div>

            </div>

            <div className={styles.grid}>
                <div className={styles.item}>
                    <span>Completed</span>
                    <strong>{count}</strong>
                </div>

                <div className={styles.item}>
                    <span>Remaining</span>
                    <strong>{remaining}</strong>
                </div>

                <div className={styles.item}>
                    <span>Lifetime</span>
                    <strong>{lifetimeCount}</strong>
                </div>

                <div className={styles.item}>
                    <span>Target</span>
                    <strong>{target}</strong>
                </div>
            </div>

        </section>
    );
};

export default StatsCard;
