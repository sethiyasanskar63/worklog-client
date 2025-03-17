import { Component, OnInit } from '@angular/core';
import { FormComponent } from "../components/form/form.component";
import { TimeCard } from '../domain/time-card.model';
import { TimeCardService } from '../services/time-card.service';
import { TicketService } from '../services/ticket.service';
import { TicketFormComponent } from "../components/ticket-form/ticket-form.component";
import { Ticket } from '../domain/ticket.model';

@Component({
  selector: 'app-base',
  imports: [FormComponent, TicketFormComponent],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent implements OnInit {
  data?: TimeCard;
  ticketData?: Ticket;
  tickets: Ticket[] = [];
  error: string = '';
  loading: boolean = false;

  constructor(private timeCardService: TimeCardService, private ticketService: TicketService) { }
  
  ngOnInit(): void {
    this.fetchAllTickets();
  }

  fetchAllTickets(): void {
    this.loading = true;
    this.ticketService.getAllTickets().subscribe({
      next: (tickets: Ticket[]) => {
        this.tickets = tickets;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching tickets:', err);
        this.error = 'Failed to fetch tickets. Please try again.';
        this.loading = false;
      }
    });
  }
  
  handleFormSubmit(formData: TimeCard) {
    this.loading = true;
    this.error = '';

    console.log('Form data:', formData);
    this.timeCardService.submitFormData(formData).subscribe({
      next: (response: TimeCard) => {
        this.data = response;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error submitting form data:', err);
        this.error = 'Failed to submit form. Please try again.';
        this.loading = false;
      }
    });
  }

  handleTicketFormSubmit(formData: Ticket) {
    this.loading = true;
    this.error = '';

    console.log('Form data:', formData);
    this.ticketService.submitFormData(formData).subscribe({
      next: (response: Ticket) => {
        this.ticketData = response;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error submitting form data:', err);
        this.error = 'Failed to submit form. Please try again.';
        this.loading = false;
      }
    });
  }
}
