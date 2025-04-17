import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SocialSignInComponent} from '../social-sign-in/social-sign-in.component';

@Component({
  selector: 'app-sign-in-form',
  imports: [
    FormsModule,

  ],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.css'
})
export class SignInFormComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  onRegister(): void {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }


    const userData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    console.log('User registered:', userData);
    alert('Registration successful!');


    this.username = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

}
