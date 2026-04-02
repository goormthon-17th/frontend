'use client';

import dynamic from 'next/dynamic';

const CookPageClient = dynamic(() => import('@/components/senior/CookPageClient'), { ssr: false });

const CookPage = () => {
  return <CookPageClient />;
};

export default CookPage;
