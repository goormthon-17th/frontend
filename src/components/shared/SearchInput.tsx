import Image from 'next/image';
import { forwardRef } from 'react';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ placeholder = '검색어를 입력하세요', className, ...props }, ref) => {
    return (
      <div style={{ position: 'relative', width: '100%', height: '50px' }}>
        <Image
          src="/icons/search.svg"
          alt="검색"
          width={25}
          height={25}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
          }}
        />
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          style={{
            boxSizing: 'border-box',
            border: '1px solid transparent',
            padding: '10px 40px 10px 20px',
            borderRadius: '10px',
            backgroundColor: '#fafafa',
            fontSize: '18px',
            color: '#555555',
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
