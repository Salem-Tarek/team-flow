// components/form/GenericForm.jsx
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField, FormSelect, FormTextarea, FormCheckbox, FormRadioGroup, FormFile } from "./index";

const inputs = {
    select: FormSelect,
    textarea: FormTextarea,
    checkbox: FormCheckbox,
    radio: FormRadioGroup,
    file: FormFile,
};

function GenericForm({ id = "listingForm", fields, defaultValues, onSubmit, isPending, submitLabel = "Save", showSubmitBtn = true }) {
    const list = fields.filter(Boolean);

    // NEW: one Zod object built from each field's own `rules`
    const schema = z.object(
        Object.fromEntries(list.map((f) => [f.name, f.rules ?? z.any()]))
    );

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(schema),   // NEW
        defaultValues,
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    return (
        <form id={id} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            {list.map(({ name, label, type = "text", items, rules, isRequired, ...rest }) => {
                const Input = inputs[type] || FormField;
                return (
                    <Input
                        key={name}
                        label={isRequired ? `${label} *` : label}
                        error={errors[name]}          // NEW
                        options={items}
                        {...(Input === FormField && { type })}
                        {...rest}
                        {...register(name)}
                    />
                );
            })}

            {showSubmitBtn && (
                <button type="submit" className="btn btn-primary" disabled={isPending}>
                    {isPending && <span className="loading loading-spinner" />}
                    {submitLabel}
                </button>
            )}
        </form>
    );
}

export default GenericForm;