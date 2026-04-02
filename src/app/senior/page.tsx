'use client';

import dynamic from 'next/dynamic';

const SeniorPageClient = dynamic(() => import('@/components/senior/SeniorPageClient'), {
  ssr: false,
});

const SeniorPage = () => {
  return <SeniorPageClient />;
};

export default SeniorPage;
