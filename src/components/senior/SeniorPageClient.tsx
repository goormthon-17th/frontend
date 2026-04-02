'use client';

import SeniorStepLayout from '@/components/senior/SeniorStepLayout';
import WaveformVisualizer from '@/components/senior/WaveformVisualizer';
import { useGenerateRecipe } from '@/api/senior/useGenerateRecipe';
import { MOCK_TEXT } from '@/api/senior/generateRecipeApi';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

type SeniorStep = 'intro' | 'recording' | 'picture' | 'record-complete';

const SeniorPageClient = () => {
  const router = useRouter();
  const [step, setStep] = useState<SeniorStep>('intro');
  const { start, stop, audioUrl, transcript, stream } = useSpeechToText({ lang: 'ko-KR' });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { mutate: generateRecipe, isPending } = useGenerateRecipe();

  if (step === 'intro') {
    return (
      <SeniorStepLayout
        title="춘자 삼춘, 혼저 옵서예!"
        subtitle="오늘 마당에서 딴 톳으로 비법 좀 들려주실래요?"
      >
        <div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
        >
          <Image
            onClick={() => {
              start();
              setStep('recording');
            }}
            style={{ cursor: 'pointer' }}
            src="/icons/illust_record.svg"
            alt="recording"
            height={230}
            width={200}
          />
          <span style={{ fontSize: '20px', fontWeight: '500', color: '#767676' }}>
            마이크를 눌러 녹음을 시작해주세요
          </span>
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
        subtitle="말씀해주시는 비법 하나하나 잘 저장하고 이수다!"
        overlay={<WaveformVisualizer stream={stream} />}
      >
        <div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
        >
          <Image
            onClick={() => {
              stop();
              setStep('picture');
            }}
            style={{ cursor: 'pointer' }}
            src="/icons/illust_record.svg"
            alt="recording"
            width={240}
            height={240}
          />
          <span style={{ fontSize: '20px', fontWeight: '500', color: '#767676' }}>녹음 중</span>
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
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setImageUrl(URL.createObjectURL(file));
            setStep('record-complete');
          }}
        />
        <Image src="/icons/illust_add_pic.svg" alt="add picture" width={240} height={240} />
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
        dimText={'비법노트\n제작중...'}
        button={{
          label: '확인',
          onClick: () => {
            if (audioUrl) sessionStorage.setItem('recordedAudioUrl', audioUrl);
            console.log(imageUrl);
            generateRecipe(
              {
                text: transcript || MOCK_TEXT,
              },
              {
                onSuccess: (data) => {
                  sessionStorage.setItem('recipeResult', data.resultText ?? '');
                  sessionStorage.setItem('rawTranscript', transcript);
                  router.push('/senior/cook');
                },
              },
            );
          },
        }}
      />
    );
  }
};

export default SeniorPageClient;
