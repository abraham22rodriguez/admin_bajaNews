import { notFound } from "next/navigation";
import { adminFetch, AdminApiError } from "@/lib/adminApi";
import { ModuleCard } from "@/components/ModuleCard";
import { CustomerForm } from "@/components/customers/CustomerForm";
import { updateCustomer } from "@/lib/actions/customers";
import type { Customer } from "@/types/customer";

export default async function EditCustomerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let customer: Customer;
  try {
    customer = await adminFetch<Customer>(`/api/admin/customers/${id}`);
  } catch (err) {
    if (err instanceof AdminApiError && err.status === 404) notFound();
    throw err;
  }

  return (
    <ModuleCard title={`Editar cliente: ${customer.name} ${customer.lastName}`}>
      <CustomerForm
        customer={customer}
        action={updateCustomer.bind(null, customer.id)}
        buttonLabel="Actualizar"
      />
    </ModuleCard>
  );
}
