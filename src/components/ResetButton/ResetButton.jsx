import styles from "./ResetButton.module.css";
import { FaRotateLeft } from "react-icons/fa6";

import React from 'react'

const ResetButton = ({ onReset }) => {
    // confirmation before reset
    const handleClick = () => {
        const confirmed = window.confirm("Are you sure you want to reset this Dhikr?");
        if (confirmed) {
            onReset();
        }
    };

    return (
        <div className={styles.wrapper}>
            <button onClick={handleClick} className={styles.button}>
                <FaRotateLeft />
                <span>Reset Counter</span>
            </button>
        </div>
    )
}

export default ResetButton