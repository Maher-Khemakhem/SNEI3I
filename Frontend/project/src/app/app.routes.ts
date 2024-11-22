import { Routes } from '@angular/router';
import { ClientLayoutComponent } from './layout/client-layout/client-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { WorkerLayoutComponent } from './layout/worker-layout/worker-layout.component';


export const routes: Routes = [
    {
        path:'',component:ClientLayoutComponent,children:[
            
        ]
    }
];
