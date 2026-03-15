export type Blog = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  content: string[];
};

export const blogs: Blog[] = [
  {
    slug: "the-first-dollar",
    date: "june 2024",
    title: "the first dollar",
    excerpt: "how i landed my first freelance contract on upwork",
    content: [
      "june 2024. after my first year of college, all i wanted was to make money. not a lot of money, just enough to have a good college life.",
      "i already knew what freelancing was. i had created an upwork account about a year earlier and it still had around 150 connects sitting there.",
      "at that time i knew python and some basic web development (html, css, js, react), and i was trying to understand what backend development actually meant.",
      "i had tried building a few saas ideas, but none of them got past the landing page stage, although i was talking to users on reddit and getting feedback.",
      "one day i opened up upwork, scrolled through python jobs, and started sending proposals.",
      "mostly small python scripts. automation, web scraping, things like that.",
      "very quickly i realized something. this wasn't going to work. i had no reviews and no strong projects.",
      "so i thought about it from the client's perspective. why would someone hire me?",
      "the answer was simple.",
      "if i already completed the task and showed them a working sample that solved their problem, hiring me would become a no-brainer.",
      "so that's what i did.",
      "on my 9th proposal, i got my first contract.",
      "i finished the project in about two hours.",
      "and that's how i made my first dollar.",
      "actually $35 :) ",
    ],
  },
];
