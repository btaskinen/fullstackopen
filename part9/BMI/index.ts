import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  console.log(req.query);
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  try {
    if (!height || !weight) throw new Error('malformatted paramter');
    console.log(height, weight);

    const bmi = calculateBmi(height, weight);
    console.log(bmi);
    res.send({
      weight: weight,
      height: height,
      bmi: bmi,
    });
  } catch (error) {
    res.status(400).end(error.message);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
