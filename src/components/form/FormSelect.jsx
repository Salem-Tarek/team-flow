function FormSelect({ label, error, options = [], ref, ...rest }) {
    return (
        <div>
            <label className="label">{label}</label>
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