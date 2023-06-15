import { AfterViewInit,ViewChild,Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,FormArray } from '@angular/forms';
import { Student } from './models/student.model';
import { StudentService } from './services/student.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  
    @ViewChild('tempButton') buttontemp:any;
    @ViewChild('addStudentButton') addStudentButton: any;
    title="Student Management System";

    departmentOptions=[
      'IT','CSE','CIVIL','MECH','ECE','EEE'
    ];

    students: Student[]=[];
    studentsToDisplay: Student[]=[];
  
    studentForm: FormGroup; // Remove the existing declaration
    apiUrl:string="http://localhost:3000/courses/"
    constructor(private fb: FormBuilder,private http:HttpClient,
      private studentService: StudentService) {
      this.students=[];
      this.studentsToDisplay=this.students;
      this.studentForm = this.fb.group({
        firstname: this.fb.control(''),
        lastname: this.fb.control(''),
        dob: this.fb.control(''),
        gender: this.fb.control(''),
        department: this.fb.control('default'),
      });

      this.studentService.getStudents().subscribe( res=> {
        console.log(res);
        for(let stud of res){
          this.students.unshift(stud);
        }
        this.studentsToDisplay=this.students;                               
      })
    }

    ngAfterViewInit(): void{
      //this.buttontemp.nativeElement.click();
    }

    addStudent(){
      const student: Student = this.studentForm.value;
      console.log(student);
      this.studentService.postStudents(student).subscribe((res) => {
        
        console.log(res); 
        this.studentForm.patchValue(res);
      });
    }
     
    editStudent(event: any){
      console.log("Entered");
        this.students.forEach((val,ind)=>{
          console.log("enterd for")
          if(val.id === event){
            console.log("found match");
            this.setForm(val);
          }
        });
        this.removeStudent(event);
        this.addStudentButton.nativeElement.click();
    }

    setForm(stu : Student){
      this.getFirstName().setValue(stu.firstname);
      this.getLastName().setValue(stu.lastname);
      this.getDOB().setValue(stu.dob);
      this.getGender().setValue(stu.gender);
      let dep_ind=0;
      this.departmentOptions.forEach((val,index)=>{
        if(val==stu.department) dep_ind = index;
      })
      this.getDepartment().setValue(dep_ind);

    }

    searchStudent(event: any){
      let filteredStudents: Student[] =[];
      if(event==''){
        this.studentsToDisplay=this.students;

      }
      else{
        filteredStudents = this.students.filter((val,index)=>{
          let targetKey=val.firstname.toLowerCase()+''+val.lastname.toLowerCase();
          let searchKey= event.toLowerCase();
          return targetKey.includes(searchKey);
        });
        this.studentsToDisplay=filteredStudents;
      }
    }

    searchDepartment(event: any){
      let filteredStudents: Student[] =[];
      if(event==''){
        this.studentsToDisplay=this.students;

      }
      else{
        filteredStudents = this.students.filter((val,index)=>{
          let targetKey=val.department.toLowerCase()
          let searchKey= event.toLowerCase();
          return targetKey.includes(searchKey);
        });
        this.studentsToDisplay=filteredStudents;
      }
    }
   


    public getFirstName(): FormControl{
      return this.studentForm.get('firstname') as FormControl;
    }

    public getLastName(): FormControl{
      return this.studentForm.get('lastname') as FormControl;
    }

    public getDOB(): FormControl{
      return this.studentForm.get('dob') as FormControl;
    }

    public getGender(): FormControl{
      return this.studentForm.get('gender') as FormControl;
    }

    public getDepartment(): FormControl{
      return this.studentForm.get('department') as FormControl;
    }

    removeStudent(event: any){
      this.students.forEach((val,index) => {
        if(val.id == parseInt(event))
        this.studentService.deleteStudent(event).subscribe((res)=>{
          this.students.splice(index,1);
        })
      


      });
      
  
    }
   

}
