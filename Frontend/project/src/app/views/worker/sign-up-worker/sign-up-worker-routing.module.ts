import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpWorkerComponent } from './sign-up-worker.component';


const routes: Routes = [
  {path:'',component:SignUpWorkerComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpWorkerRoutingModule { }
