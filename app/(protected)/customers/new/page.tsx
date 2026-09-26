import { ModuleCard } from "@/components/ModuleCard";
import { CustomerForm } from "@/components/customers/CustomerForm";
import { createCustomer } from "@/lib/actions/customers";

export default function NewCustomerPage() {
  return (
    <ModuleCard title="Agregar cliente">
      <CustomerForm action={createCustomer} />
    </ModuleCard>
  );
}
