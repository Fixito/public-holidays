import { queryOptions } from '@tanstack/react-query';

import * as holidaysService from '../services/holidays-service.ts';

import type { Holiday } from '../types/api.ts';
import type { HolidayDisplay } from '../types/ui.ts';

export const holydaysOptions = (country: string) =>
  queryOptions({
    queryKey: ['holidays', country],
    queryFn: () => holidaysService.getHolidays(country),
    select: (data: Holiday[]): HolidayDisplay[] =>
      data.map((holiday) => ({
        id: holiday.id,
        name: holiday.name[0].text,
        startDate: holiday.startDate,
      })),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
