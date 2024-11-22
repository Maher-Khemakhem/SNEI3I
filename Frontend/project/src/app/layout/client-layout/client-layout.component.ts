import { Component } from '@angular/core';
import { NavComponent } from "../../views/client/nav/nav.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../views/client/footer/footer.component";

@Component({
  selector: 'app-client-layout',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.css'
})
export class ClientLayoutComponent {
  constructor() {
    console.log("ClientLayoutComponent created");
  }

}
