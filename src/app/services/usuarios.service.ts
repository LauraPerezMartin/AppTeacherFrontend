import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private baseUrl = 'https://appteacherbackend.onrender.com/api/users/';
  constructor(private httpClient: HttpClient) { }

  login(dataUser: any): Promise<any> {
    return lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}login`, dataUser, this.getHeaders()));
  }

  registro(usuario: Usuario): Promise<Usuario> {
    return lastValueFrom(this.httpClient.post<Usuario>(`${this.baseUrl}registro`, usuario, this.getHeaders()));
  }

  perfil(): Promise<Usuario> {
    return lastValueFrom(this.httpClient.get<Usuario>(`${this.baseUrl}perfil`, this.getHeaders()));
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
