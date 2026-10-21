function GenericBtn({ text = "Default", isDisabled = false, isLoading = false, icon = null, className = "", children, onClick, iconClass = '', textClass = '', ...rest }) {
    return (
        <button onClick={onClick} disabled={isDisabled || isLoading} className={`btn ${className}`} {...rest}>
            {children}
            {icon && <span className={iconClass}>{icon}</span>}
            {isLoading && <span className="loading loading-spinner"></span>}
            <span className={textClass}>{text}</span>
        </button>
    )
}

export default GenericBtn