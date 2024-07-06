import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profesor } from 'src/app/interfaces/profesor.interface';
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
  asignaturasArr: any[] = [];
  asignaturasProfe: any[] = [];
  checkboxList: any[] = [];
  //jsonString: string = '';


  formulario!: FormGroup;
  constructor(
    private publicService: PublicService,
    private usuariosService: UsuariosService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
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
      asignaturas: this.formBuilder.group(this.checkboxList),
      /*asignaturas: new FormControl("", []),*/
      rgpd: new FormControl("", [
        Validators.requiredTrue
      ])
    }, []);
  }

  async ngOnInit(): Promise<void> {
    this.getAsignaturasFormulario();

    if (this.logado) {
      this.tipo = "Actualizar";
      try {
        const usuario: any = await this.usuariosService.perfil();
        // console.log(usuario);

        if (this.rolUsuario == 'profe') {
          this.asignaturasProfe = usuario.asignaturas.map((asignatura: any) => asignatura.asignatura_id);//obtenemos las asignaturas de ese profesor
          //this.getAsignaturasFormulario();//obtenemos el json con las asignaturas de ese profesor
        }

        const fecha_nacimiento = usuario.fecha_nacimiento.slice(0, 10);//obtenemos los caracteres que necesitamos para la fecha

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
          imagen: new FormControl(usuario.imagen, []),
          fecha_nacimiento: new FormControl(fecha_nacimiento, [
            Validators.required
          ]),
          genero: new FormControl(usuario.genero, []),
          dni: new FormControl(usuario.dni, [
            this.dniValidator
          ]),
          rol: new FormControl(usuario.rol, [
            Validators.required
          ]),
          experiencia: new FormControl(usuario.experiencia, []),
          precio: new FormControl(usuario.precio, []),
          asignaturas: this.formBuilder.group(this.checkboxList)/*,
          asignaturas: this.formBuilder.array([JSON.parse(this.jsonString)]),
          asignaturas: new FormArray(this.checkboxList)*/
        }, []);
        console.log(this.formulario.controls)

      } catch (error) {
        Swal.fire('Error', 'No existe el usuario.', 'error')
      }
    } else {
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
        /*asignaturas: new FormArray([this.checkboxList]),*/
        asignaturas: new FormControl("", []),
        rgpd: new FormControl("", [
          Validators.requiredTrue
        ])
      }, []);
    }
  }

  async getAsignaturasFormulario(): Promise<void> {
    try {
      //no hace falta inicializar los camos ya que se hace en el html
      //let jsonAsignaturas: string = '';
      this.asignaturasArr = await this.publicService.getAllAsignaturas();

      this.asignaturasArr.forEach((asignatura: any) => {
        this.checkboxList.push(
          this.formBuilder.control(false, { initialValueIsDefault: false })
        )
        /*const asignaturaArr = [asignatura.id, ''];
        this.checkboxList.push(asignaturaArr);*/
      })
      console.log(this.checkboxList);
      /*
      //obtenemos un json en formato string de las asignaturas para añadir al formulario
      this.asignaturas.forEach((asignatura: any, index) => {
        //const valor = (this.asignaturasProfe.includes(asignatura.id)) ? `"true"` : `"false"`;
        //this.jsonString += `"${asignatura.id}":"",`;
        this.jsonString += `"${asignatura.id}":"",`
        if (index === this.asignaturas.length - 1) {
          this.jsonString = `{${this.jsonString.slice(0, this.jsonString.length - 1)}}`;
        }
      });
      //this.jsonString = jsonAsignaturas;
      console.log('jsonstring: ' + this.jsonString);*/

    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'Error al conectar con la base de datos.', 'error')
    }
  }

  async getData() {
    try {
      const usuario: Usuario = this.formulario.value;
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
        console.log(usuario);
        //this.router.navigate(['/login']);
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
