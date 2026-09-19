import Link from "next/link";
import type { Blog } from "../data/blogs";

type BlogsProps = {
  blogs: Blog[];
};

export default function Blogs({ blogs }: BlogsProps) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 text-[15px]">blogs</h2>
      {blogs.length > 0 ? (
        <div className="border-y border-[var(--line)]">
          {blogs.map((blog) => (
            <div
              key={blog.slug}
              className="border-b border-[var(--line)] py-2 text-[15px] last:border-b-0"
            >
              <span className="mr-5 text-[var(--text-muted)]">{blog.date}</span>
              <Link href={`/blog/${blog.slug}`} className="hover:underline">
                {blog.title}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-y border-[var(--line)] py-2 text-[15px] text-[var(--text-muted)]">
          no blogs yet
        </div>
      )}
    </section>
  );
}
