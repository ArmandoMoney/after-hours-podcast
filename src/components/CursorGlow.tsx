import { useEffect, useRef, useState } from 'react';

export default function CursorGlow() {
  const [isHoverDevice, setIsHoverDevice] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const match = window.matchMedia('(hover: hover)');
    setIsHoverDevice(match.matches);
  }, []);

  useEffect(() => {
    if (!isHoverDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          if (glowRef.current) {
            glowRef.current.style.transform = `translate3d(${posRef.current.x - 225}px, ${posRef.current.y - 225}px, 0)`;
          }
          rafRef.current = 0;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isHoverDevice]);

  if (!isHoverDevice) return null;

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 450,
        height: 450,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
        willChange: 'transform',
        transform: 'translate3d(-450px, -450px, 0)',
      }}
    />
  );
}
