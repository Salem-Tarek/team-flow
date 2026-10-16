function FormTextarea({ label, error, className, rows = 3, ref, ...rest }) {
    return (
        <div className={className}>
            <label className="label mb-1">{label}</label>
            <textarea
                ref={ref}
                rows={rows}
                className={`textarea w-full! ${error ? "textarea-error" : ""}`}
                {...rest}
            />
            {error && <p className="text-error text-sm mt-1">{error.message}</p>}
        </div>
    );
}
export default FormTextarea;