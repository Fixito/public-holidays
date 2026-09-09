import { useState } from 'react';

import CountrySelector from './components/country-selector';
import HolidayList from './components/holidays-list';

import { useCountries } from './hooks/use-countries';
import { useHolidays } from './hooks/use-holidays';

import { API_CONFIG } from './lib/constants';

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState<string>(API_CONFIG.DEFAULT_COUNTRY);

  const { data: countries, error: countriesError, isPending: countriesPending } = useCountries();

  const { data: holidays, error: holidaysError } = useHolidays(selectedCountry);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
  };

  if (countriesPending) {
    return (
      <main className="container">
        <div>Chargement des pays...</div>
      </main>
    );
  }

  if (countriesError) {
    return (
      <main className="container">
        <h1>Erreur: {countriesError.message}</h1>
      </main>
    );
  }

  return (
    <main className="container">
      <h1>Jours fériés</h1>

      <section>
        <CountrySelector
          countries={countries}
          onCountryChange={handleCountryChange}
          selectedCountry={selectedCountry}
        />

        <HolidayList holidays={holidays} error={holidaysError} />
      </section>
    </main>
  );
}
