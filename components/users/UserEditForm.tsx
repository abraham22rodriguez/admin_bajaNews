"use client";

import { useActionState } from "react";
import { SelectField, TextField, CheckboxField, SubmitButton, FormError } from "@/components/FormField";
import { ROLE_LABELS, ALL_ROLES, ROLE_EDITOR } from "@/lib/roles";
import type { UserDetail } from "@/types/user";
import type { UserActionState } from "@/lib/actions/users";

const ROLE_OPTIONS = ALL_ROLES.map((r) => ({ value: r, label: ROLE_LABELS[r] }));

export function UserEditForm({
  user,
  action,
}: {
  user: UserDetail;
  action: (state: UserActionState, formData: FormData) => Promise<UserActionState>;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const currentRole = user.roles[0] ?? ROLE_EDITOR;

  return (
    <form action={formAction} className="w-full grid grid-cols-4 gap-5 px-4 sm:px-6 py-6">
      <div className="col-span-4">
        <p className="text-sm text-[var(--color-ink-soft)]">
          Correo: <span className="text-[var(--color-ink)] font-medium">{user.email}</span>
          <span className="block text-xs mt-0.5">(el correo no se puede cambiar aquí)</span>
        </p>
      </div>

      <SelectField label="Rol" name="role" required defaultValue={currentRole} options={ROLE_OPTIONS} colSpan={2} />
      <TextField
        label="Nueva contraseña"
        name="newPassword"
        type="password"
        minLength={8}
        hint="(opcional — déjalo vacío para conservar la actual)"
        colSpan={2}
      />

      <CheckboxField label="Cuenta habilitada" name="isEnabled" defaultChecked={user.isEnabled} colSpan={2} />
      <CheckboxField label="Correo verificado" name="isVerified" defaultChecked={user.isVerified} colSpan={2} />

      <FormError message={state.error} />

      <SubmitButton pending={pending}>{pending ? "Guardando…" : "Actualizar"}</SubmitButton>
    </form>
  );
}
