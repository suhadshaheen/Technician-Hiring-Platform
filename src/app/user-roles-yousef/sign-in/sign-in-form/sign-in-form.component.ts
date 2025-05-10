import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SocialSignInComponent} from '../social-sign-in/social-sign-in.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-sign-in-form',
  imports: [
    FormsModule,
    NgForOf,

  ],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.css'
})
export class SignInFormComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';


  firstName: string = '';
  secondName: string = '';
  country: string = '';
  city: string = '';
  phoneNumber: string = '';
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

  onRegister(): void {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      secondName: this.secondName,
      country: this.country,
      city: this.city,
      phoneNumber: this.phoneNumber
    };

    console.log('User registered:', userData);
    alert('Registration successful!');


    this.username = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.firstName = '';
    this.secondName = '';
    this.country = '';
    this.city = '';
    this.phoneNumber = '';
  }

}
