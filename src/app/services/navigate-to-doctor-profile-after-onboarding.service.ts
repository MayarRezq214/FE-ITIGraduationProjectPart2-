import { Injectable } from '@angular/core';
import { GetDoctorByPhoneDto } from '../Types/GetDoctorByPhoneDto';
import { FormsComponent } from '../forms/forms.component';
import { DoctorService } from './doctor.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigateToDoctorProfileAfterOnboardingService {

  doctor? : GetDoctorByPhoneDto
   
  constructor(
    private doctorService : DoctorService,
    private router : Router) { }

  open(phone : string){
    this.doctorService.GetDoctorByPhone(phone).subscribe({
      next:(doctor)=>
      {
        this.doctor = doctor
       
        this.router.navigate(['/doctorProfile'],{queryParams: doctor})

      },
      error:(error)=>
      {
        console.log("api failed",error)
      }

    })
  }
}
