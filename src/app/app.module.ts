import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentComponent } from './student/student.component';
import { HomeComponent } from './home/home.component';
import { MatCardModule } from '@angular/material/card';

import { MatChipsModule } from '@angular/material/chips';
import { LoginComponent } from './login/login.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { AuthGuard } from './guards/auth.guard';
import { CoursesComponent } from './courses/courses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { MarksComponent } from './marks/marks.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { trigger, style, transition, animate } from '@angular/animations';
import {MatInputModule} from '@angular/material/input';

import {FormsModule} from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';


import {MatStepperModule} from '@angular/material/stepper';

import {MatToolbarModule} from '@angular/material/toolbar';
import { EmptyListDialogComponent } from './empty-list-dialog/empty-list-dialog.component';
import { CounterComponent } from './counter/counter.component';

import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';

import {Component} from '@angular/core';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StudentComponent,
    HomeComponent,
   
    LoginComponent,
        MainHomeComponent,
        CoursesComponent,
        DashboardComponent,
        AttendanceComponent,
        MarksComponent,
        StudentHomeComponent,
        EmptyListDialogComponent,
        CounterComponent
  ],
  imports: [
    NgFor,
    MatSelectModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
  MatDividerModule,
  MatListModule ,
  MatExpansionModule,
  MatChipsModule,
  MatDialogModule,
  MatInputModule,FormsModule,MatStepperModule,MatDatepickerModule,MatNativeDateModule, MatRadioModule ,                                                                             
  MatIconModule,MatBadgeModule,MatToolbarModule,TextFieldModule, MatFormFieldModule,MatCardModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
