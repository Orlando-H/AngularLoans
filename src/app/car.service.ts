import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:8000/api/cars';

  constructor(private http: HttpClient) { }

  getCars(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.cars) 
    );
  }

  getCar(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.car) 
    );
  }

  createCar(car: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, car);
  }

  updateCar(id: number, car: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, car);
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}