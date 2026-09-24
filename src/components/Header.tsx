import React from 'react';
import { Volume2, VolumeX, RotateCcw, HelpCircle } from 'lucide-react';
import { sounds } from '../utils/audio';

interface HeaderProps {
  totalItems: number;
  recycledCount: number;
  onReset: () => void;
  onOpenHelp: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalItems,
  recycledCount,
  onReset,
  onOpenHelp,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-3 sm:py-3.5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          
          {/* Main Logo & Sesiverso Tagline */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              {/* Premium Floating Logo Icon */}
              <div className="relative group">
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-200 text-emerald-600 shadow-sm transition-transform group-hover:scale-105">
                  <span className="text-xl">
                    ♻️
                  </span>
                </div>
              </div>

              <div>
                {/* REQUIRED LOGO: RECICLA ♻️ SESI in full uppercase */}
                <h1
                  id="site-logo"
                  className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight flex items-center gap-1.5"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <span className="text-emerald-700 font-black tracking-wide">
                    RECICLA
                  </span>
                  <span className="text-emerald-600 text-lg sm:text-xl">♻️</span>
                  <span className="text-slate-800 font-black tracking-wide">
                    SESI
                  </span>
                </h1>

                <div className="flex items-center gap-2 mt-0.5">
                  <span className="px-2 py-0.5 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 flex items-center shadow-2xs">
                    SESIVERSO
                  </span>
                  <p className="text-[11px] text-slate-500 hidden sm:inline-block font-normal">
                    Educação Ambiental & Animação Interativa
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Quick Counter */}
            <div className="flex md:hidden items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
              <span className="text-xs text-slate-600 font-medium">Reciclados:</span>
              <span className="text-xs font-black text-emerald-700 font-mono">{recycledCount}/{totalItems}</span>
            </div>
          </div>

          {/* Center Stats Bar (Desktop) */}
          <div className="hidden lg:flex items-center gap-5 bg-slate-50/80 px-4 py-1.5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-800 font-bold text-xs">
                🍂
              </div>
              <div>
                <div className="text-[9px] uppercase font-bold tracking-wider text-amber-700 font-['Montserrat']">Biodegradável</div>
                <div className="text-xs font-semibold text-slate-700">Matéria Orgânica</div>
              </div>
            </div>

            <div className="h-5 w-px bg-slate-200" />

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800 font-bold text-xs">
                ♻️
              </div>
              <div>
                <div className="text-[9px] uppercase font-bold tracking-wider text-emerald-700 font-['Montserrat']">Reciclável</div>
                <div className="text-xs font-semibold text-slate-700">Materiais Secos</div>
              </div>
            </div>
          </div>

          {/* Interactive Controls & Navigation */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            
            {/* Quick Section Nav (Desktop) */}
            <nav className="hidden xl:flex items-center gap-1 bg-slate-100/70 border border-slate-200 px-2 py-1 rounded-xl text-xs font-semibold">
              <a href="#sobre" className="px-2 py-1 rounded-lg text-slate-600 hover:bg-white hover:text-emerald-700 transition-colors">
                Sobre
              </a>
              <a href="#importancia" className="px-2 py-1 rounded-lg text-slate-600 hover:bg-white hover:text-emerald-700 transition-colors">
                Importância
              </a>
              <a href="#destinos" className="px-2 py-1 rounded-lg text-slate-600 hover:bg-white hover:text-emerald-700 transition-colors">
                Destinos
              </a>
              <a href="#objetivos" className="px-2 py-1 rounded-lg text-slate-600 hover:bg-white hover:text-emerald-700 transition-colors">
                Objetivos
              </a>
              <a href="#catalogo" className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors shadow-xs">
                Catálogo & Reciclagem ♻️
              </a>
            </nav>

            {/* Sound Toggle */}
            <button
              id="btn-toggle-sound"
              onClick={() => {
                onToggleSound();
                if (!soundEnabled) sounds.playClick();
              }}
              title={soundEnabled ? 'Desativar efeitos sonoros' : 'Ativar efeitos sonoros'}
              className={`p-2 rounded-xl transition-all duration-200 border cursor-pointer ${
                soundEnabled
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-700" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Reset Waste Items */}
            <button
              id="btn-reset-waste"
              onClick={() => {
                sounds.playClick();
                onReset();
              }}
              title="Restaurar itens do catálogo"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all duration-200 active:scale-95 flex items-center gap-1.5 text-xs font-semibold cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">Restaurar</span>
            </button>

            {/* Info / Help Modal */}
            <button
              id="btn-open-help"
              onClick={() => {
                sounds.playClick();
                onOpenHelp();
              }}
              title="Informações sobre o projeto e guia de descarte"
              className="p-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 transition-all duration-200 flex items-center gap-1 text-xs font-semibold cursor-pointer shadow-2xs"
            >
              <HelpCircle className="w-4 h-4 text-teal-700" />
              <span className="hidden md:inline">Guia</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
