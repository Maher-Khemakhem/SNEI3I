import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkerWorksPhotoRoutingModule } from './worker-works-photo-routing.module';
import { MatCardModule } from '@angular/material/card';


import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WorkerWorksPhotoRoutingModule,MatCardModule,MatButtonModule,MatDividerModule,MatIconModule
  ]
})
export class WorkerWorksPhotoModule { }
