// (variant="toggle" for a switch)
function FormCheckbox({ label, error, variant = "checkbox", ref, ...rest }) {
    return (
        <div>
            <label className="label cursor-pointer justify-start gap-3">
                <input ref={ref} type="checkbox" className={variant} {...rest} />
                {label}
            </label>
            {error && <p className="text-error text-sm mt-1">{error.message}</p>}
        </div>
    );
}
export default FormCheckbox;