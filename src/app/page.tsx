'use client'

import { VoiceInput } from '@/components/VoiceInput'
import { TextToSpeech } from '@/components/TextToSpeech'

export default function Home() {
  return (
    <div>
      <VoiceInput />
      <TextToSpeech />
    </div>
  )
}
