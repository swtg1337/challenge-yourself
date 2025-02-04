import React, { useState } from 'react'

import './Switch.scss'

interface SwitchProps {
    onChange?: (state: boolean) => void
}

const Switch: React.FC<SwitchProps> = ({ onChange }) => {
    const [isOn, setIsOn] = useState(false)

    const toggleSwitch = () => {
        setIsOn((prev) => {
            const newState = !prev
            if (onChange) onChange(newState)
            return newState
        })
    }

    return (
        <div className={`switch-container ${isOn ? 'on' : 'off'}`} onClick={toggleSwitch}>
            <div className={`switch-handle ${isOn ? 'on' : 'off'}`} />
        </div>
    )
}

export default Switch
