import { Typography, Card } from '@mui/material';
import { FitnessCenter } from '@mui/icons-material';
import { Diagnosis, OccupationalHealthcareEntry } from '../../types';

type Props = {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
};

const OccpupationalHealthcareEntryComponent = ({ entry, diagnoses }: Props) => {
  return (
    <Card key={entry.id} variant="outlined" raised={true} className="card">
      <Typography>
        {entry.date} <FitnessCenter /> {entry.employerName}
      </Typography>
      <Typography>
        <i>{entry.description}</i>
      </Typography>
      <Typography>
        <ul className="unorderedList">
          {entry.diagnosisCodes?.map((code) => {
            const diagnosisCode = diagnoses.find(
              (diagnosis) => diagnosis.code === code
            );
            return (
              <li key={code}>
                {code} {diagnosisCode ? diagnosisCode.name : ''}
              </li>
            );
          })}
        </ul>
        {entry.sickLeave && (
          <Typography>
            Sick leave from {entry.sickLeave.startDate} to{' '}
            {entry.sickLeave.endDate}
          </Typography>
        )}
      </Typography>
      <Typography>Diagnosed by {entry.specialist}</Typography>
    </Card>
  );
};

export default OccpupationalHealthcareEntryComponent;
