export function PageHeader({ title }: { title: string }) {
  return (
    <div className="px-4 sm:px-6 py-5 border-b" style={{ borderColor: "var(--color-line)" }}>
      <h1 className="text-xl font-bold text-[var(--color-ink)]">{title}</h1>
    </div>
  );
}
