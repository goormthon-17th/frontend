import axios from 'axios'
import { useRef, useState } from 'react'

interface UseSpeechToTextOptions {
  lang?: 'ko-KR' | 'ja' | 'en-US' | 'zh-CN'
  onResult?: (text: string) => void
  onError?: (error: Error) => void
}

interface UseSpeechToTextReturn {
  isRecording: boolean
  transcript: string
  start: () => Promise<void>
  stop: () => void
  reset: () => void
}

export function useSpeechToText({
  lang = 'ko-KR',
  onResult,
  onError,
}: UseSpeechToTextOptions): UseSpeechToTextReturn {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop())
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' })
        await sendToClova(audioBlob)
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('마이크 접근 실패')
      onError?.(error)
    }
  }

  const stop = () => {
    mediaRecorderRef.current?.stop()
    setIsRecording(false)
  }

  const reset = () => {
    setTranscript('')
  }

  const sendToClova = async (audioBlob: Blob) => {
    try {
      const params = { language: lang, completion: 'sync' }
      const formData = new FormData()
      formData.append('media', audioBlob, 'recording.webm')
      formData.append('params', JSON.stringify(params))

      const { data } = await axios.post('/api/stt', formData)
      const text: string = data.text ?? ''
      setTranscript(text)
      onResult?.(text)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('STT 변환 실패')
      onError?.(error)
    }
  }

  return { isRecording, transcript, start, stop, reset }
}
