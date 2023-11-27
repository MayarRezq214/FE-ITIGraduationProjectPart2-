import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgModule }      from '@angular/core';
import { GetAllSpecializationsDto } from '../types/GetAllSpecializationsDto';
import { DoctorsForAllSpecializations } from '../types/DoctorsForAllSpecializations';
import { HttpClientModule } from '@angular/common/http';
import {RegisterDoctorDto} from '../types/RegisterDoctorDto';

import { Router } from '@angular/router';
import { phoneNumberLengthValidator } from '../services/registerPhoneNumber';
import { NavigateToDoctorProfileAfterOnboardingService } from '../services/navigate-to-doctor-profile-after-onboarding.service';
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit{

  currentDate? : Date
 
  specializations?: GetAllSpecializationsDto[];
  Doctors? : DoctorsForAllSpecializations[];
  doctorSpecialization : number = 0
  registerDoctor : RegisterDoctorDto = 
  {
    
      name : '',
      description : '',
      title : '',
      dateOfBirth : '',
      phoneNumber : '',
      password : '',
      specializationId : 0,
      salary : 0,
      assistantDateOfBirth : '',
      assistantID : '',
      assistantName : '',
      assistantPhoneNumber:''      
  };
  form = new FormGroup ({
    name : new FormControl<string>('',[Validators.required]),
    title : new FormControl<string>(''),
    description : new FormControl<string>(''),
    salary : new FormControl<number>(0), 
    specializationId : new FormControl<number>(0),
    phoneNumber : new FormControl<string>('0', [Validators.required]),
    dateOfBirth : new FormControl<string>(''),
    password : new FormControl<string>(''),
     photo : new FormControl<string>(''),
    // assistantID : new FormControl<string>(''),
    // assistantName : new FormControl<string>(''),
    // assistantPhoneNumber : new FormControl<string>(''),
    // assistantDateOfBirth : new
  });

  constructor(private doctorService : DoctorService, 
    private router : Router,
    private navigate : NavigateToDoctorProfileAfterOnboardingService,
   ) {}
  ngOnInit(): void {
    this.doctorService.GetAllSpecializations().subscribe({
      next:(specializations) => {
        this.specializations = specializations;
      },
      error: (error) => {
        console.log('calling All specializations api failed', error);
      },
    })
  }


  onSubmit(e : Event)
  {
    e.preventDefault();
        
    this.registerDoctor  = 
    {

        name : this.form.controls.name.value!,
        description : this.form.controls.description.value!,
        title : this.form.controls.title.value!,
        dateOfBirth : this.form.controls.dateOfBirth.value!,
        phoneNumber : this.form.controls.phoneNumber.value!,
        specializationId : this.doctorSpecialization,
        salary : this.form.controls.salary.value!,
        password : this.form.controls.password.value!,
        assistantDateOfBirth : "2023-01-01",
        assistantID : '',
        assistantName : '',
        assistantPhoneNumber : ''
    };
    
   
    this.doctorService.registerDoctor(this.registerDoctor).subscribe({
      next:()=>
      {

       // this.router.navigate(['/doctorProfile'])
        alert("doctor added successfully")
      //  this.form.reset()
        this.navigate.phoneNumber = this.registerDoctor.phoneNumber
       this.navigate.open()

      },
      error:(error)=>
      {
        console.log("api failed",error)
      }
    })
   
  }
  onSelect(e:Event)
  {
    this.doctorSpecialization = (e.target as any).value;
    console.log(this.doctorSpecialization)
  }
}
