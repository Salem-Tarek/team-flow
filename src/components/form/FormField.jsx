function FormField({ label, error, className, type = "text", ref, ...rest }) {
    return (
        <div className={className}>
            <label className="label mb-1">{label}</label>
            <input
                ref={ref}
                type={type}
                className={`input w-full! ${error ? "input-error" : ""}`}
                {...rest}
            />
            {error && <p className="text-error text-sm mt-1">{error.message}</p>}
        </div>
    );
}
export default FormField;