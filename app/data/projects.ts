export type Project = {
  name: string;
  type: string;
  description: string;
  url: string;
};

export const projects: Project[] = [
  {
    name: "ContentLane",
    type: "built by me",
    description: "automating ai ugc content creation for SaaS products",
    url: "https://usecontentlane.com/",
  },
  {
    name: "PerkPilot",
    type: "client work",
    description:
      "a SaaS discovery platform with verified deals, honest reviews, comparisons, and alternatives.",
    url: "https://perkpilot.io/",
  },
];
