import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef,ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit,OnInit{
  @ViewChild('tempButton') buttontemp:any;
  @ViewChild('addStudentButton') addStudentButton: any;
  @ViewChild('section2', { static: true }) section2Ref!: ElementRef;
  @ViewChild('section3', { static: true }) section3Ref!: ElementRef;
  @ViewChild('section4', { static: true }) section4Ref!: ElementRef;
  @ViewChild('section5', { static: true }) section5Ref!: ElementRef;
  @ViewChild('section6', { static: true }) section6Ref!: ElementRef;
  title="Student Management System";

  departmentOptions=[
    'IT','CSE','ECE','MECH','CIVIL','EEE'
  ];
  
  dataCount=0;
  students: Student[]=[];
  studentsToDisplay: Student[]=[];

  studentForm: FormGroup; // Remove the existing declaration

  constructor(private cdr: ChangeDetectorRef,private fb: FormBuilder, private auth:AuthService,private router:Router,private http: HttpClient,
    private studentService: StudentService) {
    this.students=[];
    this.studentsToDisplay=this.students;
    this.studentForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      dob: [''],
      gender:[''],
      department:['default'],
      roll: [''],
    });
  
    

this.studentService.getStudents().subscribe( res=> {
      console.log(res);
      for(let stud of res){
        this.students.unshift(stud);
      }
      this.studentsToDisplay=this.students;                               
    })
  }
  navigateToSection2() {
    const element = this.section2Ref.nativeElement;
    element.scrollIntoView({ behavior: 'smooth' });
  }
  navigateToSection3() {
    const element = this.section3Ref.nativeElement;
    element.scrollIntoView({ behavior: 'smooth' });
  }
  navigateToSection4() {
    const element = this.section4Ref.nativeElement;
    element.scrollIntoView({ behavior: 'smooth' });
  }
  navigateToSection5() {
    const element = this.section5Ref.nativeElement;
    element.scrollIntoView({ behavior: 'smooth' });
  }
  navigateToSection6() {
    const element = this.section6Ref.nativeElement;
    element.scrollIntoView({ behavior: 'smooth' });
  }
  updateDataCount(){
    console.log("entered Update count")
    this.studentService.getDataCount().then(count => {
      this.dataCount = count;
    });
  }
  ngOnInit(){
    console.log("entred ngOnInit");
    this.updateDataCount();
    this.getStudents();
  
  }
  ngAfterViewInit(): void{
    //this.buttontemp.nativeElement.click();
  }
  private getStudents() {
    console.log("entred gestudents");
    this.studentService.getStudents().subscribe(res => {
      console.log(res);
      this.students = res;
      this.studentsToDisplay = this.students;
    });
  }
  addStudent(){
    console.log("Entered addStudent()")
    let value= this.studentForm.get('department')?.value;
    let dept=0
    if(value=="IT")
    {
      dept=6;
    }
    else if(value=="CSE")
    {
      dept=7;
    }
    else if(value=="ECE")
    {
      dept=8;
    }
    else if(value=="MECH")
    {
      dept=9;
    }
    else if(value=="CIVIL")
    {
      dept=10;
    }
    else if(value=="EEE")
    {
      dept=11;
    }
    const url = 'http://localhost:8001/api/create_new/';  // Replace with your API endpoint URL

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'  // Set the appropriate content type
    });
    
    let dateString = this.studentForm.get('dob')?.value;

    let date = new Date(dateString);

    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    let formattedDate = `${year}-${month}-${day}`;
    const body = {
      "roll": this.studentForm.get('roll')?.value,
      "firstname": this.studentForm.get('firstname')?.value,
      "lastname":this.studentForm.get('lastname')?.value,
      "department": dept,
      "dob":formattedDate,
      "gender":this.studentForm.get('gender')?.value

    };
   console.log(body)
  
    this.http.post(url, body, { headers }).subscribe(
      response => {
        console.log('Data posted successfully:', response);
        
      },
      error => {
        console.error('Error posting data:', error);
       
      }
    );
    // Reload the current webpage
      window.location.reload();

    
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
    this.getRoll().setValue(stu.roll);
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
  public getRoll(): FormControl{
    return this.studentForm.get('roll') as FormControl;
  }


  removeStudent(event: any){
   
    this.students.forEach((val,index) => {
      if(val.id == parseInt(event))
      this.studentService.deleteStudent(event).subscribe((res)=>{
        this.students.splice(index,1);
      })
    });
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['']);
  
  }
  routeDashboard(){
    console.log("Hello");
    this.router.navigate(['dashboard'])
  }
  routeAttendance(){
    console.log("Hello");
    this.router.navigate(['attendance'])
  }
  routeMarks(){
    this.router.navigate(['marks'])
  }

}
