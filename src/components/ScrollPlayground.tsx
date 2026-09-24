import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { ChevronDown, Sparkles, Trophy, MousePointerClick, Info, HelpCircle, ArrowDown } from 'lucide-react';
import { WasteItem, WasteCategory } from '../types';
import { WasteItemIcon } from './WasteItemIcon';
import { TrashBin } from './TrashBin';
import { sounds } from '../utils/audio';

interface ScrollPlaygroundProps {
  onSelectItem: (item: WasteItem) => void;
  scrollProgress: number; // 0 to 1
  onScrollProgressChange: (progress: number) => void;
  items: WasteItem[];
}

export const ScrollPlayground: React.FC<ScrollPlaygroundProps> = ({
  onSelectItem,
  scrollProgress,
  onScrollProgressChange,
  items,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bioBinRef = useRef<HTMLDivElement>(null);
  const recBinRef = useRef<HTMLDivElement>(null);

  const [activeBin, setActiveBin] = useState<WasteCategory | null>(null);
  const [lastDroppedItem, setLastDroppedItem] = useState<WasteItem | undefined>(undefined);
  const [hasTriggeredCelebration, setHasTriggeredCelebration] = useState(false);
  const droppedSoundPlayedRef = useRef<Set<string>>(new Set());

  // Bin coordinates state relative to container
  const [binCoords, setBinCoords] = useState<{
    bio: { x: number; y: number; width: number; height: number };
    rec: { x: number; y: number; width: number; height: number };
  }>({
    bio: { x: 25, y: 80, width: 280, height: 260 },
    rec: { x: 75, y: 80, width: 280, height: 260 },
  });

  // Measure bins position inside container
  const updateBinPositions = useCallback(() => {
    if (!containerRef.current || !bioBinRef.current || !recBinRef.current) return;
    const contRect = containerRef.current.getBoundingClientRect();
    const bioRect = bioBinRef.current.getBoundingClientRect();
    const recRect = recBinRef.current.getBoundingClientRect();

    setBinCoords({
      bio: {
        x: ((bioRect.left + bioRect.width / 2 - contRect.left) / contRect.width) * 100,
        y: ((bioRect.top + 60 - contRect.top) / contRect.height) * 100, // target upper chute
        width: bioRect.width,
        height: bioRect.height,
      },
      rec: {
        x: ((recRect.left + recRect.width / 2 - contRect.left) / contRect.width) * 100,
        y: ((recRect.top + 60 - contRect.top) / contRect.height) * 100,
        width: recRect.width,
        height: recRect.height,
      },
    });
  }, []);

  useEffect(() => {
    updateBinPositions();
    window.addEventListener('resize', updateBinPositions);
    return () => window.removeEventListener('resize', updateBinPositions);
  }, [updateBinPositions]);

  // Calculate dynamic position & state for each waste item according to scrollProgress (0 to 1)
  const itemStates = useMemo(() => {
    return items.map((item) => {
      // Calculate specific start and end threshold for this item so they enter naturally one by one or in waves
      // Stagger based on initial vertical position (startY)
      const startThreshold = Math.max(0.02, (item.startY / 100) * 0.55);
      const endThreshold = Math.min(0.98, startThreshold + 0.38);

      // Local progress for this item: 0 (at scatter position) to 1 (inside bin)
      let t = 0;
      if (scrollProgress >= endThreshold) {
        t = 1;
      } else if (scrollProgress > startThreshold) {
        t = (scrollProgress - startThreshold) / (endThreshold - startThreshold);
      }

      // Smooth easing (Cubic In-Out)
      const easeT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      const targetX = item.category === 'biodegradavel' ? binCoords.bio.x : binCoords.rec.x;
      const targetY = item.category === 'biodegradavel' ? binCoords.bio.y : binCoords.rec.y;

      // Add a slight parabolic curve / arc to the trajectory
      const arcOffset = Math.sin(t * Math.PI) * (item.category === 'biodegradavel' ? -6 : 6);

      const currentX = item.startX + (targetX - item.startX) * easeT + arcOffset;
      const currentY = item.startY + (targetY - item.startY) * easeT;

      // Scale down and rotate into the bin as it gets sucked in
      let currentScale = item.scale;
      let currentOpacity = 1;
      let currentRotation = item.rotation + t * 360;

      if (t > 0.7) {
        const entryPhase = (t - 0.7) / 0.3; // 0 to 1
        currentScale = item.scale * (1 - entryPhase * 0.75); // scales down to 0.25
        currentOpacity = 1 - entryPhase * 0.9; // fades as it enters dark chute
        currentRotation += entryPhase * 180;
      }

      const isInsideBin = t >= 0.92;

      return {
        ...item,
        currentX,
        currentY,
        currentScale,
        currentOpacity,
        currentRotation,
        t,
        isInsideBin,
      };
    });
  }, [items, scrollProgress, binCoords]);

  // Counts of collected items
  const bioItemsCollected = itemStates.filter((i) => i.category === 'biodegradavel' && i.isInsideBin);
  const recItemsCollected = itemStates.filter((i) => i.category === 'reciclavel' && i.isInsideBin);
  const totalBio = items.filter((i) => i.category === 'biodegradavel').length;
  const totalRec = items.filter((i) => i.category === 'reciclavel').length;
  const totalCollected = bioItemsCollected.length + recItemsCollected.length;

  // Sound triggers & Bin reactions when items cross into the bin
  useEffect(() => {
    itemStates.forEach((item) => {
      if (item.isInsideBin && !droppedSoundPlayedRef.current.has(item.id)) {
        droppedSoundPlayedRef.current.add(item.id);
        sounds.playDrop(item.category);
        setActiveBin(item.category);
        setLastDroppedItem(item);

        setTimeout(() => {
          setActiveBin(null);
        }, 600);
      } else if (!item.isInsideBin && droppedSoundPlayedRef.current.has(item.id)) {
        // User scrolled back up, item left the bin
        droppedSoundPlayedRef.current.delete(item.id);
      }
    });

    // Celebration when all items are sorted
    if (totalCollected === items.length && items.length > 0 && !hasTriggeredCelebration) {
      setHasTriggeredCelebration(true);
      sounds.playComplete();
      try {
        confetti({
          particleCount: 140,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#10b981', '#34d399', '#f59e0b', '#fbbf24', '#38bdf8', '#ffffff'],
        });
      } catch {
        // ignore
      }
    } else if (totalCollected < items.length && hasTriggeredCelebration) {
      setHasTriggeredCelebration(false);
    }
  }, [itemStates, totalCollected, items.length, hasTriggeredCelebration]);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 flex flex-col items-center">
      
      {/* Interactive Guidance Banner */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#041d11]/70 border border-emerald-500/30 backdrop-blur-2xl rounded-2xl px-5 py-3.5 mb-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center animate-bounce shadow-sm">
            <ArrowDown className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 font-['Montserrat']">
              <span>Role a página para baixo ou arraste o controle</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <p className="text-[11px] sm:text-xs text-emerald-200/80 font-normal">
              Observe os resíduos descerem e entrarem perfeitamente na lixeira correta!
            </p>
          </div>
        </div>

        {/* Scroll Control Slider Bar */}
        <div className="flex items-center gap-3 w-full sm:w-80 bg-[#020e07]/80 px-4 py-2 rounded-xl border border-emerald-500/30 shadow-inner">
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 font-['Montserrat']">Progresso</span>
          <input
            id="scroll-progress-slider"
            type="range"
            min="0"
            max="1"
            step="0.005"
            value={scrollProgress}
            onChange={(e) => onScrollProgressChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-emerald-400 hover:accent-emerald-300 transition-all"
            aria-label="Controle de progresso de animação"
          />
          <span className="text-xs font-mono font-bold text-emerald-200 min-w-[40px] text-right bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/30">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>

      {/* Main Interactive Stage Container */}
      <div
        ref={containerRef}
        id="interactive-waste-stage"
        className="relative w-full h-[640px] sm:h-[700px] lg:h-[740px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#02180e]/90 via-[#010e08]/95 to-[#02180e]/90 border border-emerald-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
      >
        {/* Background Ecological Atmosphere Grid & Particles */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-15 pointer-events-none" />
        
        {/* Floating Ambient Aurora Eco Lights */}
        <div className="absolute -top-10 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-float-slow" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none animate-float-reverse" />
        <div className="absolute top-1/3 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Hint Watermark */}
        <div className="absolute top-4 left-0 right-0 flex justify-center pointer-events-none z-0 opacity-50">
          <span className="text-xs uppercase tracking-widest text-emerald-300 font-extrabold flex items-center gap-2 font-['Montserrat']">
            <span>Área de Dispersão de Resíduos</span>
            <span>•</span>
            <span>Clique nos itens para ver detalhes</span>
          </span>
        </div>

        {/* Floating Waste Items Animated by Scroll */}
        {itemStates.map((item) => {
          const isBio = item.category === 'biodegradavel';

          return (
            <div
              key={item.id}
              id={`waste-item-${item.id}`}
              onClick={() => onSelectItem(item)}
              style={{
                left: `${item.currentX}%`,
                top: `${item.currentY}%`,
                transform: `translate(-50%, -50%) scale(${item.currentScale}) rotate(${item.currentRotation}deg)`,
                opacity: item.currentOpacity,
                zIndex: item.isInsideBin ? 5 : 20,
              }}
              className="absolute cursor-pointer select-none transition-transform duration-75 ease-out group"
            >
              {/* Item Card / Icon with 3D Depth & Glowing Hover */}
              <div
                className={`relative flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl backdrop-blur-xl transition-all duration-300 ${
                  isBio
                    ? 'bg-gradient-to-b from-[#2d1808]/80 to-[#190d04]/90 border border-amber-500/40 shadow-item-card hover:border-amber-400 hover:shadow-[0_0_25px_rgba(245,158,11,0.7)]'
                    : 'bg-gradient-to-b from-[#042d1a]/80 to-[#02180e]/90 border border-emerald-500/40 shadow-item-card hover:border-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.7)]'
                } group-hover:scale-115 active:scale-95`}
              >
                {/* SVG Icon */}
                <WasteItemIcon iconType={item.iconType} size={item.size} />

                {/* Floating Item Label Tooltip on Hover */}
                <div
                  className={`absolute -bottom-8 whitespace-nowrap px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold shadow-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-30 font-['Montserrat'] ${
                    isBio ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white border border-amber-400/40' : 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white border border-emerald-400/40'
                  }`}
                >
                  {item.name}
                </div>

                {/* Trail particles during fast trajectory */}
                {item.t > 0.1 && item.t < 0.85 && (
                  <div
                    className={`absolute -inset-1 rounded-2xl animate-pulse blur-[3px] opacity-60 -z-10 ${
                      isBio ? 'bg-amber-400' : 'bg-emerald-400'
                    }`}
                  />
                )}
              </div>
            </div>
          );
        })}

        {/* BOTTOM DOCKED TRASH BINS (Biodegradável on Left, Reciclável on Right) */}
        <div className="absolute bottom-3 sm:bottom-6 inset-x-2 sm:inset-x-8 flex items-end justify-between gap-3 sm:gap-8 z-10">
          
          {/* Lixeira Biodegradável */}
          <div ref={bioBinRef} className="w-1/2 flex justify-center">
            <TrashBin
              category="biodegradavel"
              count={bioItemsCollected.length}
              maxCount={totalBio}
              isActive={activeBin === 'biodegradavel'}
              lastDroppedItem={lastDroppedItem?.category === 'biodegradavel' ? lastDroppedItem : undefined}
            />
          </div>

          {/* Lixeira Reciclável */}
          <div ref={recBinRef} className="w-1/2 flex justify-center">
            <TrashBin
              category="reciclavel"
              count={recItemsCollected.length}
              maxCount={totalRec}
              isActive={activeBin === 'reciclavel'}
              lastDroppedItem={lastDroppedItem?.category === 'reciclavel' ? lastDroppedItem : undefined}
            />
          </div>

        </div>

        {/* 100% Completion Victory Banner Overlay */}
        {totalCollected === items.length && items.length > 0 && (
          <div className="absolute inset-0 bg-[#02130b]/90 backdrop-blur-2xl z-30 flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
            <div className="relative group mb-5">
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-300 rounded-3xl blur-md opacity-80 animate-pulse" />
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-[#06381e] to-[#021c0e] border border-emerald-400/60 flex items-center justify-center text-4xl sm:text-5xl shadow-2xl">
                🏆
              </div>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white font-['Montserrat'] tracking-tight">
              Parabéns! Todos os Resíduos Foram Separados!
            </h3>
            <p className="text-sm sm:text-base text-emerald-200/90 max-w-lg mt-2.5 mb-6 font-normal">
              Você completou com perfeição o desafio do <strong>RECICLA SESI</strong> no Sesiverso. Lixo orgânico e reciclável destinados aos seus devidos fins!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onScrollProgressChange(0)}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 text-emerald-950 font-black text-sm sm:text-base shadow-[0_0_30px_rgba(52,211,153,0.6)] hover:brightness-110 active:scale-95 transition-all cursor-pointer font-['Montserrat']"
              >
                Jogar Novamente 🔄
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Quick Scroll Step Pills for Easy Tap Navigation */}
      <div className="flex items-center justify-center gap-2.5 mt-5 flex-wrap">
        <span className="text-xs text-slate-400 font-semibold font-['Montserrat']">Saltos de Animação:</span>
        <button
          onClick={() => {
            sounds.playClick();
            onScrollProgressChange(0);
          }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
            scrollProgress === 0
              ? 'bg-emerald-400 text-emerald-950 shadow-[0_0_15px_rgba(52,211,153,0.5)] font-extrabold'
              : 'bg-[#041d11]/70 hover:bg-emerald-900/60 text-emerald-200 border border-emerald-500/30'
          }`}
        >
          0% Dispersos
        </button>
        <button
          onClick={() => {
            sounds.playClick();
            onScrollProgressChange(0.35);
          }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
            scrollProgress > 0.25 && scrollProgress < 0.5
              ? 'bg-emerald-400 text-emerald-950 shadow-[0_0_15px_rgba(52,211,153,0.5)] font-extrabold'
              : 'bg-[#041d11]/70 hover:bg-emerald-900/60 text-emerald-200 border border-emerald-500/30'
          }`}
        >
          35% Em Queda
        </button>
        <button
          onClick={() => {
            sounds.playClick();
            onScrollProgressChange(0.7);
          }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
            scrollProgress >= 0.5 && scrollProgress < 0.85
              ? 'bg-emerald-400 text-emerald-950 shadow-[0_0_15px_rgba(52,211,153,0.5)] font-extrabold'
              : 'bg-[#041d11]/70 hover:bg-emerald-900/60 text-emerald-200 border border-emerald-500/30'
          }`}
        >
          70% Entrando
        </button>
        <button
          onClick={() => {
            sounds.playClick();
            onScrollProgressChange(1);
          }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
            scrollProgress === 1
              ? 'bg-emerald-400 text-emerald-950 shadow-[0_0_15px_rgba(52,211,153,0.5)] font-extrabold'
              : 'bg-[#041d11]/70 hover:bg-emerald-900/60 text-emerald-200 border border-emerald-500/30'
          }`}
        >
          100% Coletados
        </button>
      </div>

    </div>
  );
};
