function FormSelect({ label, error, className, options = [], ref, ...rest }) {
    return (
        <div className={className}>
            <label className="label mb-1">{label}</label>
            <select ref={ref} className={`select w-full! ${error ? "select-error" : ""}`} {...rest}>
                <option value="">Select...</option>
                {options.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                ))}
            </select>
            {error && <p className="text-error text-sm mt-1">{error.message}</p>}
        </div>
    );
}
export default FormSelect;