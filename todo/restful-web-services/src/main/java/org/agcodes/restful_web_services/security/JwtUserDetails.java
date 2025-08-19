package org.agcodes.restful_web_services.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
@ToString
@RequiredArgsConstructor
public class JwtUserDetails implements UserDetails, Serializable {
  private static final long serialVersionUID = 5155720064139820502L;

  private final Long id;
  private final String username;
  private final String password;
  private final Collection<? extends GrantedAuthority> authorities;

  // Convenience constructor for a single role
  public JwtUserDetails(Long id, String username, String password, String role) {
    this(id, username, password, List.of(role));
  }

  // Convenience constructor for multiple roles
  public JwtUserDetails(Long id, String username, String password, List<String> roles) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.authorities = roles.stream()
        .map(r -> r.startsWith("ROLE_") ? r : "ROLE_" + r)
        .map(org.springframework.security.core.authority.SimpleGrantedAuthority::new)
        .collect(Collectors.toUnmodifiableList());
  }

  @JsonIgnore
  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @JsonIgnore
  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @JsonIgnore
  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

}
