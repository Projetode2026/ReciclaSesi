import React, { useEffect, useState } from 'react';
import { WasteItem } from '../types';
import { WasteItemIcon } from './WasteItemIcon';

export interface ActiveFlyingItem {
  id: string;
  item: WasteItem;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  startTime: number;
  duration: number;
  arcHeight: number;
  direction?: 'to_bin' | 'to_catalog';
}

interface FlyingWasteOverlayProps {
  flyingItems: ActiveFlyingItem[];
  onItemComplete: (itemId: string, item: WasteItem, direction?: 'to_bin' | 'to_catalog') => void;
}

interface FlyingItemElementProps {
  flying: ActiveFlyingItem;
  onComplete: (id: string, item: WasteItem, direction?: 'to_bin' | 'to_catalog') => void;
}

const FlyingItemElement: React.FC<FlyingItemElementProps> = ({ flying, onComplete }) => {
  const [isLanded, setIsLanded] = useState(false);
  const isBio = flying.item.category === 'biodegradavel';
  const isToCatalog = flying.direction === 'to_catalog';

  useEffect(() => {
    // Trigger transition on next paint frame
    const rId1 = requestAnimationFrame(() => {
      const rId2 = requestAnimationFrame(() => {
        setIsLanded(true);
      });
      return () => cancelAnimationFrame(rId2);
    });

    // Complete the item flight when transition finishes
    const timer = setTimeout(() => {
      onComplete(flying.id, flying.item, flying.direction);
    }, flying.duration);

    return () => {
      cancelAnimationFrame(rId1);
      clearTimeout(timer);
    };
  }, [flying, onComplete]);

  const durationSec = (flying.duration / 1000).toFixed(2);

  // Dynamic transforms based on direction
  const startTransform = isToCatalog
    ? `translate3d(${flying.startX}px, ${flying.startY}px, 0) translate(-50%, -50%) scale(0.55) rotate(0deg)`
    : `translate3d(${flying.startX}px, ${flying.startY}px, 0) translate(-50%, -50%) scale(1.25) rotate(0deg)`;

  const targetTransform = isToCatalog
    ? `translate3d(${flying.targetX}px, ${flying.targetY}px, 0) translate(-50%, -50%) scale(1.05) rotate(-360deg)`
    : `translate3d(${flying.targetX}px, ${flying.targetY}px, 0) translate(-50%, -50%) scale(0.65) rotate(360deg)`;

  const opacityStyle = isToCatalog
    ? isLanded
      ? 0.95
      : 0.9
    : isLanded
    ? 0
    : 1;

  return (
    <div
      style={{
        transform: isLanded ? targetTransform : startTransform,
        opacity: opacityStyle,
        transition: `transform ${durationSec}s cubic-bezier(0.25, 1, 0.5, 1), opacity ${durationSec}s cubic-bezier(${isToCatalog ? '0.2, 0.8, 0.2, 1' : '0.9, 0, 1, 1'})`,
        willChange: 'transform, opacity',
      }}
      className="fixed top-0 left-0 pointer-events-none z-50 transform-gpu select-none"
    >
      {/* Flying Waste Icon Wrapper - Generous size and high clarity */}
      <div
        className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center p-3 border-2 bg-white/95 backdrop-blur-md shadow-2xl ${
          isBio
            ? 'border-amber-400 shadow-amber-900/20'
            : 'border-emerald-400 shadow-emerald-900/20'
        }`}
      >
        <WasteItemIcon iconType={flying.item.iconType} size={68} />
      </div>
    </div>
  );
};

export const FlyingWasteOverlay: React.FC<FlyingWasteOverlayProps> = ({
  flyingItems,
  onItemComplete,
}) => {
  if (flyingItems.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {flyingItems.map((flying) => (
        <FlyingItemElement
          key={flying.id}
          flying={flying}
          onComplete={onItemComplete}
        />
      ))}
    </div>
  );
};

