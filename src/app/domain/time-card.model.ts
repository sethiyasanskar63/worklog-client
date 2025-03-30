import { Ticket } from "./ticket.model";

export class TimeCard{
    timeCardId?: number;
    date?: Date;
    timeSpent?: number;
    ticket?: Ticket;
}