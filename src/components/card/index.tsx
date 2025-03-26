import React from 'react'
import './card.style.pcss'
import { useDispatch } from 'react-redux'
import { toggleCompletedDay } from '../../store/challengeSlice'
import { AppDispatch } from '../../store/store'

type CardProps = {
    id: string
    title: string
    description?: string
    totalDays?: number
    completedDays: number
    isCompletedToday: boolean
    onDelete: (id: string) => void
}

const Card: React.FC<CardProps> = ({ id, title, description, completedDays, totalDays, isCompletedToday, onDelete }) => {
    const dispatch = useDispatch<AppDispatch>()

    const handleToggle = () => {
        dispatch(toggleCompletedDay(id))
    }

    return (
        <div className="card">
            <h3 className="card-title">{title}</h3>
            {description && <p className="card-description">{description}</p>}
            <p className="card-progress">
                {completedDays}{totalDays ? ` / ${totalDays}` : ''}
            </p>

            <button className="card-button" onClick={() => onDelete(id)}>Удалить</button>

            Выполнен сегодня
            <label className="card-switch">
                <input
                    type="checkbox"
                    checked={isCompletedToday}
                    onChange={handleToggle}
                />
                <span className="slider"></span>
            </label>
        </div>
    )
}

export default Card
