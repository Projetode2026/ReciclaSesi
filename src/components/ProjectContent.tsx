import React, { useState } from 'react';
import {
  Sparkles,
  Leaf,
  Recycle,
  Target,
  BookOpen,
  ArrowDown,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Zap,
  Droplets,
  HeartHandshake,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { WasteItem, WasteCategory } from '../types';
import { WasteCatalog } from './WasteCatalog';
import { RecyclingActionSection } from './RecyclingActionSection';
import { sounds } from '../utils/audio';

interface ProjectContentProps {
  items: WasteItem[];
  recycledItemIds: Set<string>;
  flyingItemIds: Set<string>;
  isRecyclingAll: boolean;
  isRestoring?: boolean;
  activeBinCategory: WasteCategory | null;
  onSelectItem: (item: WasteItem) => void;
  onRecycleAll: () => void;
  onRestoreCatalog: () => void;
  onReset: () => void;
  bioCount: number;
  recCount: number;
}

export const ProjectContent: React.FC<ProjectContentProps> = ({
  items,
  recycledItemIds,
  flyingItemIds,
  isRecyclingAll,
  isRestoring = false,
  activeBinCategory,
  onSelectItem,
  onRecycleAll,
  onRestoreCatalog,
  onReset,
  bioCount,
  recCount,
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | WasteCategory>('all');

  const totalBio = items.filter((i) => i.category === 'biodegradavel').length;
  const totalRec = items.filter((i) => i.category === 'reciclavel').length;

  return (
    <div className="relative w-full max-w-5xl mx-auto px-3.5 sm:px-6 py-6 sm:py-10 flex flex-col gap-12 sm:gap-16 text-slate-800">
      
      {/* 1. HERO SECTION */}
      <section id="inicio" className="w-full flex flex-col items-center text-center pt-2 sm:pt-4">
        
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold shadow-xs mb-5 font-['Montserrat']">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Iniciativa de Educação Ambiental no SESI</span>
        </div>

        {/* Main Display Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight font-['Montserrat'] max-w-4xl leading-none">
          <span className="text-emerald-700 font-black">
            RECICLA
          </span>{' '}
          <span className="inline-block text-3xl sm:text-5xl lg:text-6xl align-middle mx-1">
            ♻️
          </span>{' '}
          <span className="text-slate-900 font-black">
            SESI
          </span>
        </h1>
        <p className="text-base sm:text-xl font-bold text-slate-600 font-['Montserrat'] mt-2 sm:mt-3 max-w-2xl">
          Separação Simples, Prática e Consciente na Escola
        </p>

        {/* Hero Intro Glass Card */}
        <div className="mt-8 w-full glass-card-light rounded-3xl p-6 sm:p-8 text-left relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-700 font-['Montserrat']">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Educação Ambiental na Prática</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Montserrat']">
                O Projeto RECICLA SESI
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                O <strong>RECICLA SESI</strong> é um projeto que propõe a utilização de apenas duas lixeiras principais na escola: uma para resíduos biodegradáveis e outra para materiais recicláveis. O objetivo é simplificar a separação dos resíduos, tornando o descarte mais fácil e prático para alunos, professores e funcionários, contribuindo para uma escola mais limpa e organizada.
              </p>
            </div>

            {/* Quick Action Anchor to Catalog */}
            <div className="w-full md:w-auto shrink-0 flex md:flex-col items-center justify-between gap-3">
              <a
                href="#catalogo"
                onClick={() => sounds.playClick()}
                className="w-full px-5 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer font-['Montserrat']"
              >
                <span>Ir ao Catálogo</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </a>
            </div>
          </div>
        </div>

      </section>


      {/* 2. SOBRE O PROJETO RECICLA SESI */}
      <section id="sobre" className="w-full space-y-6 scroll-mt-24">
        
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-800">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 font-['Montserrat']">
              Pilares do Projeto
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-['Montserrat']">
              Sobre o Projeto RECICLA SESI
            </h2>
          </div>
        </div>

        {/* Main Text Card */}
        <div className="glass-card-light rounded-3xl p-6 sm:p-8 space-y-4">
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            O <strong>RECICLA SESI</strong> é um projeto desenvolvido para incentivar a separação correta de resíduos na escola por meio de uma proposta simples e eficiente: a utilização de apenas <strong>duas lixeiras principais</strong>, sendo uma para resíduos biodegradáveis e outra para materiais recicláveis.
          </p>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Em vez de adotar o modelo tradicional com várias lixeiras para cada tipo de material, o projeto foca na praticidade do descarte cotidiano. Ao simplificar as opções, torna-se muito mais fácil para alunos, professores e funcionários compreenderem e realizarem a separação correta, garantindo um ambiente escolar limpo, higiênico e sustentável.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="glass-card-light rounded-3xl p-6 space-y-3 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-800 flex items-center justify-center text-xl font-bold">
              🌱
            </div>
            <h3 className="text-lg font-black text-slate-900 font-['Montserrat']">Duas Lixeiras Principais</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Adoção de duas opções claras na escola (biodegradáveis e recicláveis), simplificando a identificação e evitando dúvidas na hora do descarte.
            </p>
          </div>

          <div className="glass-card-light rounded-3xl p-6 space-y-3 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 border border-teal-200 text-teal-800 flex items-center justify-center text-xl font-bold">
              ⚙️
            </div>
            <h3 className="text-lg font-black text-slate-900 font-['Montserrat']">Praticidade no Dia a Dia</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Um sistema simples e acessível que substitui o excesso de divisões por uma separação direta e rápida em todas as salas e áreas de convivência.
            </p>
          </div>

          <div className="glass-card-light rounded-3xl p-6 space-y-3 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 text-amber-800 flex items-center justify-center text-xl font-bold">
              🌍
            </div>
            <h3 className="text-lg font-black text-slate-900 font-['Montserrat']">Participação Coletiva</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Alunos, professores e funcionários participam juntos da separação correta, mantendo a escola organizada e cuidando do meio ambiente.
            </p>
          </div>

        </div>

      </section>


      {/* 3. A IMPORTÂNCIA DA SEPARAÇÃO */}
      <section id="importancia" className="w-full space-y-6 scroll-mt-24">
        
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-teal-100 border border-teal-200 text-teal-800">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 font-['Montserrat']">
              Consciência & Impacto
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-['Montserrat']">
              A Importância da Separação
            </h2>
          </div>
        </div>

        {/* Context Card */}
        <div className="glass-card-light rounded-3xl p-6 sm:p-8 space-y-4">
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Separar os resíduos corretamente na escola é essencial para evitar a contaminação dos materiais. Quando restos de comida entram em contato com papéis, plásticos e metais, o reaproveitamento desses materiais é comprometido. Manter duas lixeiras bem definidas facilita o descarte limpo e consciente.
          </p>
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              <strong>Regra do RECICLA SESI:</strong> Materiais secos e recicláveis vão para a lixeira de recicláveis; cascas, restos de alimentos e matéria orgânica vão para a lixeira de biodegradáveis. Não misture!
            </p>
          </div>
        </div>

        {/* 4 Metrics / Impact Glass Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="glass-card-light rounded-3xl p-5 space-y-2">
            <div className="p-2.5 w-fit rounded-xl bg-emerald-100 text-emerald-800">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-slate-900 font-['Montserrat']">Prático</div>
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider font-['Montserrat']">Descarte Rápido</div>
            <p className="text-xs text-slate-600">
              Com apenas duas lixeiras, o processo de descarte é instantâneo e sem dúvidas para todos.
            </p>
          </div>

          <div className="glass-card-light rounded-3xl p-5 space-y-2">
            <div className="p-2.5 w-fit rounded-xl bg-teal-100 text-teal-800">
              <Leaf className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-slate-900 font-['Montserrat']">Limpeza</div>
            <div className="text-xs font-bold text-teal-700 uppercase tracking-wider font-['Montserrat']">Escola Organizada</div>
            <p className="text-xs text-slate-600">
              A separação correta contribui diretamente para a higiene e a preservação dos espaços escolares.
            </p>
          </div>

          <div className="glass-card-light rounded-3xl p-5 space-y-2">
            <div className="p-2.5 w-fit rounded-xl bg-cyan-100 text-cyan-800">
              <Droplets className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-slate-900 font-['Montserrat']">Simples</div>
            <div className="text-xs font-bold text-cyan-700 uppercase tracking-wider font-['Montserrat']">Fácil Compreensão</div>
            <p className="text-xs text-slate-600">
              Substitui a complexidade de muitas lixeiras por uma lógica simples e acessível a todas as idades.
            </p>
          </div>

          <div className="glass-card-light rounded-3xl p-5 space-y-2">
            <div className="p-2.5 w-fit rounded-xl bg-amber-100 text-amber-800">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div className="text-2xl font-black text-slate-900 font-['Montserrat']">União</div>
            <div className="text-xs font-bold text-amber-700 uppercase tracking-wider font-['Montserrat']">Ação de Todos</div>
            <p className="text-xs text-slate-600">
              O compromisso conjunto de alunos, professores e funcionários torna a escola um ambiente melhor.
            </p>
          </div>

        </div>

      </section>


      {/* 4. OS DOIS GRANDES DESTINOS (BIODEGRADÁVEL VS RECICLÁVEL) */}
      <section id="destinos" className="w-full space-y-6 scroll-mt-24">
        
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-100 border border-amber-200 text-amber-800">
            <Recycle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 font-['Montserrat']">
              Categorização Clara
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-['Montserrat']">
              Dois Grandes Destinos
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card Biodegradável */}
          <div className="glass-card-amber rounded-3xl p-6 sm:p-8 space-y-5 border border-amber-300">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-3xl">
                🍂
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  {totalBio} itens neste fluxo
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-amber-950 mt-1 font-['Montserrat']">
                  Lixo Biodegradável
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-amber-950/90 leading-relaxed">
              Matéria de origem biológica que se decompõe rapidamente por ação de bactérias e fungos, transformando-se em adubo fértil rico em nutrientes para as hortas escolares do SESI.
            </p>

            <div className="bg-amber-100/70 p-4 rounded-2xl border border-amber-200 space-y-2">
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wider font-['Montserrat']">
                O que descartar na lixeira marrom/orgânica:
              </div>
              <ul className="text-xs text-amber-900/90 space-y-1.5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>Cascas de banana, maçã, legumes e sobras de frutas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>Folhas secas, aparas de grama e podas de jardim</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>Cascas de ovos, borra e filtros de café de papel</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>Guardanapos e toalhas de papel com restos de comida</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card Reciclável */}
          <div className="glass-card-emerald rounded-3xl p-6 sm:p-8 space-y-5 border border-emerald-300">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-3xl">
                ♻️
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {totalRec} itens neste fluxo
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-emerald-950 mt-1 font-['Montserrat']">
                  Lixo Reciclável
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-950/90 leading-relaxed">
              Materiais inorgânicos secos que podem ser reprocessados e transformados em novos produtos industriais, evitando a extração contínua de recursos minerais e fósseis.
            </p>

            <div className="bg-emerald-100/70 p-4 rounded-2xl border border-emerald-200 space-y-2">
              <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider font-['Montserrat']">
                O que descartar na lixeira verde/reciclável:
              </div>
              <ul className="text-xs text-emerald-900/90 space-y-1.5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Garrafas PET, embalagens plásticas e tampinhas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Latas de alumínio e embalagens metálicas limpas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Caixas de papelão desmontadas, cadernos e jornais</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Frascos de vidro e caixas longa vida (Tetra Pak)</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </section>


      {/* 5. NOSSOS OBJETIVOS */}
      <section id="objetivos" className="w-full space-y-6 scroll-mt-24">
        
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-100 border border-cyan-200 text-cyan-800">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-700 font-['Montserrat']">
              Metas do Projeto
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-['Montserrat']">
              Nossos Objetivos
            </h2>
          </div>
        </div>

        {/* 4 Objective Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          
          <div className="glass-card-light rounded-3xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs font-['Montserrat']">
                OBJETIVO 01
              </div>
              <Award className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-lg font-black text-slate-900 font-['Montserrat']">
              Simplificar a Separação
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Substituir o modelo tradicional de múltiplas lixeiras por duas opções diretas (biodegradáveis e recicláveis), facilitando a identificação imediata.
            </p>
          </div>

          <div className="glass-card-light rounded-3xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-teal-100 text-teal-800 font-black text-xs font-['Montserrat']">
                OBJETIVO 02
              </div>
              <Leaf className="w-5 h-5 text-teal-600" />
            </div>
            <h3 className="text-lg font-black text-slate-900 font-['Montserrat']">
              Praticidade no Descarte
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tornar o descarte diário mais simples, rápido e fácil de entender para alunos, professores e funcionários em todos os espaços da escola.
            </p>
          </div>

          <div className="glass-card-light rounded-3xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800 font-black text-xs font-['Montserrat']">
                OBJETIVO 03
              </div>
              <Recycle className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-lg font-black text-slate-900 font-['Montserrat']">
              Incentivar a Separação Correta
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Incentivar a separação correta dos resíduos, garantindo que os materiais recicláveis e os resíduos biodegradáveis sejam descartados nas lixeiras adequadas.
            </p>
          </div>

          <div className="glass-card-light rounded-3xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-cyan-100 text-cyan-800 font-black text-xs font-['Montserrat']">
                OBJETIVO 04
              </div>
              <ShieldCheck className="w-5 h-5 text-cyan-600" />
            </div>
            <h3 className="text-lg font-black text-slate-900 font-['Montserrat']">
              Escola Mais Limpa e Organizada
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Contribuir diretamente para a organização, higiene e limpeza do ambiente escolar por meio de hábitos simples de separação consciente.
            </p>
          </div>

        </div>

      </section>


      {/* 6. CATÁLOGO DE RESÍDUOS (LOGO ABAIXO DOS TEXTOS) */}
      <WasteCatalog
        items={items}
        recycledItemIds={recycledItemIds}
        flyingItemIds={flyingItemIds}
        onSelectItem={onSelectItem}
        filterCategory={filterCategory}
        onFilterChange={setFilterCategory}
      />


      {/* 7. BOTÃO "RECICLAR AGORA" + "RESTAURAR CATÁLOGO" + ÁREA DAS LIXEIRAS & INVENTÁRIOS */}
      <RecyclingActionSection
        items={items}
        recycledItemIds={recycledItemIds}
        isRecyclingAll={isRecyclingAll}
        isRestoring={isRestoring}
        activeBinCategory={activeBinCategory}
        onRecycleAll={onRecycleAll}
        onRestoreCatalog={onRestoreCatalog}
        onReset={onReset}
        bioCount={bioCount}
        recCount={recCount}
        onSelectItem={onSelectItem}
      />

    </div>
  );
};
