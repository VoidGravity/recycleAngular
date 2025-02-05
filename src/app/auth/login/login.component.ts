import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
  LogName(){
    console.log(this.user.email)

  }
  onSubmit(){
    console.log(this.user.email)
  }
}
