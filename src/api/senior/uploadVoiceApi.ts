import axios from 'axios';

interface UploadVoiceResponse {
  ok: boolean;
  originalName: string;
  mimeType: string;
  size: number;
  text?: string;
}

export async function uploadVoice(audioUrl: string): Promise<UploadVoiceResponse> {
  const audioBlob = await fetch(audioUrl).then((r) => r.blob());
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');
  return axios
    .post('https://goormthon-4.goorm.training/api/voice', formData)
    .then((res) => res.data);
}
