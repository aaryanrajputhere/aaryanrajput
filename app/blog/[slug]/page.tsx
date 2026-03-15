import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/header";
import { blogs } from "../../data/blogs";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[var(--text-main)]">
      <main className="mx-auto flex min-h-screen w-full max-w-[720px] flex-col px-6 pb-16 pt-0 sm:px-10">
        <Header />

        <article className="w-full">
          <p className="mb-3 text-sm text-[var(--text-muted)]">{blog.date}</p>
          <h1 className="mb-4 text-3xl font-medium tracking-tight">
            {blog.title}
          </h1>
          <p className="mb-10 text-[var(--text-muted)]">{blog.excerpt}</p>

          <div className="space-y-5 text-[16px] leading-7">
            {blog.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <Link
            href="/"
            className="mt-12 inline-block text-[15px] underline decoration-[var(--line)] underline-offset-4"
          >
            back to home
          </Link>
        </article>
      </main>
    </div>
  );
}
