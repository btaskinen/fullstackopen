import { Typography } from '@mui/material';
import { Patient } from '../types';
import { useParams } from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import './PatientInformationPage.css';

type Props = {
  patients: Patient[];
};

const PatientInformationPage = ({ patients }: Props) => {
  const id = useParams().id;
  const patient = patients.find((patient) => patient.id === id);

  if (!patient) return <div>Patient not found.</div>;

  let genderIcon = null;

  switch (patient.gender) {
    case 'female': {
      genderIcon = <FemaleIcon className="genderSvg" />;
      break;
    }
    case 'male': {
      genderIcon = <MaleIcon className="genderSvg" />;
      break;
    }
    default:
      break;
  }

  return (
    <div>
      <div className="nameContainer">
        <Typography
          variant="h4"
          style={{ marginBottom: '0.5em', marginTop: '0.5em' }}
        >
          {patient.name}
        </Typography>
        {genderIcon}
      </div>
      <Typography>ssh: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>{' '}
      <Typography
        variant="h5"
        style={{ marginBottom: '0.5em', marginTop: '0.5em' }}
      >
        Entries
      </Typography>
      {patient.entries.map((entry) => (
        <div key={entry.id}>
          <Typography>
            {entry.date} {entry.description}
          </Typography>
          {entry.diagnosisCodes?.map((code) => (
            <ul className="unorderedList">
              <li>{code}</li>
            </ul>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PatientInformationPage;
