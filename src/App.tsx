import { startTransition, useState } from 'react';

import CountrySelector from './components/country-selector';
import HolidayList from './components/holidays-list';
import { QueryBoundary } from './components/query-boundary';

import { API_CONFIG } from './lib/constants';

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState<string>(API_CONFIG.DEFAULT_COUNTRY);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    startTransition(() => setSelectedCountry(e.target.value));
  };

  return (
    <main className="container">
      <h1>Jours fériés</h1>

      <section>
        <QueryBoundary loadingFallback={<div>Chargement...</div>}>
          <CountrySelector
            onCountryChange={handleCountryChange}
            selectedCountry={selectedCountry}
          />

          <QueryBoundary loadingFallback={<div>Chargement des jours fériés...</div>}>
            <HolidayList country={selectedCountry} />
          </QueryBoundary>
        </QueryBoundary>
      </section>
    </main>
  );
}
