"use client";

export function ConfirmDeleteForm({
  action,
  confirmMessage = "¿Desea borrar este registro?",
  children,
}: {
  action: () => void;
  confirmMessage?: string;
  children: React.ReactNode;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
    >
      {children}
    </form>
  );
}
