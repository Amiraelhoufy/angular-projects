import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [CommonModule],
  templateUrl: './counter.html',
  styleUrl: './counter.scss',
})
export class Counter {
  score: number = 0;

  increment() {
    this.score++;
  }

  reset() {
    this.score = 0;
  }

  getStatus(): string{
    return this.score === 0 ? 'zero' : 'positive';
  }


}
