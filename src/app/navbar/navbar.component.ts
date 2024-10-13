import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule,NgbNavConfig  } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive} from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbNavModule,NgbModule,RouterLink,RouterLinkActive],
  providers: [NgbNavConfig],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private router: Router) {}

}
