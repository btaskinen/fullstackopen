import { parseArguments } from './utils/helperFunctions';

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyExerciseHours: number[],
  dailyTarget: number
): Result => {
  const periodLength = dailyExerciseHours.length;
  let trainingDays = 0;
  dailyExerciseHours.forEach((day) => {
    if (day > 0) trainingDays += 1;
  });
  const average =
    dailyExerciseHours.reduce((sum, day) => {
      return sum + day;
    }, 0) / periodLength;
  const success = average >= dailyTarget;
  let rating: number;
  let ratingDescription: string;
  if (success) {
    rating = 3;
    ratingDescription = 'Well done! Keep going like this!';
  } else if (trainingDays > periodLength / 2) {
    rating = 2;
    ratingDescription = 'Not too bad, but could be better.';
  } else {
    rating = 1;
    ratingDescription = 'What a disappointment. Do better next week!';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: dailyTarget,
    average,
  };
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateExercises(value2, value1));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
