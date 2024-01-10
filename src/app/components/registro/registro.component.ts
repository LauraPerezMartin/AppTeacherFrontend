import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;
  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
  ) {
    this.registroForm = new FormGroup({
      nombre: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      apellidos: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      username: new FormControl("", [
        Validators.required
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(10)
      ]),
      telefono: new FormControl("", [
        Validators.required,
        Validators.minLength(9)
      ]),
      direccion: new FormControl("", [
        Validators.required
      ]),
      ciudad: new FormControl("", [
        Validators.required
      ]),
      imagen: new FormControl("", []),
      fecha_nacimiento: new FormControl("", [
        Validators.required
      ]),
      genero: new FormControl("", []),
      dni: new FormControl("", [
        this.dniValidator
      ]),
      rol: new FormControl("", [
        Validators.required
      ]),
      experiencia: new FormControl("", []),
      precio: new FormControl("", []),
      rgpd: new FormControl("", [
        Validators.requiredTrue
      ])
    }, []);
  }

  async getRegistro() {
    try {
      let usuario: Usuario = this.registroForm.value;
      console
      let res = await this.usuariosService.registro(usuario);
      if (res.id) {
        Swal.fire({
          title: "Registro",
          text: "El usuario se ha creado correctamente",
          icon: "success"
        });
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.log(error);
    }

  }

  errorControl(pControlName: string, pError: string): boolean {
    if (this.registroForm.get(pControlName)?.hasError(pError) && this.registroForm.get(pControlName)?.touched) {
      return true;
    }
    return false;
  }

  dniValidator(pControlDni: AbstractControl): any {
    const dni = pControlDni.value;
    const letrasDni: string[] = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];
    const regExDni = /^\d{8}[A-Z]/;
    if (regExDni.test(dni)) {
      const numeroDni: number = parseInt(dni.substring(0, dni.length - 1));
      const letraDni: string = dni.at(-1);
      const position: number = numeroDni % 23;
      return (letraDni !== letrasDni[position]) ? { dnivalidator: 'No es un DNI válido, la letra tiene que estar en mayusculas' } : null;
    }
    return { dnivalidator: 'No es un DNI válido' };

  }
}
