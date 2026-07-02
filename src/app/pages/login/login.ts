import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  email = '';
  password = '';

  constructor(private router: Router) {}

  login() {
    if (this.email && this.password) {
      this.router.navigate(['/tickets']);
    } else {
      alert('Please fill in all fields');
    }
  }
}