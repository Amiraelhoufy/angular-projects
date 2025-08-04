package org.agcodes.restful_web_services.controller;

import java.util.List;
import org.agcodes.restful_web_services.model.Todo;
import org.agcodes.restful_web_services.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/")
public class TodoController {

  @Autowired
  private final TodoService todoService;
  public TodoController(TodoService todoService) {
    this.todoService = todoService;
  }

  @GetMapping("/users/{username}/todos")
  public List<Todo> getAllTodos(@PathVariable("username") String username) {
    return todoService.findAll();
  }
}
