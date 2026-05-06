import { useEffect, useRef } from 'react';

const COLS = 14;
const ROWS = 9;
const NODE_RADIUS = 2;

export default function MatrixGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const cellW = w / (COLS - 1);
      const cellH = h / (ROWS - 1);

      // Grid lines
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.07)';
      ctx.lineWidth = 0.5;

      for (let c = 0; c < COLS; c++) {
        ctx.beginPath();
        ctx.moveTo(c * cellW, 0);
        ctx.lineTo(c * cellW, h);
        ctx.stroke();
      }
      for (let r = 0; r < ROWS; r++) {
        ctx.beginPath();
        ctx.moveTo(0, r * cellH);
        ctx.lineTo(w, r * cellH);
        ctx.stroke();
      }

      // Animated nodes
      for (let c = 0; c < COLS; c++) {
        for (let r = 0; r < ROWS; r++) {
          const x = c * cellW;
          const y = r * cellH;
          const pulse = 0.4 + 0.6 * Math.abs(Math.sin(t * 0.8 + c * 0.5 + r * 0.7));
          const alpha = pulse * 0.6;

          ctx.beginPath();
          ctx.arc(x, y, NODE_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.fill();

          if (pulse > 0.85) {
            ctx.beginPath();
            ctx.arc(x, y, NODE_RADIUS * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(56, 189, 248, ${(pulse - 0.85) * 0.3})`;
            ctx.fill();
          }
        }
      }

      t += 0.016;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        opacity: 0.65, pointerEvents: 'none',
      }}
    />
  );
}
