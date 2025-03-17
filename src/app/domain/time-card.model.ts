import { Ticket } from "./ticket.model";

export class TimeCard{
    ticketId?: number;
    date?: Date;
    timeSpent?: number;
    ticket?: Ticket;
}