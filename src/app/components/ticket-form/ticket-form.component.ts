import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../domain/ticket.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-ticket-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './ticket-form.component.html',
  styleUrl: './ticket-form.component.scss'
})
export class TicketFormComponent {
  @Output() formDataSubmitted = new EventEmitter<Ticket>();

  nameControl = new FormControl('');
  descriptionControl = new FormControl('');

  onSubmit(event: Event) {
    event.preventDefault();
    
    const data: Ticket = {
      name: this.nameControl.value || '',
      description: this.descriptionControl.value || ''
    };

    this.formDataSubmitted.emit(data);
    this.nameControl.reset();
    this.descriptionControl.reset();
  }
}
