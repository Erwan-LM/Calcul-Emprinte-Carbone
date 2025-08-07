import { Injectable } from '@angular/core';
import { Voyage } from '../models/voyage.model';

@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintComputeService {

  private voyages: Voyage[] = [
    { type: 'voiture', date: '2025-08-01', distanceKm: 25, consommationPour100Km: 6.2, quantiteCO2: 3.71 },
    { type: 'voiture', date: '2025-08-02', distanceKm: 140, consommationPour100Km: 5.4, quantiteCO2: 16.8 },
    { type: 'train', date: '2025-08-03', distanceKm: 300, consommationPour100Km: 0, quantiteCO2: 4.5 },
    { type: 'avion', date: '2025-08-04', distanceKm: 1000, consommationPour100Km: 0, quantiteCO2: 250 },
  ];
  
  constructor() {}

  async getVoyages(): Promise<Voyage[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.voyages), 3000);
    });
  }

  async addVoyage(voyage: Omit<Voyage, 'quantiteCO2'>): Promise<void> {
    return new Promise(resolve => {
      const type = voyage.type || 'voiture';
  
      let quantiteCO2 = 0;
      switch (type) {
        case 'voiture':
          if (voyage.consommationPour100Km != null) {
            quantiteCO2 = (voyage.distanceKm * voyage.consommationPour100Km / 100) * 2.31; // 2.31 kg CO2 par litre d'essence
          }
          break;
        case 'avion':
          quantiteCO2 = voyage.distanceKm * 0.25; 
          break;
        case 'train':
          quantiteCO2 = voyage.distanceKm * 0.015; 
          break;
      }
  
      const voyageComplet: Voyage = {
        ...voyage,
        type,
        quantiteCO2,
        consommationPour100Km: type === 'voiture' ? voyage.consommationPour100Km : 0
      };
  
      this.voyages.push(voyageComplet);
      resolve();
    });
  }

  async getResumeVoyages(): Promise<{
    distanceKm: number;
    consommationPour100Km: number;
    quantiteCO2Totale: number;
  }> {
    let distanceKm = 0;
    let consommationPour100Km = 0;
    let quantiteCO2Totale = 0;
    let nombreVoyagesVoiture = 0;

    this.voyages.forEach(voyage => {
      distanceKm += voyage.distanceKm;
      if (voyage.type === 'voiture' && voyage.consommationPour100Km != null) {
        consommationPour100Km += voyage.consommationPour100Km;
        nombreVoyagesVoiture++;
      }
      quantiteCO2Totale += voyage.quantiteCO2;
    });

    const consommationMoyenne = nombreVoyagesVoiture > 0 ? consommationPour100Km / nombreVoyagesVoiture : 0;

    return {
      distanceKm,
      consommationPour100Km: consommationMoyenne,
      quantiteCO2Totale
    };
  }
}