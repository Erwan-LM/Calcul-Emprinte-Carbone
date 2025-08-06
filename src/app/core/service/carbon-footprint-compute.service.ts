import { Injectable } from '@angular/core';
import { Voyage } from '../models/voyage.model';


@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintComputeService {

  private voyages: Voyage[] = [
    { distanceKm: 100, consommationPour100Km: 5.5, quantiteCO2: 0 },
    { distanceKm: 200, consommationPour100Km: 6.5, quantiteCO2: 0 },
    { distanceKm: 300, consommationPour100Km: 7.5, quantiteCO2: 0 },
    { distanceKm: 400, consommationPour100Km: 8.5, quantiteCO2: 0 },
    { distanceKm: 500, consommationPour100Km: 9.5, quantiteCO2: 0 },
  ];

  constructor() {}

  async getVoyages(): Promise<Voyage[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.voyages), 3000);
    });
  }

  async addVoyage(voyage: Omit<Voyage, 'quantiteCO2'>): Promise<void> {
    return new Promise(resolve => {
      const type = voyage.typeVoyage || 'voiture';
      let quantiteCO2 = 0;

      switch (type) {
        case 'voiture':
          quantiteCO2 = (voyage.distanceKm * voyage.consommationPour100Km) / 100 * 2.3;
          break;
        case 'avion':
          quantiteCO2 = voyage.distanceKm * 0.03;
          break;
        case 'train':
          quantiteCO2 = voyage.distanceKm * 0.2;
          break;
      }

      const voyageComplet: Voyage = {
        ...voyage,
        typeVoyage: type,
        quantiteCO2
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

    this.voyages.forEach(voyage => {
      distanceKm += voyage.distanceKm;
      consommationPour100Km += voyage.consommationPour100Km;
      quantiteCO2Totale += voyage.quantiteCO2;
    });

    return {
      distanceKm,
      consommationPour100Km,
      quantiteCO2Totale
    };
  }
}
