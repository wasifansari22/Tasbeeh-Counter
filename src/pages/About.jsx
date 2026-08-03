import React from 'react'
import AboutCard from '../components/AboutCard/AboutCard'
import Header from '../components/Header/Header'
import styles from "./About.module.css";

const About = () => {
    return (
        <main className={styles.container}>
            <Header />
            <h2 className={styles.heading}>ℹ️ About</h2>

            <AboutCard />
        </main>
    )
}

export default About;