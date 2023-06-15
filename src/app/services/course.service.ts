import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:8001/api/dept_course/';
  private course_student_url ='http://localhost:8001/api/get_student_course/'
  private del_course_student='http://localhost:8001/api/delete_course_student_object/'

  private res=[];
  private courses: string[] = ["hii"];

  getCourses(dept:string):Observable<Course[]>{
    console.log(dept+"in getcourses servics")
    this.apiUrl=this.apiUrl+dept;
    console.log(this.apiUrl)
    return this.http.get<Course[]>(this.apiUrl)
    
  }

  getStudentCourses(id:string):Observable<any[]>{
    return this.http.get<any[]>(this.course_student_url+id+'/')
  }
  
  setCourses(courses: string[]): void {
    this.courses = courses;
  }

  deleteStudentfromCourses(id:string){
    return this.http.delete(this.del_course_student+id);
  }
 

}
