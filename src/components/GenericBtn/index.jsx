function GenericBtn({ text = "Default", isDisabled = false, isLoading = false, icon = null, className = "" }) {
    return (
        <button disabled={isDisabled || isLoading} className={`btn ${className}`}>
            {icon && <span>{icon}</span>}
            {isLoading && <span className="loading loading-spinner"></span>}
            {text}
        </button>
    )
}

export default GenericBtn