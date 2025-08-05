package org.agcodes.restful_web_services.controller;

import java.util.List;
import org.agcodes.restful_web_services.model.Todo;
import org.agcodes.restful_web_services.service.TodoHardcodedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("api/v1/")
public class TodoController {

  @Autowired
  private final TodoHardcodedService todoHardcodedService;
  public TodoController(TodoHardcodedService todoHardcodedService) {
    this.todoHardcodedService = todoHardcodedService;
  }

  @GetMapping("/users/{username}/todos")
  public List<Todo> getAllTodos(@PathVariable String username) {
    return todoHardcodedService.findAll();
  }

  @GetMapping("users/{username}/todos/{todoId}")
  public ResponseEntity<Todo> getTodo(@PathVariable String username, @PathVariable long todoId) {
    return todoHardcodedService.findById(todoId)
        .map(todo-> ResponseEntity.ok(todo)) // 200
        .orElse(ResponseEntity.notFound().build()); // 404
  }
  @DeleteMapping("/users/{username}/todos/{todoId}")
  public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long todoId) {

    Todo todo = todoHardcodedService.deleteById(todoId);
    if(todo != null){
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.notFound().build();
    }
  }

}
