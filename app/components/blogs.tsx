import Link from "next/link";
import type { Blog } from "../data/blogs";

type BlogsProps = {
  blogs: Blog[];
};

export default function Blogs({ blogs }: BlogsProps) {
  const [latestBlog, ...olderBlogs] = blogs;

  return (
    <>
      <section className="mb-10">
        <h2 className="mb-3 text-[15px]">latest</h2>
        {latestBlog ? (
          <div className="border-y border-[var(--line)] py-2 text-[15px]">
            <span className="mr-5 text-[var(--text-muted)]">
              {latestBlog.date}
            </span>
            <Link href={`/blog/${latestBlog.slug}`} className="hover:underline">
              {latestBlog.title}
            </Link>
          </div>
        ) : (
          <div className="border-y border-[var(--line)] py-2 text-[15px] text-[var(--text-muted)]">
            no blogs yet
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-[15px] underline decoration-[var(--line)] underline-offset-4">
          posts
        </h2>
        {olderBlogs.length > 0 ? (
          olderBlogs.map((blog, index) => (
            <div
              key={blog.slug}
              className={`py-2 text-[15px] ${index === 0 ? "border-y" : "border-b"} border-[var(--line)]`}
            >
              <span className="mr-5 text-[var(--text-muted)]">{blog.date}</span>
              <Link href={`/blog/${blog.slug}`} className="hover:underline">
                {blog.title}
              </Link>
            </div>
          ))
        ) : (
          <div className="border-y border-[var(--line)] py-2 text-[15px] text-[var(--text-muted)]">
            no older posts yet
          </div>
        )}
      </section>
    </>
  );
}
