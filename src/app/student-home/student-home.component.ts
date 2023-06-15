import { Component,OnInit,ViewChild,ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit{

 
  studentId:string="";
  studentName:string="";
  stud_att_list:any=[];
  total_present_count:number=0;
  total_absent_count:number=0;
  final_attendance:number=0;
  result_list:any[]=[];
  sessional_total:number=0;
  external_total:number=0;
  percentage:number=0;
  course_list:any[]=[]

  @ViewChild('section2', { static: true }) section2Ref!: ElementRef;
  @ViewChild('section3', { static: true }) section3Ref!: ElementRef;


  constructor(private route: ActivatedRoute,private http:HttpClient,private router:Router,private auth:AuthService) {
    this.route.params.subscribe(params => {
      this.studentId = params['studentId'];
      
      // Do something with the parameter value
    });

  }
  ngOnInit(): void {
    console.log("Student Id"+this.studentId);
    this.http.get<any[]>('http://localhost:8001/api/student-list/').subscribe(
      (response) => {
        for(const obj of response){
            console.log(obj);
          if(obj.id==this.studentId){
            this.studentName=obj.firstname;
            break;
          }
        }

        this.http.get<any[]>('http://localhost:8001/api/get_attendance/'+this.studentId).subscribe(
          (response) => {
            console.log("studentName:"+this.studentName)
            
            for(const obj of response){
              console.log(obj)
              console.log(this.studentId+"je")
              
                
                this.stud_att_list.push(obj)
                this.total_present_count+=obj.present;
                this.total_absent_count+=obj.absent;
              
            }
            let final_total=this.stud_att_list.length*5;
            this.final_attendance=(this.total_present_count/(this.total_present_count+this.total_absent_count))*100;
          },
          (error) => {
            console.log('Error fetching courses:', error);
          }
        );

      },
      (error) => {
        console.log('Error fetching courses:', error);
      }
    );
  
    
   
    this.http.get<any[]>('http://localhost:8001/api/get_marks/'+this.studentId).subscribe(
      (response) => {
       console.log("recieved"+response) 
       for(const obj of response){
          const sess=obj.sessional
          const ext=obj.external
          this.result_list.push(obj)

        
          const url = 'http://localhost:8001/api/get_course_by_id/'+obj.course; // Replace with your desired URL
  
          this.http.get(url).subscribe(
            (data: any) => {
              
               this.course_list.push(data.course_title)
            },
            (error: any) => {
              console.error('An error occurred:', error);
            }
          );
        
       } 
       for(const ele of this.result_list)
       {
          console.log(ele);
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
  navigateToSection2() {
    const element = this.section2Ref.nativeElement;
    element.scrollIntoView({ behavior: 'smooth' });
  }
  navigateToSection3() {
    const element = this.section3Ref.nativeElement;
    element.scrollIntoView({ behavior: 'smooth' });
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['']);
  
  }

  
}
