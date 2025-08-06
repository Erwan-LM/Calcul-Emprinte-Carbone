import { Component } from '@angular/core';

import { CarbonFootprint } from '../../../features/carbon-footprint/carbon-footprint';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CarbonFootprint],
  templateUrl: './summary.html',
  styleUrls: ['./summary.css']
})
export class Summary {}
