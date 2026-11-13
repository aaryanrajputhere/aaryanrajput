export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  affiliation: string;
  image?: string;
  sourceUrl?: string;
  excerpt?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "bryce-krisppy",
    quote: "Was very knowledgeable and worked with all the needs I had! Very patient and very articulate with his work!",
    author: "Bryce Krisppy",
    affiliation: "Fiverr",
    image: "/testimonials/bryce.jpg",
  },
  {
    id: "bryan-morabito",
    quote: "Aaryan was a pleasure to work with. He delivered exactly what we needed in a precise and timely manner.",
    author: "Bryan Morabito",
    affiliation: "Cosmo Coded LLC",
    image: "/testimonials/bryan.jpg",
  },
  {
    id: "umez-consulting",
    quote: "Aaryan did an excellent job building my Construction RFQ web platform.",
    author: "umez_consulting",
    affiliation: "Fiverr",
    image: "/testimonials/umez-consulting.jpg",
    sourceUrl: "https://www.fiverr.com/aaryanrajput314",
    excerpt: true,
  },
  {
    id: "enricozampieri",
    quote: "Very professional and reliable. I will work with Aaryan again.",
    author: "enricozampieri",
    affiliation: "Fiverr",
    sourceUrl: "https://www.fiverr.com/aaryanrajput314/do-full-stack-web-development-for-you",
  },
];
