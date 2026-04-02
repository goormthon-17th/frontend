'use client';

import { useEffect, useRef } from 'react';

interface NaverMapProps {
  lat: number;
  lng: number;
}

const NaverMap = ({ lat, lng }: NaverMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current || !window.naver) return;

    const map = new window.naver.maps.Map(mapRef.current, {
      center: new window.naver.maps.LatLng(lat, lng),
      zoom: 13,
    });

    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(lat, lng),
      map,
    });
  }, [lat, lng]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default NaverMap;
