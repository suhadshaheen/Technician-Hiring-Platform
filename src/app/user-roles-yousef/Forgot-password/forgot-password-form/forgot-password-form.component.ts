import {Component, ViewEncapsulation} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import { AuthService} from '../../services/AuthService';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-forgot-password-form',
  imports: [
    FormsModule,
    RouterLink,
    NgIf,


  ],
  templateUrl: './forgot-password-form.component.html',
  styleUrl: './forgot-password-form.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordFormComponent {
  isResetStage = false;

  email = '';
  token = '';
  password = '';
  confirmPassword = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (!this.isResetStage) {
      // First stage: send reset token
      this.authService.forgotPassword(this.email).subscribe({
        next: () => {
          alert('Token sent! Check your email.');
          this.isResetStage = true;
        },
        error: (err) => alert('Error: ' + err.error.message)
      });
    } else {
      // Second stage: submit new password
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      this.authService.resetPassword({
        email: this.email,
        token: this.token,
        password: this.password,
        password_confirmation: this.confirmPassword
      }).subscribe({
        next: () => alert('Password successfully reset!'),
        error: (err) => alert('Error: ' + err.error.message)
      });
    }
  }
}
