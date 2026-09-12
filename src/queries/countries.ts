import { queryOptions } from '@tanstack/react-query';

import * as holidaysService from '../services/holidays-service.ts';

import type { Country } from '../types/api.ts';
import type { CountryOption } from '../types/ui.ts';

export const countriesOptions = () =>
  queryOptions({
    queryKey: ['countries'],
    queryFn: () => holidaysService.getCountries(),
    select: (data: Country[]): CountryOption[] =>
      data.map((country) => ({
        isoCode: country.isoCode,
        name: country.name[0]?.text ?? country.isoCode,
      })),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
