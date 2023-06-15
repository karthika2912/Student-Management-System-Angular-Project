import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Student} from '../models/student.model';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
    
  baseUrl='http://localhost:8001/api/student-list/';
  apiUrl='http://localhost:3000/courses';
  stu_post='http://localhost:8001/api/create_new/';
  del_stu="http://localhost:8001/api/delete_obj/"
  constructor(private http:HttpClient) { }

  getDataCount(){
    return this.http.get<any[]>(this.baseUrl).toPromise()
      .then(data => (data ?? []).length)
      .catch(error => {
        console.error('Error fetching data:', error);
        return 0;
      });
  }
 

  getStudents(){
    return this.http.get<Student[]>(this.baseUrl)
  }
 
  postStudents( student: Student){
    return this.http.post<Student>(this.stu_post,student);
  }
  
  deleteStudent(id:string){
    console.log("deleting"+id);
    return this.http.delete(this.del_stu+id+'/');
  }
  deleteStudentfromCourses(id:string){
    console.log("del from courses"+this.apiUrl+'/'+id);
    return this.http.delete(this.apiUrl+'/'+id);
  }



}
