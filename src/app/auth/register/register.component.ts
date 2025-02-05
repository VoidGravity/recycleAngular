import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet,RouterLink,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  encapsulation: ViewEncapsulation.None
  
})
export class RegisterComponent {

  user = {
    firstName : "",
    lastName : "",
    email  : "",
    password : "",
    phone : "",
    date : "",
    address : ""
  }
  private authService = inject(AuthService)

  
  onSubmit(){
    let test:any;
    test = this.authService.register(this.user)

    console.log(JSON.parse(test)) 
  }

}
