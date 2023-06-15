import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  private chart: Chart<'bar'> | null = null;

  courseList:any[]=[];
  countList:number[]=[]
  course_titles:any[]=[];
  visible:boolean=false;

  constructor(private http: HttpClient,private courseService:CourseService){}
  
  fetchData(d:string) {
    this.visible=true;                                                                                                                                                                                                                                                                               
    this.courseService.getCourses(d).subscribe(
      (res: Course[]) => {
        console.log("Courses finally"+res)
        for(const ele of res){
          this.courseList.push(ele)
          
        }
        this.fetchDataCount(this.courseList)
        console.log("Courses finally"+this.courseList)
        for(const ele of this.courseList)
        {
          console.log(ele)
        }
        
      },
      (error: any) => {
        console.error('An error occurred:', error);
      }
    );
    
    
  }
  fetchDataCount(courses: any[]) {
    const observables = courses.map((course) => {
      return this.http.get<any[]>('http://localhost:8001/api/course_student/', { params: { course_name: course.id } });
    });
  
    forkJoin(observables).subscribe(
      (responses: any[]) => {
        this.courseList=[];
        let c=0;
        for(const obj of courses)
        {
          
          for(const ele of responses)
          {
            c=0;
            for(const ele_obj of ele)
            {
              if(obj.id==ele_obj.course_name)
              {
                c+=1;
              }
            }

          }
          this.countList.push(c)
          
        }
        
        const labels = courses.map((course) => course.course_title);
        for(const ele of labels){
          console.log(ele)
          console.log(this.countList)
        }
        this.course_titles=labels;
        this.createBarChart(labels, this.countList);
      },
      (error) => {
        console.error('Error occurred while fetching data:', error);
      }
    );
  }
  
  
  
  
  
  
  
  
  ngOnInit() {
    // Chart initialization logic can be placed here if needed
  
    
  }

  ngAfterViewInit() {
    
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  createBarChart(labels_data: any[],actual_data:any[]) {
   
    //const colors = ['red', 'blue', 'gray', 'yellow', 'orange','purple','lightgreen','crimson','voilet'];
    const colors=['rgb(6, 66, 90)']
    Chart.register(CategoryScale, LinearScale, BarController, BarElement); // Register the required controllers and elements

    const canvas = document.getElementById('barChart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Could not get 2D context for canvas');
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels_data, // Labels for x-axis
        datasets: [{
          label: 'Bar Chart',
          data: actual_data, // Data for y-axis
          backgroundColor: colors, // Bar color
          borderColor: 'rgb(6, 66, 90)', // Border color
          borderWidth: 3
        }]                                                                                                                                                                                         
      },
      options: {
        responsive: true,
        scales: {
          y: {
            type: 'linear', // Use 'linear' scale for the y-axis
            beginAtZero: true
          }
        }
      }
    });
  }
}
