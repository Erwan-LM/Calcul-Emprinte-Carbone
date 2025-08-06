import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarbonFootprintComponent } from './carbon-footprint/carbon-footprint.component';
import { CarbonFootprintResultComponent } from './carbon-footprint-result/carbon-footprint-result.component';
import { CarbonFootprintFormComponent } from './carbon-footprint-form/carbon-footprint-form.component';
import { CarbonFootprintComputeService } from './carbon-footprint-compute.service';
import { AppRoutingModule } from './app-routing.module';
import { SummaryComponent } from './summary/summary.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CarbonFootprintComponent,
    CarbonFootprintResultComponent,
    CarbonFootprintFormComponent,
    SummaryComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CarbonFootprintComputeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
