export type TicketStatus = 'Open' | 'In Progress' | 'Closed';

export interface Ticket {
  id: number;
  title: string;
  status: TicketStatus;
  priority: 'Low' | 'Medium' | 'High';
}