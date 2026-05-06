import { useEffect, useRef } from 'react';

export default function CursorAura() {
  const dotRef = useRef(null);
  const auraRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const auraPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const aura = auraRef.current;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const loop = () => {
      auraPos.current.x += (mouse.current.x - auraPos.current.x) * 0.08;
      auraPos.current.y += (mouse.current.y - auraPos.current.y) * 0.08;
      aura.style.transform = `translate(${auraPos.current.x}px, ${auraPos.current.y}px)`;
      rafRef.current = requestAnimationFrame(loop);
    };

    const onEnter = () => { dot.style.opacity = '1'; aura.style.opacity = '1'; };
    const onLeave = () => { dot.style.opacity = '0'; aura.style.opacity = '0'; };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0, width: 6, height: 6,
        borderRadius: '50%', background: 'var(--accent)',
        pointerEvents: 'none', zIndex: 9999, opacity: 0,
        transform: 'translate(-50%, -50%)',
        mixBlendMode: 'screen', transition: 'opacity 0.3s',
        marginTop: '-3px', marginLeft: '-3px',
        boxShadow: '0 0 8px var(--accent)',
      }} />
      <div ref={auraRef} style={{
        position: 'fixed', top: 0, left: 0, width: 36, height: 36,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 9998, opacity: 0,
        transform: 'translate(-50%, -50%)',
        mixBlendMode: 'screen', transition: 'opacity 0.3s',
        marginTop: '-18px', marginLeft: '-18px',
      }} />
    </>
  );
}
