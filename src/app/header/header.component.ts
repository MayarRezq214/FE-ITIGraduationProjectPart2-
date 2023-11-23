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
constructor(private authenticationService: AuthenticationService,
  private adminService: AdminService){}
  ngOnInit(): void {
    this.phoneNumber = localStorage.getItem('phoneNumber')!
    if(!this.phoneNumber){
      this.phoneNumber = this.authenticationService.PhoneNumber;
    }
    this.adminService.getAdminByPhoneNumber(this.phoneNumber!).subscribe({
      next:(Admin) => {
        this.admin = Admin
      },
      error:(error) => {
        console.log('calling get admin by phone number api faild', error);
      }
    })
  }
  signOut(e:Event){
    this.authenticationService.isLoggedIn$.next(false)
    localStorage.removeItem('token')
    localStorage.removeItem('phoneNumber')
  } 

}
