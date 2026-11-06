export interface SpecItem {
  label: string;
  value: string;
  note?: string;
  category: 'engine' | 'electrical' | 'chassis' | 'fluids';
  highlight?: boolean;
}

export interface ExplodedSection {
  id: string;
  nameZh: string;
  nameEn: string;
  earlyUrl: string;
  lateUrl: string;
  description: string;
  keyParts: string[];
  iconName: string;
}

export interface WireCircuit {
  id: string;
  colorName: string;
  colorHex: string;
  italianName: string;
  function: string;
  destination: string;
  voltage: string;
  currentType: string;
}

export interface BearingSealItem {
  position: string;
  spec: string;
  description: string;
  oemReference?: string;
}

export interface MaintenanceTask {
  id: string;
  title: string;
  interval: string;
  description: string;
  category: 'routine' | 'tuning' | 'chassis';
}

