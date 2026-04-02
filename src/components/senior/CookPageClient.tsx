'use client';

import CookCard from '@/components/senior/CookCard';
import { useRegisterRecipe } from '@/api/senior/useRegisterRecipe';
import { Button, VStack } from '@vapor-ui/core';
import { useState } from 'react';

const CookPageClient = () => {
  const [audioUrl] = useState<string | null>(() =>
    typeof window !== 'undefined' ? sessionStorage.getItem('recordedAudioUrl') : null,
  );
  const [recipeResult] = useState<string | null>(() =>
    typeof window !== 'undefined' ? sessionStorage.getItem('recipeResult') : null,
  );
  const [rawTranscript] = useState<string>(() =>
    typeof window !== 'undefined' ? (sessionStorage.getItem('rawTranscript') ?? '') : '',
  );
  const { mutate: registerRecipe, isPending } = useRegisterRecipe();

  return (
    <VStack
      style={{
        position: 'relative',
        minHeight: '100vh',
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
        <CookCard audioUrl={audioUrl} resultText={recipeResult} />
      </div>

      <Button
        disabled={isPending}
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
        onClick={() =>
          registerRecipe({
            raw_text: rawTranscript,
            refined_text: recipeResult ?? '',
            audio_url: audioUrl ?? '',
            image_url: audioUrl ?? '123',
          })
        }
      >
        {isPending ? '전송 중...' : '비법노트 전수하기'}
      </Button>
    </VStack>
  );
};

export default CookPageClient;
