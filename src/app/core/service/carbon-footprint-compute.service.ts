import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarbonFootprintComputeService {

  private voyages = [
    { distanceKm: 100, consommationPour100Km: 5.5, quantiteCO2: 0 },
    { distanceKm: 200, consommationPour100Km: 6.5, quantiteCO2: 0 },
    { distanceKm: 300, consommationPour100Km: 7.5, quantiteCO2: 0 },
    { distanceKm: 400, consommationPour100Km: 8.5, quantiteCO2: 0 },
    { distanceKm: 500, consommationPour100Km: 9.5, quantiteCO2: 0 },
  ];

  constructor() { }

  async getVoyages(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.voyages);
      }, 3000);
    });
  }

  async addVoyage(voyage: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!voyage.typeVoyage) {
        voyage.typeVoyage = 'voiture';
      }
      if (voyage.typeVoyage === 'voiture') {
        voyage.quantiteCO2 = (voyage.distanceKm * voyage.consommationPour100Km) / 100 * 2.3;
      } else if (voyage.typeVoyage === 'avion') {
        voyage.quantiteCO2 = voyage.distanceKm * 0.03;
      } else if (voyage.typeVoyage === 'train') {
        voyage.quantiteCO2 = voyage.distanceKm * 0.2;
      }

      console.log(voyage);
      this.voyages.push(voyage);
      resolve();
    });
  }

  getResumeVoyages(): Promise<any> {
    return new Promise((resolve, reject) => {
      let distanceKm = 0;
      let consommationPour100Km = 0;
      let quantiteCO2Totale = 0;
      this.voyages.forEach(voyage => {
        distanceKm += voyage.distanceKm;
        consommationPour100Km += voyage.consommationPour100Km;
        quantiteCO2Totale += voyage.quantiteCO2;
      });
      resolve({ distanceKm, consommationPour100Km, quantiteCO2Totale });
    });
  }
  
}
