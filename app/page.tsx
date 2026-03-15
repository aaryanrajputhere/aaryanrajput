import Blogs from "./components/blogs";
import Description from "./components/desciption";
import Header from "./components/header";
import { blogs } from "./data/blogs";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[var(--text-main)]">
      <main className="mx-auto flex min-h-screen w-full max-w-[720px] flex-col px-6 pb-16 pt-0 sm:px-10">
        <Header />
        <Description />
        <Blogs blogs={blogs} />
        <footer className="mt-auto pt-24 text-sm text-[var(--text-muted)]">
          aaryan rajput (
          <a
            href="https://x.com/AaryanRajput314"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-[var(--foreground)]/35 underline-offset-4 transition-colors hover:text-[var(--foreground)] hover:decoration-[var(--foreground)]/55"
          >
            @aaryanrajput314
          </a>
          )
        </footer>
      </main>
    </div>
  );
}
