import axios from 'axios';
import { getWeatherApiFullUrl } from '../utils/api.utils';
import { WeatherDetails } from '../types/weather.types';

const getWeatherByCountryName = async (
  name: string,
): Promise<WeatherDetails> => {
  const response = await axios.get(getWeatherApiFullUrl(name));
  return response.data;
};

export { getWeatherByCountryName };
