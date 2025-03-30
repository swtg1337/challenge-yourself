import { useEffect, useState } from 'react'
import ChallengeModal from '../../components/challengeModal'
import Card from '../../components/card'
import { useDispatch, useSelector } from 'react-redux'
import { type AppDispatch, type RootState } from '../../store/store.ts'
import { deleteChallenge, fetchChallenges } from '../../store/challengeSlice.ts'
import './challenge.style.pcss'
import Layout from '../../components/layout'

const Challenges = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const { items: challenges, loading, error } = useSelector((state: RootState) => state.challenges)

    useEffect(() => {
        dispatch(fetchChallenges());
    }, [])

    const onChallengeCreated = () => {
        dispatch(fetchChallenges())
    }

    const handleDelete = (id: string) => {
        dispatch(deleteChallenge(id))
    }

    return (
        <Layout>
            <div className="container">
                <button onClick={() => setIsModalOpen(true)}>Создать челлендж</button>
                <ChallengeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onChallengeCreated={onChallengeCreated}/>

                {loading && <p>Загрузка...</p>}
                {error && <p className="error">{error}</p>}

                {challenges.length > 0 ? (
                    <ul>
                        {challenges.map((el) => (
                            <li key={el.id}>
                                <Card id={el.id} title={el.title} description={el.description} completedDays={el.completedDays} totalDays={el.totalDays} onDelete={handleDelete} isCompletedToday={el.isCompletedToday}/>
                            </li>
                        ))}
                    </ul>
                ) : (<p>Челленджей пока нет</p>)
                }
            </div>
        </Layout>
    )
}

export default Challenges