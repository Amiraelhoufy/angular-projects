package org.agcodes.restful_web_services.security;

import java.util.ArrayList;
import java.util.List;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

//@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {

  static List<JwtUserDetails> inMemoryUserList = new ArrayList<>();

  static {
    inMemoryUserList.add(new JwtUserDetails(1L, "test",
        "$2a$10$zraFH550Dt5sfcB9tFrf.urHGLlqA68wcy4Cgb2wvLdMaIbgz7cnG", "ROLE_USER_2"));
    inMemoryUserList.add(new JwtUserDetails(2L, "user",
        "$2a$10$mWvTzxCB1sjKCexzXQWXo.ExgK5ylnrYyy2QNFg/ngBBam5Hmgw5i", "ROLE_USER_2"));

    //$2a$10$IetbreuU5KihCkDB6/r1DOJO0VyU9lSiBcrMDT.biU7FOt2oqZDPm
  }
  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return inMemoryUserList.stream()
        .filter(user -> user.getUsername().equals(username))
        .findFirst()
        .orElseThrow(() -> new UsernameNotFoundException("USER_NOT_FOUND: " + username));
  }
}
