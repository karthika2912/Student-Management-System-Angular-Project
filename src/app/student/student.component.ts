import { Component,EventEmitter,Input, OnInit, Output} from '@angular/core';
import {Student} from '../models/student.model';
import { Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../services/student.service';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  @Input() student: Student;
  @Output() deleteStudent = new EventEmitter<number>();
  @Output() editStudent = new EventEmitter<number>();
 
  
  Id_List:number[]=[];
  private courses: any = [];
  apiUrl:string="http://localhost:3000/courses/";
  constructor(private router:Router,private courseService:CourseService,private http:HttpClient,private studentService:StudentService) {
    this.student={
      roll:'',
      firstname:'',
      lastname:'',
      dob:'',
      gender:'',
      department:'',
    }
  }
  deleteStudentClick(){
    this.deleteStudent.emit(this.student.id);
  }
  editStudentClick(){
    this.editStudent.emit(this.student.id);
  }
  
  viewStudent(){
    console.log("Hello view"+this.student);
    this.router.navigate(['courses'],{ queryParams: { studentId: this.student.id,studDept:this.student.department } })

  }
  
  deleteCourseByStudId(studId: number| 0) {
    if(studId){
    this.courseService.deleteStudentfromCourses(studId.toString()).subscribe(
      response => {
      
        console.log('Data deleted successfully');
      },
      error => {
        
        console.error('An error occurred while deleting data:', error);
      }

    )
    }
    
  }
  
  
  
  
  
  
  
}
