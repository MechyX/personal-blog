export const postSections = [
  { id: "software", title: "tech", path: "/tech/" },
  { id: "other", title: "not tech", path: "/not-tech/" }
] as const;

export type PostSectionId = typeof postSections[number]["id"];
