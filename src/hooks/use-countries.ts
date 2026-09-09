import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import * as holidaysService from '../services/holidays-service';

import type { Country } from '../types/api';
import type { CountryOption } from '../types/ui';

export function useCountries() {
  return useQuery({
    queryKey: ['countries'],
    queryFn: () => holidaysService.getCountries(),
    select: useCallback(
      (data: Country[]): CountryOption[] =>
        data.map((country) => ({
          isoCode: country.isoCode,
          name: country.name[0]?.text ?? country.isoCode,
        })),
      [],
    ),
    staleTime: 1000 * 60 * 60 * 24,
  });
}
