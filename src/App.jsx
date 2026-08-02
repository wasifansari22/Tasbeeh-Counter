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

const App = () => {
    // creating state containing all the Dhikrs.
    const [dhikrs, setDhikrs] = useLocalStorage(
        "dhikrs", initialDhikrs
    );
    // refactor code using custom hooks: original on excalidraw
    //every renders check LS, Now LS is checked only once when the app starts

    // tell which Dhikr is currently selected. (initially 1)
    const [activeDhikrId, setActiveDhikrId] = useLocalStorage(
        "activeDhikrId",
        1,
    );

    // toast
    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "info",
    })

    // streak 
    const [streak, setStreak] = useLocalStorage(
        "streak", {
        current: 0,
        best: 0,
        lastCompleted: null,
    });

    // achievements tracking- refactor code using custom hooks: original on excalidraw
    const [unlockedAchievements, setUnlockedAchievements] = useLocalStorage(
        "achievements",
        []
    );

    // settings
    const [settings, setSettings] = useLocalStorage(
        "settings",
        defaultSettings
    );

    // new achievements
    const [newAchievement, setNewAchievement] = useState(null);

    // celebration
    const [celebrate, setCelebrate] = useState(false);

    // celebration modal
    const [showCelebration, setShowCelebration] = useState(false);

    // used to store the timeout IDs
    const toastTimeout = useRef(null);

    // keeps track of whether we've already celebrated
    const hasCelebrated = useRef(false);

    const showToast = (message, type = "info") => {
        // cancel previous timeout
        if (toastTimeout.current) {
            clearTimeout(toastTimeout.current);
        }

        // hide current toast
        setToast({
            show: false,
            message: "",
            type: "info",
        });

        // show new toast
        setTimeout(() => {
            setToast({
                show: true,
                message,
                type,
            });
        }, 10);

        // auto hide
        toastTimeout.current = setTimeout(() => {
            setToast({
                show: false,
                message: "",
                type: "info",
            });
        }, 2500);
    };

    // achievement function
    const checkAchievements = () => {
        const stats = {
            totalCount,
            streak: streak.current,
        }
        achievements.forEach((achievement) => {
            // skip if already unlocked
            if (unlockedAchievements.includes(achievement.id)) {
                return;
            }

            // check condition
            if (achievement.condition(stats)) {
                // save achievement permanently
                setUnlockedAchievements((prev) => [
                    ...prev,
                    achievement.id,
                ]);

                // remember which achievement was unlocked
                setNewAchievement(achievement);

                // show toast
                showToast(`${achievement.icon} Achievement Unlocked: ${achievement.title}`, "success");
            }
        });
    }

    // find the currently selected Dhikr from the array (the upper state through Id)
    const activeDhikr = dhikrs.find(
        (dhikr) => dhikr.id === activeDhikrId
    );

    // user progress achievement
    const totalCount = dhikrs.reduce(
        (sum, dhikr) => sum + dhikr.count,
        0
    );

    // lifetime count
    const lifetimeCount = dhikrs.reduce(
        (sum, dhikr) => sum + (dhikr.lifetime || 0),
        0
    );

    // daily reminder calculation
    const today = new Date();
    const reminderIndex = today.getDate() % dailyReminders.length;
    const todayReminder = dailyReminders[reminderIndex];

    // save whenever data changes
    // refactor using custom hooks: useEffects original code on excalidraw

    // no need to manually call checkAchievements() every time
    // count eand streak changes, automatically checks achievments.
    useEffect(() => {
        checkAchievements();
    }, [totalCount, streak]);

    // update streak 
    // helper function
    const getTodayDate = () => {
        return new Date().toISOString().split("T")[0];
    };

    const updateStreak = () => {
        const today = getTodayDate();

        // first completion ever
        if (!streak.lastCompleted) {
            setStreak({
                current: 1,
                best: 1,
                lastCompleted: today,
            });
            return;
        }

        // already completed today
        if (streak.lastCompleted === today) {
            return;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split("T")[0];

        // continued the streak
        if (streak.lastCompleted === yesterdayString) {
            const newCurrent = streak.current + 1;
            setStreak({
                current: newCurrent,
                best: Math.max(streak.best || 0, newCurrent),
                lastCompleted: today,
            });
            return;
        }

        // missed one or more days
        setStreak({
            current: 1,
            best: Math.max(streak.best || 0, 1),
            lastCompleted: today,
        });
    };

    // core logic for the button
    const handleCount = () => {
        if (settings.vibration && navigator.vibrate) {
            navigator.vibrate(20);
        }

        // find the active dhikr first
        const currentDhikr = dhikrs.find(
            (dhikr) => dhikr.id === activeDhikrId
        );

        if (!currentDhikr) return;

        // don't count if target already reached
        if (currentDhikr.count >= currentDhikr.target) {
            return;
        }

        const newCount = currentDhikr.count + 1;

        // show celebration if target is completed
        if (newCount === currentDhikr.target) {
            // only runs when the user actually completes the target
            updateStreak();
            setShowCelebration(true);
        }

        // update only active dhikr
        setDhikrs((prevDhikrs) =>
            prevDhikrs.map((dhikr) =>
                // if the dhikr is selected by id: that objects only change
                dhikr.id === activeDhikrId ? {
                    // returns new array
                    ...dhikr,
                    // count new increment
                    count: newCount,
                    // lifetime: dhikr.lifetime + 1,
                    lifetime: (dhikr.lifetime || 0) + 1,
                } : dhikr
            )
        );
    }

    // handle reset ALL progress
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
        // setLifetimeCount(0);
        setUnlockedAchievements([]);
        setStreak({
            current: 0,
            best: 0,
            lastCompleted: null,
        });
        showToast("All progress has been reset.", "success");
    };

    // target update 
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

    // for reset button
    const handleReset = () => {
        setDhikrs((prevDhikrs) =>
            prevDhikrs.map((dhikr) => {
                if (dhikr.id !== activeDhikrId) {
                    return dhikr;
                }
                // resetting count to 0
                return {
                    ...dhikr,
                    count: 0,
                };
            })
        );
    };

    // never repeats until the user resets or increases the target.
    useEffect(() => {
        if (
            activeDhikr.count >= activeDhikr.target &&
            !hasCelebrated.current
        ) {
            hasCelebrated.current = true;
            // streaks logic
            const today = getToday();
            setStreak((prev) => {
                // already counted today
                if (prev.lastCompleted === today) {
                    return prev;
                }

                // first completion ever
                if (!prev.lastCompleted) {
                    return {
                        current: 1,
                        lastCompleted: today,
                    };
                }

                const diff = getDayDifference(prev.lastCompleted, today);

                // consecutive day
                if (diff === 1) {
                    return {
                        current: prev.current + 1,
                        lastCompleted: today,
                    };
                }

                // missed one or more days
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

                // confetti timing - for reference only
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