import { parseArguments } from './utils/helperFunctions';

export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeter = height * 0.01;
  const bmi = weight / (heightInMeter * heightInMeter);
  if (bmi <= 18.4) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal (healthy weight)';
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    return 'Overweight (pre-obese';
  } else if (bmi >= 30.0) {
    return 'Obese';
  }

  return 'something went wrong';
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2[0]));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
