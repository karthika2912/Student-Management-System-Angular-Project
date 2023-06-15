import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { MatDialog } from '@angular/material/dialog';
import { EmptyListDialogComponent } from '../empty-list-dialog/empty-list-dialog.component';
@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.css']
})
export class MarksComponent implements OnInit{
  
    student_list:any=[];
    course_list:any=[];
    selected_course:string="";
    student_id:string="";
    marksForm: FormGroup = new FormGroup({});
    visible=false;
    temp_list:any=[];
    result_list:any=[];
    sessional_total:number=0;
    external_total:number=0;
    res_visible:boolean=false;
    percentage:number=0;
    course_visible:boolean=false;
    student:string="";
    courseId:number=0;

    constructor(public dialog: MatDialog,private http:HttpClient,private formBuilder:FormBuilder,private courseService:CourseService){}

    ngOnInit(): void {
     
      this.loadStudents();
      this.marksForm = this.formBuilder.group({
        sessional:Number,
        external:Number,

      
      });
    }

    loadStudents(){
      
        const url = 'http://localhost:8001/api/student-list/';
        this.http.get(url).subscribe(
          (data: any) => {
            console.log('Data retrieved successfully:', data);
            for(const ele of data){
              this.student_list.push(ele)
              
            }
          },
          (error) => {
            console.error('Error retrieving data:', error);
          }
        );
    }
    loadResults(id:string){
      this.course_visible=true;
      this.res_visible=true;
     
      this.result_list=[];
      console.log("id"+id);
      this.http.get<any[]>('http://localhost:8001/api/get_marks/'+id).subscribe(
        (response) => {
         console.log("recieved"+response) 
         for(const obj of response){
          
            this.student=obj.firstname;
            this.result_list.push(obj);
          
         } 
         for(const ele of this.result_list)
         {
            this.sessional_total+=ele.sessional;
            this.external_total+=ele.external;
         }
         console.log("resulsts:"+this.result_list)      
         this.percentage=(this.sessional_total+this.external_total)/(this.result_list.length)                                                                                
        },
        (error) => {
          console.log('Error fetching courses:', error);
        }
      );

    }
    loadCourses(id:string){
      this.course_list=[];
      this.student_id=id;
      this.course_visible=true;
      this.courseService.getStudentCourses(this.student_id).subscribe(
        (res: any[]) => {
          console.log("Student courses finally"+res)
          if(res.length==0)
          {
            this.openEmptyListDialog();
          }
          for(const ele of res){
  
          const url = 'http://localhost:8001/api/get_course_by_id/'+ele.course_name; // Replace with your desired URL
  
          this.http.get(url).subscribe(
            (data: any) => {
            
               this.course_list.push(data.course_title)
            },
            (error: any) => {
              console.error('An error occurred:', error);
            }
          );
          }
  
        },
        
        (error: any) => {
          console.error('An error occurred:', error);
        }
      );
     
      const url = 'http://localhost:8001/api/get_marks/' // Replace with your desired URL
          console.log(url+this.student_id)
          this.http.get(url+this.student_id).subscribe(
            (data: any) => {
               console.log(data)
               for(const ele of data){
                const newurl = 'http://localhost:8001/api/get_course_by_id/'+ele.course; // Replace with your desired URL
                console.log(newurl)
                console.log("Hello")
                this.http.get(newurl).subscribe(
                  (res: any) => {
                     console.log("Res"+res.course_title);
                     this.temp_list.push(res.course_title)
                     
                  },
                  (error: any) => {
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
    loadMarks(course:string){
      
      this.selected_course=course;
      this.http.get<any[]>('http://localhost:8001/api/get_course_by_name/'+this.selected_course).subscribe(
        (response) => {
           console.log("LoadMarks"+response)
           for(const ele of response){
            this.courseId=ele.id
           }
        },
        (error) => {
          console.log('Error fetching courses:', error);
        }
      );
      this.visible=true;
    }
    onSubmit(){
      this.visible=false;
      this.course_visible=false;
      console.log("Hello")
      let data={
        "sessional":this.marksForm.value.sessional,
        "external":this.marksForm.value.external,
        "course":this.courseId,
        "student":this.student_id
      }
      console.log("Data:"+data);
      console.log(data.sessional+" "+data.external+" "+data.course+" "+data.student)
      this.http.post<any>('http://localhost:8001/api/marks_post/', data)
      .subscribe(
        response => {
          console.log('Data posted successfully:', response);
        },
        error => {
          console.error('Error posting data:', error);
        }
      );
      window.location.reload();
    }
    
  openEmptyListDialog() {
    const dialogRef = this.dialog.open(EmptyListDialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      // Dialog closed
    });
  }
   
  
}

