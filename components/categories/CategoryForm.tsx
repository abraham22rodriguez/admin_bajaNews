"use client";

import { useActionState } from "react";
import { TextField, SubmitButton, FormError } from "@/components/FormField";
import type { Category } from "@/types/category";
import type { CategoryActionState } from "@/lib/actions/categories";

export function CategoryForm({
  category,
  action,
  buttonLabel = "Guardar",
}: {
  category?: Category;
  action: (state: CategoryActionState, formData: FormData) => Promise<CategoryActionState>;
  buttonLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="w-full grid grid-cols-4 gap-5 px-4 sm:px-6 py-6">
      <TextField label="Nombre" name="name" required maxLength={255} defaultValue={category?.name} colSpan={4} />

      <TextField
        label="Slug"
        name="slug"
        hint="(opcional — si lo dejas vacío, se genera solo)"
        maxLength={255}
        defaultValue={category?.slug ?? ""}
        colSpan={4}
      />

      <FormError message={state.error} />

      <SubmitButton pending={pending}>{pending ? "Guardando…" : buttonLabel}</SubmitButton>
    </form>
  );
}
