const calculateBmi = (): string => {
  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);

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

console.log(calculateBmi());
