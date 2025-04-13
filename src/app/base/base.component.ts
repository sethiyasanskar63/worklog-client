import { Component, OnInit } from '@angular/core';
import { FormComponent } from "../components/form/form.component";
import { TimeCard } from '../domain/time-card.model';
import { TimeCardService } from '../services/time-card.service';
import { TicketService } from '../services/ticket.service';
import { TicketFormComponent } from "../components/ticket-form/ticket-form.component";
import { Ticket } from '../domain/ticket.model';
import { TimeCardComponent } from "../components/time-card/time-card.component";
import { Page } from '../domain/page.model';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-base',
  imports: [FormComponent, TicketFormComponent, TimeCardComponent, MatSlideToggleModule, CommonModule],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent implements OnInit {
  data?: TimeCard;
  ticketData?: Ticket;
  tickets: Ticket[] = [];
  timeCards: TimeCard[] = [];
  error: string = '';
  loading: boolean = false;
  isDarkMode: boolean = false;

  constructor(private timeCardService: TimeCardService, private ticketService: TicketService) { }

  ngOnInit(): void {
    this.fetchAllTickets();
    this.fetchAllTimeCards();
  }

  fetchAllTickets(): void {
    this.loading = true;
    this.ticketService.getAllTickets().subscribe({
      next: (tickets: Ticket[]) => {
        this.tickets = tickets || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching tickets:', err);
        this.error = 'Failed to fetch tickets. Please try again.';
        this.loading = false;
        this.tickets = [];
      }
    });
  }

  fetchAllTimeCards(): void {
    this.loading = true;
    this.timeCardService.getAllTimeCards().subscribe({
      next: (response: Page<TimeCard>) => {
        console.log('API Response:', response);
        if (response && response.content) {
          this.timeCards = response.content;
        } else {
          this.timeCards = [];
          console.warn('Expected page format not received from API');
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching time cards:', err);
        this.error = 'Failed to fetch time cards. Please try again.';
        this.loading = false;
        this.timeCards = [];
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
        this.fetchAllTimeCards();
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
        this.fetchAllTickets();
      },
      error: (err) => {
        console.error('Error submitting form data:', err);
        this.error = 'Failed to submit form. Please try again.';
        this.loading = false;
      }
    });
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const body = document.body;
    if (this.isDarkMode) {
      body.classList.add('dark-theme');
      console.log('Dark mode enabled');
    } else {
      body.classList.remove('dark-theme');
      console.log('Dark mode disabled');
    }
  }

}
