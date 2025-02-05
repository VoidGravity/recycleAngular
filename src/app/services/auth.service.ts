import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  login(user:any){
    

    
  }
  register(user:any){

    localStorage.setItem("user",JSON.stringify(user))
    let test = localStorage.getItem("user")
    return test;
  }
}
