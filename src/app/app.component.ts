import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLoggedIn:boolean = false;
  constructor(private authenticationService: AuthenticationService){}
  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.authenticationService.isLoggedIn$.next(true)
    }
    this.authenticationService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }
}
