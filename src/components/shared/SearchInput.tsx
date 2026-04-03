import Image from 'next/image';
import { forwardRef, useRef } from 'react';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onSearch?: (value: string) => void;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ placeholder = '검색어를 입력하세요', className, onSearch, ...props }, ref) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) ?? innerRef;

    const handleSearch = () => {
      const value = inputRef.current?.value ?? '';
      onSearch?.(value);
    };

    return (
      <div style={{ position: 'relative', width: '100%', height: '48px' }}>
        <Image
          src="/icons/search.svg"
          alt="검색"
          width={25}
          height={25}
          onClick={handleSearch}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
          }}
        />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          style={{
            boxSizing: 'border-box',
            border: '1px solid transparent',
            padding: '10px 40px 10px 20px',
            borderRadius: '8px',
            backgroundColor: 'var(--color-white)',
            fontSize: '18px',
            color: 'var(--color-black)',
            width: '100%',
            height: '100%',
          }}
          onFocus={(e) => {
            e.target.style.outline = 'none';
            e.target.style.border = '1px solid var(--color-mandolong-600)';
          }}
          onBlur={(e) => {
            e.target.style.border = '1px solid transparent';
          }}
          {...props}
        />
      </div>
    );
  },
);

SearchInput.displayName = 'SearchInput';
export default SearchInput;
