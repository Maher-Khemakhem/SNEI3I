import { Routes } from '@angular/router';
import { ClientLayoutComponent } from './layout/client-layout/client-layout.component';
import { LoginComponent } from './views/client/login/login.component';
export const routes: Routes = [
    
    {
        path:'',component:ClientLayoutComponent,children:[
            
        ]
    },
    { 
        path: 'login', component: LoginComponent 
    }
];
