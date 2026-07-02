import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';

import * as TicketServiceModule from '../../services/ticket';
import { Ticket, TicketStatus } from '../../../models/ticket';
import { TicketCard } from '../ticket-card/ticket-card';
import { TicketDetail } from '../ticket-detail/ticket-detail';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule, TicketCard, TicketDetail],
  templateUrl: './ticket-list.html',
  styleUrls: ['./ticket-list.css']
})
export class TicketList {

  tickets: Ticket[] = [];
  selectedTicket: Ticket | null = null;

  title = '';
  priority: 'Low' | 'Medium' | 'High' = 'Low';

  private ticketService = inject(TicketServiceModule.Ticket);

  constructor() {
    this.refresh();
  }

  refresh() {
    this.tickets = this.ticketService.getTickets();
  }

  addTicket() {
    if (!this.title.trim()) return;

    const newTicket: Ticket = {
      id: Date.now(),
      title: this.title,
      status: 'Open',
      priority: this.priority
    };

    this.ticketService.addTicket(newTicket);
    this.refresh();

    this.title = '';
    this.priority = 'Low';
  }

  deleteTicket(id: number) {
    this.ticketService.deleteTicket(id);
    this.refresh();
    this.selectedTicket = null;
  }

  getColumn(status: TicketStatus) {
    return this.tickets.filter(t => t.status === status);
  }

  drop(event: CdkDragDrop<Ticket[]>, newStatus: TicketStatus) {
    const ticket = event.previousContainer.data[event.previousIndex] as Ticket;

    if (ticket) {
      ticket.status = newStatus;
      this.ticketService.updateTicket(ticket);
      this.refresh();
    }
  }

  selectTicket(ticket: Ticket) {
    this.selectedTicket = ticket;
  }

  closeDetail() {
    this.selectedTicket = null;
  }

  saveDetail(updated: Ticket) {
    this.ticketService.updateTicket(updated);
    this.refresh();
    this.selectedTicket = null;
  }
}