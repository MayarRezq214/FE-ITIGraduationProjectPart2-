import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { GetDoctorByIDForAdminDto } from '../types/GetDoctorByIDForAdminDto';
import { AuthenticationService } from '../services/authentication.service';
import { GetAllPatientsWithDateDto } from '../types/GetAllPatientsWithDateDto';
// import { DatePipe } from '@angular/common';
import { format } from 'date-fns';
import { GetAllDoctorsDto } from '../types/GetAllDoctorsDto';
import { GetAllSpecializationsDto } from '../types/GetAllSpecializationsDto';
import { DoctorsForAllSpecializations } from '../types/DoctorsForAllSpecializations';
import { UpdateArrivalPatientStatusDto } from '../types/UpdateArrivalPatientStatusDto';
import { ReceptionService } from '../services/reception.service';



import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    constructor(private doctorService : DoctorService) {
      
      
    }
  ngOnInit(): void {
    const date = new Date()

    
    const year : number = date.getFullYear()
    const month : number = date.getMonth()+1
    const day : number = date.getDate()+0
    let startDate  = `${year}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`

    let endDate =new Date (date.setDate(date.getDate() + 30));

    const endyear : number = endDate.getFullYear()
    const endmonth : number = endDate.getMonth()+1
    const endDay : number = endDate.getDate()+0
  
   let endDate1 = `${endyear}-${endmonth.toString().padStart(2,'0')}-${endDay.toString().padStart(2,'0')}`

        if(day==26){
        this.doctorService.addVisitCount(startDate,endDate1).subscribe({
          next:()=>{
              
          },
          error:(error)=>{
            console.log("add visit count api failed",error)
          }
        })
      }
    }

   
export class DashboardComponent implements OnInit{
DoctorId? : string;
visits?: GetAllPatientsWithDateDto[];
formattedDate?: string;
isDoctorLoggedIn?: boolean;
isReceptionLoggedIn?: boolean;
doctorId: string = '0';
done: boolean = false;

constructor(private doctorService: DoctorService,
  private authenticationService : AuthenticationService,
  private receptionService: ReceptionService){}
  currentDate? = new Date();
  doctors?: GetAllDoctorsDto[];
  specializations?: GetAllSpecializationsDto[];
  isSpecializationSelected: boolean = false;
  id ? :number ;
  Doctors? : DoctorsForAllSpecializations[];
  isDoctorSelected : boolean =false;
  doctor? : GetDoctorByIDForAdminDto;
  patientVisit?: UpdateArrivalPatientStatusDto;

  ngOnInit(): void {
    this.authenticationService.isDoctorLoggedIn$.subscribe((isDoctorLoggedIn) => {
      this.isDoctorLoggedIn = isDoctorLoggedIn;
    });
    this.authenticationService.isReceptionLoggedIn$.subscribe((isReceptionLoggedIn) => {
      this.isReceptionLoggedIn = isReceptionLoggedIn;
    })

      this.formattedDate = format(this.currentDate!, 'yyyy-MM-dd');
      //this.formattedDate = this.currentDate?.toISOString();
      // console.log(this.formattedDate)
      if(this.isDoctorLoggedIn){
        this.DoctorId = localStorage.getItem('DoctorId')!

        //console.log(this.DoctorId)
        this.doctorService.getAllPatientsWithDates(this.formattedDate! , this.DoctorId).subscribe({
          next:(visit) => {
            this.visits = visit
            // console.log(this.visits)
          },
          error:(error) => {
            console.log('calling get patient visit api faild', error);
          }
        })
      }else if(this.isReceptionLoggedIn){
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
        this.doctorService.getAllPatientsWithDates(this.formattedDate! , this.doctor.id!).subscribe({
          next:(visit) => {
            this.visits = visit
            // console.log(this.visits)
          },
          error:(error) => {
            console.log('calling get patient visit api faild', error);
          }
        })
      },
      error: (error) => {
        console.log('calling dr by id api failed', error);
      },
    })
        
  }
  onArrive( status : string, id: number){
    console.log(id)
    this.patientVisit = ({
      id : id,
      visitStatus : status,
    });
    console.log(this.patientVisit!.id)
    this.receptionService.UpdatePatientVisitStatus(this.patientVisit!).subscribe({
      next:(patientVisit) => {
        console.log(patientVisit as GetAllPatientsWithDateDto)
        const index = this.visits?.findIndex(v => v.id === (patientVisit as GetAllPatientsWithDateDto).id)
        this.visits![index!] = patientVisit as GetAllPatientsWithDateDto;
        console.log();
      },
      error:(error) => {
        console.log('calling update patient visit status failed', error)
      }
    })
    if(status = 'done'){
      this.done = true;
    }
  }
}
