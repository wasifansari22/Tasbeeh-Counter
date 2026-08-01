import { NavLink } from "react-router-dom";
import React from 'react'
import { FaHome, FaChartBar, FaCog, FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import styles from "./BottomNavigation.module.css";

const BottomNavigation = () => {
    return (
        <nav className={styles.nav}>
            <NavLink to="/"
                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
            >
                <motion.div whileTap={{ scale: 0.9 }}>
                    <FaHome />
                    <span>Home</span>
                </motion.div>
            </NavLink>

            <NavLink to="/stats"
                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}
            >
                <motion.div whileTap={{ scale: 0.9 }}>
                    <FaChartBar />
                    <span>Stats</span>
                </motion.div>
            </NavLink>

            <NavLink to="/settings"
                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`} >
                <motion.div whileTap={{ scale: 0.9 }}>
                    <FaCog />
                    <span>Settings</span>
                </motion.div>
            </NavLink>

            <NavLink to="/about"
                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`} >
                <motion.div whileTap={{ scale: 0.9 }}>
                    <FaInfoCircle />
                    <span>About</span>
                </motion.div>
            </NavLink>
        </nav>
    )
}

export default BottomNavigation;