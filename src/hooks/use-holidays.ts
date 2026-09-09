import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import * as holidaysService from '../services/holidays-service';

import type { Holiday } from '../types/api';
import type { HolidayDisplay } from '../types/ui';

export function useHolidays(countryIsoCode: string) {
  return useQuery({
    queryKey: ['holidays', countryIsoCode],
    queryFn: () => holidaysService.getHolidays(countryIsoCode),
    enabled: Boolean(countryIsoCode),
    select: useCallback(
      (data: Holiday[]): HolidayDisplay[] =>
        data.map((holiday) => ({
          id: holiday.id,
          name: holiday.name[0]?.text ?? 'Nom indisponible',
          startDate: holiday.startDate,
        })),
      [],
    ),
    staleTime: 1000 * 60 * 60,
  });
}
