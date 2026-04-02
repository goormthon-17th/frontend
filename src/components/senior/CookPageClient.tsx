'use client';

import CookCard from '@/components/senior/CookCard';
import { useRegisterRecipe } from '@/api/senior/useRegisterRecipe';
import { Button, VStack } from '@vapor-ui/core';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CookPageClient = () => {
  const router = useRouter();
  const [audioUrl] = useState<string | null>(() => sessionStorage.getItem('recordedAudioUrl'));
  const [recipeResult] = useState<string | null>(() => sessionStorage.getItem('recipeResult'));
  const [rawTranscript] = useState<string>(() => sessionStorage.getItem('rawTranscript') ?? '');
  const { mutate: registerRecipe, isPending } = useRegisterRecipe();

  return (
    <VStack
      style={{
        position: 'relative',
        minHeight: '100vh',
        alignItems: 'center',
      }}
    >
      <Button
        onClick={() => router.back()}
        style={{
          position: 'absolute',
          top: '16px',
          left: '20px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <Image src="/icons/back.svg" alt="back" width={28} height={28} />
      </Button>
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
          bottom: '104px',
          height: '64px',
          width: '350px',
          backgroundColor: 'var(--color-mandolong-500)',
          borderRadius: '8px',
          fontSize: '18px',
          fontWeight: '500',
          color: 'white',
        }}
        onClick={() =>
          registerRecipe(
            {
              raw_text: rawTranscript,
              refined_text: recipeResult ?? '',
              audio_url: audioUrl ?? '',
              image_url: audioUrl ?? '123',
            },
            { onSuccess: () => router.push('/junior') },
          )
        }
      >
        {isPending ? '전송 중...' : '비법노트 전수하기'}
      </Button>
      <Button
        style={{
          position: 'absolute',
          bottom: '32px',
          height: '64px',
          width: '350px',
          backgroundColor: 'white',
          border: '1px solid var(--color-mandolong-500)',
          borderRadius: '8px',
          fontSize: '18px',
          fontWeight: '500',
          color: 'black',
        }}
        onClick={() => {
          sessionStorage.removeItem('recordedAudioUrl');
          sessionStorage.removeItem('recipeResult');
          sessionStorage.removeItem('rawTranscript');
          router.push('/senior/cook/record');
        }}
      >
        새 녹음 하기
      </Button>
    </VStack>
  );
};

export default CookPageClient;
