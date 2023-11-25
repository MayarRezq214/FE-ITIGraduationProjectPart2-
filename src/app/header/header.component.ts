import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AuthenticationService } from '../services/authentication.service';
import { AdminService } from '../services/admin.service';
import { GetAdminByPhoneNumberDto } from '../types/GetAdminByPhoneNumberDto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  admin? : GetAdminByPhoneNumberDto;
  phoneNumber?: string;
  isLoggedIn:boolean = false;
  isDoctorLoggedIn:boolean = false;
  isReceptionLoggedIn:boolean = false;
constructor(private authenticationService: AuthenticationService,
  private adminService: AdminService){}
  ngOnInit(): void {
    
    this.authenticationService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.authenticationService.isDoctorLoggedIn$.subscribe((isDoctorLoggedIn) => {
      this.isDoctorLoggedIn = isDoctorLoggedIn;
    });
    this.authenticationService.isReceptionLoggedIn$.subscribe((isReceptionLoggedIn) => {
      this.isReceptionLoggedIn = isReceptionLoggedIn;
    });

    this.phoneNumber = localStorage.getItem('phoneNumber')!

    if(!this.phoneNumber){
      this.phoneNumber = this.authenticationService.PhoneNumber;
    }
    //#endregion admin
    if(this.isLoggedIn){
    this.adminService.getAdminByPhoneNumber(this.phoneNumber!).subscribe({
      next:(Admin) => {
        this.admin = Admin
      },
      error:(error) => {
        console.log('calling get admin by phone number api faild', error);
      }
    })
  }
    //#endregion
  }
  signOut(e:Event){
    this.authenticationService.isLoggedIn$.next(false)
    this.authenticationService.isDoctorLoggedIn$.next(false)
    this.authenticationService.isReceptionLoggedIn$.next(false)
    localStorage.removeItem('AdminToken')
    localStorage.removeItem('DoctorToken')
    localStorage.removeItem('receptionToken')
    localStorage.removeItem('phoneNumber')
  } 

}
