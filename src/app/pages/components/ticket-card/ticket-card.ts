import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../../models/ticket';

@Component({
  selector: 'app-ticket-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-card.html',
  styleUrl: './ticket-card.css',
})
export class TicketCard {
  @Input() ticket: Ticket = { id: 0, title: 'Untitled ticket', status: 'Open', priority: 'Low' };
  @Output() open = new EventEmitter<Ticket>();
}