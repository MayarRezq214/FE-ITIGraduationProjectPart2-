import { Injectable, OnInit } from '@angular/core';
import { DoctorService } from './doctor.service';
import { SpecializationService } from './specialization.service';
import { GetAllDoctorsDto } from '../Types/GetAllDoctorsDto';
import { GetAllSpecializationsDto } from '../Types/GetAllSpecializationsDto';
import { DoctorsForAllSpecializations } from '../Types/DoctorsForAllSpecializations';

@Injectable({
  providedIn: 'root'
})
export class SearchService implements OnInit{
  doctors?: GetAllDoctorsDto[];
  specializations?: GetAllSpecializationsDto[];
  Doctors? : DoctorsForAllSpecializations[];

  constructor(private doctorService : DoctorService,
    private specializationService : SpecializationService) { }
 
    ngOnInit(): void { 
    
    this.doctorService.getDoctors().subscribe({
      next:(doctors) => {
        this.doctors = doctors;
      },
      error: (error) => {
        console.log('calling All doctors api failed', error);
      },
    });
    this.doctorService.GetAllSpecializations().subscribe({
      next:(specializations) => {
        this.specializations = specializations;
        
      },
      error: (error) => {
        console.log('calling All specializations api failed', error);
      },
    })
  }

  }
   
   

