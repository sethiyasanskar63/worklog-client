import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../domain/ticket.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  ticketForm: FormGroup;
  formVisible = true;

  constructor(private fb: FormBuilder) {
    // Initialize ticketForm in the constructor
    this.ticketForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const data: Ticket = {
      name: this.ticketForm.get('name')?.value || '',
      description: this.ticketForm.get('description')?.value || ''
    };

    this.formDataSubmitted.emit(data);
    // Reset form values
    this.formVisible = false;

    setTimeout(() => {
      // Reset form values
      this.ticketForm.reset({
        name: '',
        description: ''
      });

      // Reset control states
      Object.keys(this.ticketForm.controls).forEach(controlName => {
        const control = this.ticketForm.get(controlName);
        control?.markAsPristine();
        control?.markAsUntouched();
        control?.updateValueAndValidity();
      });

      // Re-show form
      this.formVisible = true;
    });
  }
}
