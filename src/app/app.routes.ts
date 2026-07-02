import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { TicketList } from './pages/components/ticket-list/ticket-list';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'tickets', component: TicketList }
];