'use client';

import CookCard from '@/components/senior/CookCard';
import { Button } from '@vapor-ui/core';
import { useState } from 'react';

const CookPageClient = () => {
  const [audioUrl] = useState<string | null>(() =>
    typeof window !== 'undefined' ? sessionStorage.getItem('recordedAudioUrl') : null,
  );

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '100%', height: '241px', backgroundColor: 'black' }} />
      <div
        style={{
          width: '100%',
          backgroundColor: 'var(--color-mandolong-900)',
          minHeight: 'calc(100vh - 241px)',
        }}
      />

      <div style={{ position: 'absolute', top: '135px', width: '350px' }}>
        <CookCard audioUrl={audioUrl} />
      </div>

      <Button
        style={{
          position: 'absolute',
          bottom: '32px',
          height: '64px',
          width: '350px',
          backgroundColor: 'var(--color-mandolong-500)',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '500',
          color: 'white',
        }}
      >
        비법노트 전수하기
      </Button>
    </div>
  );
};

export default CookPageClient;
