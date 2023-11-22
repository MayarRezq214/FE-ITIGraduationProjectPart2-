import { Component, OnInit } from '@angular/core';
import { GetDoctorByPhoneDto } from '../Types/GetDoctorByPhoneDto';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../services/doctor.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UpdateDoctorStatusDto } from '../Types/UpdateDoctorDto';
import { NavigateToDoctorProfileAfterOnboardingService } from '../services/navigate-to-doctor-profile-after-onboarding.service';
import { SearchService } from '../services/search.service';
import { GetAllDoctorsDto } from '../Types/GetAllDoctorsDto';
import { GetAllSpecializationsDto } from '../Types/GetAllSpecializationsDto';
import { DoctorsForAllSpecializations } from '../Types/DoctorsForAllSpecializations';
import { GetDoctorByIDDto } from '../Types/GetDoctorrByIDDto';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent  implements OnInit{
  doctor? : GetDoctorByIDDto
  updateDoctor? : UpdateDoctorStatusDto
  isUploading : boolean = false
  id ? :number 
  form = new FormGroup ({
    name : new FormControl<string>(''),
    title : new FormControl<string>(''),
    description : new FormControl<string>(''),
    salary : new FormControl<number>(0), 
    specializationId : new FormControl<number>(0),
    phoneNumber : new FormControl<string>('0'),
    dateOfBirth : new FormControl<string>(''),
    password : new FormControl<string>(''),
    photo : new FormControl<string>(''),
  })
  
  sId : number =0;
  
  dId! : string;
  doctorId: string = '0';

  doctors?: GetAllDoctorsDto[];
  specializations?: GetAllSpecializationsDto[];
  Doctors? : DoctorsForAllSpecializations[];
  doctorById?: GetDoctorByIDDto;
  isDoctorSelected : boolean =false;
  isSpecializationSelected: boolean = false;
  constructor( private route: ActivatedRoute ,
                private doctorService : DoctorService, 
                private navigate : NavigateToDoctorProfileAfterOnboardingService,
                ) {}

  ngOnInit() {
    
      console.log(this.navigate.doctor)
      //this.doctor = this.navigate.doctor
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
  selected(e: Event):void{

    this.isSpecializationSelected = true;
    this.id = (e.target as any).value;
    
    
    if(this.id == 0){
      this.isSpecializationSelected = false;
    }
    this.Doctors = this.specializations?.find(s => s.id == this.id)?.doctorsForAllSpecializations!
    console.log(this.Doctors)
  }


doctorSelected(event: Event):void{

  this.doctorId = (event.target as HTMLSelectElement).value;
  
  this.isDoctorSelected = true;
  if(this.doctorId == "allDoctors"){
    this.isDoctorSelected = false;
  }

}
onSearch(e: Event){
  this.doctorService.getDoctorById(this.doctorId).subscribe({
    next:(doctorById) => {
      this.doctor = doctorById;
      
     },
    error: (error) => {
      console.log('calling dr by id api failed', error);
    },
  })
}
  uploadPhoto(e:Event){
    e.preventDefault()
    this.isUploading = true
    
  }

  onSave(e : Event){
    e.preventDefault();
    console.log((e.target as HTMLInputElement).value)
    
  //   if(this.form.controls.photo){
  //     if(this.route.snapshot.queryParams['id']){
  //   this.doctorService.UploadPhoto(this.route.snapshot.queryParams['id'], this.form.controls.photo.value?.split('\\')[2]!).subscribe({
  //     next:() =>{

  //     },
  //     error:(error)=>{
        
  //       console.log("upload phot api failed",error)
  //     }
  //   })
  // }}

      this.updateDoctor = {
        name : this.form.controls.name.value!,
        title : this.form.controls.title.value!,
        description : this.form.controls.description.value!,
        salary : this.form.controls.salary.value!,
        phoneNumber : this.form.controls.phoneNumber.value!,
        dateOfBirth : this.form.controls.dateOfBirth.value!,
      }
      console.log(this.updateDoctor)
      this.doctorService.UpdateDoctor(this.doctor?.id!,this.updateDoctor).subscribe({
        next:()=>{

        },
        error:(error)=>{
          console.log("update api failed",error)
        }
      })
    
  }
  
}
