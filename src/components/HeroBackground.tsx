import dynamic from 'next/dynamic';
import { ErrorBoundary } from 'react-error-boundary';
import { SoftAurora } from './SoftAurora';

const HeroBackgroundParticles = dynamic(() => import('@/components/hero-bg/HeroBackground'), { ssr: false });

function ParticleFallback() {
  return null; // Graceful degradation — background is non-essential
}

interface HeroBackgroundProps {
  children?: React.ReactNode;
}

export default function HeroBackground({ children }: HeroBackgroundProps) {
  return (
    <>
      {/* Soft Aurora Background Layer */}
      <div className="absolute inset-0 -z-30">
        <SoftAurora speed={0.5} />
      </div>

      {/* 3D Particle Background */}
      <div className="absolute inset-0 -z-20">
        <ErrorBoundary FallbackComponent={ParticleFallback}>
          <HeroBackgroundParticles />
        </ErrorBoundary>
      </div>

      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/30 dark:bg-stone-800/30 -z-10 [clip-path:polygon(20%_0%,100%_0%,100%_100%,0%_100%)]" />
      <div className="hero-blob absolute top-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-primary/10 blur-[50px] mix-blend-multiply dark:mix-blend-screen -z-10" style={{ animationDuration: '8s' }} />
      <div className="hero-blob absolute bottom-[10%] right-[30%] w-[30vw] h-[30vw] rounded-full bg-secondary/10 blur-[50px] mix-blend-multiply dark:mix-blend-screen -z-10" style={{ animationDuration: '12s' }} />

      {children}
    </>
  );
}
