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
import { shareReplay } from 'rxjs';

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
      available1? : boolean
      available2? :boolean
      available3? : boolean
      available4? :boolean
      available5? :boolean
      available6? :boolean
      status? : boolean
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
    //  status : this.doctor?.status
   //   photo : this.doctor?.imageUrl
    })
  }
      onOpenShifts(){
        this.available0 = this.doctor?.weekSchadual[0].isAvailable
        this.available1 = this.doctor?.weekSchadual[1].isAvailable
        this.available2 = this.doctor?.weekSchadual[2].isAvailable
        this.available3 = this.doctor?.weekSchadual[3].isAvailable
        this.available4 = this.doctor?.weekSchadual[4].isAvailable
        this.available5 = this.doctor?.weekSchadual[5].isAvailable
        this.available6 = this.doctor?.weekSchadual[6].isAvailable

          this.weekScheduleForm?.setValue({
          start0 : moment(this.doctor?.weekSchadual[0].startTime, 'h:m:s A').format('HH:mm:ss'),
          end0: moment(this.doctor?.weekSchadual[0].endTime, 'h:m:s A').format('HH:mm:ss'),
          limit0 : this.doctor?.weekSchadual[0].limitOfPatients,
        //  available0 :this.doctor?.weekSchadual[0].isAvailable,
          start1 : moment(this.doctor?.weekSchadual[1].startTime, 'h:m:s A').format('HH:mm:ss'),
          end1: moment(this.doctor?.weekSchadual[1].endTime, 'h:m:s A').format('HH:mm:ss'),
          limit1 : this.doctor?.weekSchadual[1].limitOfPatients,
          // available1 :this.doctor?.weekSchadual[1].isAvailable,
          start2 : moment(this.doctor?.weekSchadual[2].startTime, 'h:m:s A').format('HH:mm:ss'),
          end2: moment(this.doctor?.weekSchadual[2].endTime, 'h:m:s A').format('HH:mm:ss'),
          limit2 : this.doctor?.weekSchadual[2].limitOfPatients,
          // available2 :this.doctor?.weekSchadual[2].isAvailable,
          start3 : moment(this.doctor?.weekSchadual[3].startTime, 'h:m:s A').format('HH:mm:ss'),
          end3: moment(this.doctor?.weekSchadual[3].endTime, 'h:m:s A').format('HH:mm:ss'),
          limit3 : this.doctor?.weekSchadual[3].limitOfPatients,
          // available3 :this.doctor?.weekSchadual[3].isAvailable,
          start4: moment(this.doctor?.weekSchadual[4].startTime, 'h:m:s A').format('HH:mm:ss'),
          end4: moment(this.doctor?.weekSchadual[4].endTime, 'h:m:s A').format('HH:mm:ss'),
          limit4 : this.doctor?.weekSchadual[4].limitOfPatients,
          // available4 :this.doctor?.weekSchadual[4].isAvailable,
          start5 : moment(this.doctor?.weekSchadual[5].startTime, 'h:m:s A').format('HH:mm:ss'),
          end5: moment(this.doctor?.weekSchadual[5].endTime, 'h:m:s A').format('HH:mm:ss'),
          limit5 : this.doctor?.weekSchadual[5].limitOfPatients,
          // available5 :this.doctor?.weekSchadual[5].isAvailable,
          start6 : moment(this.doctor?.weekSchadual[6].startTime, 'h:m:s A').format('HH:mm:ss'),
          end6: moment(this.doctor?.weekSchadual[6].endTime, 'h:m:s A').format('HH:mm:ss'),
          limit6 : this.doctor?.weekSchadual[6].limitOfPatients,
          // available6 :this.doctor?.weekSchadual[6].isAvailable,
        })
      }
      onApply(e : Event , index : number){
         if(index==0)
          {
            
            this.weekScheduleRecord = {
              id : this.doctor?.weekSchadual[0].id!,
              startTime : this.weekScheduleForm?.value.start0,
              endTime : this.weekScheduleForm?.value.end0,
              limitOfPatients : this.weekScheduleForm?.value.limit0,
              isAvailable : this.available0!,
              dayOfWeek : index,
              doctorId : this.doctorId
            }
          }
          if(index==1)
          {
            
            this.weekScheduleRecord = {
              id : this.doctor?.weekSchadual[1].id!,
              startTime : this.weekScheduleForm?.value.start1,
              endTime : this.weekScheduleForm?.value.end1,
              limitOfPatients : this.weekScheduleForm?.value.limit1,
              isAvailable : this.available1!,
              dayOfWeek : index,
              doctorId : this.doctorId
            }
          }
          if(index==2)
          {
            
            this.weekScheduleRecord = {
              id : this.doctor?.weekSchadual[2].id!,
              startTime : this.weekScheduleForm?.value.start2,
              endTime : this.weekScheduleForm?.value.end2,
              limitOfPatients : this.weekScheduleForm?.value.limit2,
              isAvailable : this.available2!,
              dayOfWeek : index,
              doctorId : this.doctorId
            }
          
          }
          if(index==3)
          {
            this.weekScheduleRecord = {
              id : this.doctor?.weekSchadual[3].id!,
              startTime : this.weekScheduleForm?.value.start3,
              endTime : this.weekScheduleForm?.value.end3,
              limitOfPatients : this.weekScheduleForm?.value.limit3,
              isAvailable : this.available3!,
              dayOfWeek : index,
              doctorId : this.doctorId
            }
          }
          if(index==4)
          {
            this.weekScheduleRecord = {
              id : this.doctor?.weekSchadual[4].id!,
              startTime : this.weekScheduleForm?.value.start4,
              endTime : this.weekScheduleForm?.value.end4,
              limitOfPatients : this.weekScheduleForm?.value.limit4,
              isAvailable : this.available4!,
              dayOfWeek : index,
              doctorId : this.doctorId
            }
          }
          if(index==5)
          {
            this.weekScheduleRecord = {
              id : this.doctor?.weekSchadual[5].id!,
              startTime : this.weekScheduleForm?.value.start2,
              endTime : this.weekScheduleForm?.value.end2,
              limitOfPatients : this.weekScheduleForm?.value.limit2,
              isAvailable : this.available5!,
              dayOfWeek : index,
              doctorId : this.doctorId
            }
          }
          
          if(index==6)
          {
            
            this.weekScheduleRecord = {
              id : this.doctor?.weekSchadual[6].id!,
              startTime : this.weekScheduleForm?.value.start6,
              endTime : this.weekScheduleForm?.value.end6,
              limitOfPatients : this.weekScheduleForm?.value.limit6,
              isAvailable : this.available6!,
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

      availableChange(e:Event){
        e.preventDefault();
        const s= (e.target as HTMLInputElement).value
          
       if(s=='true'){
         this.available0 = true
            }
        if( s=='false')
          {this.available0=false}
      }
      availableChange1(e:Event){
        e.preventDefault();
        const s= (e.target as HTMLInputElement).value
   
        if(s=='true'){
          this.available1 = true
             }
         if( s=='false')
           {this.available1=false}
      }
      availableChange2(e:Event){
        e.preventDefault();
        const s= (e.target as HTMLInputElement).value
   
        if(s=='true'){
          this.available2 = true
             }
         if( s=='false')
           {this.available2=false}
      }

      availableChange3(e:Event){
        e.preventDefault();
        const s= (e.target as HTMLInputElement).value
   
        if(s=='true'){
          this.available3 = true
             }
         if( s=='false')
           {this.available3=false}
      }

      availableChange4(e:Event){
        e.preventDefault();
        const s= (e.target as HTMLInputElement).value
   
        if(s=='true'){
          this.available4= true
             }
         if( s=='false')
           {this.available4=false}
      }
      availableChange5(e:Event){
        e.preventDefault();
        const s= (e.target as HTMLInputElement).value
   
        if(s=='true'){
          this.available5= true
             }
         if( s=='false')
           {this.available5=false}
      }
      availableChange6(e:Event){
        e.preventDefault();
        const s= (e.target as HTMLInputElement).value
   
        if(s=='true'){
          this.available6= true
             }
         if( s=='false')
           {this.available6=false}
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
      doctorStatusChange(e:Event){
        e.preventDefault();
       const s= (e.target as HTMLInputElement).value
         
      if(s=='true'){
        this.status = true
    }
    if( s=='false')
    {this.status=false}
      }
      onSave(e : Event, form : any){
        e.preventDefault();
        
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
            status :  this.status
          }
          console.log(this.updateDoctor)

          this.doctorService.UpdateDoctor(this.doctorId,this.updateDoctor).subscribe({
            next:()=>{

            },
            error:(error)=>{
              console.log("update api failed",error)
            }
          })
        
      }
      
    }
