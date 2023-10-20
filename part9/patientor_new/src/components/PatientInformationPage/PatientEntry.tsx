import { Entry, Diagnosis } from '../../types';
import './PatientEntry.css';
import { assertNever } from '../../utils';
import HospitalEntryComponent from './HospitalEntryComponent';
import HealthCheckEntryComponent from './HealthCheckEntryComponent';
import OccpupationalHealthcareEntryComponent from './OccupationalHealthcareEntryComponent';

type Props = {
  entry: Entry;
  diagnoses: Diagnosis[];
};

const PatientEntry = ({ entry, diagnoses }: Props) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryComponent entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return (
        <OccpupationalHealthcareEntryComponent
          entry={entry}
          diagnoses={diagnoses}
        />
      );
    case 'HealthCheck':
      return <HealthCheckEntryComponent entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default PatientEntry;
