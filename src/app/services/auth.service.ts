import { Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { Observable,of,throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  setToken(token:string){
    localStorage.setItem('token',token)
  }
  getToken(){
    return localStorage.getItem('token');
  }
  isLoggedIn(){
    return this.getToken()!=null;
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
  login({email,password}:any): Observable<any>{
    if(email=='admin@gmail.com' && password=='admin123')
    {
      this.setToken('abcdef');
      return of({name:'Karthika',email:'pappulakarthika123@gmail.com'});
    }
    else if(password=='student')
    {
      this.setToken('abcdef');
      return of({name:'Karthika',email:'pappulakarthika123@gmail.com'});
    }
    return throwError(new Error('Failed to Login'));
  }
  
}
