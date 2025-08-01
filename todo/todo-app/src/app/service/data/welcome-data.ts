import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelloWorldResponse } from '../../model/hello-world-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WelcomeData {
  
  constructor(private httpClient: HttpClient){}

  executeHelloWorldBeanService(){
    return this.httpClient.get<HelloWorldResponse>("http://localhost:8080/hello/bean");
    // console.log("Hello World Bean Service!");
  }

    executeHelloWorldServiceWithPathParam(name: string): Observable<string>{
      // return this.httpClient.get<HelloParam>(`http://localhost:8080/hello/path-variable/${name}`);
       return this.httpClient.get(`http://localhost:8080/hello/path-variable/${name}`, {
    responseType: 'text'  // <-- important to specify this
  });
  }
}
