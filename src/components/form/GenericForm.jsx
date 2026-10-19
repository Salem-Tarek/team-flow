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

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        resolver: zodResolver(schema),   // NEW
        defaultValues,
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    return (
        <form id={id} onSubmit={handleSubmit(data => onSubmit(data, { reset }))} className="gap-2 grid grid-cols-1 tablet:grid-cols-2">
            {list.map(({
                name,
                label,
                type = "text",
                items,
                rules,
                isRequired,
                size = null,
                minDateFrom,
                maxDateFrom,
                min,
                max,
                ...rest
            }) => {
                const Input = inputs[type] || FormField;

                const minDate = minDateFrom
                    ? watch(minDateFrom) || undefined
                    : min;

                const maxDate = maxDateFrom
                    ? watch(maxDateFrom) || undefined
                    : max;

                return (
                    <Input
                        key={name}
                        label={isRequired ? `${label} *` : label}
                        error={errors[name]}
                        options={items}
                        disabled={isPending}
                        className={`${size ? `col-span-${size}` : "col-span-full"}`}
                        {...(Input === FormField && {
                            type,
                            ...(type === "date" && {
                                min: minDate,
                                max: maxDate,
                            }),
                        })}
                        {...rest}
                        {...register(name)}
                    />
                );
            })}

            {showSubmitBtn && (
                <button type="submit" className="btn btn-primary col-span-full" disabled={isPending}>
                    {isPending && <span className="loading loading-spinner" />}
                    {submitLabel}
                </button>
            )}
        </form>
    );
}

export default GenericForm;