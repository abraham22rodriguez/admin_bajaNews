export function FlashBanner({
  ok,
  error,
}: {
  ok?: string;
  error?: string;
}) {
  if (!ok && !error) return null;

  return (
    <>
      {ok && (
        <div
          role="status"
          className="flex items-center gap-2 px-4 py-3 text-sm font-medium border-b"
          style={{
            background: "var(--color-success-tint)",
            color: "var(--color-success)",
            borderColor: "var(--color-line)",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 shrink-0" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {ok}
        </div>
      )}
      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 px-4 py-3 text-sm font-medium border-b"
          style={{
            background: "var(--color-danger-tint)",
            color: "var(--color-danger)",
            borderColor: "var(--color-line)",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 shrink-0" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          {error}
        </div>
      )}
    </>
  );
}
