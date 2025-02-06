import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { 

    if (!localStorage.getItem("users")) {
      const defaultUsers = [
        {
          firstName : "collector1",
          lastName : "cltr1",
          email  : "collector1@gmail.com",
          password : "AZERazer1234@",
          phone : "1234567891",
          date : "09/12/2024",
          address : "casablanca"
        },
        {
          firstName : "collector2",
          lastName : "cltr2",
          email  : "collector2@gmail.com",
          password : "AZERazer1234@",
          phone : "1234567892",
          date : "09/12/2025",
          address : "rabat"
        }
      ];

      localStorage.setItem("users", JSON.stringify(defaultUsers));
      console.log("Default users initialized.");
    }

   }

  login(user: any): boolean {
    const users = JSON.parse(localStorage.getItem("users") || '[]');

    const foundUser = users.find((u: any) => u.email === user.email && u.password === user.password);

    if (foundUser) {
      console.log("Login successful");
      
      localStorage.setItem("current_user", JSON.stringify(foundUser));
      
      return true;
    } else {
      console.log("Invalid email or password");
      return false;
    }
  }

  register(user: any) {
    const users = JSON.parse(localStorage.getItem("users") || '[]');

    if (users.some(
      (u: any) => u.email === user.email)
    ) {
        console.log("User already exists");
        return false;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    return localStorage.getItem("users");
  }
  updateUser(user: any) {
    const currentUser = JSON.parse(localStorage.getItem("current_user")||'{}')
    currentUser.email=user.email;
    currentUser.phone=user.phone;
    currentUser.address=user.address;
    currentUser.password=user.password;
    console.log("this is the current user " ,currentUser)
    // localStorage.setItem("current_user",currentUser);

    
  }


  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem("current_user") || 'null');
  }


  logout() {
    localStorage.removeItem("current_user");
    console.log("User logged out");
  }
  deleteAccount(){
    const currentUser = JSON.parse(localStorage.getItem("current_user") || "{}")
    const users = JSON.parse(localStorage.getItem("users") || "{}")
    const newUsers = users.filter((u : any)=>u.email!==currentUser.email)
    // console.log("here is a list of the new users  : ",newUsers)
    // console.log("here is a list of the old users  : ",users)
    localStorage.removeItem("current_user");
    localStorage.setItem("users",JSON.stringify(newUsers))
  }


}
