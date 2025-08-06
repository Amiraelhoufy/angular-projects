package org.agcodes.restful_web_services.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.agcodes.restful_web_services.model.Todo;
import org.springframework.stereotype.Service;

@Service
public class TodoHardcodedService {

  private static List<Todo> todos = new ArrayList<>();
  private static int idCounter = 0;

  static {
    todos.add(new Todo(++idCounter, "test", "Learn AWS", new Date(), false));
    todos.add(new Todo(++idCounter,"test", "Learn DevOps", new Date(), false));
    todos.add(new Todo(++idCounter,"test", "Learn Full Stack", new Date(), false));
  }

  public List<Todo> findAll(){
    return todos;
  }

  public Optional<Todo> save(Todo todo){
    if (todo.getId() == -1 || todo.getId() == 0) {
      todo.setId(++idCounter);
      todos.add(todo);
    } else {
      deleteById(todo.getId());
      todos.add(todo);
    }
    return Optional.of(todo);
  }
  public Optional<Todo> findById(long id) {
    return Optional.ofNullable(todos)
        .flatMap(list -> list.stream()
            .filter(t -> t.getId() == id)
            .findFirst());
  }

  public Todo deleteById(long todoId) {
    Optional<Todo> todoOpt = findById(todoId);
    if (todoOpt.isPresent()) {
      Todo todo = todoOpt.get();
      todos.remove(todo);
      return todo;
    }
    return null;
  }
}
