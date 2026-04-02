'use client';

import NaverMap from '@/components/NaverMap';
import { TextToSpeech } from '@/components/TextToSpeech';
import { VoiceInput } from '@/components/VoiceInput';

export default function Home() {
  return (
    <div>
      <VoiceInput />
      <TextToSpeech />
      <NaverMap />
    </div>
  );
}
