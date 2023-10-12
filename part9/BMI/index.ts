import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

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
    if (error instanceof Error) {
      res.status(400).end(error.message);
    } else {
      res.status(500).end('Internal Server Error');
    }
  }
});

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { dailyExercises, target } = req.body;
    console.log(dailyExercises, target);

    if (!dailyExercises || !target) throw new Error('Parameters missing!');

    const isArrayOfNumbers =
      Array.isArray(dailyExercises) &&
      dailyExercises.every((item) => typeof item === 'number');

    if (!isArrayOfNumbers || typeof target !== 'number')
      throw new Error('Malformatted parameters!');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(dailyExercises, target);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).end(error.message);
    } else {
      res.status(500).end('Internal Server Error');
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
