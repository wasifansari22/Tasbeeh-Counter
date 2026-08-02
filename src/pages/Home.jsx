import React from 'react'
import Header from "../components/Header/Header";
import DhikrTabs from "../components/DhikrTabs/DhikrTabs";
import CounterCircle from "../components/CounterCircle/CounterCircle";
import TargetCard from "../components/TargetCard/TargetCard";
import CountButton from "../components/CountButton/CountButton";
import ResetButton from "../components/ResetButton/ResetButton";
import Toast from "../components/Toast/Toast";
import Celebration from "../components/Celebration/Celebration";
import CelebrationModal from "../components/CelebrationModal/CelebrationModal";
import styles from "./Home.module.css";

const Home = (props) => {
    return (
        <main className={styles.container}>
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