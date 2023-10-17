import { useState, useEffect } from 'react';
import './App.css';
import { DiaryEntry } from './types';
import { getAllDiaryEntries } from './services/diaryService';
import Entry from './components/Entry';

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaryEntries().then((data) => {
      setDiaryEntries(data);
    });
  });
  return (
    <>
      <h1>Ilari's Flight Diary</h1>
      <div className="App_entriesContainer">
        {diaryEntries.map((entry) => (
          <Entry key={entry.id} diaryEntry={entry} />
        ))}
      </div>
    </>
  );
};

export default App;
