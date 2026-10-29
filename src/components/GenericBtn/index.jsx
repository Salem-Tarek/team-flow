import { useNavigate } from "react-router-dom";

function GenericBtn({ text = "Default", isDisabled = false, isLoading = false, icon = null, className = "", children, onClick, iconClass = '', textClass = '', to = null, ...rest }) {
    const navigate = useNavigate();
    const handleClickBtn = () => {
        if (to) {
            navigate(to)
        } else if (onClick) {
            onClick()
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