package org.agcodes.restful_web_services.controller;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Objects;
import org.agcodes.restful_web_services.dto.AuthRequest;
import org.agcodes.restful_web_services.dto.AuthResponse;
import org.agcodes.restful_web_services.model.AuthenticationBean;
import org.agcodes.restful_web_services.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("api/v1/auth/basic")
public class AuthenticationController {

  @Autowired
  private AuthenticationManager authenticationManager;
  @Autowired
  private JwtUtil jwtUtil;

  @Autowired
  private UserDetailsService userDetailsService;

  @Value("${jwt.http.request.header}")
  private String tokenHeader;

  // POST: authenticate user and generate token
  @PostMapping(value="${jwt.get.token.uri}")
  public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) {
    try {
      authenticate(authRequest.getUsername(), authRequest.getPassword());

    } catch (BadCredentialsException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
    final String jwt = jwtUtil.generateToken(userDetails.getUsername(), userDetails.getAuthorities());

    return ResponseEntity.ok(new AuthResponse(userDetails.getUsername(), jwt));
  }

  @GetMapping(value="${jwt.get.token.uri}")
  public ResponseEntity<?> helloWorldBean() {
    AuthenticationBean bean = new AuthenticationBean("You are authenticated!");
    return ResponseEntity.ok(bean);
  }

  // GET: refresh token
  @GetMapping(value="${jwt.refresh.token.uri}")
  public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request) {
    String authToken = request.getHeader(tokenHeader);
    if (authToken == null || !authToken.startsWith("Bearer ")) {
      return ResponseEntity.badRequest().body("Missing or invalid Authorization header");
    }
    String token = authToken.substring(7);
    String username = jwtUtil.extractUsername(token);

    UserDetails user = userDetailsService.loadUserByUsername(username);

    if (jwtUtil.canTokenBeRefreshed(token)) {
      String refreshedToken = jwtUtil.refreshToken(token);
      return ResponseEntity.ok(new AuthResponse(user.getUsername(), refreshedToken));
    } else {
      return ResponseEntity.badRequest().body("Token cannot be refreshed");
    }
  }

  // Exception handler for authentication
  @ExceptionHandler({ AuthenticationException.class })
  public ResponseEntity<String> handleAuthenticationException(AuthenticationException e) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
  }
  // Authenticate method to handle exceptions
  private void authenticate(String username, String password) {
    Objects.requireNonNull(username);
    Objects.requireNonNull(password);

    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(username, password)
      );
    } catch (DisabledException e) {
      throw new AuthenticationException("USER_DISABLED", e) {
      };
    } catch (BadCredentialsException e) {
      throw new AuthenticationException("INVALID_CREDENTIALS", e) {
      };
    }
  }
}
