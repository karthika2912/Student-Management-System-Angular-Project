import { Component,OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {trigger, style, transition, animate} from '@angular/animations';
import { Course } from '../models/course.model';



@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  animations: [
    trigger('fadeInList', [
      transition('0 => *', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ])
    ])
  ]
   
})
                                                                                  
export class CoursesComponent implements OnInit {
  
  courses: any[] = [];
 
  selectedCourses: any[] = [];
  courseCount=this.selectedCourses.length;
  initialCourses: any[] = []; 
  mainCourses:any[]=[];
  studentId:string = "";
  removeList:any[]=[];
  a:any[]= []
  b:any[]=[];
  clist:any=[];
  topics_list:any=[];
  courses_display:any[]=[];
  stud_dept:string='';


  constructor(private courseService:CourseService,private http: HttpClient,private route: ActivatedRoute){
   
  }
  ngOnInit(): void {
    
    
    
    this.route.queryParams.subscribe(params => {
      this.studentId = params['studentId'];
      this.stud_dept=params['studDept']

  })
  this.fetchCourses();
  
}
  selectCourse(course: string): void {
     console.log("In select COurse"+this.courses_display)
     let id=0;
     for(const ele of this.courses_display){
      console.log(ele.course_title+" "+course)
      if(ele.course_title==course)
      {
        id=ele.id;
        console.log("Found")
      }
     }
     console.log("id:"+id+" "+"studentId:"+this.studentId)
     const url = 'http://localhost:8001/api/student_course/';  // Replace with your API endpoint URL

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'  // Set the appropriate content type
    });
  
    const body = {
      
      "course_name":id,
      "student_roll":this.studentId

    };
  
    this.http.post(url, body, { headers }).subscribe(
      response => {
        console.log('Data posted successfully:', response);
        
      },
      error => {
        console.error('Error posting data:', error);
       
      }
    );
    window.location.reload();
    
  }

  isSelected(course: string): boolean {
    let flag=false;
    for(const ele of this.selectedCourses)
    {
       if(ele.course_title==course)
      {
        return true;
      }
    }
    return false;
  }
    
  fetchCourses(): void {
    console.log(this.studentId);
    this.courseService.getCourses(this.stud_dept).subscribe(
      (res: Course[]) => {
        console.log("Courses finally"+res)
        this.courses_display = res;
        console.log("Courses finally"+res)
      },
      (error: any) => {
        console.error('An error occurred:', error);
      }
    );
    this.courseService.getStudentCourses(this.studentId).subscribe(
      (res: any[]) => {
        console.log("Student courses finally"+res)
        for(const ele of res){

        const url = 'http://localhost:8001/api/get_course_by_id/'+ele.course_name; // Replace with your desired URL

        this.http.get(url).subscribe(
          (data: any) => {
          
             this.selectedCourses.push(data.course_title)
             this.courseCount=this.selectedCourses.length
          },
          (error: any) => {
            // Handle any errors
            console.error('An error occurred:', error);
          }
        );
        }

      },
      (error: any) => {
        console.error('An error occurred:', error);
      }
    );
    

  }
  

}
