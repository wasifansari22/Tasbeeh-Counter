import { style } from 'framer-motion/client'
import styles from './ProgressCard.module.css'
import React from 'react'

const ProgressCard = ({ count, target }) => {
    const percentage = Math.min((count / target) * 100, 100);
    return (
        <section className={styles.card}>
            <div className={styles.header}>
                <h3>Progress</h3>
                <span>{Math.round(percentage)}%</span>
            </div>

            <div className={styles.progressBar}>
                <div className={styles.progress} style={{
                    width: `${percentage}%`,
                }}>
                </div>
            </div>
        </section>
    )
}

export default ProgressCard