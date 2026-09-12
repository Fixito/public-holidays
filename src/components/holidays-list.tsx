import { useSuspenseQuery } from '@tanstack/react-query';

import { holydaysOptions } from '../queries/holidays.ts';

interface HolidayListProps {
  country: string;
}

export default function HolidayList({ country }: HolidayListProps) {
  const { data: holidays } = useSuspenseQuery(holydaysOptions(country));

  if (holidays.length === 0) {
    return <div>Aucun jour férié trouvé pour ce pays.</div>;
  }

  return (
    <ul>
      {holidays.map((holiday) => (
        <li key={holiday.id}>
          {new Date(holiday.startDate).toLocaleDateString('fr-FR', {
            month: 'long',
            day: 'numeric',
          })}{' '}
          - {holiday.name}
        </li>
      ))}
    </ul>
  );
}
