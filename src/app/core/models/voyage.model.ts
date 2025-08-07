export interface Voyage {
  type: 'voiture' | 'train' | 'avion';
  distanceKm: number;
  consommationPour100Km?: number | undefined;
  quantiteCO2: number;
  date: string;
  typeCarburant?: 'essence' | 'diesel' | 'electricite';
}