import { useState } from "react";

const Statistics = ({ good, neutral, bad, all }) => {
  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {(good - bad) / all}</p>
      <p>positive {(good / all) * 100}%</p>
    </div>
  );
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
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  );
};

export default App;
