"use client";

import { useActionState } from "react";
import { TextField, SelectField, SubmitButton, FormError } from "@/components/FormField";
import { ROLE_EDITOR, ROLE_LABELS, ALL_ROLES } from "@/lib/roles";
import type { UserActionState } from "@/lib/actions/users";

const ROLE_OPTIONS = ALL_ROLES.map((r) => ({ value: r, label: ROLE_LABELS[r] }));

export function UserCreateForm({
  action,
}: {
  action: (state: UserActionState, formData: FormData) => Promise<UserActionState>;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="w-full grid grid-cols-4 gap-5 px-4 sm:px-6 py-6">
      <TextField label="Correo" name="email" type="email" required colSpan={2} />
      <TextField
        label="Contraseña"
        name="password"
        type="password"
        required
        minLength={8}
        hint="(mínimo 8 caracteres)"
        colSpan={2}
      />
      <TextField label="Nombre" name="name" required colSpan={2} />
      <TextField label="Apellido" name="lastName" required colSpan={2} />
      <SelectField
        label="Rol"
        name="role"
        required
        defaultValue={ROLE_EDITOR}
        options={ROLE_OPTIONS}
        colSpan={2}
      />

      <FormError message={state.error} />

      <SubmitButton pending={pending}>{pending ? "Creando…" : "Crear usuario"}</SubmitButton>
    </form>
  );
}
