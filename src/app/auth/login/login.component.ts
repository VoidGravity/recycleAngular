import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation : ViewEncapsulation.None
})
export class LoginComponent {
  user = {
    email : "",
    password : ""
  }
  authService = inject(AuthService)
 
  onSubmit(){
    this.authService.login(this.user)
  }
}
