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

  selectFocused = false;
  distanceFocused = false;
  consommationFocused = false;
  dateFocused = false;

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
        consoCtrl?.setValue(null); 
      }
      consoCtrl?.updateValueAndValidity();
    });

    this.updateInitialStates();
  }

  private updateInitialStates(): void {
  }

  onFocusChange(fieldName: string, isFocused: boolean): void {
    switch(fieldName) {
      case 'typeVoyage':
        this.selectFocused = isFocused;
        break;
      case 'distanceKm':
        this.distanceFocused = isFocused;
        break;
      case 'consommationPour100Km':
        this.consommationFocused = isFocused;
        break;
      case 'date':
        this.dateFocused = isFocused;
        break;
    }
  }

  hasValue(fieldName: string): boolean {
    const value = this.form.get(fieldName)?.value;
    return value !== null && value !== undefined && value !== '';
  }

  async addVoyage(): Promise<void> {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }

    const voyage = {
      distanceKm: this.form.value.distanceKm,
      date: this.form.value.date,
      type: this.form.value.typeVoyage,
      consommationPour100Km: this.isVoiture ? this.form.value.consommationPour100Km : undefined
    };
    
    try {
      await this.carbonService.addVoyage(voyage);
      
      this.form.reset({ typeVoyage: 'voiture' });
      this.isVoiture = true;
      
      this.resetFocusStates();
      
      console.log('Voyage ajouté avec succès');
    } catch (err) {
      console.error('Erreur lors de l\'ajout du voyage:', err);
    }
  }

  private resetFocusStates(): void {
    this.selectFocused = false;
    this.distanceFocused = false;
    this.consommationFocused = false;
    this.dateFocused = false;
  }

  get isFormValid(): boolean {
    return this.form.valid;
  }

  getFieldError(fieldName: string): string | null {
    const field = this.form.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName} est requis`;
      }
      if (field.errors['min']) {
        return `Valeur minimale : ${field.errors['min'].min}`;
      }
    }
    return null;
  }
}