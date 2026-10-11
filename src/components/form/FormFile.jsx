function FormFile({ label, error, oldFiles = [], ref, ...rest }) {
    return (
        <div>
            <label className="label">{label}</label>
            <input
                ref={ref}
                type="file"
                className={`file-input w-full! ${error ? "file-input-error" : ""}`}
                {...rest}
            />
            {oldFiles.length > 0 && (
                <div className="mt-1 text-sm">
                    Current:{" "}
                    {oldFiles.map((url) => (
                        <a key={url} href={url} target="_blank" rel="noreferrer" className="link mr-2">View</a>
                    ))}
                </div>
            )}
            {error && <p className="text-error text-sm mt-1">{error.message}</p>}
        </div>
    );
}
export default FormFile;