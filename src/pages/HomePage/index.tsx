import React from 'react'
import Layout from '../../components/layout';
import BaseButton from '../../components/button';
// import Switch from '../../components/Switch'

interface HomePageProps {
    children?: React.ReactNode
}

const HomePage: React.FC<HomePageProps> = ()=>  {
    return (
        <Layout>
            <BaseButton>Кнопка 1</BaseButton>
            <BaseButton icon="cross">Кнопка 2</BaseButton>
            {/*<Switch onChange={}/>*/}
        </Layout>
    )
}

export default HomePage