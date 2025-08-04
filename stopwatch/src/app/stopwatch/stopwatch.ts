import { CommonModule, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  imports: [CommonModule],
  templateUrl: './stopwatch.html',
  styleUrl: './stopwatch.scss'
})
export class Stopwatch {

  elapsedTime = 0;
  isRunning = false;
  intervalRef: any;

  startStop(){
    this.isRunning? this.stop() : this.start();
  }

  private start(){
    this.isRunning = true;
    this.intervalRef = setInterval(()=>{
    this.elapsedTime+= 0.1;},100);

    console.log('Stopwatch Started!');
  }

  private stop(){
    this.isRunning = false;
    // Reset interval
    clearInterval(this.intervalRef);
    console.log('Stopwatch Stopped!')
  }

  reset(){
    this.isRunning = false;
    clearInterval(this.intervalRef);
    this.elapsedTime = 0;
    console.log('Stopwatch reset.')
  }

}
