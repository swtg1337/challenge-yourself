import React from 'react'
import Layout from '../../components/layout'
import useData from '../../hooks'

interface HomePageProps {
    children?: React.ReactNode
}

const HomePage: React.FC<HomePageProps> = ()=>  {
    const { data } = useData('http://localhost:3001/challenges')
    console.log(data)
    return (
        <Layout>
            2 кнопки
        </Layout>
    )
}

export default HomePage