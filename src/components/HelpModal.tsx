import React from 'react';
import { X, Sparkles, MousePointer, Smartphone, Volume2, Award, CheckCircle2 } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="help-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 transition-all animate-fadeIn"
    >
      <div
        id="help-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-xl relative overflow-hidden"
      >
        <button
          id="btn-close-help"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-all z-10 cursor-pointer border border-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-13 h-13 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-3xl shadow-sm">
            ♻️
          </div>
          <div>
            <div className="text-[11px] uppercase font-black tracking-widest text-emerald-700 font-['Montserrat']">
              Guia do Usuário
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-['Montserrat']">
              RECICLA ♻️ SESI
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
          Bem-vindo ao guia interativo do <strong>RECICLA SESI</strong>! Esta ferramenta ensina a separação consciente de materiais em duas lixeiras principais: biodegradáveis e recicláveis.
        </p>

        <div className="space-y-3.5 mb-6">
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
              <MousePointer className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-900 uppercase tracking-wider font-['Montserrat']">No Computador (PC / Mac)</div>
              <p className="text-xs text-slate-600 mt-1 font-normal">
                Use o botão &quot;RECICLAR AGORA&quot; ou explore os materiais no catálogo clicando em cada item para ver detalhes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
            <div className="p-2.5 rounded-xl bg-teal-100 text-teal-800 shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black text-slate-900 uppercase tracking-wider font-['Montserrat']">No Celular e Tablet</div>
              <p className="text-xs text-slate-600 mt-1 font-normal">
                Toque nos cards do catálogo ou no botão &quot;RECICLAR AGORA&quot; para disparar o trajeto dos materiais até as lixeiras.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-amber-50 border border-amber-200 shadow-sm">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black text-amber-950 uppercase tracking-wider font-['Montserrat']">Toque nos Itens</div>
              <p className="text-xs text-slate-600 mt-1 font-normal">
                Clique em qualquer resíduo para descobrir seu tempo de decomposição, características e dicas de descarte correto na escola.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] text-slate-300 font-normal select-none">
            Paulo Jorge
          </span>
          <button
            onClick={onClose}
            className="px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer font-['Montserrat']"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Vamos Reciclar!</span>
          </button>
        </div>
      </div>
    </div>
  );
};
