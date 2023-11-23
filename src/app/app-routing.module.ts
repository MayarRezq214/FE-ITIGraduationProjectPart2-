import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { FormLayoutComponent } from './form-layout/form-layout.component';
import { GenralTablesComponent } from './genral-tables/genral-tables.component';
import { DataTablesComponent } from './data-tables/data-tables.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { LoginComponent } from './authentication/login/login.component';


const routes: Routes = [
  {path: '' , component:DashboardComponent},
  {path: 'header',component:HeaderComponent},
  {path: 'footer' , component:FooterComponent},
  {path: 'sidebar' , component:SidebarComponent},
  {path: 'dashboard' , component:DashboardComponent},
  {path : 'forms' , component : FormsComponent},
  {path : 'formsLayout' , component : FormLayoutComponent},
  {path : 'genralTables' , component : GenralTablesComponent},
  {path : 'dataTables' , component : DataTablesComponent},
  {path : 'doctorProfile' , component : DoctorProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
