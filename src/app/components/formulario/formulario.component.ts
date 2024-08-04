import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { PublicService } from 'src/app/services/public.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})

export class FormularioComponent implements OnInit {
  tipo: string = 'Registro';
  rolUsuario: string | null = localStorage.getItem('rol');
  token: string | null = localStorage.getItem('mytoken');
  logado: boolean = (this.token) ? true : false;
  asignaturasArr: any[] = []; //array de todas la asignaturas
  asignaturasProfe: any[] = []; //array de las asignaturas que tiene el profesor
  checkboxList: any[] = []; // controles checkbox para cargar en el FromArray

  formulario!: FormGroup;
  constructor(
    private publicService: PublicService,
    private usuariosService: UsuariosService,
    private router: Router
  ) {
    //inicializamos formulario
    this.formulario = new FormGroup({
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
      asignaturas: new FormArray(this.checkboxList),
      rgpd: new FormControl("", [
        Validators.requiredTrue
      ])
    }, []);
  }

  async ngOnInit(): Promise<void> {

    if (this.logado) {
      this.tipo = "Actualizar";
      try {
        const usuario: any = await this.usuariosService.perfil();

        if (this.rolUsuario == 'profe') {
          this.asignaturasProfe = usuario.asignaturas.map((asignatura: any) => asignatura.asignatura_id);//obtenemos las asignaturas de ese profesor
          this.getAsignaturasFormulario();//obtenemos las asignaturas que tiene para el formulario
        }
        const fecha_nacimiento = usuario.fecha_nacimiento.slice(0, 10);//obtenemos los caracteres que necesitamos para la fecha

        //Inicializacmos el formulario con los datos del profesor
        this.formulario = new FormGroup({
          id: new FormControl(usuario.id, []),
          nombre: new FormControl(usuario.nombre, [
            Validators.required,
            Validators.minLength(3)
          ]),
          apellidos: new FormControl(usuario.apellidos, [
            Validators.required,
            Validators.minLength(3)
          ]),
          username: new FormControl(usuario.username, [
            Validators.required
          ]),
          email: new FormControl(usuario.email, [
            Validators.required,
            Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
          ]),
          telefono: new FormControl(usuario.telefono, [
            Validators.required,
            Validators.minLength(9)
          ]),
          direccion: new FormControl(usuario.direccion, [
            Validators.required
          ]),
          ciudad: new FormControl(usuario.ciudad, [
            Validators.required
          ]),
          latitud: new FormControl(usuario.latitud, []),
          longitud: new FormControl(usuario.longitud, []),
          imagen: new FormControl(usuario.imagen, []),
          fecha_nacimiento: new FormControl(fecha_nacimiento, [
            Validators.required
          ]),
          edad: new FormControl(usuario.edad, []),
          genero: new FormControl(usuario.genero, []),
          dni: new FormControl(usuario.dni, [
            this.dniValidator
          ]),
          rol: new FormControl(usuario.rol, []),
          experiencia: new FormControl(usuario.experiencia, []),
          precio: new FormControl(usuario.precio, []),
          asignaturas: new FormArray(this.checkboxList)
        }, []);

      } catch (error) {
        Swal.fire('Error', 'No existe el usuario.', 'error')
      }
    } else {
      this.getAsignaturasFormulario();

      //inicializamos formulario con asignaturas
      this.formulario = new FormGroup({
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
        asignaturas: new FormArray(this.checkboxList),
        rgpd: new FormControl("", [
          Validators.requiredTrue
        ])
      }, []);
    }
  }

  async getAsignaturasFormulario(): Promise<void> {
    this.checkboxList = [];
    try {
      //obtenermos array de todas las asignaturas
      this.asignaturasArr = await this.publicService.getAllAsignaturas();

      this.asignaturasArr.forEach((asignatura: any) => {

        const existe = this.asignaturasProfe.includes(asignatura.id);
        let checked = (this.asignaturasProfe.length > 0 && existe) ? true : false;//si hay array de asignaturas de profesor y la asignatura existe en ella pasamos true si no false
        this.checkboxList.push(
          new FormControl(checked)
        )
      })

    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'Error al conectar con la base de datos.', 'error')
    }
  }

  changeCheck(index: any): void {
    this.formulario.value.asignaturas[index] = !this.formulario.value.asignaturas[index];
  }

  async getData(): Promise<void> {
    try {
      const usuario: Usuario = this.formulario.value;
      const asignaturasNew: any = []

      //creamos el array de asignaturas con la ids de las asignatura seleccionadas
      this.asignaturasArr.forEach((asignatura, i) => {

        if (this.formulario.value.asignaturas[i]) {
          asignaturasNew.push(asignatura.id);
        }
      })
      usuario.asignaturas = asignaturasNew;

      //Si el usuario esta logado se actualizan los datos si no se registra al nuevo usuario
      const res = (this.logado) ?
        await this.usuariosService.updateUsuario(usuario) :
        await this.usuariosService.registro(usuario);

      if (res.id) {
        Swal.fire({
          title: this.tipo,
          text: "El usuario se ha creado/actualizado correctamente",
          icon: "success"
        });
        //si el usuario esta logado lo redireccionamos a su dashboard si no a login
        const routeSting = (this.logado) ? `dashboard/${this.rolUsuario}` : '/login'; //'dashboard/profe/perfil'

        this.router.navigate([routeSting]);
      }
    } catch (error) {
      Swal.fire('Error', 'Error al crear/actualizar usuario.', 'error')
    }

  }

  errorControl(pControlName: string, pError: string): boolean {
    if (this.formulario.get(pControlName)?.hasError(pError) && this.formulario.get(pControlName)?.touched) {
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
