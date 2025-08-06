export interface Voyage {
    distanceKm: number;
    consommationPour100Km: number;
    quantiteCO2: number;
    typeVoyage?: 'voiture' | 'avion' | 'train';
  }