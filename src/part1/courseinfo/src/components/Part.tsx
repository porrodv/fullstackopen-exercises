interface PartProps {
  name: string;
  exercises: number;
}

export default function Part({ name, exercises }: PartProps) {
  return (
    <p>
      {name} {exercises}
    </p>
  );
}
