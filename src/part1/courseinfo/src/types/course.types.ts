export type CoursePart = {
  id: number;
  name: string;
  exercises: number;
};

export type Course = {
  id: number;
  name: string;
  parts: Array<CoursePart>;
};
