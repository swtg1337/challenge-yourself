import React from 'react'
import './layout.style.scss'

interface LayoutProps {
    children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout">
            <div className="header">

            </div>
            <div  className="main-content">
                {children}
            </div>
        </div>
    )
}

export default Layout