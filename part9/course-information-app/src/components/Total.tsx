interface Props {
  totalExercises: number;
}

const Total = ({ totalExercises }: Props) => {
  return (
    <p>
      <strong>Number of exercises:</strong> {totalExercises}
    </p>
  );
};

export default Total;
