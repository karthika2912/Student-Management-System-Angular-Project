import { Component, OnInit, OnDestroy,Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit, OnDestroy {
  @Input() initialValue: number = 0;
  count: number = 0;
  intervalId: any;


  ngOnInit() {
    if(this.initialValue!=0)
    {
      this.startCounter();
    }
    else
    this.stopCounter();
  }

  ngOnDestroy() {
    this.stopCounter();
  }

  startCounter() {
   
    this.intervalId = setInterval(() => {
      this.count++;
      if(this.count==this.initialValue)
      {
        this.stopCounter();
      }
    }, 100); // Increment every second
  }

  stopCounter() {
    clearInterval(this.intervalId);
  }
}
