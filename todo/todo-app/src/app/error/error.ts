import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.html',
  styleUrl: './error.css'
})
export class Error {

  errorMessage = 'An Error Occured! Contact support at ***';
}
