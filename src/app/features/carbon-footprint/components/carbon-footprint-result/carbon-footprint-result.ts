import { Component, OnInit } from '@angular/core';
import { CarbonFootprintComputeService } from '../../../../core/service/carbon-footprint-compute.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carbon-footprint-result',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carbon-footprint-result.html',
  styleUrls: ['./carbon-footprint-result.css']
})
export class CarbonFootprintResult implements OnInit {
  result = {
    distanceKm: 0,
    consommationPour100Km: 0,
    quantiteCO2Totale: 0
  };

  constructor(private carbonService: CarbonFootprintComputeService) {}

  async ngOnInit() {
    this.result = await this.carbonService.getResumeVoyages();
  }
}
