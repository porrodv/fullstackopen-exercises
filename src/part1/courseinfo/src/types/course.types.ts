export type CoursePart = {
  title: string;
  exercises: number;
};

export type Course = {
  title: string;
  parts: Array<CoursePart>;
};
