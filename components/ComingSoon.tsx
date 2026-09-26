import { ModuleCard } from "@/components/ModuleCard";

export function ComingSoon({
  title,
  reason,
}: {
  title: string;
  reason: string;
}) {
  return (
    <ModuleCard title={title}>
      <p className="px-4 sm:px-6 py-8 text-[var(--color-ink-soft)] max-w-2xl">{reason}</p>
    </ModuleCard>
  );
}
