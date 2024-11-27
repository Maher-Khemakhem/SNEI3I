import { Routes } from '@angular/router';
import { ClientLayoutComponent } from './layout/client-layout/client-layout.component';
import { LoginComponent } from './views/client/login/login.component';
import { SignUpWorkerComponent } from './views/worker/sign-up-worker/sign-up-worker.component';
import { LogInClientComponent } from './views/client/log-in-client/log-in-client.component';
import { LogInWorkerComponent } from './views/worker/log-in-worker/log-in-worker.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
<<<<<<< HEAD
  {
    path: '',
    component: ClientLayoutComponent,
    children: [],
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
