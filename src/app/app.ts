import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from './shared/component/header/header';
import { Footer } from './shared/component/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, Header, Footer],
  templateUrl: './app.html'
})
export class App {}
