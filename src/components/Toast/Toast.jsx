import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaInfoCircle, FaExclamationTriangle, } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import styles from './Toast.module.css';
import React from 'react'

const Toast = ({ message, show, type }) => {
    const icons = {
        success: <FaCheckCircle />,
        warning: <FaExclamationTriangle />,
        info: <FaInfoCircle />,
        celebration: <GiPartyPopper />,
    };
    return (
        <AnimatePresence>
            {
                show && (
                    <motion.div
                        className={`${styles.toast} ${styles[type]}`}
                        initial={{
                            opacity: 0,
                            x: "-50%",
                            y: -30,
                        }}
                        animate={{
                            opacity: 1,
                            x: "-50%",
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            x: "-50%",
                            y: -30,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                    >

                        <div className={styles.content}>
                            <span className={styles.icon}>
                                {icons[type]}
                            </span>

                            <span>{message}</span>
                        </div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

export default Toast