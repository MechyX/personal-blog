export const postSections = [
  { id: "tech", title: "tech", path: "/tech/" },
  { id: "not-tech", title: "not tech", path: "/not-tech/" }
] as const;

export type PostSectionId = typeof postSections[number]["id"];
