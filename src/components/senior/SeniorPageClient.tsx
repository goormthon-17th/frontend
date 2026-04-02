'use client';

import SeniorStepLayout from '@/components/senior/SeniorStepLayout';
import WaveformVisualizer from '@/components/senior/WaveformVisualizer';
import { uploadVoice } from '@/api/senior/uploadVoiceApi';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Button } from '@vapor-ui/core';

type SeniorStep = 'intro' | 'recording' | 'picture' | 'record-complete';

const SeniorPageClient = () => {
  const router = useRouter();
  const [step, setStep] = useState<SeniorStep>('intro');
  const { start, stop, audioUrl, transcript, stream } = useSpeechToText({ lang: 'ko-KR' });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, setIsPending] = useState(false);

  if (step === 'intro') {
    return (
      <SeniorStepLayout
        title="춘자 삼춘, 혼저 옵서예!"
        subtitle="오늘 마당에서 딴 톳으로 비법 좀 들려주실래요?"
      >
        <div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '46px' }}
        >
          <Image
            style={{ cursor: 'pointer' }}
            src="/icons/illust_record.svg"
            alt="recording"
            height={240}
            width={240}
          />
          <Button
            onClick={() => {
              start();
              setStep('recording');
            }}
            $css={{
              fontSize: '18px',
              fontWeight: '700',
              height: '48px',
              width: '177px',
              backgroundColor: 'var(--color-mandolong-500)',
              borderRadius: '8px',
              color: 'white',
            }}
          >
            <Image src="/icons/mic_on_outline.svg" alt="mic on" width={24} height={24} />
            녹음 시작하기
          </Button>
        </div>
      </SeniorStepLayout>
    );
  }

  if (step === 'recording') {
    return (
      <SeniorStepLayout
        onBack={() => {
          stop();
          setStep('intro');
        }}
        title={
          <>
            춘자 삼춘,
            <br />귀 잘 열어 듣고있수다!
          </>
        }
        subtitle="말씀해주시는 비법 하나하나 잘 저장하고 있어요"
        overlay={<WaveformVisualizer stream={stream} />}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Image
            style={{ cursor: 'pointer', marginBottom: '46px' }}
            src="/icons/illust_record.svg"
            alt="recording"
            width={240}
            height={240}
          />
          <Button
            onClick={() => {
              stop();
              setStep('picture');
            }}
            $css={{
              fontSize: '18px',
              fontWeight: '700',
              height: '48px',
              width: '177px',
              backgroundColor: 'white',
              borderRadius: '8px',
              color: 'var(--color-mandolong-500)',
              border: '1px solid var(--color-mandolong-500)',
              boxShadow: '$sm',
              marginBottom: '44px',
            }}
          >
            녹음 완료하기
          </Button>
          <Button
            $css={{
              fontSize: '16px',
              fontWeight: '700',
              backgroundColor: 'white',
              color: 'var(--color-gray-100)',
              textDecoration: 'underline',
            }}
          >
            녹음 잠시 중단
          </Button>
        </div>
      </SeniorStepLayout>
    );
  }

  if (step === 'picture') {
    return (
      <SeniorStepLayout
        onBack={() => setStep('recording')}
        title={
          <>
            춘자 삼춘,
            <br />
            귀하게 잘 기록었수다!
          </>
        }
        subtitle="레시피에 맞는 음식 사진을 추가해주세요"
        button={{
          label: '사진 폴더 열기',
          onClick: () => fileInputRef.current?.click(),
          variant: 'outline',
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={() => {
            setStep('record-complete');
          }}
        />
        <Image src="/icons/Illust_add_pic.svg" alt="add picture" width={240} height={240} />
      </SeniorStepLayout>
    );
  }

  if (step === 'record-complete') {
    return (
      <SeniorStepLayout
        onBack={() => setStep('picture')}
        title={
          <>
            이제 소중한 비법노트를
            <br />
            확인해 볼까예?
          </>
        }
        dim={isPending}
        dimText={'비법노트 제작중...'}
        button={{
          label: '확인',
          onClick: async () => {
            if (!audioUrl) return;
            setIsPending(true);
            try {
              const [data] = await Promise.all([
                uploadVoice(audioUrl),
                new Promise((resolve) => setTimeout(resolve, 3000)),
              ]);
              sessionStorage.setItem('recipeResult', data.text ?? '');
              sessionStorage.setItem('rawTranscript', transcript);
              router.push('/senior/cook');
            } finally {
              setIsPending(false);
            }
          },
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Image src="/icons/Illust_record_cat.svg" alt="recording cat" width={240} height={240} />
        </div>
      </SeniorStepLayout>
    );
  }
};

export default SeniorPageClient;
