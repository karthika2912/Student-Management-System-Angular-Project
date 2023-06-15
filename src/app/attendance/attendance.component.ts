import { Component ,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { TemplateRef, ViewChild } from '@angular/core';




@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit{

  @ViewChild('alertTemplate') alertTemplate!: TemplateRef<any>;
 
  myForm: FormGroup = new FormGroup({});
  searchForm: FormGroup = new FormGroup({});
  submitted = false;
  isDivVisible = false;
  visible=false;
  display=false;
    constructor(private http:HttpClient,private formBuilder: FormBuilder){}
    curr_attendance:number=0;
    students:any=[];
    att_list:any=[];
    student_id:number=0;
    student_name:string="";
    final_attendance:number=0;
    stud_att_list:any=[];
    dates_list:any=[];
    selectedDate: string = '';
    filteredDates:string[]=[];
    present_count:number=0;
    absent_count:number=0;
    total_present_count:number=0;
    total_absent_count:number=0;
    search_date:string="";
    dates_obj_list:any=[]
    studentId:number=0;

    ngOnInit(): void {
      this.myForm = this.formBuilder.group({
        myCheckbox1: [false] ,
        myCheckbox2: [false] ,
        myCheckbox3: [false] ,
        myCheckbox4: [false] ,
        myCheckbox5: [false] ,
       
        date: ['', [
          Validators.required,
          // validates date format yyyy-mm-dd with regular expression
          Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
      ]]
      });
      this.searchForm = this.formBuilder.group({
       searchDate:"",
      });

    this.getDataFromApi();
    
    } 
    get f() { return this.myForm.controls; }
    
    showDiv(){
      this.visible=!this.visible;
    }
    onSubmitEntire(){
      this.display=!this.display;
      this.search_date=this.searchForm.value.searchDate;
      this.http.get<any[]>('http://localhost:8001/api/get_attendance_by_date/'+this.search_date).subscribe(
      (response) => {
       console.log("recieved"+response)
       for(const obj of response){
        console.log(obj)
         for(const stu of this.students)
         {
           if(stu.id==obj.student)
           {
             obj.student=stu.firstname;
           }
         }
          this.dates_obj_list.push(obj);
       }
       console.log("Dates Obs"+this.dates_obj_list);
      },
      (error) => {
        console.log('Error fetching courses:', error);
      }
    );



    }

    loadStudent(name:string){
      this.isDivVisible = !this.isDivVisible;
        this.student_name=name;
        console.log("In loadStudnt"+this.studentId)
        for(const ele of this.students)
         {
              if(ele.firstname==name)
               {
                    this.studentId=ele.id;
                }
          }
          console.log('http://localhost:8001/api/get_attendance/'+this.studentId)
        this.http.get<any[]>('http://localhost:8001/api/get_attendance/'+this.studentId).subscribe(
      (response) => {
       console.log("recieved"+response)
       for(const obj of response){
        console.log(obj);
        
              this.stud_att_list.push(obj);
              this.dates_list.push(obj.date);
        
       

       }

      
       console.log("Stud"+this.stud_att_list);
       let total=0;
       let final_total=this.stud_att_list.length*5;
       for(const obj of this.stud_att_list){
           total+=obj.present;
           this.total_absent_count+=obj.absent;
           
       }
      this.total_present_count=total;

      this.final_attendance=(total/final_total)*100;
      
        
      },
      (error) => {
        console.log('Error fetching courses:', error);
      }
    );
    }

    
    dateValue: string = '';

    checkDate(date: string): void {
      
      if (this.dates_list.includes(date)) {
        alert('Already the Date is existing');
      }
    }

  onSubmit() {
    this.submitted = true;
    this.isDivVisible=!this.isDivVisible;
    this.visible=false;
    if (this.myForm.invalid) {
      return;
  }
  alert('SUCCESS!!');
    this.att_list.push(this.myForm.value.myCheckbox1);
    this.att_list.push(this.myForm.value.myCheckbox2);
    this.att_list.push(this.myForm.value.myCheckbox3);
    this.att_list.push(this.myForm.value.myCheckbox4);
    this.att_list.push(this.myForm.value.myCheckbox5);

    for(const i of this.att_list){
      if(i){
        this.present_count+=1;
      }
      else{
        this.absent_count+=1;
      }
    }

    let first,second,third,fourth,fifth;
    if(this.myForm.value.myCheckbox1){
      first="P"
    }
    else{
      first="A"
    }
    if(this.myForm.value.myCheckbox5){
      fifth="P"
    }
    else{
      fifth="A"
    }
    if(this.myForm.value.myCheckbox2){
      second="P"
    }
    else{
      second="A"
    }
    if(this.myForm.value.myCheckbox3){
      third="P"
    }
    else{
      third="A"
    }
    if(this.myForm.value.myCheckbox4){
      fourth="P"
    }
    else{
      fourth="A"
    }
    for(const ele of this.students)
    {
      console.log(ele)
      if(ele.firstname==this.student_name)
      {
        this.studentId=ele.id;
      }
    }
   
    
    let data={

      "student":this.studentId,
      "date":this.myForm.value.date,
      "first_hour":first,
      "second_hour":second,
      "third_hour":third,
      "fourth_hour":fourth,
      "fifth_hour":fifth,
      "present":this.present_count,
      "absent":this.absent_count
    }
    this.http.post<any>('http://localhost:8001/api/attendance_post/', data)
      .subscribe(
        response => {
          console.log('Data posted successfully:', response);
        },
        error => {
          console.error('Error posting data:', error);
        }
      );
     
    for(const ele of this.att_list)
    {
      if(ele)
      this.curr_attendance+=1;
    }
    
    this.att_list=[]
    this.onReset();
    
  }
  onReset() {
    this.submitted = false;
    this.myForm.reset();
}
    getDataFromApi() {
      const url = 'http://localhost:8001/api/student-list/';
    
      this.http.get(url).subscribe(
        (data: any) => {
          console.log('Data retrieved successfully:', data);
          for(const ele of data){
            this.students.push(ele)
            
          }
         
          console.log("Students list in getDatafromAPi"+this.students)

        },
        (error) => {
          console.error('Error retrieving data:', error);
        }
      );
    }


}
