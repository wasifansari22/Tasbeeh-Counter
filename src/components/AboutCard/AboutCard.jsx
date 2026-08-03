import React from 'react'
import { motion } from "framer-motion";
import styles from "./AboutCard.module.css";

// features
const features = [
    {
        icon: "📿",
        title: "Track Your Dhikr",
        description: "Count your daily remembrance with ease."
    },
    {
        icon: "🔥",
        title: "Daily Streak",
        description: "Stay consistent and build your streak."
    },
    {
        icon: "🏆",
        title: "Achievements",
        description: "Unlock milestones as you progress."
    },
    {
        icon: "📊",
        title: "Statistics",
        description: "Monitor your lifetime progress."
    }
];

const AboutCard = () => {
    return (
        <motion.section
            className={styles.card}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
        >

            <div className={styles.header}>
                <h2>About Tasbeeh Counter</h2>
                <p>Your digital companion for daily Dhikr</p>

                <span className={styles.version}>
                    Version 1.0.0
                </span>
            </div>

            <p className={styles.description}>
                A peaceful companion to help you stay consistent
                with your daily remembrance of Allah through
                beautiful progress tracking, achievements and
                streaks.
            </p>

            <div className={styles.features}>
                {features.map((feature) => (
                    <motion.div
                        key={feature.title}
                        className={styles.feature}
                        whileHover={{
                            scale: 1.02,
                            y: -2
                        }}
                    >
                        <span className={styles.icon}>
                            {feature.icon}
                        </span>

                        <div>
                            <h4>{feature.title}</h4>
                            <p>{feature.description}</p>
                        </div>

                    </motion.div>
                ))}
            </div>

            {/* footer */}
            <div className={styles.footer}>
                <p className={styles.dua}> 🤲 May Allah accept your Dhikr. Ameen.</p>
                <div className={styles.divider}></div>
                <h4>Built with ❤️ by Mohammed Wasif</h4>
                <p className={styles.copyright}> Version 1.0.0 • © 2026</p>
            </div>
        </motion.section>
    );
};

export default AboutCard;