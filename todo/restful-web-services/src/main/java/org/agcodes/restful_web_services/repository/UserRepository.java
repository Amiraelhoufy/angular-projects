package org.agcodes.restful_web_services.repository;

import java.util.Optional;
import org.agcodes.restful_web_services.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);

}
