import { Routes } from '@angular/router';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { CarsComponent } from './cars/cars.component';

export const routes: Routes = [
  { path: '', redirectTo: '/prestamos', pathMatch: 'full' },
  { path: 'prestamos', component: PrestamosComponent },
  { path: 'cars', component: CarsComponent },
  // otras rutas
];