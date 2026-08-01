import styles from "./StatisticsSummary.module.css";
import React from 'react'

const StatisticsSummary = ({ lifetimeCount, streak, unlockedAchievements, totalAchievements }) => {
    return (
        <section className={styles.card}>
            <div className={styles.item}>
                <span>📿</span>
                <h2>{lifetimeCount}</h2>
                <p>Lifetime Dhikr</p>
            </div>

            <div className={styles.item}>
                <span>🔥</span>
                <h2>{streak.current}</h2>
                <p>Current Streak</p>
            </div>

            <div className={styles.item}>
                <span>🏆</span>
                <h2>{unlockedAchievements.length}/{totalAchievements}</h2>
                <p>Achievements</p>
            </div>
        </section>
    )
}

export default StatisticsSummary;