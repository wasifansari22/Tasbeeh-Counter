import React, { useState } from "react";
import styles from "./SettingsCard.module.css";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { motion } from "framer-motion";
import useInstallPrompt from "../../hooks/useInstallPrompt";

const SettingsCard = ({ settings, setSettings, onReset }) => {

    const { status, installApp } = useInstallPrompt();
    const [showResetModal, setShowResetModal] = useState(false);

    const toggleSetting = (key) => {
        setSettings((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleConfirmReset = () => {
        onReset();
        setShowResetModal(false);
    };

    return (
        <>
            <section className={styles.card}>
                <h3 className={styles.heading}>Settings</h3>

                {/* vibrate */}
                <div className={styles.settings}>
                    <div className={styles.info}>
                        <h4>📳 Vibrate on Tap</h4>
                        <p>Vibrate the device whenever you tap the counter.</p>
                    </div>

                    <label className={styles.switch}>
                        <input
                            type="checkbox"
                            checked={settings.vibration}
                            onChange={() => toggleSetting("vibration")}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>

                {/* celebration */}
                <div className={styles.settings}>
                    <div className={styles.info}>
                        <h4>🎉 Celebration Effects</h4>
                        <p>Show celebration when a target is completed.</p>
                    </div>

                    <label className={styles.switch}>
                        <input
                            type="checkbox"
                            checked={settings.celebration}
                            onChange={() => toggleSetting("celebration")}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>

                {/* reminder */}
                <div className={styles.settings}>
                    <div className={styles.info}>
                        <h4>🌿 Daily Reminder</h4>
                        <p>Display a motivational reminder every day.</p>
                    </div>

                    <label className={styles.switch}>
                        <input
                            type="checkbox"
                            checked={settings.dailyReminder}
                            onChange={() => toggleSetting("dailyReminder")}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>

                {/* sound */}
                <div className={styles.settings}>
                    <div className={styles.info}>
                        <h4>🔊 Sound Effects - <span style={{ color: "#22c55e", fontSize: "1rem" }}>Coming Soon</span></h4>
                        <p>Play a soft click sound while counting.</p>
                    </div>

                    <label className={styles.switch}>
                        <input
                            type="checkbox"
                            // checked={settings.sound}
                            checked={false}
                            onChange={() => toggleSetting("sound")}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>

                {/* theme */}
                <div className={styles.settings}>
                    <div className={styles.info}>
                        <h4>🌙 Dark Theme - <span style={{ color: "#22c55e", fontSize: "1rem" }}>Coming Soon</span></h4>
                        <p>Use dark appearance throughout the app.</p>
                    </div>

                    <label className={styles.switch}>
                        <input
                            type="checkbox"
                            // checked={settings.darkTheme}
                            checked={false}
                            onChange={() => toggleSetting("darkTheme")}
                        />
                        <span className={styles.slider}></span>
                    </label>
                </div>

                {/* install card */}
                <div className={styles.installCard}>
                    <div>
                        <h4>📱 Install App</h4>
                        {status === "checking" && (
                            <p>Checking installation availability...</p>
                        )}
                        {status === "available" && (
                            <p>Install the app for offline access and a better experience.</p>
                        )}
                        {status === "installing" && (
                            <p>Opening installation prompt...</p>
                        )}
                        {status === "installed" && (
                            <p>✅ App is already installed.</p>
                        )}
                        {status === "unsupported" && (
                            <p>Installation isn't available right now. Try to Refresh/Reload the page once.</p>
                            // Try to Refresh/Reload the page once.
                        )}
                    </div>

                    {status === "available" && (
                        <button
                            className={styles.installButton}
                            onClick={installApp}
                        >
                            Install
                        </button>
                    )}
                </div>

                {/* reset section */}
                <div className={styles.resetSection}>
                    <h4>🗑 Reset Progress</h4>
                    <p>
                        This will permanently reset your
                        counts, lifetime statistics,
                        achievements and streak.
                    </p>

                    <button
                        className={styles.resetButton}
                        onClick={() => setShowResetModal(true)}
                    >
                        Reset Everything
                    </button>
                </div>
            </section>

            <ConfirmModal
                show={showResetModal}
                title="Reset Progress?"
                message="This action cannot be undone. Are you sure you want to reset all your progress?"
                onCancel={() => setShowResetModal(false)}
                onConfirm={handleConfirmReset}
            />

        </>
    );
};

export default SettingsCard;