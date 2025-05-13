import { useEffect, useState } from 'react'
import ChallengeModal from '../../components/challengeModal'
import Card from '../../components/card'
import { useDispatch, useSelector } from 'react-redux'
import { type AppDispatch, type RootState } from '../../store/store.ts'
import { deleteChallenge, fetchChallenges } from '../../store/challengeSlice.ts'
import './challenge.style.pcss'
import Layout from '../../components/layout'
import DeleteChallengeModal from '../../components/deleteChallengeModal'

const Challenges = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [challengeToDelete, setChallengeToDelete] = useState<string | null>(null)

    const dispatch = useDispatch<AppDispatch>()
    const { items: challenges, loading, error } = useSelector((state: RootState) => state.challenges)

    useEffect(() => {
        dispatch(fetchChallenges())
    }, [dispatch])

    const onChallengeCreated = () => {
        dispatch(fetchChallenges())
    }

    const handleDeleteRequest = (id: string) => {
        setChallengeToDelete(id)
        setIsDeleteModalOpen(true)
    }

    const handleDeleteConfirm = () => {
        if (challengeToDelete) {
            dispatch(deleteChallenge(challengeToDelete))
            setIsDeleteModalOpen(false)
        }
    }

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false)
        setChallengeToDelete(null)
    }

    return (
        <Layout>
            <div className="container">
                <button onClick={() => setIsModalOpen(true)}>Создать челлендж</button>
                <ChallengeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onChallengeCreated={onChallengeCreated}/>

                <DeleteChallengeModal
                    isOpen={isDeleteModalOpen}
                    onClose={handleDeleteCancel}
                    onDeleteConfirm={handleDeleteConfirm}
                    challengeId={challengeToDelete}
                />

                {loading && <p>Загрузка...</p>}
                {error && <p className="error">{error}</p>}

                <div className="cards-container">
                    {challenges.length > 0 ? (
                        challenges.map((el) => (
                            <Card
                                key={el.id}
                                id={el.id}
                                title={el.title}
                                description={el.description}
                                completedDays={el.completedDays}
                                totalDays={el.totalDays}
                                onDelete={handleDeleteRequest} // Обработчик для удаления
                                isCompletedToday={el.isCompletedToday}
                                isFullyCompleted={el.isFullyCompleted}
                            />
                        ))
                    ) : (
                        <p>Челленджей пока нет</p>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default Challenges
