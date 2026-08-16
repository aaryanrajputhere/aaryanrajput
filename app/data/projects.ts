export type Project = {
  name: string;
  type: string;
  description: string;
  url: string;
  image?: {
    src: string;
    alt: string;
  };
};

export const projects: Project[] = [
  {
    name: "ContentLane",
    type: "built by me",
    description: "automating ai ugc content creation for SaaS products",
    url: "https://usecontentlane.com/",
    image: {
      src: "/contentlane-screenshot.png",
      alt: "ContentLane website preview",
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
    },
  },
];
