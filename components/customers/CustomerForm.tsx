"use client";

import { useActionState } from "react";
import { uploadUrl } from "@/lib/assets";
import { TextField, FileField, SubmitButton, FormError } from "@/components/FormField";
import type { Customer } from "@/types/customer";
import type { CustomerActionState } from "@/lib/actions/customers";

export function CustomerForm({
  customer,
  action,
  buttonLabel = "Guardar",
}: {
  customer?: Customer;
  action: (state: CustomerActionState, formData: FormData) => Promise<CustomerActionState>;
  buttonLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const currentImage = customer ? uploadUrl("customers", customer.image) : null;

  return (
    <form action={formAction} className="w-full grid grid-cols-4 gap-5 px-4 sm:px-6 py-6">
      {currentImage && (
        <div className="col-span-4">
          <img
            className="h-32 w-auto max-w-full rounded-md object-cover border"
            style={{ borderColor: "var(--color-line)" }}
            src={currentImage}
            alt={`Logo actual de ${customer?.organization}`}
          />
        </div>
      )}

      <FileField label="Imagen" name="image" accept="image/*" colSpan={2} />

      <TextField
        label="Organización"
        name="Organization"
        required
        maxLength={255}
        defaultValue={customer?.organization}
        placeholder="Nombre de la empresa"
        colSpan={2}
      />

      <TextField label="Nombre" name="Name" required maxLength={255} defaultValue={customer?.name} colSpan={2} />

      <TextField
        label="Apellido"
        name="LastName"
        required
        maxLength={255}
        defaultValue={customer?.lastName}
        colSpan={2}
      />

      <FormError message={state.error} />

      <SubmitButton pending={pending}>{pending ? "Guardando…" : buttonLabel}</SubmitButton>
    </form>
  );
}
