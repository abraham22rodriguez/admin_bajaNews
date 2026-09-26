export function ModuleCard({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[1080px] mx-auto px-3 sm:px-6 py-4 sm:py-10">
      <div
        className="rounded-xl border overflow-hidden"
        style={{ background: "var(--color-paper-raised)", borderColor: "var(--color-line)" }}
      >
        <div className="px-4 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b" style={{ borderColor: "var(--color-line)" }}>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-[var(--color-ink)]">{title}</h1>
            {subtitle && <p className="text-sm text-[var(--color-ink-soft)] mt-0.5">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-3 flex-wrap">{actions}</div>}
        </div>

        {children}
      </div>
    </div>
  );
}
