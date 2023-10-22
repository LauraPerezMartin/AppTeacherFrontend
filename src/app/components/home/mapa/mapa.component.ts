import { Component, Input } from '@angular/core';
import { Public } from 'src/app/interfaces/public.interface';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent {
  @Input() profesores: Public | any;
}
