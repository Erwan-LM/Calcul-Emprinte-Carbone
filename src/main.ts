import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app-routing';
import { importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarbonFootprintComputeService } from './app/core/service/carbon-footprint-compute.service';
import { provideHttpClient } from '@angular/common/http';


bootstrapApplication(App, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    importProvidersFrom(
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule
    ),
    CarbonFootprintComputeService
  ]
}).catch(err => console.error(err));
