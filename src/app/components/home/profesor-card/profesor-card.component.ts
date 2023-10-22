import { Component, Input } from '@angular/core';
import { Public } from 'src/app/interfaces/public.interface';

@Component({
  selector: 'app-profesor-card',
  templateUrl: './profesor-card.component.html',
  styleUrls: ['./profesor-card.component.css']
})
export class ProfesorCardComponent {
  @Input() profesor: Public | any;
}
