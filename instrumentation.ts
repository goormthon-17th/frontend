export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const keys = [
      'NEXT_PUBLIC_BACKEND_URL',
      'NEXT_PUBLIC_CLOVA_INVOKE_URL',
      'NEXT_PUBLIC_CLOVA_SECRET_KEY',
      'NEXT_PUBLIC_NAVER_MAP_CLIENT_ID',
      'GEMINI_API_KEY',
      'NODE_ENV',
    ];

    console.log('[ENV] ===== Server Environment Variables =====');
    for (const key of keys) {
      const value = process.env[key];
      console.log(`[ENV] ${key} = ${value ?? '(not set)'}`);
    }
    console.log('[ENV] ==========================================');
  }
}
