import { Component, Input } from '@angular/core';
import { Profesor } from 'src/app/interfaces/profesor.interface';
import { AdministradoresService } from 'src/app/services/administradores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.css']
})
export class DashboardListComponent {
  @Input() listadoUsuarios: Profesor[] | any;
  rolUsuario = localStorage.getItem('rol');
  urlPerfil = `/dashboard/${this.rolUsuario}`;

  constructor(private administradoresService: AdministradoresService) { }

  /* ngOnChanges() {
    console.log(this.listadoUsuarios);
  }*/

  async validarProfesor(idUsuario: number, valid: boolean) {
    try {
      const response = await this.administradoresService.updateValidacion(idUsuario, !valid);

      // buscamos en que lugar del array esta el usuario a validar y cambiamos la validación por el nuevo valor recibido
      const indexUsuario = this.listadoUsuarios.findIndex((usuario: Profesor) => usuario.id === idUsuario);
      this.listadoUsuarios[indexUsuario].validado = response.validado;

    } catch (error) {
      console.log(error);
    }
  }

  async borrarUsuario(idUsuario: number, borrado: boolean) {

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
            // buscamos en que lugar del array esta el usuario a borrar y cambiamos el borrado por el valor que teniamos a negativo
            const indexUsuario = this.listadoUsuarios.findIndex((usuario: Profesor) => usuario.id === idUsuario);
            this.listadoUsuarios[indexUsuario].borrado = !borrado;
          }
        } catch (error) {
          console.log(error);
          Swal.fire('Error', 'Error al conectar con la base de datos', 'error')
        }
      }
    });

  }
}
