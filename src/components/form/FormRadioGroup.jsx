function FormRadioGroup({ label, error, className, options = [], ref, ...rest }) {
    return (
        <fieldset className={`fieldset ${className}`}>
            <legend className="fieldset-legend">{label}</legend>
            {options.map((o) => (
                <label key={o.value} className="label cursor-pointer justify-start gap-3">
                    <input ref={ref} type="radio" value={o.value} className="radio" {...rest} />
                    {o.label}
                </label>
            ))}
            {error && <p className="text-error text-sm mt-1">{error.message}</p>}
        </fieldset>
    );
}
export default FormRadioGroup;  