import { Injectable } from '@angular/core';
import { GetDoctorByPhoneDto } from '../Types/GetDoctorByPhoneDto';
import { FormsComponent } from '../forms/forms.component';
import { DoctorService } from './doctor.service';
import { Router } from '@angular/router';
import { GetDoctorByIDForAdminDto } from '../Types/GetDoctorByIDForAdminDto';

@Injectable({
  providedIn: 'root'
})
export class NavigateToDoctorProfileAfterOnboardingService {

  phoneNumber? : string
  doctor? : GetDoctorByIDForAdminDto
  doctorId? : string
  constructor(
    private doctorService : DoctorService,
    private router : Router) { }

  open(){
    
    this.doctorService.GetDoctorByPhone(this.phoneNumber!).subscribe({
      next:(doctor) => {
        this.doctor = doctor;
        
        this.doctorId = doctor.iD!
       this.router.navigate(['/doctorProfile'])
       },
      error: (error) => {
        console.log('calling dr by id api failed', error);
      },
    });
    

  }
}
