'use client';

import NaverMap from '@/components/senior/NaverMap';
import { TextToSpeech } from '@/components/junior/TextToSpeech';
import { VoiceInput } from '@/components/junior/VoiceInput';

export default function Home() {
  return (
    <div>
      <VoiceInput />
      <TextToSpeech />
      <NaverMap />
    </div>
  );
}
