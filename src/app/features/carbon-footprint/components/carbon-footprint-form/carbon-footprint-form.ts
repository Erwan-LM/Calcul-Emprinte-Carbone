import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CarbonFootprintComputeService } from '../../../../core/service/carbon-footprint-compute.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-carbon-footprint-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './carbon-footprint-form.html',
  styleUrls: ['./carbon-footprint-form.css']
})
export class CarbonFootprintForm implements OnInit {
  form!: FormGroup;
  isVoiture = true;

  constructor(
    private fb: FormBuilder,
    private carbonService: CarbonFootprintComputeService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      distanceKm: [null, [Validators.required, Validators.min(1)]],
      consommationPour100Km: [null],
      date: [null, Validators.required],
      typeVoyage: ['voiture', Validators.required]
    });

    this.form.get('typeVoyage')?.valueChanges.subscribe(value => {
      this.isVoiture = value === 'voiture';
      const consoCtrl = this.form.get('consommationPour100Km');
      if (this.isVoiture) {
        consoCtrl?.setValidators([Validators.required, Validators.min(1)]);
      } else {
        consoCtrl?.clearValidators();
      }
      consoCtrl?.updateValueAndValidity();
    });
  }

  async addVoyage(): Promise<void> {
    const voyage = {
      ...this.form.value,
      consommationPour100Km: this.isVoiture ? this.form.value.consommationPour100Km : undefined
    };

    try {
      await this.carbonService.addVoyage(voyage);
      this.form.reset({ typeVoyage: 'voiture' });
    } catch (err) {
      console.error(err);
    }
  }
}