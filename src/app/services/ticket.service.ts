import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../domain/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:8080/api/v1/tickets';

  constructor(private http: HttpClient) { }

  submitFormData(data: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, data);
  }

  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl+"/all");
  }
}
