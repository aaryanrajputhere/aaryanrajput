export default function Header() {
  return (
    <header className="sticky top-0 z-50 mb-8 flex w-full items-center justify-between bg-[var(--page-bg)]/90 py-3 pt-15 text-[15px] backdrop-blur">
      <h1 className="font-medium tracking-tight">aaryanrajput.tech</h1>
      <nav>
        <a
          href="https://cal.com/aaryanrajput/30min"
          target="_blank"
          rel="noreferrer"
          className="text-[var(--foreground)]/90 underline decoration-[var(--foreground)]/45 underline-offset-4 transition-colors hover:text-[var(--foreground)] hover:decoration-[var(--foreground)]"
        >
          get in touch
        </a>
      </nav>
    </header>
  );
}
