import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import GenericBtn from "~/components/GenericBtn/index.tsx"

function FormField({ label, error, className = "", type = "text", ref, showPasswordIcon = true, ...rest }) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isPassword = (type === "password" && showPasswordIcon);

    return (
        <div className={className}>
            <label className="label mb-1">{label}</label>

            <div className="relative">
                <input
                    ref={ref}
                    type={
                        isPassword && !isPasswordVisible
                            ? "password"
                            : "text"
                    }
                    className={`input w-full! ${isPassword ? "pr-10" : ""} ${error ? "input-error" : ""}`}
                    {...rest}
                />

                {isPassword && (
                    <>
                        <GenericBtn
                            icon={isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                            type="button"
                            onClick={() =>
                                setIsPasswordVisible((prev) => !prev)
                            }
                            className="absolute end-0 top-1/2 -translate-y-1/2 bg-transparent border-none"
                            aria-label={
                                isPasswordVisible ? "Hide password" : "Show password"
                            }
                        />
                    </>
                )}
            </div>

            {error && (
                <p className="text-error text-sm mt-1">
                    {error.message}
                </p>
            )}
        </div>
    );
}

export default FormField;