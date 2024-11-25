import { Routes } from '@angular/router';
import { ClientLayoutComponent } from './layout/client-layout/client-layout.component';
import { LoginComponent } from './views/client/login/login.component';
import { SignUpWorkerComponent } from './views/worker/sign-up-worker/sign-up-worker.component';
import { LogInClientComponent } from './views/client/log-in-client/log-in-client.component';
import { LogInWorkerComponent } from './views/worker/log-in-worker/log-in-worker.component';


export const routes: Routes = [
    
    {
        path:'',component:ClientLayoutComponent,children:[
            
        ]
    },
    { 
        path: 'login', component: LoginComponent 
    },
    { 
        path: 'signupworker', component: SignUpWorkerComponent 
    },
    { 
        path: 'loginclient', component: LogInClientComponent 
    },
    { 
        path: 'loginworker', component: LogInWorkerComponent 
    }
];
