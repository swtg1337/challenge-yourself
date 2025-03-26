import React, { useState } from 'react'
import Modal from '../modal'
import './challengeModal.style.pcss'
import { useDispatch } from 'react-redux'
import { addChallenge } from '../../store/challengeSlice.ts'

type ChallengeModalProps = {
    isOpen: boolean
    onClose: () => void
    onChallengeCreated: () => void
}

const ChallengeModal: React.FC<ChallengeModalProps> = ({ isOpen, onClose, onChallengeCreated }) => {
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [totalDays, setTotalDays] = useState<string>('')
    const [error, setError] = useState<string>('')
    const dispatch = useDispatch()

    const handleClose = () => {
        onClose()
        setError('')
    }

    const handleSubmit = async () => {
        if (!title) {
            setError('Введите название челеннджа')
            return
        }

        try {
            const response = await fetch("http://localhost:3001/challenges", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    description: description || null,
                    totalDays: totalDays ? Number(totalDays) : null,
                    isCompletedToday: false
                }),
            })

            if (response.ok) {
                const data = await response.json()
                const newChallenge = {
                    id: data.id,
                    title,
                    description,
                    totalDays: totalDays ? Number(totalDays) : undefined,
                    completedDays: 0,
                    isCompletedToday: false
                }

                dispatch(addChallenge(newChallenge))

                setTitle('')
                setDescription('')
                setTotalDays('')
                setError('')

                onChallengeCreated()
                onClose()
            } else {
                const data = await response.json()
                setError(data.error || 'Ошибка создания челленджа')
            }
        } catch (error) {
            console.error('Ошибка:', error)
            setError('Ошибка запроса')
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Проверяем, состоит ли значение только из цифр
        const value = e.target.value;

        // Разрешаем только цифры (пустая строка тоже разрешена)
        if (/^\d*$/.test(value)) {
            setTotalDays(value);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Запрещаем ввод символа '-'
        if (e.key === '-' || e.key === 'e' || e.key === '.') {
            e.preventDefault();
        }
    }

    return  (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <div className="modal-content">
                <h2>Создать челлендж</h2>
                <input
                    type="text"
                    placeholder="Название челленджа"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Описание (по желанию)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Количество дней челленджа (по желанию)"
                    value={totalDays}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                {error && <div className="error">{error}</div>}
                <button className="create-challenge-btn" onClick={handleSubmit}>Создать</button>
            </div>
        </Modal>
    )
}

export default ChallengeModal