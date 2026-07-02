import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as TicketServiceModule from '../../services/ticket';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private router = inject(Router);
  private ticketService = inject(TicketServiceModule.Ticket);

  isLoginPage = this.router.url === '/' || this.router.url.includes('login');

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.isLoginPage = e.urlAfterRedirects === '/' || e.urlAfterRedirects.includes('login');
      });
  }

  resetDemo() {
    const confirmed = confirm('Reset the board back to demo data? This clears any tickets you\'ve added.');
    if (confirmed) {
      this.ticketService.resetToSeed();
      window.location.reload();
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }
}