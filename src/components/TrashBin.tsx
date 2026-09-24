import React from 'react';
import { WasteCategory, WasteItem } from '../types';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface TrashBinProps {
  category: WasteCategory;
  count: number;
  maxCount: number;
  isActive: boolean;
  lastDroppedItem?: WasteItem;
  onSelect?: () => void;
}

export const TrashBin: React.FC<TrashBinProps> = ({
  category,
  count,
  maxCount,
  isActive,
  lastDroppedItem,
  onSelect,
}) => {
  const isBio = category === 'biodegradavel';
  const fillPercentage = Math.min(100, Math.round((count / Math.max(1, maxCount)) * 100));

  return (
    <div
      id={`trash-bin-${category}`}
      onClick={onSelect}
      className={`relative group flex flex-col items-center justify-between p-3 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl transition-all duration-300 cursor-pointer select-none w-full min-w-0 max-w-[340px] min-h-[220px] sm:min-h-[270px] ${
        isBio
          ? 'bg-white border border-amber-200 shadow-md hover:border-amber-400 hover:shadow-lg'
          : 'bg-white border border-emerald-200 shadow-md hover:border-emerald-400 hover:shadow-lg'
      } ${
        isActive
          ? isBio
            ? 'scale-105 ring-2 ring-amber-500 shadow-lg'
            : 'scale-105 ring-2 ring-emerald-500 shadow-lg'
          : 'hover:-translate-y-1'
      }`}
    >
      {/* Bin Header Badge */}
      <div className="w-full flex items-center justify-between gap-1 sm:gap-2 mb-1">
        <span
          className={`px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider rounded-full flex items-center gap-1 shadow-xs font-['Montserrat'] truncate ${
            isBio
              ? 'bg-amber-100 text-amber-900 border border-amber-300'
              : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
          }`}
        >
          <span>{isBio ? '🍂 Orgânico' : '♻️ Reciclável'}</span>
        </span>

        {/* Counter Badge */}
        <div
          className={`flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-extrabold shadow-xs shrink-0 ${
            isBio
              ? 'bg-amber-50 text-amber-950 border border-amber-200'
              : 'bg-emerald-50 text-emerald-950 border border-emerald-200'
          }`}
        >
          <span className="text-xs sm:text-base leading-none font-black text-slate-900 font-mono">{count}</span>
          <span className="text-[10px] sm:text-[11px] text-slate-500 font-mono">/ {maxCount}</span>
        </div>
      </div>

      {/* 3D Illustrated SVG Bin with Light Depth */}
      <div className="relative w-24 h-28 xs:w-28 xs:h-32 sm:w-36 sm:h-40 md:w-44 md:h-44 flex items-center justify-center my-0.5 sm:my-1">
        <svg
          viewBox="0 0 160 160"
          className={`w-full h-full drop-shadow-md transition-transform duration-300 ${
            isActive ? 'scale-105 -translate-y-1.5' : 'scale-100'
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id={isBio ? 'bioBinGrad' : 'recBinGrad'} x1="0%" y1="0%" x2="100%" y2="100%">
              {isBio ? (
                <>
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="30%" stopColor="#d97706" />
                  <stop offset="70%" stopColor="#b45309" />
                  <stop offset="100%" stopColor="#78350f" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="30%" stopColor="#10b981" />
                  <stop offset="70%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#047857" />
                </>
              )}
            </linearGradient>

            <linearGradient id={isBio ? 'bioLidGrad' : 'recLidGrad'} x1="0%" y1="0%" x2="100%" y2="0%">
              {isBio ? (
                <>
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="50%" stopColor="#fde68a" />
                  <stop offset="100%" stopColor="#b45309" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#6ee7b7" />
                  <stop offset="50%" stopColor="#a7f3d0" />
                  <stop offset="100%" stopColor="#059669" />
                </>
              )}
            </linearGradient>

            {/* Inner dark chute gradient */}
            <radialGradient id={isBio ? 'bioChute' : 'recChute'} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.95" />
              {isBio ? (
                <stop offset="100%" stopColor="#451a03" />
              ) : (
                <stop offset="100%" stopColor="#022c22" />
              )}
            </radialGradient>
          </defs>

          {/* Bin Base Soft Ambient Shadow */}
          <ellipse cx="80" cy="148" rx="46" ry="7" fill="#000000" fillOpacity="0.12" />

          {/* Bin Body (Tapered Bucket with Bevel Stroke) */}
          <path
            d="M36 44L46 136C47 142 55 146 80 146C105 146 113 142 114 136L124 44C124 44 110 50 80 50C50 50 36 44 36 44Z"
            fill={`url(#${isBio ? 'bioBinGrad' : 'recBinGrad'})`}
            stroke={isBio ? '#92400e' : '#065f46'}
            strokeWidth="3"
          />

          {/* Vertical Ribs for Rigid Trash Can Look */}
          <path d="M56 50L62 138" stroke={isBio ? '#78350f' : '#047857'} strokeWidth="2.5" strokeOpacity="0.7" />
          <path d="M80 50L80 142" stroke={isBio ? '#fffbeb' : '#ecfdf5'} strokeWidth="2" strokeOpacity="0.5" />
          <path d="M104 50L98 138" stroke={isBio ? '#78350f' : '#047857'} strokeWidth="2.5" strokeOpacity="0.7" />

          {/* Emblem on Front */}
          <circle
            cx="80"
            cy="96"
            r="20"
            fill="#ffffff"
            fillOpacity="0.3"
            stroke={isBio ? '#fde68a' : '#a7f3d0'}
            strokeWidth="1.5"
          />

          {isBio ? (
            // Leaf & Nature Emblem (Original restored)
            <g transform="translate(64, 80) scale(0.5)">
              <path
                d="M10 50C10 50 14 20 44 10C54 6 56 16 50 24C38 48 18 52 10 50Z"
                fill="#fde68a"
                stroke="#78350f"
                strokeWidth="2"
              />
              <path d="M10 50L46 12" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
            </g>
          ) : (
            // Universal ♻️ Recycling Emoji inside ForeignObject for guaranteed rendering
            <foreignObject x="60" y="76" width="40" height="40" className="pointer-events-none">
              <div className="w-full h-full flex items-center justify-center text-2xl select-none leading-none filter drop-shadow-xs">
                ♻️
              </div>
            </foreignObject>
          )}

          {/* Bin Rim Base Ring */}
          <ellipse
            cx="80"
            cy="44"
            rx="46"
            ry="11"
            fill={`url(#${isBio ? 'bioLidGrad' : 'recLidGrad'})`}
            stroke={isBio ? '#78350f' : '#047857'}
            strokeWidth="3"
          />

          {/* Open Chute Hole */}
          <ellipse
            cx="80"
            cy="44"
            rx="36"
            ry="7.5"
            fill={`url(#${isBio ? 'bioChute' : 'recChute'})`}
            stroke={isBio ? '#fbbf24' : '#34d399'}
            strokeWidth="1.5"
          />

          {/* Open Hinged Lid (Raised at an angle) */}
          <g
            transform={
              isActive
                ? 'rotate(-30 34 38)'
                : 'rotate(-16 34 38)'
            }
            className="transition-transform duration-300 origin-[34px_38px]"
          >
            <ellipse
              cx="80"
              cy="28"
              rx="46"
              ry="9"
              fill={`url(#${isBio ? 'bioLidGrad' : 'recLidGrad'})`}
              stroke={isBio ? '#78350f' : '#047857'}
              strokeWidth="2.5"
            />
            {/* Lid Handle */}
            <path
              d="M70 24C70 18 90 18 90 24"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </svg>

        {/* Floating Drop Reaction Message */}
        {isActive && lastDroppedItem && (
          <div
            className={`absolute -top-7 px-3 py-1.5 rounded-full text-xs font-black animate-bounce shadow-md flex items-center gap-1.5 z-20 ${
              isBio ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white'
            }`}
          >
            <Sparkles className="w-3 h-3 fill-current" />
            +1 {lastDroppedItem.name}
          </div>
        )}
      </div>

      {/* Bin Label & Description */}
      <div className="w-full text-center mt-1 sm:mt-2">
        <h3
          className={`text-xs xs:text-sm sm:text-base md:text-lg font-black tracking-tight sm:tracking-wide uppercase font-['Montserrat'] ${
            isBio ? 'text-amber-900' : 'text-emerald-900'
          }`}
        >
          {isBio ? 'Lixo Biodegradável' : 'Lixo Reciclável'}
        </h3>
        <p className="text-[10px] sm:text-xs text-slate-600 line-clamp-1 mt-0.5 font-normal">
          {isBio ? 'Restos orgânicos e cascas' : 'Plásticos, papel e vidro'}
        </p>

        {/* Fill Gauge Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 sm:h-3 mt-2 sm:mt-3.5 p-0.5 overflow-hidden border border-slate-200 shadow-inner">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${
              isBio
                ? 'bg-amber-500'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${fillPercentage}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[9px] sm:text-[10px] text-slate-500 mt-1 sm:mt-1.5 font-mono">
          <span className="flex items-center gap-1 font-semibold text-slate-600">
            Capacidade
          </span>
          <span className="font-extrabold text-slate-800 bg-slate-100 border border-slate-200 px-1.5 sm:px-2 py-0.5 rounded-full">{fillPercentage}%</span>
        </div>
      </div>
    </div>
  );
};
