import axios from 'axios';
import { type WeatherDetails } from '../types/weather.types';
import { getWeatherApiFullUrl } from '../utils/api.utils';

const getWeatherByCountryName = async (
  name: string,
): Promise<WeatherDetails> => {
  const response = await axios.get(getWeatherApiFullUrl(name));
  return response.data;
};

export { getWeatherByCountryName };
