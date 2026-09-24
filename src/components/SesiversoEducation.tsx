import React from 'react';
import { Leaf, Recycle, Lightbulb, Award, Globe, Check, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface SesiversoEducationProps {
  onScrollToTop: () => void;
}

export const SesiversoEducation: React.FC<SesiversoEducationProps> = ({ onScrollToTop }) => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-14 text-slate-100">
      
      {/* Section Title */}
      <div className="text-center mb-12">
        <span className="px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest bg-emerald-500/15 text-emerald-300 rounded-full border border-emerald-500/30 inline-flex items-center gap-2 mb-3.5 shadow-sm font-['Montserrat']">
          <Globe className="w-3.5 h-3.5 text-teal-300" /> Sesiverso Sustentável
        </span>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Montserrat']">
          Como Funciona a <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent">Separação Correta</span>?
        </h2>
        <p className="text-sm sm:text-base text-emerald-200/80 max-w-2xl mx-auto mt-3 font-normal leading-relaxed">
          Aprender sobre reciclagem e compostagem desenvolve consciência ecológica e cidadania para o futuro sustentável do planeta.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
        
        {/* Card 1: Biodegradável */}
        <div className="rounded-3xl p-7 sm:p-8 bg-gradient-to-b from-[#251507]/70 via-[#180d04]/80 to-[#0e0702]/90 border border-amber-500/40 shadow-3d-bio backdrop-blur-2xl relative overflow-hidden group hover:border-amber-400/80 transition-all duration-300">
          <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-3.5 mb-5">
            <div className="w-13 h-13 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-3xl shadow-inner group-hover:scale-105 transition-transform">
              🍂
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-amber-300 font-['Montserrat']">Lixo Biodegradável</h3>
              <p className="text-xs text-amber-200/70 font-semibold font-['Montserrat']">Matéria orgânica & compostáveis</p>
            </div>
          </div>

          <p className="text-sm text-stone-300/95 leading-relaxed mb-5 font-normal">
            Resíduos de origem vegetal ou animal que se decompõem rapidamente pela ação biológica natural (bactérias, fungos e umidade), transformando-se em adubo fértil rico em nutrientes.
          </p>

          <div className="space-y-3 bg-[#190d03]/70 p-5 rounded-2xl border border-amber-500/20 shadow-inner">
            <div className="text-xs font-black text-amber-300 uppercase tracking-wider font-['Montserrat'] flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              O que descartar aqui:
            </div>
            <ul className="text-xs sm:text-sm text-stone-300/90 space-y-2 font-normal">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Cascas de frutas, legumes, verduras e restos de refeições</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Folhas secas, aparas de grama, podas e gravetos finos</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Borra e filtros de café, sachês de chás de ervas naturais</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Guardanapos de papel e toalhas de papel usados com comida</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Card 2: Reciclável */}
        <div className="rounded-3xl p-7 sm:p-8 bg-gradient-to-b from-[#042817]/70 via-[#021d10]/80 to-[#011109]/90 border border-emerald-500/40 shadow-3d-rec backdrop-blur-2xl relative overflow-hidden group hover:border-emerald-400/80 transition-all duration-300">
          <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-3.5 mb-5">
            <div className="w-13 h-13 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-3xl shadow-inner group-hover:scale-105 transition-transform">
              ♻️
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-emerald-300 font-['Montserrat']">Lixo Reciclável</h3>
              <p className="text-xs text-emerald-200/70 font-semibold font-['Montserrat']">Materiais secos para novas cadeias</p>
            </div>
          </div>

          <p className="text-sm text-emerald-100/95 leading-relaxed mb-5 font-normal">
            Materiais que podem ser reinseridos no ciclo produtivo industrial, poupando matérias-primas virgens, água e milhares de megawatts de energia elétrica na produção.
          </p>

          <div className="space-y-3 bg-[#02180e]/70 p-5 rounded-2xl border border-emerald-500/20 shadow-inner">
            <div className="text-xs font-black text-emerald-300 uppercase tracking-wider font-['Montserrat'] flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              O que descartar aqui:
            </div>
            <ul className="text-xs sm:text-sm text-emerald-100/90 space-y-2 font-normal">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Garrafas plásticas PET, frascos de xampu e copos limpos</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Latas de refrigerante (alumínio), latas de conserva e tampas</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Caixas de papelão desmontadas, cadernos, revistas e jornais</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Embalagens Longa Vida (Tetra Pak) e recipientes de vidro</span>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
        <div className="p-6 rounded-2xl bg-gradient-to-b from-[#052615]/70 to-[#02140b]/80 border border-emerald-500/20 shadow-lg flex flex-col items-start gap-3.5 backdrop-blur-xl group hover:border-emerald-500/40 transition-all">
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 group-hover:scale-110 transition-transform">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white font-['Montserrat']">Resíduos Biodegradáveis</h4>
            <p className="text-xs text-emerald-200/75 mt-1.5 leading-relaxed font-normal">
              Restos de alimentos, cascas de frutas e folhas são destinados à lixeira de biodegradáveis, mantendo a escola limpa.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-b from-[#052615]/70 to-[#02140b]/80 border border-emerald-500/20 shadow-lg flex flex-col items-start gap-3.5 backdrop-blur-xl group hover:border-teal-500/40 transition-all">
          <div className="p-3 rounded-2xl bg-teal-500/20 border border-teal-400/30 text-teal-300 group-hover:scale-110 transition-transform">
            <Recycle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white font-['Montserrat']">Materiais Recicláveis</h4>
            <p className="text-xs text-teal-200/75 mt-1.5 leading-relaxed font-normal">
              Papéis, plásticos, vidros e metais secos são separados na lixeira de recicláveis de forma prática e organizada.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-b from-[#052615]/70 to-[#02140b]/80 border border-emerald-500/20 shadow-lg flex flex-col items-start gap-3.5 backdrop-blur-xl group hover:border-amber-500/40 transition-all">
          <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-400/30 text-amber-300 group-hover:scale-110 transition-transform">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white font-['Montserrat']">Cultura Sustentável</h4>
            <p className="text-xs text-amber-200/75 mt-1.5 leading-relaxed font-normal">
              A comunidade escolar desenvolve o hábito da separação consciente, tornando o dia a dia mais simples e organizado.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Call to Action to scroll back and play */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5 p-7 sm:p-8 rounded-3xl bg-gradient-to-r from-[#052817]/90 via-[#03331c]/90 to-[#042415]/90 border border-emerald-500/40 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
        <div>
          <h4 className="text-lg sm:text-xl font-extrabold text-white font-['Montserrat']">Pronto para testar seus conhecimentos?</h4>
          <p className="text-xs sm:text-sm text-emerald-200/80 mt-1 font-normal">
            Role a página para cima ou para baixo para ver todos os resíduos entrarem fluidamente em suas respectivas lixeiras!
          </p>
        </div>

        <button
          onClick={onScrollToTop}
          className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 text-emerald-950 font-black text-sm shadow-[0_0_30px_rgba(52,211,153,0.5)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shrink-0 cursor-pointer font-['Montserrat']"
        >
          <span>Voltar ao Topo & Animar</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </section>
  );
};
