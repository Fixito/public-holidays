import apiClient from './api';

import { API_CONFIG } from '../lib/constants';

import type { Country, Holiday } from '../types/api';

export async function getCountries(): Promise<Country[]> {
  try {
    const { data } = await apiClient.get(`/Countries?languageIsoCode=${API_CONFIG.LANGUAGE}`);
    return data;
  } catch {
    throw new Error('Erreur lors du chargement des pays');
  }
}

export async function getHolidays(countryIsoCode: string): Promise<Holiday[]> {
  try {
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1).toISOString().split('T')[0];
    const endDate = new Date(currentYear, 11, 31).toISOString().split('T')[0];

    const params = new URLSearchParams({
      countryIsoCode,
      languageIsoCode: API_CONFIG.LANGUAGE,
      validFrom: startDate,
      validTo: endDate,
    });

    const { data } = await apiClient.get(`/PublicHolidays?${params}`);
    return data;
  } catch {
    throw new Error('Erreur lors du chargement des jours fériés');
  }
}
