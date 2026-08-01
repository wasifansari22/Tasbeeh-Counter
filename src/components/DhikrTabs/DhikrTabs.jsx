import React from 'react'
import { button, style } from 'framer-motion/client';
import styles from './DhikrTabs.module.css';

const DhikrTabs = ({ dhikrs, activeDhikrId, onChangeDhikr }) => {
    return (
        <section className={styles.tabsContainer}>
            {dhikrs.map((dhikr) => (
                <button key={dhikr.id}
                    className={`${styles.tab} ${activeDhikrId === dhikr.id ? styles.active : ""
                        }`} onClick={() => onChangeDhikr(dhikr.id)}>{dhikr.name}</button>
            ))}
        </section>
    )
}

export default DhikrTabs