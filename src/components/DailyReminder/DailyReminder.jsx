import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./DailyReminder.module.css";
import { FaTimes } from "react-icons/fa";

const DailyReminder = ({ reminder, onClose }) => {
    const [show, setShow] = useState(true);
    useEffect(() => {

        const timer = setTimeout(() => {
            setShow(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.section
                    className={styles.card}
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: .35 }}
                >
                    <div className={styles.header}>
                        <span className={styles.emoji}>
                            {reminder.emoji}
                        </span>

                        <h3>Daily Reminder</h3>
                    </div>

                    <p className={styles.text}>
                        "{reminder.text}"
                    </p>

                    <span className={styles.reference}>
                        — {reminder.reference}
                    </span>

                    <button
                        className={styles.closeBtn}
                        onClick={onClose}
                    >
                        <FaTimes />
                    </button>

                </motion.section>
            )}
        </AnimatePresence>
    );
};

export default DailyReminder;