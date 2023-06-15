import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CoursesComponent } from './courses/courses.component';
import { StudentComponent } from './student/student.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { MarksComponent } from './marks/marks.component';
import { StudentHomeComponent } from './student-home/student-home.component';

const routes: Routes = [
  { path: 'student/:studentId', component:StudentComponent },
  {path:'',component:MainHomeComponent},
  {path:'login',component:LoginComponent},
  {
    path: 'home',
    canActivate:[AuthGuard],component:HomeComponent
  },
  {path:'login/main-home',component:MainHomeComponent},
  {path:'courses',component:CoursesComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'attendance',component:AttendanceComponent},
  {path:'marks',component:MarksComponent},
  {path:'student-home/:studentId',canActivate:[AuthGuard],component:StudentHomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
