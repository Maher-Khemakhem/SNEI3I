import { Routes } from '@angular/router';
import { ClientLayoutComponent } from './layout/client-layout/client-layout.component';
import { LoginComponent } from './views/client/login/login.component';
import { SignUpWorkerComponent } from './views/worker/sign-up-worker/sign-up-worker.component';
import { LogInClientComponent } from './views/client/log-in-client/log-in-client.component';
import { LogInWorkerComponent } from './views/worker/log-in-worker/log-in-worker.component';
import { DashboardComponent } from './views/worker/dashboard/dashboard.component'; // Import the DashboardComponent
import { authGuard } from './services/auth.guard';
import { WorkerLayoutComponent } from './layout/worker-layout/worker-layout.component';
import { OfferComponent } from './views/worker/offer/offer.component';
import { HistoriqueComponent } from './views/worker/historique/historique.component';
import { ClientFeedbackComponent } from './views/client/client-feedback/client-feedback.component';
import { WorkerProfileComponent } from './views/client/worker-profile/worker-profile.component';
import { FiltreComponent } from './views/client/filtre/filtre.component';
import { HeaderComponent } from './views/client/header/header.component';

export const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children:[
      {path:'',component:HeaderComponent},
      {path:'workerprofile',component:WorkerProfileComponent},
      {path:'filter',component:FiltreComponent}
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard], // Protect the route
  },
  {
    path: 'signupworker',
    component: SignUpWorkerComponent,
  },
  {
    path: 'loginclient',
    component: LogInClientComponent,
    canActivate: [authGuard], // Protect the route
  },
  {
    path: 'loginworker',
    component: LogInWorkerComponent,
    canActivate: [authGuard], // Protect the route
  },
  {
    path: 'worker',
    component: WorkerLayoutComponent, // Parent component for worker routes
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent, // Child route for /worker/dashboard
      },{
        path: 'offre',
        component: OfferComponent, // Child route for /worker/dashboard
      },
      {
        path: 'historique',
        component: HistoriqueComponent, // Child route for /worker/dashboard
      },
    ],
  },
  {
    path:'a',
    component:ClientFeedbackComponent,
  }
];
