import styles from "./ConfirmModal.module.css";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

const ConfirmModal = ({ show, title, message, onCancel, onConfirm, }) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className={styles.overlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>

                    <motion.div
                        className={styles.modal}
                        initial={{ scale: .8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: .8, opacity: 0 }}>
                        <h2>{title}</h2>

                        <p>{message}</p>

                        <div className={styles.buttons}>
                            <button
                                className={styles.cancel}
                                onClick={onCancel}
                            >Cancel
                            </button>

                            <button
                                className={styles.confirm}
                                onClick={onConfirm}
                            >Reset
                            </button>
                        </div>
                    </motion.div>

                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmModal;

