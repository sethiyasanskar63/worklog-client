import { Component, Output, EventEmitter, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TimeCard } from '../../domain/time-card.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Ticket } from '../../domain/ticket.model';

@Component({
  selector: 'app-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  standalone: true
})
export class FormComponent implements OnInit, OnChanges {
  @Output() formDataSubmitted = new EventEmitter<TimeCard>();
  @Input() tickets: Ticket[] = []; // Add this to receive tickets from parent
  
  ticketIdControl = new FormControl('');
  dateControl = new FormControl('');
  timeSpentControl = new FormControl('');
  
  // Remove hardcoded values
  ticketOptions: string[] = [];
  filteredTicketOptions?: Observable<string[]>;

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
    // Format tickets for display
    this.ticketOptions = this.tickets
      .filter(ticket => ticket.ticketId !== undefined)
      .map(ticket => `${ticket.ticketId} - ${ticket.name || 'Unnamed'}`);
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
    
    // Extract ticket ID from selection (handles both formats: "ID - Name" or just "ID")
    const ticketIdValue = this.ticketIdControl.value || '';
    let ticketId: number;
    
    if (ticketIdValue.includes('-')) {
      // Extract ID part from "ID - Name" format
      ticketId = Number(ticketIdValue.split('-')[0].trim());
    } else {
      // Just a plain ID
      ticketId = Number(ticketIdValue);
    }
    
    const data: TimeCard = {
      date: new Date(this.dateControl.value || ''),
      timeSpent: Number(this.timeSpentControl.value),
      ticketId: ticketId
    };

    this.formDataSubmitted.emit(data);
    this.ticketIdControl.reset();
    this.dateControl.reset();
    this.timeSpentControl.reset();
  }
}
