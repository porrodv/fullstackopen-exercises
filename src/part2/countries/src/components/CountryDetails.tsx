import { useCallback, useEffect, useState } from 'react';
import { Country } from '../types/country.types';
import { getWeatherByCountryName } from '../services/weather.services';
import { WeatherDetails } from '../types/weather.types';

const WEATHER_IMAGE_BASE_URL = 'https://openweathermap.org/img/wn';

interface CountryDetailsProps
  extends Pick<Country, 'name' | 'capital' | 'area' | 'languages' | 'flags'> {}

export default function CountryDetails({
  name,
  capital,
  area,
  languages,
  flags,
}: CountryDetailsProps) {
  const [weather, setWeather] = useState<WeatherDetails | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const weatherInfo = await getWeatherByCountryName(name.common);
      setWeather(weatherInfo);
    } catch (error: any) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getWeatherImage = (icon: string): string => {
    return `${WEATHER_IMAGE_BASE_URL}/${icon}@4x.png`;
  };

  return (
    <article>
      <div id='country'>
        <header className='country__header'>
          <div>
            <h2>{name.common}</h2>
            <h3>Capital: {capital}</h3>
            <h3>Area: {area}</h3>
            <h3>Languages</h3>
            <ul>
              {Object.entries(languages).map(([key, value]) => (
                <li key={key}>{value}</li>
              ))}
            </ul>
          </div>

          <picture>
            <img src={flags.png} alt={`${name.common} flag`} />
          </picture>
        </header>
      </div>

      <div id='weather-details'>
        <h2>Wather details</h2>

        {!weather ? (
          <p>No weather info</p>
        ) : (
          <>
            <h3>Temperature: {weather.main.temp} Celcius</h3>
            <picture>
              <img
                src={getWeatherImage(weather.weather[0].icon)}
                alt={`${weather.weather[0].description} icon`}
                width={100}
              />
            </picture>
            <h3>Wind: {weather.wind.speed} m/s</h3>
          </>
        )}
      </div>
    </article>
  );
}
