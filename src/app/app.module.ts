import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { FormLayoutComponent } from './form-layout/form-layout.component';
import { GenralTablesComponent } from './genral-tables/genral-tables.component';
import { DataTablesComponent } from './data-tables/data-tables.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './authentication/login/login.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    FormsComponent,
    FormLayoutComponent,
    GenralTablesComponent,
    DataTablesComponent,
    DoctorProfileComponent,
    LoginComponent,
    AdminProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
