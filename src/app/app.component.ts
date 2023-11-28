import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLoggedIn:boolean = false;
  isDoctorLoggedIn:boolean = false;
  isReceptionLoggedIn:boolean = false;
  constructor(private authenticationService: AuthenticationService){}
  ngOnInit(): void {
    if(localStorage.getItem('AdminToken')){
      this.authenticationService.isLoggedIn$.next(true);
    }
    else if(localStorage.getItem('DoctorToken')){
      this.authenticationService.isDoctorLoggedIn$.next(true);
    }
    else if(localStorage.getItem('receptionToken')){
      this.authenticationService.isReceptionLoggedIn$.next(true);
    }
    this.authenticationService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.authenticationService.isDoctorLoggedIn$.subscribe((isDoctorLoggedIn) => {
      this.isDoctorLoggedIn = isDoctorLoggedIn;
    });
    this.authenticationService.isReceptionLoggedIn$.subscribe((isReceptionLoggedIn) => {
      this.isReceptionLoggedIn = isReceptionLoggedIn;
    });
  }
}
