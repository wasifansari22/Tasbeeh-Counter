import React from 'react'
import StatsCard from "../components/StatsCard/StatsCard";
import AchievementCard from '../components/AchievementCard/AchievementCard'
import StreakCard from '../components/StreakCard/StreakCard'
import Header from '../components/Header/Header';
import styles from "./Statistics.module.css";
import ReflectionCard from '../components/ReflectionCard/ReflectionCard';
import StatisticsSummary from '../components/StatisticsSummary/StatisticsSummary';
import achievements from '../data/achievements';

const Statistics = (props) => {
  return (
    <>
      <div className={styles.container}>
        {/* <Header /> */}
        <h2 className={styles.heading}>📊 Statistics</h2>

        <StatisticsSummary
          lifetimeCount={props.lifetimeCount}
          streak={props.streak}
          unlockedAchievements={props.unlockedAchievements}
          totalAchievements={achievements.length} />

        <StatsCard
          count={props.activeDhikr.count}
          target={props.activeDhikr.target}
          totalCount={props.totalCount}
          lifetimeCount={props.lifetimeCount}
        />

        <StreakCard streak={props.streak} />

        <AchievementCard unlockedAchievements={props.unlockedAchievements} />

        {/* <ReflectionCard /> */}

      </div>
    </>
  );
};

export default Statistics;