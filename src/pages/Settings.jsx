import React from 'react'
import SettingsCard from "../components/SettingsCard/SettingsCard"

const Settings = (props) => {
    return (
        <>
            <SettingsCard
                settings={props.settings}
                setSettings={props.setSettings}
                onReset={props.onReset}
            />
        </>
    )
}

export default Settings