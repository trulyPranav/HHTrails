import { useEffect, useRef, useState } from 'react';

interface Props {
  onReady: () => void;
}

const MESSAGES = [
  'Waking up the server',
  'Still warming up, hang tight',
  'Almost there',
  'Just a few more seconds',
];

const ServerWakeScreen = ({ onReady }: Props) => {
  const [message, setMessage] = useState(MESSAGES[0]);
  const [dots] = useState('');
  const attempt = useRef(0);

  // Animate "..." trailing dots
//   useEffect(() => {
//     const id = setInterval(() => {
//       setDots((d) => (d.length >= 3 ? '' : d + '.'));
//     }, 500);
//     return () => clearInterval(id);
//   }, []);

  // Health-check polling
  useEffect(() => {
    const apiBase = import.meta.env.VITE_URL as string | undefined;
    if (!apiBase) {
      onReady();
      return;
    }

    let origin: string;
    try {
      origin = new URL(apiBase).origin;
    } catch {
      onReady();
      return;
    }

    const healthUrl = `${origin}/api/health`;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const check = async () => {
      try {
        const res = await fetch(healthUrl, { cache: 'no-store' });
        if (res.ok) {
          if (!cancelled) onReady();
          return;
        }
      } catch {
        // network error / CORS before server is up — keep retrying
      }

      attempt.current += 1;
      const msgIndex = Math.min(attempt.current, MESSAGES.length - 1);
      if (!cancelled) {
        setMessage(MESSAGES[msgIndex]);
        // Each message stays visible for at least 5s before checking again
        timeoutId = setTimeout(check, 5000);
      }
    };

    // Delay first check so "Waking up the server" is always seen
    timeoutId = setTimeout(check, 1500);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [onReady]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f5f5f5]"
    >
      {/* Logo */}
      <div className="mb-1">
        <img
          src="/hht_final_logo_send.svg"
          alt="Heritage Himalaya Trails"
          style={{ width: 180, height: 180, objectFit: 'contain' }}
        />
      </div>

      {/* Brand name */}
      <h1
        className="text-[#2B1E17] text-xl font-semibold tracking-widest uppercase mb-1 justify-center text-center"
        style={{ fontFamily: 'Berlin Sans FB, sans-serif', letterSpacing: '0.18em' }}
      >
        Heritage Himalaya Trails
      </h1>

      <p className="text-xs tracking-widest uppercase mb-10" style={{ color: '#F4A321', letterSpacing: '0.22em' }}>
        Cultural Journeys
      </p>

      {/* Progress bar */}
      <div
        className="rounded-full overflow-hidden mb-5"
        style={{ width: 200, height: 2, background: 'rgba(255,255,255,0.08)' }}
      >
        <div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #F4A321, #e8c97a)',
            animation: 'wakeProgress 3s ease-in-out infinite',
          }}
        />
      </div>

      {/* Status message */}
      <p className="text-sm" style={{ color: 'rgba(43,30,23,0.5)', minWidth: 220, textAlign: 'center' }}>
        {message}{dots}
      </p>

      <p className="text-xs mt-2" style={{ color: 'rgba(43,30,23,0.3)' }}>
        Preparing your cultural journey...
      </p>

      {/* Keyframe injection */}
      <style>{`
        @keyframes wakeProgress {
          0%   { width: 0%;   margin-left: 0%; }
          50%  { width: 60%;  margin-left: 20%; }
          100% { width: 0%;   margin-left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default ServerWakeScreen;
