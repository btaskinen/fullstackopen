import { useState } from 'react';
import './NewEntryForm.css';
import { createDiaryEntry } from '../services/diaryService';
import { NewDiaryEntry, Weather, Visibility, DiaryEntry } from '../types';
import { isDiaryEntry } from '../utils';

type Props = {
  diaryEntries: DiaryEntry[];
  setDiaryEntries: (a: DiaryEntry[]) => void;
  setNotification: (a: string | null) => void;
};

const NewEntryForm = ({
  diaryEntries,
  setDiaryEntries,
  setNotification,
}: Props) => {
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState<Weather>(Weather.Empty);
  const [newVisibility, setNewVisibility] = useState<Visibility>(
    Visibility.Empty
  );
  const [newComment, setNewComment] = useState('');

  const newEntryHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const entryToAdd: NewDiaryEntry = {
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment,
    };
    createDiaryEntry(entryToAdd).then((data) => {
      if (isDiaryEntry(data)) {
        setDiaryEntries(diaryEntries.concat(data));
      } else {
        setNotification(data);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    });

    setNewDate('');
    setNewWeather(Weather.Empty);
    setNewVisibility(Visibility.Empty);
    setNewComment('');

    console.log('foo');
  };

  return (
    <div className="NewEntryForm_container">
      <h2>Add New Entry</h2>
      <form className="NewEntryForm_form" onSubmit={newEntryHandler}>
        <label className="NewEntryForm_inputContainer">
          Date:{' '}
          <input
            className="NewEntryForm_input"
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)}
          />
        </label>
        <label className="NewEntryForm_inputContainer">
          Weather:{' '}
          <input
            className="NewEntryForm_input"
            value={newWeather}
            onChange={(event) => setNewWeather(event.target.value as Weather)}
          />
        </label>
        <label className="NewEntryForm_inputContainer">
          Visibility:{' '}
          <input
            className="NewEntryForm_input"
            value={newVisibility}
            onChange={(event) =>
              setNewVisibility(event.target.value as Visibility)
            }
          />
        </label>
        <label className="NewEntryForm_inputContainer">
          Comment:{' '}
          <input
            className="NewEntryForm_input"
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
        </label>

        <button className="NewEntryForm_button" type="submit">
          Add New Entry
        </button>
      </form>
    </div>
  );
};

export default NewEntryForm;
