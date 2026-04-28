import { useState, useEffect } from "react";

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete?.(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#121212] z-[9999] flex flex-col items-center justify-center">
      <div className="text-center space-y-12 w-full max-w-md px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight animate-pulse">
          Carfu.ai
        </h1>
        
        <div className="relative w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-out shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
