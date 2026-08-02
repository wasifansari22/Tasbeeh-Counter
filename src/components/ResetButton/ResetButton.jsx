import styles from "./ResetButton.module.css";
import { FaRotateLeft } from "react-icons/fa6";
import { useState } from "react";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

import React from 'react'

const ResetButton = ({ onReset }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className={styles.wrapper}>
                <button onClick={() => setShowModal(true)} className={styles.button}>
                    <FaRotateLeft />
                    <span>Reset Session</span>
                </button>
            </div>

            <ConfirmModal
                show={showModal}
                title="Reset Current Dhikr?"
                message="Your current dhikr count will be reset to zero. Your lifetime count, streak, and achievements will not be affected."
                onCancel={() => setShowModal(false)}
                onConfirm={() => {
                    onReset();
                    setShowModal(false);
                }}
            />

        </>
    )
}

export default ResetButton