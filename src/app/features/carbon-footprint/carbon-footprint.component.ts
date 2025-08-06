import { Component } from '@angular/core';
import { CarbonFootprintComputeService } from '../carbon-footprint-compute.service';

@Component({
  selector: 'app-carbon-footprint',
  templateUrl: './carbon-footprint.component.html',
  styleUrls: ['./carbon-footprint.component.css']
})
export class CarbonFootprintComponent {
  distanceKm: number = 150;
  consommationPour100Km: number = 10;
  quantiteCO2Totale: number = 0;
  voyages: any[] = [];
  loadingVoyages = false;

  constructor(private carbonFootprintComputeService: CarbonFootprintComputeService) {
    this.calculerTotalEtMoyenne();
  }

  ajouter100Km() {
    this.distanceKm += 100;
  }

  async genererVoyage() {
    const distance = Math.floor(Math.random() * 1000) + 1;
    const consommation = Math.floor(Math.random() * 10) + 1;
    await this.carbonFootprintComputeService.addVoyage({ distanceKm: distance, consommationPour100Km: consommation });
    this.voyages = await this.carbonFootprintComputeService.getVoyages();
    await this.calculerTotalEtMoyenne();
  }

  async calculerTotalEtMoyenne() {
    let resume = await this.carbonFootprintComputeService.getResumeVoyages();
    this.distanceKm = resume.distanceKm;
    this.consommationPour100Km = resume.consommationPour100Km;
    this.quantiteCO2Totale = resume.quantiteCO2Totale;
  }
  
  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.loadingVoyages = true;
    try {
      this.voyages = await this.carbonFootprintComputeService.getVoyages();
    } catch(err) {
      console.error(err);
    } finally {
      this.loadingVoyages = false;
    }
  }

  ngOnDestroy() {
    console.log('Le composant a été détruit.');
  }

  ngAfterContentInit() {
    console.log('Le contenu du composant a été initialisé.');
  }

  ngAfterContentChecked() {
    console.log('Le contenu du composant est vérifié.');
  }

  ngAfterViewInit() {
    console.log('La vue du composant a été initialisée.');
  }

  ngAfterViewChecked() {
    console.log('La vue du composant a été vérifiée.');
  }
}
