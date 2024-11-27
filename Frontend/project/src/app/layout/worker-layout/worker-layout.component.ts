import { Component,inject } from '@angular/core';
import { NavComponent } from "../../views/worker/nav/nav.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../views/worker/footer/footer.component";
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-worker-layout',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent,
    
    MatIconModule,MatCardModule,MatButtonModule,
    ],
  templateUrl: './worker-layout.component.html',
  styleUrl: './worker-layout.component.css'
})
export class WorkerLayoutComponent {

}
