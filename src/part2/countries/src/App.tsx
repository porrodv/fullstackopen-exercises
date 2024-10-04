import { useCallback, useEffect, useState } from 'react';
import { Country } from './types/country.types';
import { CountryList, CountryDetails, Filter } from './components';
import { getAllCountries } from './services/country.services';

export default function App() {
  const [countries, setCountries] = useState<Array<Country> | null>(null);
  const [filteredCountries, setFilteredCountries] = useState<Array<Country>>(
    [],
  );

  const fetchData = useCallback(async () => {
    const countries = await getAllCountries();
    setCountries(countries);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!countries) return <h1>No data.</h1>;

  return (
    <main id='container'>
      <section>
        <h1>Countries</h1>

        <Filter countries={countries} onFilter={setFilteredCountries} />
      </section>

      <section>
        {filteredCountries.length < 1 && null}

        {filteredCountries.length > 10 && (
          <p>Too many matches, specify another filter</p>
        )}

        {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
          <CountryList
            countries={filteredCountries}
            onShow={setFilteredCountries}
          />
        )}

        {filteredCountries.length === 1 &&
          (() => {
            const country = filteredCountries[0];
            return (
              <CountryDetails
                name={country.name}
                capital={country.capital}
                area={country.area}
                languages={country.languages}
                flags={country.flags}
              />
            );
          })()}
      </section>
    </main>
  );
}
