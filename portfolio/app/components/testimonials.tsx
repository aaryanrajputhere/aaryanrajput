"use client";

import Image from "next/image";
import { useState } from "react";
import type { Testimonial } from "../data/testimonials";

type TestimonialsProps = {
  testimonials: Testimonial[];
};

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [paused, setPaused] = useState(false);

  return (
    <section aria-labelledby="client-reviews-heading" className="mb-12">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 id="client-reviews-heading" className="text-[15px]">
          client reviews
        </h2>
        <button type="button" aria-controls="client-reviews-row" aria-pressed={paused} onClick={() => setPaused(!paused)} className="review-motion-control text-[12px] text-[var(--text-muted)] underline underline-offset-4">
          {paused ? "resume" : "pause"}
        </button>
      </div>
      <p className="mb-4 text-[14px] leading-6 text-[var(--text-muted)]">
        a few words from people i&apos;ve worked with.
      </p>
      <div id="client-reviews-row" role="region" aria-label="Client reviews" tabIndex={0} className="review-marquee overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-4">
        <div className={`review-track flex w-max ${paused ? "is-paused" : ""}`}>
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1 ? true : undefined} inert={copy === 1 ? true : undefined} className="review-group flex gap-4 pr-4">
        {testimonials.map((testimonial) => (
          <figure key={testimonial.id} className="review-card flex min-w-0 shrink-0 flex-col rounded-xl border border-[var(--line)] p-5">
            <blockquote className="mb-5 text-[15px] leading-7">
              <p>“{testimonial.quote}”</p>
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-3">
              {testimonial.image ? <Image
                src={testimonial.image}
                alt=""
                width={40}
                height={40}
                sizes="40px"
                className="h-10 w-10 shrink-0 rounded-full object-cover"
              /> : (
                <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-[14px] text-[var(--text-muted)]">
                  {testimonial.author.charAt(0).toUpperCase()}
                </span>
              )}
              <div className="text-[13px] leading-5">
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-[var(--text-muted)]">
                  {testimonial.sourceUrl ? (
                    <a href={testimonial.sourceUrl} target="_blank" rel="noreferrer" className="underline decoration-[var(--foreground)]/35 underline-offset-4 hover:text-[var(--foreground)]">
                      {testimonial.affiliation}
                    </a>
                  ) : testimonial.affiliation}
                  {testimonial.excerpt ? " · excerpt" : null}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
