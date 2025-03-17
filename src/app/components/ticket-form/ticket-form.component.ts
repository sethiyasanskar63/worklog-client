import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../domain/ticket.model';

@Component({
  selector: 'app-ticket-form',
  imports: [CommonModule],
  templateUrl: './ticket-form.component.html',
  styleUrl: './ticket-form.component.scss'
})
export class TicketFormComponent {
  @Output() formDataSubmitted = new EventEmitter<Ticket>();

  onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const data: Ticket = {
        name: formData.get('name') as string,
        description: formData.get('description') as string
    };

    this.formDataSubmitted.emit(data);
    form.reset();
  }
}
