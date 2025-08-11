package org.agcodes.restful_web_services.controller;

import org.agcodes.restful_web_services.dto.AuthRequest;
import org.agcodes.restful_web_services.dto.AuthResponse;
import org.agcodes.restful_web_services.model.AuthenticationBean;
import org.agcodes.restful_web_services.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
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

  @PostMapping("/authenticate")
  public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) {
    System.out.println(authRequest.toString());
    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(
              authRequest.getUsername(),
              authRequest.getPassword()
          )
      );
    } catch (BadCredentialsException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    String jwt = jwtUtil.generateToken(authRequest.getUsername());

    return ResponseEntity.ok(new AuthResponse(authRequest.getUsername(), jwt));
  }

  @GetMapping("/authenticate")
  public ResponseEntity<?> helloWorldBean() {
    AuthenticationBean bean = new AuthenticationBean("You are authenticated!");
    return ResponseEntity.ok(bean);

//    String token = jwtTokenUtil.generateToken(authRequest.getUsername());
//    return ResponseEntity.ok(new AuthResponse(token));

  }

}
