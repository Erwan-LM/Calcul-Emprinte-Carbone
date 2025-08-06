import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarbonFootprintComputeService } from '../carbon-footprint-compute.service';

@Component({
  selector: 'app-carbon-footprint-form',
  templateUrl: './carbon-footprint-form.component.html',
  styleUrls: ['./carbon-footprint-form.component.css']
})
export class CarbonFootprintFormComponent {
  form!: FormGroup;
  public distanceKm = 0;
  public consommationPour100Km = 0;
  public date = "";
  isVoiture = false;

  constructor(private carbonFootprintComputeService: CarbonFootprintComputeService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'distanceKm': new FormControl(null, [Validators.required, Validators.min(1)]),
      'consommationPour100Km': new FormControl(null), // Initialement, aucun validateur n'est attaché
      'date': new FormControl(null, Validators.required),
      'typeVoyage': new FormControl("voiture", Validators.required)
    });
  }

  onSelectType(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (value === 'voiture') {
      this.isVoiture = true;
      this.form.get('consommationPour100Km')?.setValidators([Validators.required, Validators.min(1)]);
      this.form.get('consommationPour100Km')?.updateValueAndValidity();
    } else {
      this.isVoiture = false;
      this.form.get('consommationPour100Km')?.clearValidators();
      this.form.get('consommationPour100Km')?.updateValueAndValidity();
    }
  }


  async addVoyage() {
    try {
      await this.carbonFootprintComputeService.addVoyage({
        distanceKm: this.form.value.distanceKm,
        consommationPour100Km: this.form.value.typeVoyage == 'voiture' ? this.form.value.consommationPour100Km : undefined,
        date: this.form.value.date,
        typeVoyage: this.form.value.typeVoyage
      });
    } catch (err) {
      console.error(err);
    }
  }
}
