import { Component, OnInit, ViewChild } from '@angular/core';
import { GetDoctorByPhoneDto } from '../Types/GetDoctorByPhoneDto';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../services/doctor.service';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { UpdateDoctorStatusDto } from '../Types/UpdateDoctorStatusDto';
import { NgModule }  from '@angular/core';
import { NavigateToDoctorProfileAfterOnboardingService } from '../services/navigate-to-doctor-profile-after-onboarding.service';
import { SearchService } from '../services/search.service';
import { GetAllDoctorsDto } from '../Types/GetAllDoctorsDto';
import { GetAllSpecializationsDto } from '../Types/GetAllSpecializationsDto';
import { DoctorsForAllSpecializations } from '../Types/DoctorsForAllSpecializations';
import { GetDoctorByIDDto } from '../Types/GetDoctorrByIDDto';
import { GetDoctorByIDForAdminDto } from '../Types/GetDoctorByIDForAdminDto';
import { DataBetweenAddDrDrProfileService } from '../services/data-between-add-dr-dr-profile.service';
import { WeekScheduleForDoctorsDto } from '../Types/WeekScheduleForDoctorsDto';
import * as moment from 'moment';

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
      
  
      @ViewChild('form') form : NgForm | undefined ;
      @ViewChild ('weekScheduleForm') weekScheduleForm : NgForm | undefined ;

      sId : number =0;
  
      dId! : string;
      doctorId: string = '0';
      weekScheduleRecord? : WeekScheduleForDoctorsDto
      doctors?: GetAllDoctorsDto[];
      specializations?: GetAllSpecializationsDto[];
      Doctors? : DoctorsForAllSpecializations[];
      doctorById?: GetDoctorByIDDto;
      isDoctorSelected : boolean =false;
      isSpecializationSelected: boolean = false;
      available0? : boolean 

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

      this.onOpenShifts()
  }

  onEdit(){
    this.form?.setValue({
      name : this.doctor?.name,
      title : this.doctor?.title,
      description : this.doctor?.description,
      phoneNumber : this.doctor?.phoneNumber,
      salary : this.doctor?.salary,
      dateOfBirth : this.doctor?.dateOfBirth.replace('T00:00:00',' ').trim(),
      
   //   photo : this.doctor?.imageUrl
    })
  }
      onOpenShifts(){
        
          this.weekScheduleForm?.setValue({
          start0 : moment(this.doctor?.weekSchadual[0].startTime, 'h:m:s A').format('HH:mm:ss'),
          end0: moment(this.doctor?.weekSchadual[0].endTime, 'h:m:s A').format('HH:mm:ss'),
          limit0 : this.doctor?.weekSchadual[0].limitOfPatients,
          available0 :this.doctor?.weekSchadual[0].isAvailable,
          start1 : moment(this.doctor?.weekSchadual[1].startTime, 'h:m:s A').format('HH:mm:ss'),
          end1: moment(this.doctor?.weekSchadual[1].endTime, 'h:m:s A').format('HH:mm:ss'),
          limit1 : this.doctor?.weekSchadual[1].limitOfPatients,
          available1 :this.doctor?.weekSchadual[1].isAvailable,
          start2 : moment(this.doctor?.weekSchadual[2].startTime, 'h:m:s A').format('HH:mm:ss'),
          end2: moment(this.doctor?.weekSchadual[2].endTime, 'h:m:s A').format('HH:mm:ss'),
          limit2 : this.doctor?.weekSchadual[2].limitOfPatients,
          available2 :this.doctor?.weekSchadual[2].isAvailable,
          start3 : moment(this.doctor?.weekSchadual[3].startTime, 'h:m:s A').format('HH:mm:ss'),
          end3: moment(this.doctor?.weekSchadual[3].endTime, 'h:m:s A').format('HH:mm:ss'),
          limit3 : this.doctor?.weekSchadual[3].limitOfPatients,
          available3 :this.doctor?.weekSchadual[3].isAvailable,
          start4: moment(this.doctor?.weekSchadual[4].startTime, 'h:m:s A').format('HH:mm:ss'),
          end4: moment(this.doctor?.weekSchadual[4].endTime, 'h:m:s A').format('HH:mm:ss'),
          limit4 : this.doctor?.weekSchadual[4].limitOfPatients,
          available4 :this.doctor?.weekSchadual[4].isAvailable,
          start5 : moment(this.doctor?.weekSchadual[5].startTime, 'h:m:s A').format('HH:mm:ss'),
          end5: moment(this.doctor?.weekSchadual[5].endTime, 'h:m:s A').format('HH:mm:ss'),
          limit5 : this.doctor?.weekSchadual[5].limitOfPatients,
          available5 :this.doctor?.weekSchadual[5].isAvailable,
          start6 : moment(this.doctor?.weekSchadual[6].startTime, 'h:m:s A').format('HH:mm:ss'),
          end6: moment(this.doctor?.weekSchadual[6].endTime, 'h:m:s A').format('HH:mm:ss'),
          limit6 : this.doctor?.weekSchadual[6].limitOfPatients,
          available6 :this.doctor?.weekSchadual[6].isAvailable,
        })
      }
      onApply(e : Event , index : number){
         if(index==0)
          {
            let y:boolean = this.weekScheduleForm?.value.available0
            if(y){y==true}
        if(!y)
        {y==false}
            this.weekScheduleRecord = {
              id : this.doctor?.weekSchadual[0].id!,
              startTime : this.weekScheduleForm?.value.start0,
              endTime : this.weekScheduleForm?.value.end0,
              limitOfPatients : this.weekScheduleForm?.value.limit0,
              isAvailable : y,
              dayOfWeek : index,
              doctorId : this.doctorId
            }
          }
          if(index==1)
          {
            let y:boolean = this.weekScheduleForm?.value.available1
              if(this.weekScheduleForm?.value.available1=='true')
               {y=true}
                 if(this.weekScheduleForm?.value.available1=='false')
                  {y=false}
            this.weekScheduleRecord = {
              id : this.doctor?.weekSchadual[1].id!,
              startTime : this.weekScheduleForm?.value.start1,
              endTime : this.weekScheduleForm?.value.end1,
              limitOfPatients : this.weekScheduleForm?.value.limit1,
              isAvailable : y,
              dayOfWeek : index,
              doctorId : this.doctorId
            }
          }
          if(index==2)
          {
            let y:boolean = this.weekScheduleForm?.value.available2
              if(this.weekScheduleForm?.value.available2=='true')
               {y=true}
                 if(this.weekScheduleForm?.value.available2=='false')
                  {y=false}
            this.weekScheduleRecord = {
              id : this.doctor?.weekSchadual[2].id!,
              startTime : this.weekScheduleForm?.value.start2,
              endTime : this.weekScheduleForm?.value.end2,
              limitOfPatients : this.weekScheduleForm?.value.limit2,
              isAvailable : y,
              dayOfWeek : index,
              doctorId : this.doctorId
            }
          
          }
          if(index==3)
          {
            let y:boolean = this.weekScheduleForm?.value.available3
              if(this.weekScheduleForm?.value.available3=='true')
               {y=true}
                 if(this.weekScheduleForm?.value.available3=='false')
                  {y=false}
            this.weekScheduleRecord = {
              id : this.doctor?.weekSchadual[3].id!,
              startTime : this.weekScheduleForm?.value.start3,
              endTime : this.weekScheduleForm?.value.end3,
              limitOfPatients : this.weekScheduleForm?.value.limit3,
              isAvailable : y,
              dayOfWeek : index,
              doctorId : this.doctorId
            }
          }
          if(index==4)
          {
            let y:boolean = this.weekScheduleForm?.value.available4
              if(this.weekScheduleForm?.value.available4=='true')
               {y=true}
                 if(this.weekScheduleForm?.value.available4=='false')
                  {y=false}
            this.weekScheduleRecord = {
              id : this.doctor?.weekSchadual[4].id!,
              startTime : this.weekScheduleForm?.value.start4,
              endTime : this.weekScheduleForm?.value.end4,
              limitOfPatients : this.weekScheduleForm?.value.limit4,
              isAvailable : y,
              dayOfWeek : index,
              doctorId : this.doctorId
            }
          }
          if(index==2)
          {
            let y:boolean = this.weekScheduleForm?.value.available2
              if(this.weekScheduleForm?.value.available1=='true')
               {y=true}
                 if(this.weekScheduleForm?.value.available1=='false')
                  {y=false}
            this.weekScheduleRecord = {
              id : this.doctor?.weekSchadual[2].id!,
              startTime : this.weekScheduleForm?.value.start2,
              endTime : this.weekScheduleForm?.value.end2,
              limitOfPatients : this.weekScheduleForm?.value.limit2,
              isAvailable : y,
              dayOfWeek : index,
              doctorId : this.doctorId
            }
          }
          if(index==5)
          {
            let y:boolean = this.weekScheduleForm?.value.available5
              if(this.weekScheduleForm?.value.available5=='true')
               {y=true}
                 if(this.weekScheduleForm?.value.available5=='false')
                  {y=false}
            this.weekScheduleRecord = {
              id : this.doctor?.weekSchadual[5].id!,
              startTime : this.weekScheduleForm?.value.start5,
              endTime : this.weekScheduleForm?.value.end5,
              limitOfPatients : this.weekScheduleForm?.value.limit5,
              isAvailable : y,
              dayOfWeek : index,
              doctorId : this.doctorId
            }
          }
          if(index==6)
          {
            let y:boolean = this.weekScheduleForm?.value.available6
              if(this.weekScheduleForm?.value.available6=='true')
               {y=true}
                 if(this.weekScheduleForm?.value.available6=='false')
                  {y=false}
            this.weekScheduleRecord = {
              id : this.doctor?.weekSchadual[6].id!,
              startTime : this.weekScheduleForm?.value.start6,
              endTime : this.weekScheduleForm?.value.end6,
              limitOfPatients : this.weekScheduleForm?.value.limit6,
              isAvailable : y,
              dayOfWeek : index,
              doctorId : this.doctorId
            }
          }
          
          
          
        this.doctorService.updateWeekScheduleRecord(this.weekScheduleRecord!,this.doctor?.weekSchadual[index].id!).subscribe({
          next:()=>{
            console.log(this.weekScheduleRecord)
            
          },
          error:(error)=>{
            console.log("update week schedule failed ", error)
          }
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
          next:(doctor) => {
            this.doctor = doctor;

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
