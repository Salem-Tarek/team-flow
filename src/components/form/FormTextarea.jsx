function FormTextarea({ label, error, rows = 3, ref, ...rest }) {
    return (
        <div>
            <label className="label">{label}</label>
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