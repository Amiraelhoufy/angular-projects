package org.agcodes.restful_web_services.controller;

import org.agcodes.restful_web_services.model.HelloWorldBean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/hello")
public class HelloWorldController {
  //Method - GET, POST, PUT, DELETE
  //URI - /hello/world
  //Java method to handle request
  @GetMapping
  public String sayHello() {
    return "Hello World";
  }

  @GetMapping("bean")
  public HelloWorldBean helloWorldBean() {
//    throw new RuntimeException("Some error has occurred!");
    return new HelloWorldBean("Hello World");
  }

  @GetMapping("/path-variable/{name}")
  public String helloToYou(@PathVariable String name) {
    return String.format("Hello " + name + "!");
  }
}
