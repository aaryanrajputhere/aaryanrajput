export type Project = {
  name: string;
  type: string;
  description: string;
  url?: string;
  demoVideo?: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export const projects: Project[] = [
  {
    name: "FitCheck",
    type: "launching soon",
    description:
      "an AI wardrobe app for iOS with outfit ideas tailored to your style and weather.",
    demoVideo: "/fitcheck-demo.mp4",
    image: {
      src: "/fitcheck.png",
      alt: "FitCheck iOS app screens showing a digital wardrobe and AI styling suggestions",
      width: 1920,
      height: 1080,
    },
  },
  {
    name: "ContentLane",
    type: "built by me",
    description: "automating ai ugc content creation for SaaS products",
    url: "https://usecontentlane.com/",
    image: {
      src: "/contentlane-screenshot.png",
      alt: "ContentLane website preview",
      width: 1918,
      height: 1001,
    },
  },
  {
    name: "PerkPilot",
    type: "client work",
    description:
      "a SaaS discovery platform with verified deals, honest reviews, comparisons, and alternatives.",
    url: "https://perkpilot.io/",
    image: {
      src: "/perkpilot-screenshot.png",
      alt: "PerkPilot website preview",
      width: 1871,
      height: 968,
    },
  },
];
