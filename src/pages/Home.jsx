import React, { useEffect, useState } from 'react'
import Header from "../components/Header/Header";
import DhikrTabs from "../components/DhikrTabs/DhikrTabs";
import CounterCircle from "../components/CounterCircle/CounterCircle";
import TargetCard from "../components/TargetCard/TargetCard";
import CountButton from "../components/CountButton/CountButton";
import ResetButton from "../components/ResetButton/ResetButton";
import Toast from "../components/Toast/Toast";
import Celebration from "../components/Celebration/Celebration";
import CelebrationModal from "../components/CelebrationModal/CelebrationModal";
import DailyReminder from '../components/DailyReminder/DailyReminder';
import styles from "./Home.module.css";

const Home = (props) => {
    const [showReminder, setShowReminder] = useState(false);
    useEffect(() => {
        if (!props.settings.dailyReminder) return;
        const today = new Date().toDateString();
        const lastShown = localStorage.getItem("dailyReminderDate");

        if (lastShown !== today) {
            setShowReminder(true);
            localStorage.setItem("dailyReminderDate", today);

            const timer = setTimeout(() => {
                setShowReminder(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [props.settings.dailyReminder]);

    return (
        <main className={styles.container}>

            {showReminder && (
                <DailyReminder
                    reminder={props.todayReminder}
                    onClose={() => setShowReminder(false)}
                />
            )}

            <Celebration show={props.celebrate} />
            <Toast show={props.toast.show} message={props.toast.message} type={props.toast.type} />
            <Header />
            <DhikrTabs dhikrs={props.dhikrs} activeDhikrId={props.activeDhikrId} onChangeDhikr={props.setActiveDhikrId} />
            <CounterCircle count={props.activeDhikr.count} target={props.activeDhikr.target} />

            <TargetCard target={props.activeDhikr.target} count={props.activeDhikr.count} showToast={props.showToast} onIncrease={props.increaseTarget} onDecrease={props.decreaseTarget} onTargetChange={props.updateTarget} />

            <CountButton onCount={props.handleCount} isCompleted={props.activeDhikr.count >= props.activeDhikr.target} />
            <ResetButton onReset={props.handleReset} />

            <CelebrationModal
                show={props.showCelebration}
                onClose={() => {
                    props.setShowCelebration(false);
                }}
                count={props.activeDhikr.count}
                target={props.activeDhikr.target}
            />

        </main>
    )
}

export default Home