import { useSuspenseQuery } from '@tanstack/react-query';
import { countriesOptions } from '../queries/countries.ts';

interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function CountrySelector({
  selectedCountry,
  onCountryChange,
}: CountrySelectorProps) {
  const { data: countries } = useSuspenseQuery(countriesOptions());

  return (
    <div className="form-group">
      <label htmlFor="country">Pays :</label>

      <select id="country" value={selectedCountry} onChange={onCountryChange}>
        {countries.map((country) => (
          <option key={country.isoCode} value={country.isoCode}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}
