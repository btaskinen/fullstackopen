import { CoursePart } from '../App';
import './Part.css';

interface Props {
  part: CoursePart;
}

const Part = ({ part }: Props) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled disriminated union member ${JSON.stringify(value)}`
    );
  };

  switch (part.kind) {
    case 'basic':
      return (
        <div className="Part_container">
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </p>
          <p className="Part_description">{part.description}</p>
        </div>
      );
    case 'group':
      return (
        <div className="Part_container">
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </p>
          <p>Project exercises: {part.groupProjectCount}</p>
        </div>
      );
    case 'background':
      return (
        <div className="Part_container">
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </p>
          <p className="Part_description">{part.description}</p>{' '}
          <p>{part.backgroundMaterial}</p>
        </div>
      );
    case 'special':
      return (
        <div className="Part_container">
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </p>
          <p className="Part_description">{part.description}</p>
          <p>{part.requirements}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
