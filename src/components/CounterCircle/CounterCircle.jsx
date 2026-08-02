import React from 'react'
import styles from './CounterCircle.module.css'
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const CounterCircle = ({ count, target }) => {
    // const percentage = Math.round((count / target) * 100);
    const percentage = target > 0 ? Math.min(Math.round((count / target) * 100), 100) : 0;
    const progress = Math.min(count / target, 1);
    const radius = 78;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - progress * circumference;
    const isCompleted = count >= target;

    return (
        <section className={styles.wrapper}>
            <svg
                className={styles.svg}
                width="190"
                height="190"
            >
                {/* gradient definition */}
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#4ade80" />
                    </linearGradient>
                </defs>

                {/* background circle */}
                <circle
                    className={styles.bgCircle}
                    cx="95"
                    cy="95"
                    r={radius}
                />

                {/* animated progress */}
                <motion.circle
                    className={`${styles.progressCircle} ${isCompleted ? styles.completedRing : ""}`}
                    cx="95"
                    cy="95"
                    r={radius}
                    stroke="url(#gradient)"
                    strokeDasharray={circumference}
                    animate={{
                        strokeDashoffset: offset,
                    }}
                    transition={{
                        duration: 0.45,
                        ease: "easeInOut",
                    }}
                />

            </svg>

            {/* only the number stays inside the circle */}
            <motion.div
                className={`${styles.content} ${isCompleted ? styles.completedContent : ""}`}
            >
                <motion.h2
                    key={count}
                    className={isCompleted ? styles.completedNumber : ""}
                    animate={{
                        scale: isCompleted
                            ? [1, 1.15, 1]
                            : [1, 1.08, 1],
                    }}
                    transition={{
                        duration: 0.35,
                    }}
                >
                    {count}
                </motion.h2>

                <span>/{target}</span>
            </motion.div>

            {/* percentage goes below the circle */}
            <motion.p
                className={styles.status}
                key={Math.round(percentage)}
                initial={{ opacity: 0, y: 5, }}
                animate={{ opacity: 1, y: 0, }}
                transition={{ duration: 0.2, }}
            > {isCompleted ? (
                <>
                    <FaCheckCircle />
                    {" "}
                    Completed
                </>
            ) : (`${Math.round(percentage)}% Completed`)}
            </motion.p>

        </section>
    )
}

export default CounterCircle