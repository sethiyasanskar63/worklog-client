import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeCard } from '../../domain/time-card.model';

@Component({
  selector: 'app-time-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-card.component.html',
  styleUrl: './time-card.component.scss'
})
export class DisplayComponent {
  @Input() data?: TimeCard;
}
