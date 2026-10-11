function FormField({ label, error, type = "text", ref, ...rest }) {
    return (
        <div>
            <label className="label">{label}</label>
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