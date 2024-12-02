import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private apiUrl = 'http://localhost:8000/api/prestamos';

  constructor(private http: HttpClient) { }

  getPrestamos(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.prestamos) // Extrae el array prestamos de la respuesta
    );
  }

  getPrestamo(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.prestamo) // Extrae el objeto prestamo de la respuesta
    );
  }

  createPrestamo(prestamo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, prestamo);
  }

  updatePrestamo(id: number, prestamo: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, prestamo);
  }

  deletePrestamo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}