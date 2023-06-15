import { Component,OnInit } from '@angular/core';
import {FormControl,FormGroup} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private auth:AuthService,private router:Router,private http:HttpClient){}
  loginForm= new FormGroup({
    email:new FormControl(''),
    password: new FormControl('')
  });
  isStudent:boolean=false;

  ngOnInit(): void {
    if(this.auth.isLoggedIn()){
      this.router.navigate(['home'])
    }
  }
  onSubmit(){
    console.log(this.loginForm.value)
    this.http.get<any[]>('http://localhost:8001/api/student-list/').subscribe(
      (response) => {
        console.log("Enterf Get in Login")

         for(const obj of response){
          console.log(obj)
          if(this.loginForm.value.email==obj.firstname)
          {
              console.log("Found Student"+ obj);
              this.isStudent=true;
              this.router.navigate(['student-home',obj.id])
              break;
          }
         }
      },
      (error) => {
        console.log('Error fetching courses:', error);
      }
    );
    if(this.isStudent){
      console.log("Is student");
      this.auth.login(this.loginForm.value).subscribe(
        (result) => {
          console.log("entered")
          this.router.navigate(['student-home'])
        },(err:Error)=>{
          alert(err.message);
        }
      )
      }
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value).subscribe(
        (result) => {
          this.router.navigate(['home'])
        },(err:Error)=>{
          alert(err.message);
        }
      )
      
    }
  }
}
