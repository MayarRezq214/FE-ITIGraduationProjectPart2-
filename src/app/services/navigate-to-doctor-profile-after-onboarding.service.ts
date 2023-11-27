import { Injectable, OnInit } from '@angular/core';
import { GetDoctorByPhoneDto } from '../types/GetDoctorByPhoneDto';
import { FormsComponent } from '../forms/forms.component';
import { DoctorService } from './doctor.service';
import { Router } from '@angular/router';
import { GetDoctorByIDForAdminDto } from '../types/GetDoctorByIDForAdminDto';
import { DataBetweenAddDrDrProfileService } from './data-between-add-dr-dr-profile.service';

@Injectable({
  providedIn: 'root'
})
export class NavigateToDoctorProfileAfterOnboardingService implements OnInit{

  phoneNumber? : string
  doctor? : GetDoctorByIDForAdminDto
  doctorId? : string
  constructor(
    private doctorService : DoctorService,
    private router : Router,
    private dataFromRegisterDr: DataBetweenAddDrDrProfileService) { }

  ngOnInit()  {
    this.dataFromRegisterDr.currentDoctorId.subscribe(doctorId=>this.doctorId=doctorId)

  }

  open(){
    
    this.doctorService.GetDoctorByPhone(this.phoneNumber!).subscribe({
      next:(doctor) => {
        this.doctor = doctor;
        this.doctorId = doctor.id!
        this.dataFromRegisterDr.changeDoctorId(this.doctorId)
       this.router.navigate(['/doctorProfile'])
       },
      error: (error) => {
        console.log('calling dr by id api failed', error);
      },
    });
    


  }
}
