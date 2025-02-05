import React from 'react'
import Layout from '../../components/layout'
import BaseButton from '../../components/button'
import useData from '../../hooks'

interface HomePageProps {
    children?: React.ReactNode
}

const HomePage: React.FC<HomePageProps> = ()=>  {
    const { data } = useData('http://localhost:3001/challenges')
    console.log(data)
    return (
        <Layout>
            <BaseButton>Кнопка 1</BaseButton>
            <BaseButton icon="cross">Кнопка 2</BaseButton>
        </Layout>
    )
}

export default HomePage