import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Profesor } from '../interfaces/profesor.interface';

@Injectable({
  providedIn: 'root'
})
export class AdministradoresService {
  private baseUrl: string = 'https://appteacherbackend.onrender.com/api/admin/'

  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<any> {
    return lastValueFrom(this.httpClient.get<Profesor>(this.baseUrl, this.getHeaders()));
  }

  getById(idUser: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<Profesor>(`${this.baseUrl}/profesor/${idUser}`, this.getHeaders()));
  }

  updateValidacion(idUser: number, valid: boolean): Promise<any> {
    const value = { validacion: valid };//Creo el objeto que tengo que enviar en la petición
    return lastValueFrom(this.httpClient.patch<Profesor>(`${this.baseUrl}valid/${idUser}`, value, this.getHeaders()));
  }

  deleteUser(idUser: number): Promise<any> {
    return lastValueFrom(this.httpClient.delete<any>(this.baseUrl + idUser, this.getHeaders()));
  }

  getHeaders() {
    let token = localStorage.getItem('mytoken');
    if (token) {
      return {
        headers: new HttpHeaders({
          "Content-type": "application/json",
          "Authorization": token
        })
      }
    } else {
      return {
        headers: new HttpHeaders({
          "Content-type": "application/json",
        })
      }
    }
  }

}
