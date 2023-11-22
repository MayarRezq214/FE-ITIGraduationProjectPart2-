import { Component, OnInit } from '@angular/core';
import { GetDoctorByPhoneDto } from '../Types/GetDoctorByPhoneDto';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../services/doctor.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UpdateDoctorStatusDto } from '../Types/UpdateDoctorDto';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent  implements OnInit{
  doctor? : GetDoctorByPhoneDto
  updateDoctor? : UpdateDoctorStatusDto
  isUploading : boolean = false
  id ? :string 
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
  constructor( private route: ActivatedRoute ,
                private doctorService : DoctorService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(this.route.snapshot.queryParams['phoneNumber'])
      this.doctorService.GetDoctorByPhone(params['phoneNumber']).subscribe({
        next:(doctor) => {
          this.doctor = doctor;
         },
        error: (error) => {
          console.log('calling dr by id api failed', error);
        },
      });
      
    });
  }
  uploadPhoto(e:Event){
    e.preventDefault()
    this.isUploading = true
    
  }

  onSave(e : Event){
    e.preventDefault();
    console.log(this.form.controls.photo.value?.split('\\')[2])
    
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

      // this.doctorService.UpdateDoctor(params['id'],this.updateDoctor).subscribe({
      //   next:()=>{

      //   },
      //   error:(error)=>{
      //     console.log("update api failed")
      //   }
      // })
    
  }
  
}
