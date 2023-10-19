import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  private baseUrl: string = 'https://appteacherbackend.onrender.com/api/public/';
  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(this.baseUrl));
  }

  getAsignaturas(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}/asignaturas`));
  }
}
