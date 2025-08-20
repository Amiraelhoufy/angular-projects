package org.agcodes.restful_web_services.repository;

import java.util.Optional;
import org.agcodes.restful_web_services.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Long> {
  Optional<Role> findByName(String name);

}
