import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
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

        const token = res.access_token;
        const role = (res.user.role || '').toLowerCase();

        // ✅ Store token and user info
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('userId', res.user.id.toString());
        localStorage.setItem('username', res.user.username);

        // ✅ Redirect to route with JWT as ?key=
        const routeKey = { queryParams: { key: token } };

        if (role === 'admin') {
          this.router.navigate(['/admin'], routeKey);
        } else if (role === 'jobowner') {
          this.router.navigate(['/jobOwner'], routeKey);
        } else if (role === 'freelancer') {
          this.router.navigate(['/freelancer'], routeKey);
        } else {
          this.router.navigate(['/'], routeKey);
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
