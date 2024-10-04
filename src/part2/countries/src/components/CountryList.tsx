import { Country } from '../types/country.types';
import CountryItem from './CountryItem';

interface CountryListProps {
  countries: Array<Country>;
  onShow: (country: Array<Country>) => void;
}

export default function CountryList({ countries, onShow }: CountryListProps) {
  return (
    <ul className='country-list'>
      {countries.map(({ name }, i) => (
        <CountryItem key={i} name={name.common} onShow={onShow} />
      ))}
    </ul>
  );
}
