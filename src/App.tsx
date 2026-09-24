import React, { useState, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { ProjectContent } from './components/ProjectContent';
import { ItemModal } from './components/ItemModal';
import { HelpModal } from './components/HelpModal';
import { FlyingWasteOverlay, ActiveFlyingItem } from './components/FlyingWasteOverlay';
import { INITIAL_WASTE_ITEMS } from './data/wasteItems';
import { WasteItem, WasteCategory } from './types';
import { sounds } from './utils/audio';

export default function App() {
  const [items] = useState<WasteItem[]>(INITIAL_WASTE_ITEMS);
  const [recycledItemIds, setRecycledItemIds] = useState<Set<string>>(new Set());
  const [flyingItems, setFlyingItems] = useState<ActiveFlyingItem[]>([]);
  const [isRecyclingAll, setIsRecyclingAll] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [activeBinCategory, setActiveBinCategory] = useState<WasteCategory | null>(null);
  const [selectedItem, setSelectedItem] = useState<WasteItem | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const activeBinTimeoutRef = useRef<number | null>(null);
  const flightTimeoutsRef = useRef<number[]>([]);

  // Toggle sound
  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    sounds.setEnabled(nextVal);
  };

  // Instant Reset recycled items & flying states
  const handleReset = useCallback(() => {
    // Clear ongoing flight timers
    flightTimeoutsRef.current.forEach((t) => clearTimeout(t));
    flightTimeoutsRef.current = [];
    if (activeBinTimeoutRef.current) clearTimeout(activeBinTimeoutRef.current);

    setRecycledItemIds(new Set());
    setFlyingItems([]);
    setIsRecyclingAll(false);
    setIsRestoring(false);
    setActiveBinCategory(null);
  }, []);

  // When a flying waste item lands
  const handleItemComplete = useCallback((flightId: string, item: WasteItem, direction?: 'to_bin' | 'to_catalog') => {
    // Remove from flying state
    setFlyingItems((prev) => prev.filter((f) => f.id !== flightId));

    if (direction === 'to_catalog') {
      // Ensure item is completely un-recycled
      setRecycledItemIds((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
      sounds.playRestore();
    } else {
      // Add to recycled set
      setRecycledItemIds((prev) => {
        const next = new Set(prev);
        next.add(item.id);
        return next;
      });

      // Play tactile audio drop sound
      sounds.playDrop(item.category);

      // Trigger visual reaction on corresponding bin
      setActiveBinCategory(item.category);
      if (activeBinTimeoutRef.current) clearTimeout(activeBinTimeoutRef.current);
      activeBinTimeoutRef.current = window.setTimeout(() => {
        setActiveBinCategory(null);
      }, 400);
    }
  }, []);

  // Launch the cascading "RECICLAR AGORA" animation (Items fly from Catalog -> Bins)
  const handleRecycleAll = useCallback(() => {
    if (isRecyclingAll || isRestoring) return;

    // Filter items that haven't been recycled yet
    const unRecycled = items.filter((item) => !recycledItemIds.has(item.id));
    if (unRecycled.length === 0) return;

    sounds.playClick();
    setIsRecyclingAll(true);

    // Alternate organic and recyclable items for beautiful visual rhythm
    const bios = unRecycled.filter((i) => i.category === 'biodegradavel');
    const recs = unRecycled.filter((i) => i.category === 'reciclavel');
    const orderedSequence: WasteItem[] = [];
    const maxLen = Math.max(bios.length, recs.length);
    for (let i = 0; i < maxLen; i++) {
      if (bios[i]) orderedSequence.push(bios[i]);
      if (recs[i]) orderedSequence.push(recs[i]);
    }

    // Scroll smoothly to ensure bins and catalog are nicely framed
    const binsEl = document.getElementById('area-reciclagem');
    if (binsEl) {
      const rect = binsEl.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) {
        binsEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    // Clear any previous timers
    flightTimeoutsRef.current.forEach((t) => clearTimeout(t));
    flightTimeoutsRef.current = [];

    // Smooth, slow-motion flight configuration (2.8 seconds per item with graceful stagger)
    const STAGGER_DELAY = 480; // ms between consecutive waste item launches
    const FLIGHT_DURATION = 2700; // ms flight duration for each individual item

    orderedSequence.forEach((item, index) => {
      const timer = window.setTimeout(() => {
        // Calculate dynamic real-time coordinates on screen
        const sourceCard = document.getElementById(`catalog-item-${item.id}`);
        const targetBin = document.getElementById(`bin-target-${item.category}`);

        let startX = window.innerWidth / 2;
        let startY = window.innerHeight * 0.35;

        if (sourceCard) {
          const sRect = sourceCard.getBoundingClientRect();
          startX = sRect.left + sRect.width / 2;
          startY = sRect.top + sRect.height / 2;
        }

        let targetX = item.category === 'biodegradavel' ? window.innerWidth * 0.3 : window.innerWidth * 0.7;
        let targetY = window.innerHeight * 0.8;

        if (targetBin) {
          const tRect = targetBin.getBoundingClientRect();
          targetX = tRect.left + tRect.width / 2;
          targetY = tRect.top + tRect.height * 0.42;
        }

        const distanceX = Math.abs(targetX - startX);
        const arcHeight = Math.max(70, Math.min(160, distanceX * 0.25 + 60));

        const flightId = `${item.id}-${Date.now()}-${Math.random()}`;

        const newFlight: ActiveFlyingItem = {
          id: flightId,
          item,
          startX,
          startY,
          targetX,
          targetY,
          startTime: performance.now(),
          duration: FLIGHT_DURATION,
          arcHeight,
          direction: 'to_bin',
        };

        setFlyingItems((prev) => [...prev, newFlight]);

        // If this is the last item in sequence, complete the global recycling session
        if (index === orderedSequence.length - 1) {
          const finalTimer = window.setTimeout(() => {
            setIsRecyclingAll(false);
            sounds.playComplete();
          }, FLIGHT_DURATION + 100);
          flightTimeoutsRef.current.push(finalTimer);
        }
      }, index * STAGGER_DELAY);

      flightTimeoutsRef.current.push(timer);
    });
  }, [isRecyclingAll, isRestoring, items, recycledItemIds]);

  // Launch the cascading "RESTAURAR CATÁLOGO" animation (Items fly from Bins/Inventory -> Catalog)
  const handleRestoreCatalog = useCallback(() => {
    if (isRecyclingAll || isRestoring) return;

    // Filter items that have been recycled and are currently stored
    const recycledList = items.filter((item) => recycledItemIds.has(item.id));
    if (recycledList.length === 0) return;

    sounds.playClick();
    setIsRestoring(true);

    // Alternate organic and recyclable items
    const bios = recycledList.filter((i) => i.category === 'biodegradavel');
    const recs = recycledList.filter((i) => i.category === 'reciclavel');
    const orderedSequence: WasteItem[] = [];
    const maxLen = Math.max(bios.length, recs.length);
    for (let i = 0; i < maxLen; i++) {
      if (bios[i]) orderedSequence.push(bios[i]);
      if (recs[i]) orderedSequence.push(recs[i]);
    }

    // Scroll smoothly to keep catalog in view
    const catalogoEl = document.getElementById('catalogo');
    if (catalogoEl) {
      const rect = catalogoEl.getBoundingClientRect();
      if (rect.top < 0 || rect.bottom > window.innerHeight * 1.5) {
        catalogoEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    // Clear previous timers
    flightTimeoutsRef.current.forEach((t) => clearTimeout(t));
    flightTimeoutsRef.current = [];

    const STAGGER_DELAY = 480; // ms between consecutive items leaving bins
    const FLIGHT_DURATION = 2600; // ms flight duration for each returning item

    orderedSequence.forEach((item, index) => {
      const timer = window.setTimeout(() => {
        // Calculate dynamic real-time screen coordinates for return flight
        const sourceBin = document.getElementById(`bin-target-${item.category}`);
        const sourceInventoryItem = document.getElementById(`inventory-item-${item.id}`);
        const targetCard = document.getElementById(`catalog-item-${item.id}`);

        let startX = item.category === 'biodegradavel' ? window.innerWidth * 0.3 : window.innerWidth * 0.7;
        let startY = window.innerHeight * 0.8;

        if (sourceInventoryItem) {
          const invRect = sourceInventoryItem.getBoundingClientRect();
          startX = invRect.left + invRect.width / 2;
          startY = invRect.top + invRect.height / 2;
        } else if (sourceBin) {
          const bRect = sourceBin.getBoundingClientRect();
          startX = bRect.left + bRect.width / 2;
          startY = bRect.top + bRect.height * 0.42;
        }

        let targetX = window.innerWidth / 2;
        let targetY = window.innerHeight * 0.35;

        if (targetCard) {
          const tRect = targetCard.getBoundingClientRect();
          targetX = tRect.left + tRect.width / 2;
          targetY = tRect.top + tRect.height / 2;
        }

        // Remove item from inventory state progressively as it begins its flight
        setRecycledItemIds((prev) => {
          const next = new Set(prev);
          next.delete(item.id);
          return next;
        });

        // Trigger active pulse on bin as item emerges
        setActiveBinCategory(item.category);
        if (activeBinTimeoutRef.current) clearTimeout(activeBinTimeoutRef.current);
        activeBinTimeoutRef.current = window.setTimeout(() => {
          setActiveBinCategory(null);
        }, 350);

        const flightId = `restore-${item.id}-${Date.now()}-${Math.random()}`;

        const newFlight: ActiveFlyingItem = {
          id: flightId,
          item,
          startX,
          startY,
          targetX,
          targetY,
          startTime: performance.now(),
          duration: FLIGHT_DURATION,
          arcHeight: 90,
          direction: 'to_catalog',
        };

        setFlyingItems((prev) => [...prev, newFlight]);

        // If this is the last item in sequence, complete restoration
        if (index === orderedSequence.length - 1) {
          const finalTimer = window.setTimeout(() => {
            setIsRestoring(false);
            setRecycledItemIds(new Set()); // Ensure state is fully clean
            sounds.playComplete();
          }, FLIGHT_DURATION + 100);
          flightTimeoutsRef.current.push(finalTimer);
        }
      }, index * STAGGER_DELAY);

      flightTimeoutsRef.current.push(timer);
    });
  }, [isRecyclingAll, isRestoring, items, recycledItemIds]);

  // Derived set of flying item IDs for visual indicator on catalog cards
  const flyingItemIds = React.useMemo(() => {
    return new Set(flyingItems.map((f) => f.item.id));
  }, [flyingItems]);

  // Calculate counts
  const bioCount = items.filter((i) => i.category === 'biodegradavel' && recycledItemIds.has(i.id)).length;
  const recCount = items.filter((i) => i.category === 'reciclavel' && recycledItemIds.has(i.id)).length;

  return (
    <div className="relative min-h-screen bg-transparent text-slate-800 flex flex-col font-['Poppins',sans-serif] selection:bg-emerald-500/20 selection:text-emerald-900 overflow-x-hidden">
      
      {/* 0. DYNAMIC MOVING BACKGROUND GRADIENT (Fluid Color Motion) */}
      <div
        id="animated-gradient-bg"
        className="fixed inset-0 pointer-events-none z-0 animated-eco-bg"
      />

      {/* Decorative Eco-Friendly Floating Wave Ribbons Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-45">
        <svg
          className="absolute -top-24 -left-24 w-[120vw] h-[120vh] max-w-none text-emerald-400/25 animate-float-slow"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100 200 C300 100 600 500 1100 300 C1300 220 1500 400 1600 350 L1600 900 L-100 900 Z"
            fill="url(#ecoWaveGrad1)"
            opacity="0.5"
          />
          <path
            d="M-50 450 C400 350 700 700 1200 480 C1400 400 1550 550 1650 500 L1650 900 L-50 900 Z"
            fill="url(#ecoWaveGrad2)"
            opacity="0.35"
          />
          <defs>
            <linearGradient id="ecoWaveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a7f3d0" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#6ee7b7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ccfbf1" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="ecoWaveGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d1fae5" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#fef08a" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 1. STICKY HEADER */}
      <Header
        totalItems={items.length}
        recycledCount={recycledItemIds.size}
        onReset={handleReset}
        onOpenHelp={() => setIsHelpOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* 2. MAIN EDUCATIONAL CONTENT & INTERACTIVE CATALOG FLOW */}
      <main className="relative z-10 flex-1 w-full flex flex-col items-center">
        <ProjectContent
          items={items}
          recycledItemIds={recycledItemIds}
          flyingItemIds={flyingItemIds}
          isRecyclingAll={isRecyclingAll}
          isRestoring={isRestoring}
          activeBinCategory={activeBinCategory}
          onSelectItem={(item) => {
            sounds.playClick();
            setSelectedItem(item);
          }}
          onRecycleAll={handleRecycleAll}
          onRestoreCatalog={handleRestoreCatalog}
          onReset={handleReset}
          bioCount={bioCount}
          recCount={recCount}
        />
      </main>

      {/* 3. FLYING WASTE OVERLAY (ACTIVE PARTICLES DURING "RECICLAR AGORA") */}
      <FlyingWasteOverlay
        flyingItems={flyingItems}
        onItemComplete={handleItemComplete}
      />

      {/* Item Detail Modal */}
      <ItemModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      {/* Help / Guide Modal */}
      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* Footer */}
      <footer className="relative z-10 w-full bg-white/90 border-t border-emerald-900/10 py-8 text-center text-xs text-slate-600 backdrop-blur-xl shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 flex-wrap justify-center font-['Montserrat']">
            <span className="font-black text-emerald-800 tracking-wider">RECICLA ♻️ SESI</span>
            <span className="text-emerald-400">•</span>
            <span className="text-slate-600 font-medium">Iniciativa Sesiverso de Educação Ambiental</span>
          </div>
          <div className="text-slate-500 font-normal">
            Separação Consciente: Orgânico & Reciclável | Futuro Sustentável • Paulo Jorge © 2026
          </div>
        </div>
      </footer>

    </div>
  );
}
