import { Component, Input, OnInit } from '@angular/core';
import { Public } from 'src/app/interfaces/public.interface';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-profesor-list',
  templateUrl: './profesor-list.component.html',
  styleUrls: ['./profesor-list.component.css']
})
export class ProfesorListComponent {
  profesores: Public[] = [];
  listadoProfesores: Public[] = [];

  constructor(private publicService: PublicService) { }

  async ngOnInit(): Promise<void> {
    try {
      let response = await this.publicService.getAll();
      this.profesores = response;
      this.listadoProfesores = this.profesores;
    } catch (error: any) {
      console.log(error);
    }
  }

  searchProfesores($event: any): void {
    let busquedaProfesores = this.profesores;
    if ($event.ciudad) {
      let result = busquedaProfesores.filter((profesor: Public) => profesor.ciudad === $event.ciudad);
      busquedaProfesores = result;
    }

    if ($event.asignatura) {
      let result: Public[] = [];
      busquedaProfesores.forEach((profesor: Public) => {
        let existe = profesor.asignaturas.find((asignatura: any) => asignatura.asignatura_id
          == $event.asignatura);
        if (existe) {
          result.push(profesor);
        }
      })
      busquedaProfesores = result;
    }
    this.listadoProfesores = busquedaProfesores;
  }
}

