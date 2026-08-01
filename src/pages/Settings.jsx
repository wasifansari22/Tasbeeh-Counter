import React from 'react'
import SettingsCard from "../components/SettingsCard/SettingsCard"

const Settings = (props) => {
    return (
        <>
            <SettingsCard
                settings={props.settings}
                setSettings={props.setSettings}
                onReset={props.onReset}
            // showResetModal={props.showResetModal}
            // setShowResetModal={props.setShowResetModal}
            />
        </>
    )
}

export default Settings