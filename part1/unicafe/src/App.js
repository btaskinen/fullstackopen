import { useState } from "react";

const Button = ({ text, buttonHandler }) => {
  return <button onClick={buttonHandler}>{text}</button>;
};

const StatisticsLine = ({ text, value }) => {
  const isPositive = text === "positive";
  return (
    <p>
      {text} {value} {isPositive ? "%" : ""}
    </p>
  );
};

const Statistics = ({ good, neutral, bad, all }) => {
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  if (all > 0) {
    return (
      <div>
        <h1>statistics</h1>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={all} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="positive" value={positive} />
      </div>
    );
  } else {
    return <p>No feedback given.</p>;
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const calculateAll = (good, neutral, bad) => {
    const currentAll = good + neutral + bad;
    setAll(currentAll);
  };

  const handleGoodClick = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    calculateAll(updatedGood, neutral, bad);
  };

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    calculateAll(good, updatedNeutral, bad);
  };

  const handleBadClick = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    calculateAll(good, neutral, updatedBad);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" buttonHandler={handleGoodClick} />
      <Button text="neutral" buttonHandler={handleNeutralClick} />
      <Button text="bad" buttonHandler={handleBadClick} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  );
};

export default App;
