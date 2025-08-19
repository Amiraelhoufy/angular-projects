import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelloWorldResponse } from '../../model/hello-world-response.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { APIConstant } from '../../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class WelcomeData {
  constructor(private httpClient: HttpClient) {}

  executeHelloWorldBeanService() {
    // return this.httpClient.get<HelloWorldResponse>(
    //   'http://localhost:8080/hello/bean'
    // );

    // let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();
    // console.log(basicAuthHeaderString);
    // let header = new HttpHeaders({
    //   Authorization: basicAuthHeaderString,
    // });
    return this.httpClient.get<HelloWorldResponse>(
      `${environment.API_URL}${APIConstant.Hello.base}${APIConstant.Hello.bean}`,
  { responseType: 'text' as 'json' }
);


  }

  executeHelloWorldServiceWithPathParam(name: string): Observable<string> {
    
    // return this.httpClient.get<HelloParam>(`http://localhost:8080/hello/path-variable/${name}`);
    
    // let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();
    // console.log(basicAuthHeaderString);
    // let header = new HttpHeaders({
    //   Authorization: basicAuthHeaderString,
    // });
    
       // return this.httpClient.get(
    //   `http://localhost:8080/hello/path-variable/${name}`,
    //   {
    //     responseType: 'text', // <-- important to specify this
    //   }
    // );

    //   {
    //       headers:header,                // <-- now passing the header
    //      responseType: 'text', // <-- important to specify this
    //   }
    // );

    return this.httpClient.get<string>(
    `${environment.API_URL}${APIConstant.Hello.base}${APIConstant.Hello.pathParam(name)}`,
    {
      responseType: 'text' as 'json'
    }
  );
  }

  createBasicAuthenticationHttpHeader() {
    let username = 'user';
    let password = 'test';
    let basicAuthHeaderString =
      'Basic ' + window.btoa(username + ':' + password); // Encoding
    return basicAuthHeaderString;
  }
}
