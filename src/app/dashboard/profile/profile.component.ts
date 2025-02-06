import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  encapsulation: ViewEncapsulation.None

})
export class ProfileComponent {
  userDetails={
    email:"",
    phone:"",
    address : "",
    password:""

  }
  authService = inject(AuthService)
  onSubmit(){
    console.log(this.userDetails)
    this.authService.updateUser(this.userDetails)
  }
}
