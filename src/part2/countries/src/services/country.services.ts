import axios from 'axios';
import { COUNTRY_API_URL, COUNTRY_SERVICE } from '../constants/api.constants';
import { Country } from '../types/country.types';

const getAllCountries = async (): Promise<Array<Country>> => {
  const response = await axios.get(
    `${COUNTRY_API_URL}${COUNTRY_SERVICE.GET_ALL}`,
  );
  return response.data;
};

const getCountryByName = async (name: string): Promise<Country> => {
  const response = await axios.get(
    `${COUNTRY_API_URL}${COUNTRY_SERVICE.FIND_BY_NAME}/${name}`,
  );
  return response.data;
};

export { getAllCountries, getCountryByName };
