import { CommonModule } from '@angular/common';
import { WelcomeData } from '../../service/data/welcome-data';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome {
  name: string = '';
  welcomeMessageFromService: string = '';
  errorMessage: string = '';

  //ActivatedRoute
  constructor(
    private route: ActivatedRoute,
    private welcomeData: WelcomeData
  ) {}

  ngOnInit(): void {
    // this.route.paramMap.subscribe(params => {
    //   this.name = params.get('name') ?? '';
    // });

    this.name = this.route.snapshot.params['name'];
  }

  handleSuccessfulResponse(response: any) {
    this.welcomeMessageFromService = response;
    // console.log(this.welcomeMessageFromService);
  }

  handleErrorResponse(error: any) {
    // console.log(error);
    // console.log(error.error.message);
    // this.errorMessage= error.error.message;

    if (error.status === 0 && error.error instanceof ProgressEvent) {
      this.errorMessage =
        'Unable to connect to the server. Please make sure the backend is running.';
    } else if (error.status === 404) {
      this.errorMessage = 'Service not found. Please check the API endpoint.';
    } else {
      this.errorMessage = `Unexpected error: ${error.message}`;
    }
  }

  //   ✅ Summary
  // Before (deprecated)
  // .subscribe(success, error, complete)

  // After (recommended)
  // .subscribe({ next, error, complete })

  public getWelcomeMessage() {
    // console.log(this.welcomeData.executeHelloWorldBeanService());
    this.errorMessage = '';
    this.welcomeMessageFromService = '';

    this.welcomeData.executeHelloWorldBeanService().subscribe({
      next: (response) => this.handleSuccessfulResponse(response.message),
      error: (error) => this.handleErrorResponse(error),
      complete: () => console.log('Request completed'),
    });

    // console.log("Last line of getWelcomeMessage()");
  }

  public getWelcomeMessageWithParam() {
    this.errorMessage = '';
    this.welcomeMessageFromService = '';

    this.welcomeData
      .executeHelloWorldServiceWithPathParam(this.name)
      .subscribe({
        next: (response) => this.handleSuccessfulResponse(response),
        error: (error) => this.handleErrorResponse(error),
        complete: () => console.log('Request completed'),
      });
  }
}
