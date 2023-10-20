import { Typography, Card } from '@mui/material';
import { MedicalServices, Favorite } from '@mui/icons-material';
import { Diagnosis, HealthCheckEntry, HealthCheckRating } from '../../types';

type Props = {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
};

const HealthCheckEntryComponent = ({ entry, diagnoses }: Props) => {
  const getHealthCheckRatingIcon = (rating: HealthCheckRating) => {
    switch (rating) {
      case 0:
        return <Favorite color="info" />;
      case 1:
        return <Favorite color="secondary" />;
      case 2:
        return <Favorite color="warning" />;
      case 3:
        return <Favorite color="error" />;
      default:
        return null;
    }
  };
  return (
    <Card key={entry.id} variant="outlined" raised={true} className="card">
      <Typography>
        {entry.date} <MedicalServices />
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
        {getHealthCheckRatingIcon(entry.healthCheckRating)}
      </Typography>
      <Typography>Diagnosed by {entry.specialist}</Typography>
    </Card>
  );
};

export default HealthCheckEntryComponent;
