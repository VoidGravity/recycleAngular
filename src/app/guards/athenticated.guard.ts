import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const athenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); 
  
  if (authService.getCurrentUser()) {
    return true; 
  } else {
    console.log("Access denied");
    return false;
  }
 

};
