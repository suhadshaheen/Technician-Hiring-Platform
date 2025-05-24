import {Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in-form',
  imports: [
    FormsModule,
    NgForOf,
    HttpClientModule
  ],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.css'
})
export class SignInFormComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  @Input() role: string = '';
  firstname: string = '';
  lastname: string = '';
  country: string = '';
  city: string = '';
  phone: string = '';
  countries: string[] = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola',
    'Argentina', 'Australia', 'Austria', 'Bahrain', 'Bangladesh',
    'Belgium', 'Brazil', 'Canada', 'China', 'Denmark', 'Egypt',
    'Finland', 'France', 'Germany', 'India', 'Indonesia',
    'Iraq', 'Ireland', 'Italy', 'Japan', 'Jordan', 'Kuwait',
    'Lebanon', 'Libya', 'Malaysia', 'Mexico', 'Morocco',
    'Netherlands', 'New Zealand', 'Nigeria', 'Norway',
    'Oman', 'Pakistan', 'Palestine', 'Philippines',
    'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia',
    'Saudi Arabia', 'South Africa', 'Spain', 'Sudan', 'Sweden',
    'Switzerland', 'Syria', 'Tunisia', 'Turkey', 'Ukraine',
    'United Arab Emirates', 'United Kingdom', 'United States',
    'Yemen'
  ];
  constructor(private http: HttpClient ,private router: Router) {}

  onRegister(): void {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!this.role) {
      alert('Please select a role!');
      return;
    }

    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
      password_confirmation: this.confirmPassword,
      firstname: this.firstname,
      lastname: this.lastname,
      country: this.country,
      city: this.city,
      phone: this.phone,
      role: this.role
    };
    console.log('Registering user:', userData);
    this.http.post('http://127.0.0.1:8000/api/register', userData).subscribe({
      next: () => {
        alert('Registration successful!');
        this.ClearForm();
        this.router.navigate(['/login']);
      },

      error: (err) => {
        console.error('Error:', err);
        alert('Registration failed:\n' + JSON.stringify(err.error.errors, null, 2));
      }
    });
    }


    ClearForm():void{
    this.username = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.firstname = '';
    this.lastname = '';
    this.country = '';
    this.city = '';
    this.phone = '';
  }


}
