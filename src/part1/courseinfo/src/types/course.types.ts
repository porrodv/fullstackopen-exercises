export interface CoursePart {
  id: number;
  name: string;
  exercises: number;
}

export interface Course {
  id: number;
  name: string;
  parts: Array<CoursePart>;
}
