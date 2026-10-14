import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface CinematicHeroProps {
  onScrollClick: () => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({ onScrollClick }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const playVideo = (v: HTMLVideoElement | null) => {
      if (!v) return;
      const promise = v.play();
      if (promise !== undefined) {
        promise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    };
    playVideo(desktopVideoRef.current);
    playVideo(mobileVideoRef.current);
  }, []);

  const togglePlayback = () => {
    const videos = [desktopVideoRef.current, mobileVideoRef.current];
    if (isPlaying) {
      videos.forEach((v) => v?.pause());
      setIsPlaying(false);
    } else {
      videos.forEach((v) => v?.play().catch(() => {}));
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    const videos = [desktopVideoRef.current, mobileVideoRef.current];
    videos.forEach((v) => {
      if (v) v.muted = nextMuted;
    });
    setIsMuted(nextMuted);
  };

  return (
    <section
      className="relative w-full h-[100svh] min-h-[640px] bg-cinema-black flex flex-col justify-between overflow-hidden select-none"
      aria-label="Cinematic Introduction"
    >
      {/* Background Banner Videos: Landscape on Desktop/Tablet, Portrait on Mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Desktop Landscape Video (16:9) */}
        <video
          ref={desktopVideoRef}
          src="/video/hero-landscape.mp4"
          poster="/images/projector-beam-dark.jpg"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`hidden md:block w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-55' : 'opacity-25'
          } filter contrast-115 brightness-85 scale-105`}
        />

        {/* Mobile Portrait Video (9:16) */}
        <video
          ref={mobileVideoRef}
          src="/video/hero-portrait.mp4"
          poster="/images/projector-beam-dark.jpg"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`md:hidden w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-60' : 'opacity-25'
          } filter contrast-115 brightness-85 scale-105`}
        />

        {/* Cinematic Vignette and Atmospheric Contrast Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/40 to-cinema-black/75 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-cinema-black/65 via-transparent to-cinema-black/55 z-10" />
        <div className="absolute inset-0 projector-beam opacity-30 z-10" />
        <div className="absolute inset-0 film-grain z-10" />
      </div>

      {/* Top Edge Film Leader Marking */}
      <div className="relative z-20 pt-24 sm:pt-28 px-6 sm:px-12 md:px-16 max-w-[1440px] mx-auto w-full flex items-center justify-between text-[11px] tracking-[0.22em] text-warm-ivory/50">
        <div className="flex items-center space-x-3">
          <span className="w-1.5 h-1.5 rounded-full bg-signature-red flex-shrink-0" />
          <span className="truncate uppercase font-medium">ELSEWHERE FILMS • CINEMA STRATEGY & PATHWAYS</span>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <span>35MM ANALOG PROJECTION</span>
          <span className="text-warm-ivory/25">|</span>
          <span>EASTMAN 5219</span>
        </div>
      </div>

      {/* Hero Display Headline (Pure Modern Editorial Sans) */}
      <div className="relative z-20 px-6 sm:px-12 md:px-16 max-w-[1440px] mx-auto w-full my-auto">
        <div className="max-w-4xl">
          <h1 className="font-editorial text-pure-white text-[clamp(44px,7.5vw,114px)] font-light leading-[1.04] tracking-[-0.03em]">
            <span className="block">Helping your film</span>
            <span className="block italic text-warm-ivory/95 font-light">find its way</span>
            <span className="block">into the world.</span>
          </h1>

          {/* Subtext Accent: BEYOND THE FINAL FRAME */}
          <div className="mt-8 sm:mt-10 flex items-center space-x-4">
            <div className="w-6 sm:w-10 h-[1.5px] bg-signature-red flex-shrink-0" />
            <p className="text-[11px] sm:text-xs tracking-[0.2em] uppercase text-warm-ivory/65 leading-relaxed font-normal">
              South Asian Independent Cinema • Festival Pathways & Distribution
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Controls & Scroll Prompter */}
      <div className="relative z-20 pb-8 sm:pb-12 px-6 sm:px-12 md:px-16 max-w-[1440px] mx-auto w-full flex items-end justify-between">
        {/* Scroll To Explore Indicator */}
        <button
          onClick={onScrollClick}
          className="group flex items-center space-x-4 text-xs tracking-[0.2em] uppercase text-warm-ivory/70 hover:text-pure-white transition-colors focus:outline-none"
          aria-label="Scroll to explore the filmstrip journey"
        >
          <div className="relative w-10 h-[1.5px] bg-hairline-dark overflow-hidden">
            <span className="absolute inset-0 bg-signature-red -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <span className="absolute inset-0 bg-warm-ivory/40" />
          </div>
          <span>Scroll to explore</span>
          <span className="text-xs text-signature-red transition-transform duration-300 group-hover:translate-y-1">
            ↓
          </span>
        </button>

        {/* Discrete Projection Controls (Video & Audio) */}
        <div className="flex items-center space-x-3 text-warm-ivory/60 text-xs">
          <button
            onClick={togglePlayback}
            className="p-2.5 border border-white/10 rounded-full hover:border-warm-ivory/50 hover:text-pure-white bg-cinema-black/40 backdrop-blur-sm transition-all focus:outline-none"
            aria-label={isPlaying ? 'Pause film projector' : 'Play film projector'}
            title={isPlaying ? 'Pause projection' : 'Play projection'}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          </button>
          <button
            onClick={toggleMute}
            className="p-2.5 border border-white/10 rounded-full hover:border-warm-ivory/50 hover:text-pure-white bg-cinema-black/40 backdrop-blur-sm transition-all focus:outline-none"
            aria-label={isMuted ? 'Unmute projector room audio' : 'Mute projector audio'}
            title={isMuted ? 'Unmute ambient sound' : 'Mute sound'}
          >
            {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
          </button>
        </div>
      </div>
    </section>
  );
};
