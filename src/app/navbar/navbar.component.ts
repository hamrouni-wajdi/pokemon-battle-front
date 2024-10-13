import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule,NgbNavConfig  } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbNavModule,NgbModule],
  providers: [NgbNavConfig],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
