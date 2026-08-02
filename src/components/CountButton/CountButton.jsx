import styles from "./CountButton.module.css";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

import React from 'react'

// sending props here from the App.jsx </CountButton/>
const CountButton = ({ onCount, isCompleted }) => {
    const handleClick = () => {
        onCount();
    }
    return (
        <div className={styles.wrapper}>
            <motion.button
                onClick={handleClick}
                className={`${styles.button} ${isCompleted ? styles.completed : ""}`}
                disabled={isCompleted}
                whileTap={!isCompleted ? { scale: 0.96, y: 2 } : {}}
                whileHover={!isCompleted ? { scale: 1.02 } : {}}
                transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 18,
                }}
            >
                {isCompleted ? (
                    <>
                        <FaCheck />
                        &nbsp;
                        Target Completed
                    </>
                ) : (
                    "Tap to Count"
                )}
            </motion.button>
        </div>
    )
}

export default CountButton