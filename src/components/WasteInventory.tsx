import React from 'react';
import { WasteItem, WasteCategory } from '../types';
import { WasteItemIcon } from './WasteItemIcon';
import { Sparkles, Leaf, Recycle } from 'lucide-react';
import { sounds } from '../utils/audio';

interface WasteInventoryProps {
  category: WasteCategory;
  items: WasteItem[];
  recycledItemIds: Set<string>;
  onSelectItem?: (item: WasteItem) => void;
}

export const WasteInventory: React.FC<WasteInventoryProps> = ({
  category,
  items,
  recycledItemIds,
  onSelectItem,
}) => {
  const isBio = category === 'biodegradavel';

  // Get items in this category that have finished recycling
  const recycledItems = items.filter(
    (item) => item.category === category && recycledItemIds.has(item.id)
  );

  const totalCategoryItems = items.filter((item) => item.category === category).length;

  return (
    <div
      id={`inventario-${category}`}
      className={`w-full rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 transition-all duration-300 border bg-white/90 shadow-sm flex flex-col justify-between min-h-[140px] sm:min-h-[170px] ${
        isBio
          ? 'border-amber-200/90 shadow-amber-900/5'
          : 'border-emerald-200/90 shadow-emerald-900/5'
      }`}
    >
      {/* Inventory Header */}
      <div className="w-full flex items-center justify-between gap-1.5 pb-2 mb-2 border-b border-slate-100">
        <div className="flex items-center gap-1.5 min-w-0">
          <div
            className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center text-xs shrink-0 ${
              isBio ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            {isBio ? <Leaf className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Recycle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
          </div>
          <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-tight text-slate-800 font-['Montserrat'] truncate">
            {isBio ? 'Itens Biodegradáveis' : 'Itens Recicláveis'}
          </h4>
        </div>

        {/* Counter Pill */}
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-black font-mono shrink-0 ${
            isBio
              ? 'bg-amber-50 text-amber-900 border border-amber-200'
              : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
          }`}
        >
          {recycledItems.length}/{totalCategoryItems}
        </span>
      </div>

      {/* Inventory Content / Thumbnails Grid */}
      <div className="flex-1 flex flex-col justify-center">
        {recycledItems.length === 0 ? (
          // Empty State
          <div className="w-full py-4 sm:py-6 flex flex-col items-center justify-center text-center text-slate-400 gap-1">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-dashed border-slate-200 flex items-center justify-center text-slate-300">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300" />
            </div>
            <span className="text-[10px] sm:text-xs font-medium text-slate-400">
              Aguardando itens...
            </span>
          </div>
        ) : (
          // Items Grid / Flexbox
          <div className="grid grid-cols-3 xs:grid-cols-3 sm:grid-cols-4 gap-1.5 sm:gap-2 max-h-[140px] sm:max-h-[160px] overflow-y-auto p-0.5 custom-scrollbar">
            {recycledItems.map((item) => (
              <button
                key={`inventory-item-${item.id}`}
                id={`inventory-item-${item.id}`}
                onClick={() => {
                  sounds.playClick();
                  onSelectItem?.(item);
                }}
                title={`${item.name} - Clique para ver detalhes`}
                className={`group relative p-1.5 sm:p-2 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 cursor-pointer border ${
                  isBio
                    ? 'bg-amber-50/60 hover:bg-amber-100 border-amber-200/80 hover:border-amber-400 text-amber-950'
                    : 'bg-emerald-50/60 hover:bg-emerald-100 border-emerald-200/80 hover:border-emerald-400 text-emerald-950'
                } hover:scale-105 active:scale-95 shadow-xs`}
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                  <WasteItemIcon iconType={item.iconType} size={28} />
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-700 font-['Montserrat'] truncate w-full text-center leading-tight">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Hint */}
      {recycledItems.length > 0 && (
        <div className="pt-2 mt-1.5 border-t border-slate-100 flex items-center justify-between text-[9px] sm:text-[10px] text-slate-500 font-medium">
          <span>Coleta Efetuada</span>
          <span className="text-emerald-700 font-bold flex items-center gap-0.5">
            ✓ Separado
          </span>
        </div>
      )}
    </div>
  );
};
