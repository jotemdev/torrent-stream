import { Dispatch, FormEvent, SetStateAction, useRef } from 'react';

interface SearchFormProps {
  onSearch: Dispatch<SetStateAction<string | undefined>>;
}
const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!searchRef.current) return;
    onSearch(searchRef.current.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={searchRef} />
      <button onClick={handleSubmit}>Search</button>
    </form>
  );
};

export default SearchForm;
