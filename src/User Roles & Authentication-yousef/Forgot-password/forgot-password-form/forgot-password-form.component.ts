import {Component, ViewEncapsulation} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-forgot-password-form',
  imports: [
    FormsModule,
    RouterLink,


  ],
  templateUrl: './forgot-password-form.component.html',
  styleUrl: './forgot-password-form.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordFormComponent {
  email: string = '';

  onSubmit() {

    console.log(`Sending reset link to ${this.email}`);
  }
}
