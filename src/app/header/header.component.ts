import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
constructor(private authenticationService: AuthenticationService){}
  signOut(e:Event){
    this.authenticationService.isLoggedIn$.next(false)
    localStorage.removeItem('token')
  }    
}
