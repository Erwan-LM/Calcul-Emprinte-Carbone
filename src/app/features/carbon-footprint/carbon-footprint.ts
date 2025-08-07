import { Component, OnInit, OnDestroy, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked } from '@angular/core';
import { CarbonFootprintComputeService } from '../../core/service/carbon-footprint-compute.service';
import { CommonModule } from '@angular/common';
import { CarbonFootprintForm } from './components/carbon-footprint-form/carbon-footprint-form';
import { CarbonFootprintResult } from './components/carbon-footprint-result/carbon-footprint-result';

@Component({
  selector: 'app-carbon-footprint',
  standalone: true,
  imports: [CommonModule, CarbonFootprintForm, CarbonFootprintResult],
  templateUrl: './carbon-footprint.html',
  styleUrls: ['./carbon-footprint.css']
})

export class CarbonFootprint implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked {
  distanceKm = 150;
  consommationPour100Km = 10;
  quantiteCO2Totale = 0;
  voyages: any[] = [];
  loadingVoyages = false;

  constructor(private carbonService: CarbonFootprintComputeService) {}

  ngOnInit() {
    this.loadData();
    this.calculerTotalEtMoyenne();
  }

  async loadData(): Promise<void> {
    this.loadingVoyages = true;
    try {
      this.voyages = await this.carbonService.getVoyages();
    } finally {
      this.loadingVoyages = false;
    }
  }

  ajouter100Km(): void {
    this.distanceKm += 100;
  }

  async genererVoyage(): Promise<void> {
    const types: ('voiture' | 'train' | 'avion')[] = ['voiture', 'train', 'avion'];
    const distance = Math.floor(Math.random() * 1000) + 1;
    const consommation = Math.floor(Math.random() * 10) + 1;
    const type = types[Math.floor(Math.random() * types.length)];
    const date = new Date().toISOString().split('T')[0];
  
    await this.carbonService.addVoyage({ distanceKm: distance, consommationPour100Km: consommation, type, date });
    this.voyages = await this.carbonService.getVoyages();
    await this.calculerTotalEtMoyenne();
  }  
  

  async calculerTotalEtMoyenne(): Promise<void> {
    const resume = await this.carbonService.getResumeVoyages();
    this.distanceKm = resume.distanceKm;
    this.consommationPour100Km = resume.consommationPour100Km;
    this.quantiteCO2Totale = resume.quantiteCO2Totale;
  }

  ngOnDestroy(): void {
    console.log('Le composant a été détruit.');
  }

  ngAfterContentInit(): void {
    console.log('Le contenu du composant a été initialisé.');
  }

  ngAfterContentChecked(): void {
    console.log('Le contenu du composant est vérifié.');
  }

  ngAfterViewInit(): void {
    console.log('La vue du composant a été initialisée.');
  }

  ngAfterViewChecked(): void {
    console.log('La vue du composant a été vérifiée.');
  }
}