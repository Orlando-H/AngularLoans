import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PrestamoService } from '../prestamo.service';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule]
})
export class PrestamosComponent implements OnInit {
  prestamos: any[] = []; // Inicializa prestamos como un array vacío
  newPrestamo: any = {}; // Inicializa newPrestamo como un objeto vacío
  editingPrestamoId: number | null = null; // Variable para almacenar el ID del préstamo que se está editando
  displayedColumns: string[] = ['id', 'nombreCliente', 'tarifa', 'car_id', 'actions'];

  constructor(private prestamoService: PrestamoService) { }

  ngOnInit(): void {
    this.loadPrestamos();
  }

  loadPrestamos(): void {
    this.prestamoService.getPrestamos().subscribe(data => {
      console.log(data); // Verifica la estructura de los datos
      this.prestamos = data; // Asigna el array prestamos a la propiedad prestamos
    }, error => {
      console.error('Error fetching prestamo data:', error);
    });
  }

  createOrUpdatePrestamo(): void {
    if (this.editingPrestamoId) {
      this.prestamoService.updatePrestamo(this.editingPrestamoId, this.newPrestamo).subscribe(data => {
        this.loadPrestamos(); // Recarga la lista de préstamos
        this.newPrestamo = {}; // Resetea el formulario
        this.editingPrestamoId = null; // Resetea el ID del préstamo que se está editando
      }, error => {
        console.error('Error updating prestamo:', error);
      });
    } else {
      this.prestamoService.createPrestamo(this.newPrestamo).subscribe(data => {
        this.loadPrestamos(); // Recarga la lista de préstamos
        this.newPrestamo = {}; // Resetea el formulario
      }, error => {
        console.error('Error creating prestamo:', error);
      });
    }
  }

  editPrestamo(prestamo: any): void {
    this.newPrestamo = { ...prestamo }; // Copia los datos del préstamo al formulario
    this.editingPrestamoId = prestamo.id; // Establece el ID del préstamo que se está editando
  }

  deletePrestamo(id: number): void {
    this.prestamoService.deletePrestamo(id).subscribe(() => {
      this.prestamos = this.prestamos.filter(prestamo => prestamo.id !== id); // Elimina el préstamo de la lista local
    }, error => {
      console.error('Error deleting prestamo:', error);
    });
  }
}