import type { CountryOption } from '../types/ui';

interface CountrySelectorProps {
  countries: CountryOption[] | undefined;
  selectedCountry: string;
  onCountryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function CountrySelector({
  countries,
  selectedCountry,
  onCountryChange,
}: CountrySelectorProps) {
  return (
    <div className="form-group">
      <label htmlFor="country">Pays :</label>

      <select id="country" value={selectedCountry} onChange={onCountryChange}>
        {countries?.map((country) => (
          <option key={country.isoCode} value={country.isoCode}>
            {country.name ?? country.isoCode}
          </option>
        ))}
      </select>
    </div>
  );
}
