import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './dashboard/home/home.component';
import { athenticatedGuard } from './guards/athenticated.guard';
import { PageNotFountComponent } from './notFound/page-not-fount/page-not-fount.component';
import { ProfileComponent } from './dashboard/profile/profile.component';

export const routes: Routes = [
    {
        path:"register",
        component: RegisterComponent
    },
    {
        path:"login",
        component:LoginComponent

    },
    {
        path:"home",
        component:HomeComponent,
        canActivate: [athenticatedGuard],
        children:[
            {
                path:"profile",
                component:ProfileComponent,
                canActivate: [athenticatedGuard]
        
            },

        ]

    },
    {
        path:"",
        redirectTo:"login",
        pathMatch:'full'
    },

    {
        path:"**",
        component:PageNotFountComponent,

    }
];
