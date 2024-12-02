import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CarService } from '../car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule]
})
export class CarsComponent implements OnInit {
  cars: any[] = []; // Inicializa cars como un array vacío
  newCar: any = {}; // Inicializa newCar como un objeto vacío
  editingCarId: number | null = null; // Variable para almacenar el ID del coche que se está editando
  displayedColumns: string[] = ['id', 'name', 'model', 'brand', 'year', 'price', 'color', 'actions'];

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.carService.getCars().subscribe(data => {
      console.log(data); // Verifica la estructura de los datos
      this.cars = data; // Asigna el array cars a la propiedad cars
    }, error => {
      console.error('Error fetching car data:', error);
    });
  }

  createOrUpdateCar(): void {
    if (this.editingCarId) {
      this.carService.updateCar(this.editingCarId, this.newCar).subscribe(data => {
        this.loadCars(); // Recarga la lista de coches
        this.newCar = {}; // Resetea el formulario
        this.editingCarId = null; // Resetea el ID del coche que se está editando
      }, error => {
        console.error('Error updating car:', error);
      });
    } else {
      this.carService.createCar(this.newCar).subscribe(data => {
        this.loadCars(); // Recarga la lista de coches
        this.newCar = {}; // Resetea el formulario
      }, error => {
        console.error('Error creating car:', error);
      });
    }
  }

  editCar(car: any): void {
    this.newCar = { ...car }; // Copia los datos del coche al formulario
    this.editingCarId = car.id; // Establece el ID del coche que se está editando
  }

  deleteCar(id: number): void {
    this.carService.deleteCar(id).subscribe(() => {
      this.cars = this.cars.filter(car => car.id !== id); // Elimina el coche de la lista local
    }, error => {
      console.error('Error deleting car:', error);
    });
  }
}