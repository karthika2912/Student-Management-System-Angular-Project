import { Component ,OnInit} from '@angular/core';
import {  ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';


@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css']
})
export class MainHomeComponent implements OnInit{
  @ViewChild('section2', { static: true }) section2Ref!: ElementRef;
  @ViewChild('section3', { static: true }) section3Ref!: ElementRef;
  @ViewChild('section4', { static: true }) section4Ref!: ElementRef;

  student_count:number=0;
  
  constructor(private router: Router,private studentService:StudentService) { }
  
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
  
  ngOnInit(): void {
    this.studentService.getDataCount().then(count => {
      this.student_count = count;
    });
  }
}
