import { WEATHER_API_URL } from '../constants/api.constants';

const getWeatherApiFullUrl = (query: string): string => {
  return `${WEATHER_API_URL}weather?q=${query}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&lang=en`;
};

export { getWeatherApiFullUrl };
