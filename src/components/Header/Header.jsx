import { header, style } from 'framer-motion/client'
import React from 'react'
import styles from './Header.module.css'
import { FaMosque, FaCog } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate();
    return (
        <header className={styles.header}>
            <button className={styles.settingsBtn}
                onClick={() => navigate('/settings')}>
                <FaCog />
            </button>

            <div className={styles.iconWrapper}>
                <FaMosque className={styles.icon} />
            </div>

            <h1>Tasbeeh Counter</h1>
            <p>Count your daily dhikr with ease</p>
        </header>
    )
}

export default Header;