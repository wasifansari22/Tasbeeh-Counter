const achievements = [
    {
        id: 1,
        title: "First Step",
        description: "Complete your first dhikr.",
        icon: "🌱",
        type: "count",
        goal: 1,
        condition: (stats) => stats.totalCount >= 1,
    },

    {
        id: 2,
        title: "Century",
        description: "Complete 100 total dhikr.",
        icon: "💯",
        type: "count",
        goal: 100,
        condition: (stats) => stats.totalCount >= 100,
    },

    {
        id: 3,
        title: "Dedicated",
        description: "Reach a 7-day streak.",
        icon: "🔥",
        type: "streak",
        goal: 7,
        condition: (stats) => stats.streak >= 7,
    },

    {
        id: 4,
        title: "Master of Dhikr",
        description: "Complete 1000 total dhikr.",
        icon: "👑",
        type: "count",
        goal: 1000,
        condition: (stats) => stats.totalCount >= 1000,
    },
];

export default achievements;

