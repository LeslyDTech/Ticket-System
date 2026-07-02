import { Injectable } from '@angular/core';
import { Ticket as TicketModel } from '../../models/ticket';

const STORAGE_KEY = 'ticket-system-tickets';

const SEED_TICKETS: TicketModel[] = [
  {
    id: 1,
    title: 'Fix login redirect bug',
    status: 'Open',
    priority: 'High'
  },
  {
    id: 2,
    title: 'Update onboarding docs',
    status: 'Open',
    priority: 'Low'
  },
  {
    id: 3,
    title: 'Investigate slow dashboard load',
    status: 'In Progress',
    priority: 'Medium'
  },
  {
    id: 4,
    title: 'Add dark mode toggle',
    status: 'In Progress',
    priority: 'Low'
  },
  {
    id: 5,
    title: 'Set up CI pipeline',
    status: 'Closed',
    priority: 'Medium'
  },
  {
    id: 6,
    title: 'Migrate database to v2 schema',
    status: 'Closed',
    priority: 'High'
  }
];

@Injectable({
  providedIn: 'root'
})
export class Ticket {

  private tickets: TicketModel[] = this.loadFromStorage();

  private loadFromStorage(): TicketModel[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
      // First-time visitor: seed with demo data
      this.persist(SEED_TICKETS);
      return [...SEED_TICKETS];
    } catch {
      return [...SEED_TICKETS];
    }
  }

  private persist(tickets: TicketModel[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    } catch {
      // localStorage may be unavailable (e.g. private browsing) — fail silently
    }
  }

  private saveToStorage() {
    this.persist(this.tickets);
  }

  getTickets(): TicketModel[] {
    return this.tickets;
  }

  addTicket(ticket: TicketModel) {
    this.tickets.push(ticket);
    this.saveToStorage();
  }

  deleteTicket(id: number) {
    this.tickets = this.tickets.filter(t => t.id !== id);
    this.saveToStorage();
  }

  updateTicket(updated: TicketModel) {
    const index = this.tickets.findIndex(t => t.id === updated.id);
    if (index !== -1) {
      this.tickets[index] = updated;
      this.saveToStorage();
    }
  }

  /** Resets the board back to the original demo seed data. */
  resetToSeed() {
    this.tickets = [...SEED_TICKETS];
    this.saveToStorage();
  }
}