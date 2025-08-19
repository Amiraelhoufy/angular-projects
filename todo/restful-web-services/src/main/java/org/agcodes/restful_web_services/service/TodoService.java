package org.agcodes.restful_web_services.service;

import java.util.List;
import java.util.Optional;
import org.agcodes.restful_web_services.model.Todo;
import org.agcodes.restful_web_services.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodoService {

  private final TodoRepository todoRepository;

  @Autowired
  public TodoService(TodoRepository todoRepository) {
    this.todoRepository = todoRepository;
  }

 /* Consistency in return types:
  findAll → List<Todo>
  findById → Optional<Todo>
  save → Todo
  deleteById → boolean
  */
  public List<Todo> findAll(){
    return todoRepository.findAll();
  }

  public Todo save(String username,Todo todo){
    todo.setUsername(username);
    return todoRepository.save(todo);
  }
  public Optional<Todo> findById(long id) {
    return todoRepository.findById(id);
  }

  public boolean deleteById(long todoId) {
    if (todoRepository.existsById(todoId)) {
      todoRepository.deleteById(todoId);
      return true;
    }
    return false;
  }

  public List<Todo> findByUsername(String username) {
    return todoRepository.findByUsername(username);
  }
}
