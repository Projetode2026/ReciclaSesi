import React from 'react';
import { X, Clock, Sparkles, CheckCircle2, Recycle, Leaf, Lightbulb } from 'lucide-react';
import { WasteItem } from '../types';
import { WasteItemIcon } from './WasteItemIcon';

interface ItemModalProps {
  item: WasteItem | null;
  onClose: () => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const isBio = item.category === 'biodegradavel';

  return (
    <div
      id="waste-item-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 transition-all animate-fadeIn"
    >
      <div
        id="waste-item-modal-card"
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-white border shadow-xl relative overflow-hidden transition-all transform scale-100 ${
          isBio
            ? 'border-amber-200 shadow-amber-900/10'
            : 'border-emerald-200 shadow-emerald-900/10'
        }`}
      >
        {/* Close Button */}
        <button
          id="btn-close-modal"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-all z-10 cursor-pointer border border-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Item Header with Icon */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center p-2.5 border shadow-sm ${
              isBio
                ? 'bg-amber-50 border-amber-200'
                : 'bg-emerald-50 border-emerald-200'
            }`}
          >
            <WasteItemIcon iconType={item.iconType} size={64} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1 font-['Montserrat'] ${
                  isBio
                    ? 'bg-amber-100 text-amber-900 border border-amber-200'
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                }`}
              >
                {isBio ? <Leaf className="w-3 h-3" /> : <Recycle className="w-3 h-3" />}
                {item.categoryLabel}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 font-['Montserrat']">
              {item.name}
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              Material: <span className="text-slate-900 font-semibold">{item.material}</span>
            </p>
          </div>
        </div>

        {/* Decomposition Time Highlight */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-4 flex items-center gap-3.5 shadow-sm">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-['Montserrat']">
              Tempo de Decomposição na Natureza
            </div>
            <div className="text-base sm:text-lg font-black text-amber-900 font-['Montserrat']">
              {item.decompositionTime}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-700 leading-relaxed mb-4 font-normal">
          {item.description}
        </p>

        {/* SESI Environmental Tip */}
        <div className="rounded-2xl p-4 bg-emerald-50/80 border border-emerald-200 flex items-start gap-3 shadow-sm">
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5 font-['Montserrat']">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" /> Dica Sustentável Sesiverso
            </div>
            <p className="text-xs text-slate-700 mt-1 leading-relaxed font-normal">
              {item.sesiTip}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 text-white shadow-md hover:shadow-lg transition-all cursor-pointer font-['Montserrat'] ${
              isBio
                ? 'bg-amber-600 hover:bg-amber-700'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Entendi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
