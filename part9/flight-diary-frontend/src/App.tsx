import { useState, useEffect } from 'react';
import './App.css';
import { DiaryEntry } from './types';
import { getAllDiaryEntries } from './services/diaryService';
import Entry from './components/Entry';
import NewEntryForm from './components/NewEntryForm';

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaryEntries().then((data) => {
      setDiaryEntries(data);
    });
  });

  return (
    <>
      <h1>Ilari's Flight Diary</h1>
      {notification && <p>{notification}</p>}
      <NewEntryForm
        diaryEntries={diaryEntries}
        setDiaryEntries={setDiaryEntries}
        setNotification={setNotification}
      />
      <div className="App_entriesContainer">
        {diaryEntries.map((entry) => (
          <Entry key={entry.id} diaryEntry={entry} />
        ))}
      </div>
    </>
  );
};

export default App;
