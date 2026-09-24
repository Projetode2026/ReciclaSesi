import React from 'react';
import { TrashBin } from './TrashBin';
import { WasteInventory } from './WasteInventory';
import { WasteItem, WasteCategory } from '../types';
import { RefreshCw, Award, Zap, ArrowDown, ArrowUp, RotateCcw, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface RecyclingActionSectionProps {
  items: WasteItem[];
  recycledItemIds: Set<string>;
  isRecyclingAll: boolean;
  isRestoring?: boolean;
  activeBinCategory: WasteCategory | null;
  onRecycleAll: () => void;
  onRestoreCatalog: () => void;
  onReset: () => void;
  bioCount: number;
  recCount: number;
  onSelectItem?: (item: WasteItem) => void;
}

export const RecyclingActionSection: React.FC<RecyclingActionSectionProps> = ({
  items,
  recycledItemIds,
  isRecyclingAll,
  isRestoring = false,
  activeBinCategory,
  onRecycleAll,
  onRestoreCatalog,
  bioCount,
  recCount,
  onSelectItem,
}) => {
  const totalItems = items.length;
  const recycledCount = recycledItemIds.size;
  const isAllRecycled = recycledCount >= totalItems && totalItems > 0;
  const unRecycledCount = totalItems - recycledCount;
  const isBusy = isRecyclingAll || isRestoring;

  return (
    <section id="area-reciclagem" className="w-full flex flex-col items-center gap-8 pt-4 pb-12 scroll-mt-20">
      
      {/* 1. CALL-TO-ACTION BUTTONS: "RECICLAR AGORA" + "RESTAURAR CATÁLOGO" */}
      <div className="w-full flex flex-col items-center text-center gap-4">
        
        {/* Action Container */}
        <div className="relative flex flex-col items-center w-full max-w-2xl px-2">

          {/* Side-by-Side Responsive Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full">
            
            {/* Primary Action Button: RECICLAR AGORA */}
            <button
              id="btn-reciclar-agora"
              onClick={() => {
                if (!isBusy && unRecycledCount > 0) {
                  onRecycleAll();
                }
              }}
              disabled={isBusy || unRecycledCount === 0}
              className={`w-full sm:w-auto relative px-6 sm:px-9 py-4 sm:py-4.5 rounded-2xl font-black text-base sm:text-xl uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-3 select-none font-['Montserrat'] ${
                isBusy || unRecycledCount === 0
                  ? isRecyclingAll
                    ? 'bg-emerald-800 text-white/95 shadow-sm cursor-wait scale-98 border border-emerald-700'
                    : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed opacity-75'
                  : 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 border border-emerald-500 cursor-pointer'
              }`}
            >
              {isRecyclingAll ? (
                <>
                  <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-white" />
                  <span>Reciclando... ({recycledCount}/{totalItems})</span>
                </>
              ) : (
                <>
                  <span className="text-xl sm:text-2xl">♻️</span>
                  <span>RECICLAR AGORA</span>
                  {unRecycledCount > 0 && (
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-700/90 text-white text-xs font-mono font-bold">
                      {unRecycledCount}
                    </span>
                  )}
                </>
              )}
            </button>

            {/* Secondary Action Button: RESTAURAR CATÁLOGO */}
            <button
              id="btn-restaurar-catalogo"
              onClick={() => {
                if (!isBusy && recycledCount > 0) {
                  onRestoreCatalog();
                }
              }}
              disabled={isBusy || recycledCount === 0}
              className={`w-full sm:w-auto relative px-6 sm:px-9 py-4 sm:py-4.5 rounded-2xl font-black text-base sm:text-xl uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-3 select-none font-['Montserrat'] ${
                isBusy || recycledCount === 0
                  ? isRestoring
                    ? 'bg-amber-100 text-amber-900 border-2 border-amber-400 shadow-sm cursor-wait scale-98'
                    : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60'
                  : 'bg-white/95 hover:bg-emerald-50/80 active:bg-emerald-100 text-emerald-800 border-2 border-emerald-500 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 cursor-pointer'
              }`}
            >
              {isRestoring ? (
                <>
                  <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-amber-700" style={{ animationDirection: 'reverse' }} />
                  <span>Restaurando... ({recycledCount} restantes)</span>
                </>
              ) : (
                <>
                  <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 transition-transform group-hover:-rotate-45" />
                  <span>RESTAURAR CATÁLOGO</span>
                  {recycledCount > 0 && (
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-mono font-bold">
                      {recycledCount}
                    </span>
                  )}
                </>
              )}
            </button>

          </div>

          {/* Subtitle helper hint */}
          <div className="mt-3.5 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-600 font-medium min-h-[24px]">
            {isRestoring ? (
              <span className="flex items-center gap-1.5 text-amber-800 font-bold animate-pulse font-['Montserrat']">
                <ArrowUp className="w-4 h-4 text-amber-600 animate-bounce" />
                Os resíduos estão saindo das lixeiras e retornando para suas posições no catálogo...
              </span>
            ) : isRecyclingAll ? (
              <span className="flex items-center gap-1.5 text-emerald-800 font-bold animate-pulse font-['Montserrat']">
                <Zap className="w-4 h-4 text-emerald-600" />
                Os resíduos estão voando do catálogo para as lixeiras correspondentes...
              </span>
            ) : isAllRecycled ? (
              <span className="flex items-center gap-1.5 text-emerald-800 font-bold font-['Montserrat']">
                <Award className="w-4 h-4 text-amber-600" />
                Todos os resíduos foram separados! Clique em "RESTAURAR CATÁLOGO" para ver a animação de retorno.
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-slate-600">
                <ArrowDown className="w-4 h-4 text-emerald-600 animate-bounce" />
                Clique em <strong>RECICLAR AGORA</strong> para descartar ou <strong>RESTAURAR CATÁLOGO</strong> para trazê-los de volta.
              </span>
            )}
          </div>
        </div>

      </div>


      {/* 2. SIDE-BY-SIDE TRASH BINS & INVENTORIES AREA */}
      <div className="w-full flex flex-col items-center gap-4">
        
        {/* Title for Bins Area */}
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-700 font-['Montserrat']">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Destinos de Coleta Seletiva</span>
        </div>

        {/* Side-by-Side Responsive Columns */}
        <div className="w-full flex flex-row justify-center items-start gap-3.5 sm:gap-6 max-w-3xl px-1 sm:px-0">
          
          {/* Coluna Biodegradável (Left: Bin + Inventory) */}
          <div className="flex-1 min-w-0 max-w-[340px] flex flex-col items-center gap-3">
            <div id="bin-target-biodegradavel" className="w-full flex justify-center">
              <TrashBin
                category="biodegradavel"
                count={bioCount}
                maxCount={items.filter((i) => i.category === 'biodegradavel').length}
                isActive={activeBinCategory === 'biodegradavel'}
              />
            </div>

            {/* Inventário Biodegradável */}
            <WasteInventory
              category="biodegradavel"
              items={items}
              recycledItemIds={recycledItemIds}
              onSelectItem={onSelectItem}
            />
          </div>

          {/* Coluna Reciclável (Right: Bin + Inventory) */}
          <div className="flex-1 min-w-0 max-w-[340px] flex flex-col items-center gap-3">
            <div id="bin-target-reciclavel" className="w-full flex justify-center">
              <TrashBin
                category="reciclavel"
                count={recCount}
                maxCount={items.filter((i) => i.category === 'reciclavel').length}
                isActive={activeBinCategory === 'reciclavel'}
              />
            </div>

            {/* Inventário Reciclável */}
            <WasteInventory
              category="reciclavel"
              items={items}
              recycledItemIds={recycledItemIds}
              onSelectItem={onSelectItem}
            />
          </div>

        </div>

        {/* Bottom Quick Restore Button (Below Inventories) */}
        {recycledCount > 0 && !isBusy && (
          <button
            onClick={onRestoreCatalog}
            className="mt-2 px-5 py-2 rounded-xl bg-emerald-50/80 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold font-['Montserrat'] flex items-center gap-2 cursor-pointer transition-all hover:shadow-sm active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar todos os {recycledCount} itens de volta ao catálogo</span>
          </button>
        )}

      </div>

    </section>
  );
};
