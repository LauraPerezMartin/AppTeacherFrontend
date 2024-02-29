import { Component, OnInit } from '@angular/core';
import { Profesor } from 'src/app/interfaces/profesor.interface';
import { AdministradoresService } from 'src/app/services/administradores.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  profesores: Profesor[] = [];
  constructor(private administradoresService: AdministradoresService) {
  }

  async ngOnInit() {
    try {
      const response = await this.administradoresService.getAll();
      this.profesores = response;
    } catch (error: any) {
      console.log(error);
    }
  }

}
