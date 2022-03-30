import { InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react';
import { Dispatch, FormEvent, useRef } from 'react';

interface SearchFormProps {
  onSearch: Dispatch<string>;
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
      <InputGroup size="md">
        <Input
          ref={searchRef}
          pr="4.5rem"
          type="search"
          placeholder="Type movie name, or year"
        />
        <InputRightElement width="4.5rem">
          <Button type="submit" h="1.75rem" size="sm">
            Search
          </Button>
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default SearchForm;
