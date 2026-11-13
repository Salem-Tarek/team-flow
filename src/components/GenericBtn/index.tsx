import { useNavigate } from "react-router-dom";
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type GenericBtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    text: string;
    isDisabled?: boolean;
    isLoading?: boolean;
    icon?: ReactNode;
    // className?: string;
    // children?: ReactNode;
    // onClick?: () => void;
    iconClass?: string;
    textClass?: string;
    to?: null | string;
    // ...rest;
}

function GenericBtn({ text = "", isDisabled = false, isLoading = false, icon = null, className = "", children, onClick, iconClass = '', textClass = '', to = null, ...rest }: GenericBtnProps) {
    const navigate = useNavigate();
    const handleClickBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (to) {
            navigate(to)
        } else if (onClick) {
            onClick?.(event)
        }
    }
    return (
        <button onClick={handleClickBtn} disabled={isDisabled || isLoading} className={`btn ${className}`} {...rest}>
            {children}
            {icon && <span className={iconClass}>{icon}</span>}
            {isLoading && <span className="loading loading-spinner"></span>}
            {text && <span className={textClass}>{text}</span>}
        </button>
    )
}

export default GenericBtn