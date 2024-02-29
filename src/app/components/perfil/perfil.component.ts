import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AdministradoresService } from 'src/app/services/administradores.service';
import { Profesor } from 'src/app/interfaces/profesor.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: Profesor | Usuario | any = [];
  rolUsuario = localStorage.getItem('rol');

  constructor(
    private activatedRoute: ActivatedRoute,
    private administradoresService: AdministradoresService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {

      try {
        const response = await this.administradoresService.getById(params.idusuario);
        this.usuario = response;

      } catch (error) {
        console.log(error)
        Swal.fire('Error', 'Error al conectar con la base de datos', 'error')
      }

    });
  }

  async validarProfesor(idUsuario: number, valid: boolean): Promise<void> {
    try {
      const response = await this.administradoresService.updateValidacion(idUsuario, !valid);
      //cambiamos en valor de vanidado por el nuevo
      this.usuario.validado = response.validado;

    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'Error al conectar con la base de datos', 'error')
    }
  }

  borrarUsuario(idUsuario: number, borrado: boolean): void {
    Swal.fire({
      title: "Quieres borrar el usuario",
      text: "No se puede desahacer!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar"
    }).then(async (result) => {

      if (result.isConfirmed) {
        try {
          const response = await this.administradoresService.deleteUser(idUsuario);

          if (response.id) {
            Swal.fire({
              title: "Borrado!",
              text: "El usuario ha sido borrado.",
              icon: "success"
            });
            this.router.navigate([`/dashboard/${this.rolUsuario}`]);
          }
        } catch (error) {
          console.log(error);
          Swal.fire('Error', 'Error al conectar con la base de datos', 'error')
        }
      }
    });

  }
}
