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
import { ClientFeedbackComponent } from './views/client/client-feedback/client-feedback.component';
import { ReservationComponent } from './views/worker/reservation/reservation.component';
import { WorkerProfileComponent } from './views/client/worker-profile/worker-profile.component';
import { FiltreComponent } from './views/client/filtre/filtre.component';
import { HeaderComponent } from './views/client/header/header.component';

import { Component } from '@angular/core';
import { LoginAdminComponent } from './views/admin/login-admin/login-admin.component';
import { DashboardAdminComponent } from './views/admin/dashboard-admin/dashboard-admin.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { GererAdminComponent } from './views/admin/gerer-admin/gerer-admin.component';
import { GererClientComponent } from './views/admin/gerer-client/gerer-client.component';
import { GererWorkerComponent } from './views/admin/gerer-worker/gerer-worker.component';
import { adminauthenticationGuard } from './services/adminauthentication.guard';
import { ClientProfileComponent } from './views/client/client-profile/client-profile.component';
import { ProfilComponent } from './views/worker/profil/profil.component';
import { EditProfilComponent } from './views/worker/edit-profil/edit-profil.component';
import { clientauthenticationGuard } from './services/clientauthentication.guard';
import { ReservationClientComponent } from './views/client/reservation-client/reservation-client.component';
import { ChooseComponent } from './views/client/choose/choose.component';
import { workerauthenticationGuard } from './services/workerauthentication.guard';
import { clientOrNoAuthGuard } from './services/client-or-no-auth.guard';
import { workerAuthGuard } from './services/worker-auth.guard';
import { Choose2Component } from './views/client/choose2/choose2.component';



export const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    canActivate:[clientOrNoAuthGuard],
    //canActivate:[workerauthenticationGuard],
    children:[
      {
        path:'',
        component:HeaderComponent,
        
      },
      {
        path:'workerprofile',
        component:WorkerProfileComponent,
        canActivate: [clientauthenticationGuard],
      },
      {
        path:'filter',component:FiltreComponent,
        canActivate: [clientauthenticationGuard],
      },
      {
        path:'reservation',component:ReservationClientComponent,
        canActivate: [clientauthenticationGuard],
      },
      
      {
        path:"client-profile",
        component:ClientProfileComponent,
        canActivate: [clientauthenticationGuard],
      },
      

    ],
   
  },
  {
    path:"choose",
    component:ChooseComponent,
    
  },
  {
    path:"choose2",
    component:Choose2Component,
    
  },
  {
    path: 'signupclient',
    component: LoginComponent,
    canActivate: [authGuard], // Protect the route
  },
  {
    path: 'signupworker',
    component: SignUpWorkerComponent,
    canActivate: [authGuard],
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
    path:'loginadmin',component:LoginAdminComponent,
    canActivate: [authGuard],
  },
  
  {
    path: 'worker',
    component: WorkerLayoutComponent,
    canActivate:[workerAuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent, // Child route for /worker/dashboard
      },
      {
        path: 'offre',
        component: OfferComponent, // Child route for /worker/offre
      },
      {
        path: 'reservation',
        component: ReservationComponent, // Child route for /worker/reservation
      },
      {
        path: 'profil',
        component: ProfilComponent, // Child route for /worker/profil
      },{
        path: 'editprofil',
        component: EditProfilComponent, // Child route for /worker/editprofil
      }
    ],

  },
  
  {
    path:'admin',
    component:AdminLayoutComponent,
    canActivate:[adminauthenticationGuard],
    children:[
      {
        path:'dashboard',
        component:DashboardAdminComponent
      },
      {
        path:'gerer-admin',
        component:GererAdminComponent
      },
      {
        path:'gerer-client',
        component:GererClientComponent
      },
      {
        path:'gerer-worker',
        component:GererWorkerComponent
      },
    ]
    
  },
  
  
];