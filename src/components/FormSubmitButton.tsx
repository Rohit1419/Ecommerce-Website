"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
    children: React.ReactNode,
} & ComponentProps<"button">;

export default function FormSubmitButton({
    children,
    ...props
}: FormSubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button
            {...props}
            className="btn btn-primary w-full"
            type="submit"
            disabled={pending}
        >
            {pending && <span className="loading loading-spinner" />}
            {children}
        </button>
    );
}
