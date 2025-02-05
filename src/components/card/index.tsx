import React from 'react'
import './card.style.scss'

// import classNames from 'classnames'

interface CardProps {
    title: string
    description?: string
    totalDays?: number
    completedDays: number
}

const Card: React.FC<CardProps> = ({ title, description, completedDays, totalDays }) => {

    return (
        <div className="card">
            {title}
            {description}
            {`${completedDays}${totalDays ? `/${totalDays}` : ''}`}
        </div>
    )
}

export default Card