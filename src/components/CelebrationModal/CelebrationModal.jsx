import { AnimatePresence, motion } from "framer-motion";
import styles from "./CelebrationModal.module.css";
import React from 'react'
import celebrationMessages from "../../data/celebrationMessages";
import { useMemo } from "react";
import Confetti from 'react-confetti';
import { FaTimes } from "react-icons/fa";

const CelebrationModal = ({ show, onClose, count, target, achievement }) => {
    const randomMessage = useMemo(() => {
        return celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)]
    }, [show]);

    return (
        <AnimatePresence>
            {show && (
                <>
                    <Confetti
                        width={window.innerWidth}
                        height={window.innerHeight}
                        recycle={false}
                        numberOfPieces={180}
                        gravity={0.25}
                    />

                    <motion.div
                        className={styles.overlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className={styles.modal}
                            initial={{
                                scale: 0.8,
                                opacity: 0
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1
                            }}
                            exit={{
                                scale: 0.8,
                                opacity: 0
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                        >
                            {/* close button */}
                            <button
                                className={styles.closeButton}
                                onClick={onClose}
                                aria-label="Close">
                                <FaTimes />
                            </button>
                            <h2>🎉 Alhamdulillah!</h2>
                            <p>You completed your target.</p>
                            <h3>{count} / {target}</h3>
                            <p>{randomMessage}</p>

                            {/* more upgrade for celebration modal */}
                            {
                                achievement && (
                                    <motion.div
                                        className={styles.achievement}
                                        initial={{
                                            opacity: 0,
                                            y: 20,
                                            scale: 0.9,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            u: 0,
                                            scale: 1,
                                        }}
                                        transition={{
                                            delay: 0.25,
                                            duration: 0.35,
                                        }}
                                    >
                                        <h4>🏆 Achievement Unlocked!</h4>
                                        <div className={styles.achievementIcon}>
                                            {achievement.icon}
                                        </div>
                                        <h3>{achievement.title}</h3>
                                        <p>{achievement.description}</p>
                                    </motion.div>
                                )
                            }
                            <button className={styles.button} onClick={onClose}>Continue</button>

                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default CelebrationModal