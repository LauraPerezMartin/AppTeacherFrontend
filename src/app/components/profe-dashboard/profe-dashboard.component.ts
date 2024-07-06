import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profe-dashboard',
  templateUrl: './profe-dashboard.component.html',
  styleUrls: ['./profe-dashboard.component.css']
})
export class ProfeDashboardComponent implements OnInit {
  profesor: Usuario | any = [];

  constructor(private usuarioService: UsuariosService) { }

  async ngOnInit(): Promise<void> {
    try {
      const result = await this.usuarioService.perfil();
    } catch (error) {
      Swal.fire('Error', 'Error al conectar con la base de datos', 'error')
    }
  }
}
