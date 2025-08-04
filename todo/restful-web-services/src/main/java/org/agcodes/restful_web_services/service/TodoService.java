package org.agcodes.restful_web_services.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.agcodes.restful_web_services.model.Todo;
import org.springframework.stereotype.Service;

@Service
public class TodoService {

  private static List<Todo> todos = List.of(
      new Todo(1, "test", "Learn AWS", new Date(), false),
      new Todo(2, "test", "Learn DevOps", new Date(), false),
      new Todo(3, "test", "Learn Full Stack", new Date(), false)
  );

  public List<Todo> findAll(){
    return todos;
  }

}
