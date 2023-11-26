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

   
}
