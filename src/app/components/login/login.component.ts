import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) { }

  async getLogin(pLoginForm: any) {
    const dataUser = pLoginForm.value;
    try {
      const response = await this.usuariosService.login(dataUser);

      if (response.token) {
        localStorage.setItem('mytoken', response.token);
        const rol = this.getRolDeToken(response.token);
        localStorage.setItem('rol', rol);
        this.router.navigate([`/dashboard/${rol}`])
      } else {
        Swal.fire({
          title: "Error",
          text: "Error de usuario y/o contraseña",
          icon: "error",
          showConfirmButton: false,
          timer: 2000
        });
      }

    } catch (error) {
      console.log(error);
    }
  }
  getRolDeToken(token: string): string {
    const decodeToken = jwtDecode<any>(token);
    return decodeToken.usuario_rol;
  }
}
