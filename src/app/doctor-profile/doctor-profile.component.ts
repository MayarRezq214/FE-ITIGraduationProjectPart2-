import { Component, OnInit, ViewChild } from '@angular/core';
import { GetDoctorByPhoneDto } from '../types/GetDoctorByPhoneDto';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../services/doctor.service';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { UpdateDoctorStatusDto } from '../types/UpdateDoctorStatusDto';
import { NavigateToDoctorProfileAfterOnboardingService } from '../services/navigate-to-doctor-profile-after-onboarding.service';
import { SearchService } from '../services/search.service';
import { GetAllDoctorsDto } from '../types/GetAllDoctorsDto';
import { GetAllSpecializationsDto } from '../types/GetAllSpecializationsDto';
import { GetDoctorByIDDto } from '../types/GetDoctorrByIDDto';
import { GetDoctorByIDForAdminDto } from '../types/GetDoctorByIDForAdminDto';
import { DataBetweenAddDrDrProfileService } from '../services/data-between-add-dr-dr-profile.service';
import { DoctorsForAllSpecializations } from '../types/DoctorsForAllSpecializations';


@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent  implements OnInit{
  doctor? : GetDoctorByIDForAdminDto
  updateDoctor? : UpdateDoctorStatusDto = 
  {
    name : '',
    title : '',
    description :'',
    salary : 0,
    phoneNumber : '',
    dateOfBirth : '',
  }
  
      isUploading : boolean = false
      id ? :number 
      // form = new FormGroup ({
      //   name : new FormControl<string>(''),
      //   title : new FormControl<string>(''),
      //   description : new FormControl<string>(''),
      //   salary : new FormControl<number>(0), 
      //   specializationId : new FormControl<number>(0),
      //   phoneNumber : new FormControl<string>('0'),
      //   dateOfBirth : new FormControl<string>(''),
      //   password : new FormControl<string>(''),
      //   photo : new FormControl<string>(''),
      // })
  
      @ViewChild('form') form : NgForm | undefined ;
      
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
                    private dataFromRegisterDr: DataBetweenAddDrDrProfileService
                    ) {}

  ngOnInit() {
    
     // console.log(this.navigate.doctor)
     this.dataFromRegisterDr.currentDoctorId.subscribe(doctorId=>this.doctorId=doctorId)
      this.doctor = this.navigate.doctor
      //console.log(this.doctor)
     console.log(this.doctorId)
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

  onEdit(){
    this.form?.setValue({
      name : this.doctor?.name,
      title : this.doctor?.title,
      description : this.doctor?.description,
      phoneNumber : this.doctor?.phoneNumber,
      salary : this.doctor?.salary,
      dateOfBirth : this.doctor?.dateOfBirth,
      
   //   photo : this.doctor?.imageUrl
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
        this.doctorService.getDoctorByIdForAdmin(this.doctorId).subscribe({
          next:(doctorByPhone) => {
            this.doctor = doctorByPhone;
            
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

      onSave(e : Event, form : any){
        e.preventDefault();
        console.log((e.target as HTMLInputElement).value)
        
      //   if(this.form.controls.photo){
      //     console.log(this.form.controls.photo.value?.split('\\')[2])
      //   this.doctorService.UploadPhoto(this.doctorId, this.form.controls.photo.value!).subscribe({
      //     next:() =>{

      //     },
      //     error:(error)=>{
            
      //       console.log("upload phot api failed",error)
      //     }
      //   })
      // }
      
          this.updateDoctor = {
            id : this.doctorId,
            name: this.form?.value.name,
            title : this.form?.value.title,
            description : this.form?.value.description,
            salary : this.form?.value.salary,
            phoneNumber : this.form?.value.phoneNumber,
            dateOfBirth : this.form?.value.dateOfBirth,
          }
          console.log(this.updateDoctor)
          console.log(this.doctorId)

          this.doctorService.UpdateDoctor(this.doctorId,this.updateDoctor).subscribe({
            next:()=>{

            },
            error:(error)=>{
              console.log("update api failed",error)
            }
          })
        
      }
      
    }
