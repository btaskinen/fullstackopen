import Part from './Part';
import { CoursePart } from '../App';
import './Content.css';

interface Props {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: Props) => {
  return (
    <div className="Content">
      {courseParts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

export default Content;
