'use client';

import { useEffect, useRef } from 'react';

interface WaveformVisualizerProps {
  stream: MediaStream | null;
}

const BAR_COUNT = 7;

const WaveformVisualizer = ({ stream }: WaveformVisualizerProps) => {
  const leftBarsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightBarsRef = useRef<(HTMLDivElement | null)[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    if (!stream) return;

    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 32;
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const animate = () => {
      analyser.getByteFrequencyData(dataArray);

      for (let i = 0; i < BAR_COUNT; i++) {
        const value = dataArray[i] / 255;
        const height = Math.max(8, value * 160);

        const leftBar = leftBarsRef.current[i];
        const rightBar = rightBarsRef.current[BAR_COUNT - 1 - i];
        if (leftBar) leftBar.style.height = `${height}px`;
        if (rightBar) rightBar.style.height = `${height}px`;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      source.disconnect();
      audioContext.close();
    };
  }, [stream]);

  const groupStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    height: '160px',
  };

  const barStyle: React.CSSProperties = {
    width: '3px',
    height: '8px',
    backgroundColor: 'var(--color-mandolong-800)',
    transition: 'height 0.06s ease',
  };

  return (
    <>
      <div style={{ ...groupStyle, left: '16px' }}>
        {Array.from({ length: BAR_COUNT }, (_, i) => (
          <div
            key={i}
            ref={(el) => {
              leftBarsRef.current[i] = el;
            }}
            style={barStyle}
          />
        ))}
      </div>
      <div style={{ ...groupStyle, right: '16px' }}>
        {Array.from({ length: BAR_COUNT }, (_, i) => (
          <div
            key={i}
            ref={(el) => {
              rightBarsRef.current[i] = el;
            }}
            style={barStyle}
          />
        ))}
      </div>
    </>
  );
};

export default WaveformVisualizer;
