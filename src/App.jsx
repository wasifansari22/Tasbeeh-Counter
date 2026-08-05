import React, { useState, useEffect, useRef } from 'react'
import Layout from './components/Layout/Layout'
import Header from './components/Header/Header'
import DhikrTabs from './components/DhikrTabs/DhikrTabs'
import CounterCircle from './components/CounterCircle/CounterCircle'
import TargetCard from './components/TargetCard/TargetCard'
import CountButton from './components/CountButton/CountButton'
import ResetButton from './components/ResetButton/ResetButton'
import initialDhikrs from './data/dhikrData'
import StatsCard from './components/StatsCard/StatsCard'
import Toast from './components/Toast/Toast'
import Celebration from './components/Celebration/Celebration'
import StreakCard from './components/StreakCard/StreakCard'
import { getToday, getDayDifference } from './utils/streakUtils'
import achievements from './data/achievements'
import AchievementCard from './components/AchievementCard/AchievementCard'
import useLocalStorage from './hooks/useLocalStorage'
import CelebrationModal from './components/CelebrationModal/CelebrationModal'
import dailyReminders from './data/dailyReminders'
import DailyReminder from './components/DailyReminder/DailyReminder'
import defaultSettings from './data/defaultSettings'
import SettingsCard from './components/SettingsCard/SettingsCard'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Statistics from './pages/Statistics'
import Settings from './pages/Settings'
import BottomNavigation from './components/BottomNavigation/BottomNavigation'
import About from './pages/About'
import useInstallPrompt from './hooks/useInstallPrompt'

const App = () => {
    
    const { status, installApp } = useInstallPrompt();

    const [dhikrs, setDhikrs] = useLocalStorage(
        "dhikrs", initialDhikrs
    );

    const [activeDhikrId, setActiveDhikrId] = useLocalStorage(
        "activeDhikrId",
        1,
    );

    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "info",
    })

    const [streak, setStreak] = useLocalStorage(
        "streak", {
        current: 0,
        best: 0,
        lastCompleted: null,
    });

    const [unlockedAchievements, setUnlockedAchievements] = useLocalStorage(
        "achievements",
        []
    );

    const [settings, setSettings] = useLocalStorage(
        "settings",
        defaultSettings
    );

    const [newAchievement, setNewAchievement] = useState(null);

    const [celebrate, setCelebrate] = useState(false);

    const [showCelebration, setShowCelebration] = useState(false);

    const toastTimeout = useRef(null);

    const hasCelebrated = useRef(false);

    const showToast = (message, type = "info") => {
        if (toastTimeout.current) {
            clearTimeout(toastTimeout.current);
        }

        setToast({
            show: false,
            message: "",
            type: "info",
        });

        setTimeout(() => {
            setToast({
                show: true,
                message,
                type,
            });
        }, 10);

        toastTimeout.current = setTimeout(() => {
            setToast({
                show: false,
                message: "",
                type: "info",
            });
        }, 2500);
    };

    const checkAchievements = () => {
        const stats = {
            totalCount,
            streak: streak.current,
        }
        achievements.forEach((achievement) => {
            if (unlockedAchievements.includes(achievement.id)) {
                return;
            }

            if (achievement.condition(stats)) {
                setUnlockedAchievements((prev) => [
                    ...prev,
                    achievement.id,
                ]);
                setNewAchievement(achievement);
                showToast(`${achievement.icon} Achievement Unlocked: ${achievement.title}`, "success");
            }
        });
    }

    const activeDhikr = dhikrs.find(
        (dhikr) => dhikr.id === activeDhikrId
    );

    const totalCount = dhikrs.reduce(
        (sum, dhikr) => sum + dhikr.count,
        0
    );

    const lifetimeCount = dhikrs.reduce(
        (sum, dhikr) => sum + (dhikr.lifetime || 0),
        0
    );

    const today = new Date();
    const reminderIndex = today.getDate() % dailyReminders.length;
    const todayReminder = dailyReminders[reminderIndex];

    useEffect(() => {
        checkAchievements();
    }, [totalCount, streak]);

    const getTodayDate = () => {
        return new Date().toISOString().split("T")[0];
    };

    const updateStreak = () => {
        const today = getTodayDate();
        if (!streak.lastCompleted) {
            setStreak({
                current: 1,
                best: 1,
                lastCompleted: today,
            });
            return;
        }

        if (streak.lastCompleted === today) {
            return;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split("T")[0];

        if (streak.lastCompleted === yesterdayString) {
            const newCurrent = streak.current + 1;
            setStreak({
                current: newCurrent,
                best: Math.max(streak.best || 0, newCurrent),
                lastCompleted: today,
            });
            return;
        }
        setStreak({
            current: 1,
            best: Math.max(streak.best || 0, 1),
            lastCompleted: today,
        });
    };

    const handleCount = () => {
        if (settings.vibration && navigator.vibrate) {
            navigator.vibrate(20);
        }

        const currentDhikr = dhikrs.find(
            (dhikr) => dhikr.id === activeDhikrId
        );

        if (!currentDhikr) return;

        if (currentDhikr.count >= currentDhikr.target) {
            return;
        }

        const newCount = currentDhikr.count + 1;
        if (newCount === currentDhikr.target) {
            updateStreak();
            setShowCelebration(true);
        }

        setDhikrs((prevDhikrs) =>
            prevDhikrs.map((dhikr) =>
                dhikr.id === activeDhikrId ? {
                    ...dhikr,
                    count: newCount,
                    lifetime: (dhikr.lifetime || 0) + 1,
                } : dhikr
            )
        );
    }

    const handleResetAll = () => {
        setDhikrs((prevDhikrs) =>
            prevDhikrs.map((dhikr) => (
                {
                    ...dhikr,
                    count: 0,
                    lifetime: 0,
                }
            ))
        );
        setUnlockedAchievements([]);
        setStreak({
            current: 0,
            best: 0,
            lastCompleted: null,
        });
        showToast("All progress has been reset.", "success");
    };

    const updateTarget = (newTarget) => {

        setDhikrs((prevDhikrs) =>
            prevDhikrs.map((dhikr) => {
                if (dhikr.id !== activeDhikrId) {
                    return dhikr;
                }
                return {
                    ...dhikr,
                    target: Number(newTarget),
                }
            })
        );
    }

    const increaseTarget = () => {
        updateTarget(activeDhikr.target + 1);
    }

    const decreaseTarget = () => {
        if (activeDhikr.target <= activeDhikr.count) {
            showToast(`Your target must be at least ${activeDhikr.count}`, "warning");
            return;
        }
        updateTarget(activeDhikr.target - 1);
    }

    const canDecrease = activeDhikr.target > Math.max(1, activeDhikr.count);

    const handleReset = () => {
        setDhikrs((prevDhikrs) =>
            prevDhikrs.map((dhikr) => {
                if (dhikr.id !== activeDhikrId) {
                    return dhikr;
                }
                return {
                    ...dhikr,
                    count: 0,
                };
            })
        );
    };

    useEffect(() => {
        if (
            activeDhikr.count >= activeDhikr.target &&
            !hasCelebrated.current
        ) {
            hasCelebrated.current = true;
            const today = getToday();
            setStreak((prev) => {
                if (prev.lastCompleted === today) {
                    return prev;
                }

                if (!prev.lastCompleted) {
                    return {
                        current: 1,
                        lastCompleted: today,
                    };
                }

                const diff = getDayDifference(prev.lastCompleted, today);
                if (diff === 1) {
                    return {
                        current: prev.current + 1,
                        lastCompleted: today,
                    };
                }

                return {
                    current: 1,
                    lastCompleted: today,
                };
            });
            showToast(
                "🤲 Alhamdulillah! Target Completed!",
                "celebration",
            );

            if (settings.celebration) {
                setCelebrate(true);
                setTimeout(() => {
                    setCelebrate(false);
                }, 5000);
            }
        }
        if (activeDhikr.count < activeDhikr.target) {
            hasCelebrated.current = false;
        }
    }, [activeDhikr]);

    return (
        <>
            <Layout>
                <Routes>
                    <Route
                        path="/"
                        element={<Home
                            toast={toast}
                            celebrate={celebrate}
                            dhikrs={dhikrs}
                            activeDhikr={activeDhikr}
                            activeDhikrId={activeDhikrId}
                            setActiveDhikrId={setActiveDhikrId}
                            handleCount={handleCount}
                            handleReset={handleReset}
                            updateTarget={updateTarget}
                            increaseTarget={increaseTarget}
                            decreaseTarget={decreaseTarget}
                            showToast={showToast}
                            showCelebration={showCelebration}
                            setShowCelebration={setShowCelebration}
                            newAchievement={newAchievement}
                            setNewAchievement={setNewAchievement}
                            settings={settings}
                            todayReminder={todayReminder}
                        />}
                    />

                    <Route
                        path="/stats"
                        element={<Statistics
                            streak={streak}
                            unlockedAchievements={unlockedAchievements}
                            activeDhikr={activeDhikr}
                            lifetimeCount={lifetimeCount}
                        />}
                    />

                    <Route
                        path="/settings"
                        element={<Settings
                            settings={settings}
                            setSettings={setSettings}
                            onReset={handleResetAll}
                            status={status}
                            installApp={installApp}
                        />}
                    />

                    <Route
                        path="/about"
                        element={<About />}
                    />
                </Routes>
                <BottomNavigation />
            </Layout>
        </>
    )
}

export default App