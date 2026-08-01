import { useMemo } from "react";
import styles from "./ReflectionCard.module.css";
import reflections from "../../data/reflections";
import React from 'react'

const ReflectionCard = () => {
    const reflection = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * reflections.length);
        return reflections[randomIndex];
    }, []);
    return (
        <section className={styles.card}>
            <h3 className={styles.heading}>🤲 Reflection of the Day</h3>

            <p className={styles.text}>"{reflection.text}"</p>
            <span className={styles.source}>— {reflection.source}</span>
        </section>
    );
};

export default ReflectionCard;