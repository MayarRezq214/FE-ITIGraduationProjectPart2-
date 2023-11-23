import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { AuthenticationService } from '../services/authentication.service';
import { GetAdminByPhoneNumberDto } from '../types/GetAdminByPhoneNumberDto';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit{
  admin? : GetAdminByPhoneNumberDto;
  phoneNumber?: string;
constructor(private adminservice: AdminService ,
  private authenticationservice: AuthenticationService){}
  

  ngOnInit(): void {
    this.phoneNumber = localStorage.getItem('phoneNumber')!
    if(!this.phoneNumber){
      this.phoneNumber = this.authenticationservice.PhoneNumber;
    }
    console.log(this.phoneNumber)
    this.adminservice.getAdminByPhoneNumber(this.phoneNumber!).subscribe({
      next:(Admin) => {
        this.admin = Admin
        console.log(Admin)
      },
      error:(error) => {
        console.log('calling get admin by phone number api faild', error);
      }
    })
  }

}
