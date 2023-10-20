import { Typography, Card } from '@mui/material';
import { LocalHospital } from '@mui/icons-material';
import { Diagnosis, HospitalEntry } from '../../types';

type Props = {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
};

const HospitalEntryComponent = ({ entry, diagnoses }: Props) => {
  return (
    <Card key={entry.id} variant="outlined" raised={true} className="card">
      <Typography>
        {entry.date} <LocalHospital />
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
      </Typography>
      <Typography>
        Discharge on {entry.discharge.date}, if {entry.discharge.criteria}
      </Typography>
      <Typography>Diagnosed by {entry.specialist}</Typography>
    </Card>
  );
};

export default HospitalEntryComponent;
