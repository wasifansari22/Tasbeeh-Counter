import React from 'react'
import { motion } from "framer-motion";
import styles from "./DailyReminder.module.css";

const DailyReminder = ({ reminder }) => {
    return (
        <motion.section
            className={styles.card}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={styles.header}>
                <span className={styles.emoji}>
                    {reminder.emoji}
                </span>

                <h3>Daily Reminder</h3>
            </div>

            <p className={styles.text}>"{reminder.text}"</p>

            <span className={styles.reference}>
                — {reminder.reference}
            </span>
        </motion.section>
    )
}

export default DailyReminder