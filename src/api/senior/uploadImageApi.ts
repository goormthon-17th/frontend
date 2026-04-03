export interface UploadImageResult {
  path: string;
  filename: string;
  url: string;
}

export async function uploadImage(file: File): Promise<UploadImageResult> {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch('https://goormthon-4.goorm.training/api/upload/image', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`이미지 업로드 실패: ${response.status}`);
  }

  return response.json();
}
