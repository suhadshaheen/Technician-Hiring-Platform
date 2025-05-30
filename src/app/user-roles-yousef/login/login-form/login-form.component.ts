

import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/AuthService';
import {Router} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';


@Component({
  selector: 'app-login-form',
  imports: [
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const url = 'http://127.0.0.1:8000/api/login';
    const body = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>(url, body).subscribe({
      next: (res) => {
        console.log('Login successful:', res);
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('role', res.user.role.toLowerCase());

        localStorage.setItem('userId', res.user.id);
        localStorage.setItem('username', res.user.username);
        const role = (res.user.role || '').toLowerCase();
        localStorage.setItem('role', role);
        if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (role === 'jobowner') {
          this.router.navigate(['/jobOwner']);
        } else if (role === 'freelancer') {
          this.router.navigate(['/freelancer']);
        } else {
          this.router.navigate(['/']);
        }

      },
      error: (err) => {
        console.error('Login error:', err);

        const message = err.error?.message || 'Unexpected error occurred.';
        alert('Login failed: ' + message);
      }
    });
  }
}
