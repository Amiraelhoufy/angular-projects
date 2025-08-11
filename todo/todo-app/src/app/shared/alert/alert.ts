import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.html',
  styleUrl: './alert.css'
})
export class Alert implements OnInit {

  @Input() type: 'success' | 'danger' | 'warning' = 'success';  // bootstrap alert types
  @Input() message: string = '';
  @Input() autoClose: boolean = true;
  @Input() timeout: number = 4000;

  visible = false;

  ngOnInit(): void {
    if (this.message) {
      this.show();
    }
  }

  show(): void {
    this.visible = true;

    if(this.type ==='success'){
      if (this.autoClose) {
        setTimeout(() => {
          this.visible = false;
        }, this.timeout);
      }
    }
    
  }

  close(): void {
    this.visible = false;
  }


}
