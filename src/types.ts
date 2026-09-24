export type WasteCategory = 'biodegradavel' | 'reciclavel';

export interface WasteItem {
  id: string;
  name: string;
  category: WasteCategory;
  categoryLabel: string;
  material: string;
  decompositionTime: string;
  description: string;
  tip: string;
  sesiTip?: string;
  iconType: string;
  color: string;
  accentColor: string;
  // Natural initial scatter percentages (0-100 across screen width, and 5-65% across scroll zone)
  startX: number; // percentage (10% to 90%)
  startY: number; // percentage of scroll track (10% to 75%)
  rotation: number; // initial random rotation degrees
  scale: number;
  size: number; // base size in px
}

export interface BinState {
  biodegradavelCount: number;
  reciclavelCount: number;
  lastDroppedItem?: WasteItem;
}
