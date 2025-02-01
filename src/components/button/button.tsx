import classNames from 'classnames'
import SVG from 'react-inlinesvg'
import './button.style.scss'
import React from 'react'

interface ButtonProps {
    size?: 'small' | 'big'
    background?: 'primary' | 'secondary'
    border?: 'withoutBorder' | 'withBorder'
    label?: string
    icon?: string
    className?: string
    onClick: () => void
    children?: React.ReactNode
}

export const BaseButton = ({
    size,
    background = 'primary',
    border = 'withoutBorder',
    icon,
    className,
    onClick,
    children
}: ButtonProps) => {
    const ButtonCN = classNames(
        'baseButton',
        size,
        background,
        border,
        className
    )
    const path = (name: string) => `../../assets/icons/${name}.svg`
    return (
        <div className={ButtonCN} onClick={onClick}>
            {icon && <SVG src={path(icon)}/>}
            {children && children}
        </div>
    )
}