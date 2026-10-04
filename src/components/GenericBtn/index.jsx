function GenericBtn({ text = "Default", isDisabled = false, isLoading = false, icon = null, className = "", children, onClick }) {
    return (
        <button onClick={onClick} disabled={isDisabled || isLoading} className={`btn ${className}`}>
            {children}
            {icon && <span>{icon}</span>}
            {isLoading && <span className="loading loading-spinner"></span>}
            {text}
        </button>
    )
}

export default GenericBtn