import { Component, Input } from '@angular/core';
import { Public } from 'src/app/interfaces/public.interface';
//import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-profesor-list',
  templateUrl: './profesor-list.component.html',
  styleUrls: ['./profesor-list.component.css']
})
export class ProfesorListComponent {
  @Input() profesores: Public | any;
}

