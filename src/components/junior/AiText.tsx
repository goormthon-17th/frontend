'use client';

import { Text } from '@vapor-ui/core';
import { useState } from 'react';

interface AiTextProps {
  text: string;
  linesToShow?: number;
}

const AiText = ({ text, linesToShow = 3 }: AiTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <Text
        style={{
          fontSize: '16px',
          lineHeight: '1.8',
          color: 'var(--color-mandolong-600)',
          whiteSpace: 'pre-wrap',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: isExpanded ? 'unset' : linesToShow,
          overflow: 'hidden',
          fontWeight: '500',
        }}
      >
        {text}
      </Text>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '4px',
          marginTop: '4px',
          cursor: 'pointer',
        }}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <Text style={{ fontSize: '14px', color: 'var(--color-black)' }}>
          {isExpanded ? '접기' : '더보기'}
        </Text>
        <img
          src="/icons/arrow-down.svg"
          alt={isExpanded ? '접기' : '더보기'}
          style={{
            width: '16px',
            height: '16px',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        />
      </div>
    </div>
  );
};

export default AiText;
