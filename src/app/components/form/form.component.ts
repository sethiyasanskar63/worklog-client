import { Component, Output, EventEmitter, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TimeCard } from '../../domain/time-card.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Ticket } from '../../domain/ticket.model';

@Component({
  selector: 'app-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  standalone: true
})
export class FormComponent implements OnInit, OnChanges {
  @Output() formDataSubmitted = new EventEmitter<TimeCard>();
  @Input() tickets: Ticket[] | { content: Ticket[] } = [];

  ticketIdControl = new FormControl('');
  dateControl = new FormControl('');
  timeSpentControl = new FormControl('');
  timeForm: FormGroup;

  // Remove hardcoded values
  ticketOptions: string[] = [];
  filteredTicketOptions?: Observable<string[]>;
  today: string;

  constructor(private fb: FormBuilder) {
    // Initialize ticketForm in the constructor
    this.timeForm = this.fb.group({
      ticketId: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      timeSpent: new FormControl('', [Validators.required]),
    });
    this.today = new Date().toISOString();
  }

  ngOnInit() {
    this.setupFilteredOptions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tickets']) {
      // Update ticket options when tickets input changes
      this.updateTicketOptions();
      // Re-initialize filtered options if already set up
      if (this.filteredTicketOptions) {
        this.setupFilteredOptions();
      }
    }
  }

  private updateTicketOptions() {
    if (Array.isArray(this.tickets)) {
      this.ticketOptions = this.tickets
        .filter(ticket => ticket.ticketId !== undefined)
        .map(ticket => `${ticket.ticketId} - ${ticket.name || 'Unnamed'}`);
    } else if (this.tickets && Array.isArray(this.tickets.content)) {
      this.ticketOptions = this.tickets.content
        .filter(ticket => ticket.ticketId !== undefined)
        .map(ticket => `${ticket.ticketId} - ${ticket.name || 'Unnamed'}`);
    } else {
      this.ticketOptions = [];
    }
  }

  private setupFilteredOptions() {
    this.filteredTicketOptions = this.ticketIdControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterTickets(value || ''))
    );
  }

  private _filterTickets(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.ticketOptions.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const selectedTicket = this.tickets instanceof Array
      ? this.tickets.find(ticket => `${ticket.ticketId} - ${ticket.name || 'Unnamed'}` === this.ticketIdControl.value)
      : this.tickets?.content?.find(ticket => `${ticket.ticketId} - ${ticket.name || 'Unnamed'}` === this.ticketIdControl.value);

    const data: TimeCard = {
      date: new Date(this.dateControl.value || ''),
      timeSpent: Number(this.timeSpentControl.value),
      ticket: selectedTicket || undefined
    };

    this.formDataSubmitted.emit(data);
    this.ticketIdControl.reset();
    this.dateControl.reset();
    this.timeSpentControl.reset();
  }
}
