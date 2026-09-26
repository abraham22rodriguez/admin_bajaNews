import Link from "next/link";

function buildHref(basePath: string, page: number, extraParams?: Record<string, string>) {
  const params = new URLSearchParams(extraParams);
  params.set("page", String(page));
  return `${basePath}?${params.toString()}`;
}

export function Pagination({
  page,
  totalPages,
  basePath,
  extraParams,
}: {
  page: number;
  totalPages: number;
  basePath: string;
  extraParams?: Record<string, string>;
}) {
  if (totalPages <= 1) return null;

  const windowSize = 2;
  const start = Math.max(1, page - windowSize);
  const end = Math.min(totalPages, page + windowSize);
  const pages: number[] = [];
  for (let p = start; p <= end; p++) pages.push(p);

  const itemClass = "min-w-9 h-9 px-2 inline-flex items-center justify-center rounded-md text-sm font-medium";

  return (
    <nav aria-label="Paginación" className="flex justify-center py-6">
      <ul className="flex items-center gap-1">
        {page > 1 && (
          <li>
            <Link
              href={buildHref(basePath, page - 1, extraParams)}
              aria-label="Página anterior"
              className={`${itemClass} text-[var(--color-ink)] hover:bg-[var(--color-line)]`}
            >
              ‹
            </Link>
          </li>
        )}
        {start > 1 && (
          <li>
            <Link
              href={buildHref(basePath, 1, extraParams)}
              aria-label="Página 1"
              className={`${itemClass} text-[var(--color-ink)] hover:bg-[var(--color-line)]`}
            >
              1
            </Link>
          </li>
        )}
        {start > 2 && <li aria-hidden="true" className="px-1 text-[var(--color-ink-soft)]">…</li>}
        {pages.map((p) =>
          p === page ? (
            <li key={p}>
              <span aria-current="page" className={`${itemClass} text-white font-semibold`} style={{ background: "var(--color-cta)" }}>
                {p}
              </span>
            </li>
          ) : (
            <li key={p}>
              <Link
                href={buildHref(basePath, p, extraParams)}
                aria-label={`Página ${p}`}
                className={`${itemClass} text-[var(--color-ink)] hover:bg-[var(--color-line)]`}
              >
                {p}
              </Link>
            </li>
          )
        )}
        {end < totalPages - 1 && <li aria-hidden="true" className="px-1 text-[var(--color-ink-soft)]">…</li>}
        {end < totalPages && (
          <li>
            <Link
              href={buildHref(basePath, totalPages, extraParams)}
              aria-label={`Página ${totalPages}`}
              className={`${itemClass} text-[var(--color-ink)] hover:bg-[var(--color-line)]`}
            >
              {totalPages}
            </Link>
          </li>
        )}
        {page < totalPages && (
          <li>
            <Link
              href={buildHref(basePath, page + 1, extraParams)}
              aria-label="Página siguiente"
              className={`${itemClass} text-[var(--color-ink)] hover:bg-[var(--color-line)]`}
            >
              ›
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
