'use client';

import SeniorStepLayout from '@/components/senior/SeniorStepLayout';
import WaveformVisualizer from '@/components/senior/WaveformVisualizer';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import { Button } from '@vapor-ui/core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type SeniorStep = 'intro' | 'recording' | 'picture' | 'record-complete';

const recordingButtonStyle = {
  height: '64px',
  width: '350px',
  backgroundColor: 'var(--color-mandolong-500)',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: '500',
  color: 'white',
};

const SeniorPageClient = () => {
  const router = useRouter();
  const [step, setStep] = useState<SeniorStep>('intro');
  const { start, stop, audioUrl, stream } = useSpeechToText({ lang: 'ko-KR' });

  if (step === 'intro') {
    return (
      <SeniorStepLayout
        title="춘자 삼춘, 혼저 옵서예!"
        subtitle="오늘 마당에서 딴 톳으로 비법 좀 들려주실래요?"
      >
        <Button
          style={recordingButtonStyle}
          onClick={() => {
            start();
            setStep('recording');
          }}
        >
          녹음 시작
        </Button>
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
        subtitle="말씀해주시는 비법 하나하나 잘 저장하고 이수다!"
      >
        <Button
          style={recordingButtonStyle}
          onClick={() => {
            stop();
            setStep('picture');
          }}
        >
          녹음 종료
        </Button>
        <WaveformVisualizer stream={stream} />
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
        button={{
          label: '사진 폴더 열기',
          onClick: () => setStep('record-complete'),
          variant: 'outline',
        }}
      />
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
        button={{
          label: '확인',
          onClick: () => {
            if (audioUrl) sessionStorage.setItem('recordedAudioUrl', audioUrl);
            router.push('/senior/cook');
          },
        }}
      />
    );
  }
};

export default SeniorPageClient;
