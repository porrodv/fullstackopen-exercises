import { getCountryByName } from '../services/country.services';
import { Country } from '../types/country.types';

interface CountryItemProps {
  name: string;
  onShow: (country: Array<Country>) => void;
}

export default function CountryItem({ name, onShow }: CountryItemProps) {
  const showCountry = async (name: string): Promise<void> => {
    try {
      const country = await getCountryByName(name);
      onShow([country]);
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleClick = async (): Promise<void> => await showCountry(name);

  return (
    <li className='country-list__item'>
      <p>{name}</p>
      <div>
        <button type='button' onClick={handleClick}>
          Show
        </button>
      </div>
    </li>
  );
}
