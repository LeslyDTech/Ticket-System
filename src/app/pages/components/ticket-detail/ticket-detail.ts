import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketForm, TicketFormValue } from '../ticket-form/ticket-form';
import { Ticket } from '../../../models/ticket';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [CommonModule, TicketForm],
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.css',
})
export class TicketDetail {
  @Input() ticket: Ticket = { id: 0, title: 'Untitled ticket', status: 'Open', priority: 'Low' };
  @Output() save = new EventEmitter<Ticket>();
  @Output() deleteTicket = new EventEmitter<number>();
  @Output() close = new EventEmitter<void>();

  onSubmit(value: TicketFormValue) {
    this.save.emit({ ...this.ticket, ...value });
  }
}