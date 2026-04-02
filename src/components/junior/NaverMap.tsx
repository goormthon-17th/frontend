'use client';

import { useEffect, useRef } from 'react';

const NaverMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current || !window.naver) return;

    const map = new window.naver.maps.Map(mapRef.current, {
      center: new window.naver.maps.LatLng(37.5665, 126.978),
      zoom: 13,
    });
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default NaverMap;
