import { Component, OnInit } from '@angular/core';
import { RegisterDoctorDto } from '../Types/RegisterDoctorDto';
import { DoctorService } from '../services/doctor.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgModule }      from '@angular/core';
import { GetAllSpecializationsDto } from '../Types/GetAllSpecializationsDto';
import { DoctorsForAllSpecializations } from '../Types/DoctorsForAllSpecializations';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit{

 
  specializations?: GetAllSpecializationsDto[];
  Doctors? : DoctorsForAllSpecializations[];
  doctorSpecialization : number = 0
  /**
   *
   */
  constructor(private doctorService : DoctorService) {}
  ngOnInit(): void {
    this.doctorService.GetAllSpecializations().subscribe({
      next:(specializations) => {
        this.specializations = specializations;
        console.log(specializations)
      },
      error: (error) => {
        console.log('calling All specializations api failed', error);
      },
    })
  }


  form = new FormGroup ({
    name : new FormControl<string>('',[Validators.required]),
    title : new FormControl<string>(''),
    description : new FormControl<string>(''),
    salary : new FormControl<number>(0), 
    specializationId : new FormControl<number>(0),
    phoneNumber : new FormControl<string>('0'),
    dateOfBirth : new FormControl<string>(''),
    password : new FormControl<string>(''),
    photo : new FormControl<string>('')
    // assistantID : new FormControl<string>(''),
    // assistantName : new FormControl<string>(''),
    // assistantPhoneNumber : new FormControl<string>(''),
    // assistantDateOfBirth : new
  });
  onSubmit(e : Event)
  {
    if(this.form.invalid) return
    const registerDoctor : RegisterDoctorDto = 
    {
        name : this.form.controls.name!,
        description : this.form.controls.description!,
        title : this.form.controls.title!,
        dateOfBirth : this.form.controls.dateOfBirth!,
        phoneNumber : this.form.controls.phoneNumber!,
        specializationId : this.doctorSpecialization,
        salary : this.form.controls.salary!
    };
    
    // this.doctorService.registerDoctor(registerDoctor).subscribe({
    //   next:()=>
    //   {
    //     console.log(this.registerDoctor)
    //   },
    //   error:()=>
    //   {
    //     console.log("api failed")
    //   }
    // })
  }
  onSelect(e:Event)
  {
    this.doctorSpecialization = (e.target as any).value;
    
  }
}
