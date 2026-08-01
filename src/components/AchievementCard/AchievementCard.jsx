import styles from "./AchievementCard.module.css";
import achievements from "../../data/achievements";
import React from 'react';
import { motion } from "framer-motion";

const AchievementCard = ({ unlockedAchievements }) => {
    return (
        <section className={styles.card}>
            <h3>🏆 Achievements</h3>

            {achievements.map((achievement) => {
                const unlocked = unlockedAchievements.includes(achievement.id);
                return (
                    <motion.div
                        key={achievement.id}
                        className={`${styles.item} ${unlocked ? styles.unlocked : ""
                            }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: unlocked ? 1.02 : 1
                        }}
                        transition={{
                            duration: 0.35
                        }}
                        whileHover={{ y: -4, scale: 1.02 }}
                    >
                        <span className={styles.icon}>
                            {achievement.icon}
                        </span>

                        <div className={styles.content}>
                            <h4>{achievement.title}</h4>
                            <p>{achievement.description}</p>

                            <span
                                className={
                                    unlocked
                                        ? styles.badgeUnlocked
                                        : styles.badgeLocked
                                }
                            >
                                {unlocked ? "Unlocked" : "Locked"}
                            </span>
                        </div>

                    </motion.div>
                );
            })}
        </section>
    );
};

export default AchievementCard