package org.agcodes.restful_web_services.model;

import java.time.LocalDateTime;

public class HelloWorldBean {

  private String message;
  private LocalDateTime time;

  public HelloWorldBean(String message) {
    this.message = message;
    this.time = LocalDateTime.now();
  }

  public String getMessage() {
    return message;
  }

  public LocalDateTime getTime() {
    return time;
  }

  @Override
  public String toString() {
    return "HelloWorldBean{" +
        "message='" + message + '\'' +
        ", time=" + time +
        '}';
  }
}
