import { DiaryEntry } from '../types';
import './Entry.css';

type Props = {
  diaryEntry: DiaryEntry;
};

const Entry = ({ diaryEntry }: Props) => {
  return (
    <div className="Entry_container">
      <h2>{diaryEntry.date}</h2>
      <p>
        <strong>Weather:</strong> {diaryEntry.weather}
      </p>
      <p>
        <strong>Visibility:</strong> {diaryEntry.visibility}
      </p>
      <p>{diaryEntry.comment}</p>
    </div>
  );
};

export default Entry;
