package org.agcodes.restful_web_services.repository;

import java.util.List;
import org.agcodes.restful_web_services.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

  List<Todo> findByUsername(String username);
}
