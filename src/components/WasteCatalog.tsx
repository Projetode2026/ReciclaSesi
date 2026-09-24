import React from 'react';
import { Sparkles, Clock, CheckCircle2, ArrowRight, Info, RefreshCw } from 'lucide-react';
import { WasteItem, WasteCategory } from '../types';
import { WasteItemIcon } from './WasteItemIcon';
import { sounds } from '../utils/audio';

interface WasteCatalogProps {
  items: WasteItem[];
  recycledItemIds: Set<string>;
  flyingItemIds: Set<string>;
  onSelectItem: (item: WasteItem) => void;
  onRecycleSingleItem?: (item: WasteItem) => void;
  filterCategory: 'all' | WasteCategory;
  onFilterChange: (cat: 'all' | WasteCategory) => void;
}

export const WasteCatalog: React.FC<WasteCatalogProps> = ({
  items,
  recycledItemIds,
  flyingItemIds,
  onSelectItem,
  onRecycleSingleItem,
  filterCategory,
  onFilterChange,
}) => {
  const bioCount = items.filter((i) => i.category === 'biodegradavel').length;
  const recCount = items.filter((i) => i.category === 'reciclavel').length;

  const filteredItems = items.filter((item) => {
    if (filterCategory === 'all') return true;
    return item.category === filterCategory;
  });

  return (
    <section id="catalogo" className="w-full space-y-6 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-700 font-['Montserrat']">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Vitrine de Materiais</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-['Montserrat'] mt-1">
            Catálogo de Resíduos
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            Explore os resíduos do Sesiverso. Clique em um item para ver detalhes e dicas pedagógicas, ou use o botão abaixo para reciclar todos de uma vez!
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 shrink-0 self-start md:self-auto">
          <button
            onClick={() => {
              sounds.playClick();
              onFilterChange('all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer font-['Montserrat'] ${
              filterCategory === 'all'
                ? 'bg-white text-slate-900 shadow-sm font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Todos ({items.length})
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              onFilterChange('biodegradavel');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer font-['Montserrat'] ${
              filterCategory === 'biodegradavel'
                ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-sm font-extrabold'
                : 'text-amber-800 hover:text-amber-950'
            }`}
          >
            Orgânicos ({bioCount})
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              onFilterChange('reciclavel');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer font-['Montserrat'] ${
              filterCategory === 'reciclavel'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-sm font-extrabold'
                : 'text-emerald-800 hover:text-emerald-950'
            }`}
          >
            Recicláveis ({recCount})
          </button>
        </div>
      </div>

      {/* Grid of Waste Item Showcase Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-5">
        {filteredItems.map((item) => {
          const isBio = item.category === 'biodegradavel';
          const isRecycled = recycledItemIds.has(item.id);
          const isFlying = flyingItemIds.has(item.id);

          return (
            <div
              key={item.id}
              id={`catalog-item-${item.id}`}
              onClick={() => {
                sounds.playClick();
                onSelectItem(item);
              }}
              className={`relative rounded-3xl p-4 sm:p-5 flex flex-col items-center text-center cursor-pointer transition-all duration-300 group select-none transform-gpu ${
                isRecycled
                  ? 'bg-slate-100/70 border border-slate-200 opacity-60 grayscale-[30%]'
                  : isFlying
                  ? 'bg-emerald-50 border-2 border-emerald-500 shadow-md scale-95 animate-pulse'
                  : 'glass-card-light hover:-translate-y-1 hover:shadow-lg active:scale-95'
              } ${isBio ? 'hover:border-amber-300' : 'hover:border-emerald-300'}`}
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Recycled Stamp Badge */}
              {isRecycled && (
                <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] font-black uppercase flex items-center gap-1 font-['Montserrat']">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Descartado</span>
                </div>
              )}

              {/* Flying in Progress Badge */}
              {isFlying && (
                <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-full bg-teal-100 border border-teal-300 text-teal-800 text-[10px] font-black uppercase flex items-center gap-1 animate-pulse font-['Montserrat']">
                  <RefreshCw className="w-3 h-3 animate-spin text-teal-600" />
                  <span>Voando</span>
                </div>
              )}

              {/* Icon Container */}
              <div
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center p-2.5 my-2 border transition-transform duration-300 group-hover:scale-105 ${
                  isBio
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-emerald-50 border-emerald-200'
                }`}
              >
                <WasteItemIcon iconType={item.iconType} size={48} />
              </div>

              {/* Category Pill */}
              <span
                className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full mb-1.5 tracking-wider font-['Montserrat'] ${
                  isBio
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                {isBio ? '🍂 Biodegradável' : '♻️ Reciclável'}
              </span>

              {/* Name */}
              <h4 className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-emerald-700 transition-colors font-['Montserrat'] line-clamp-1">
                {item.name}
              </h4>

              {/* Decomposition Time */}
              <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-500 font-medium">
                <Clock className="w-3 h-3 text-amber-600 shrink-0" />
                <span className="line-clamp-1">{item.decompositionTime}</span>
              </div>

              {/* Hover Quick Action Cue */}
              <div className="mt-3 pt-2 w-full border-t border-slate-100 flex items-center justify-center gap-1 text-[11px] text-emerald-700 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Ver Detalhes</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
