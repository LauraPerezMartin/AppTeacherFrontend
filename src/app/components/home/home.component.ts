import { Component, OnInit } from '@angular/core';
import { Public } from 'src/app/interfaces/public.interface';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profesoresPublic: Public[] = [];//en esta variable guardo el array completo de la bd
  listadoProfesores: Public[] = [];//listado a pasar al resto de componentes por si hay busquedas

  constructor(private publicService: PublicService) { }

  async ngOnInit(): Promise<void> {
    try {
      let response = await this.publicService.getAll();
      this.profesoresPublic = response;
      this.listadoProfesores = this.profesoresPublic; //paso el array completo por si no hay busquedas
    } catch (error: any) {
      console.log(error);
    }
  }

  searchProfesores($event: any): void {
    let busquedaProfesores = this.profesoresPublic;

    //Busquedas por ciudad
    if ($event.ciudad) {
      let result = busquedaProfesores.filter((profesor: Public) => profesor.ciudad === $event.ciudad);
      busquedaProfesores = result;
    }

    //busquedas por asignatura
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
