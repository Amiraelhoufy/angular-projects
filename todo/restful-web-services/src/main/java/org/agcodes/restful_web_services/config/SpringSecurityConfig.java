package org.agcodes.restful_web_services.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig {

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable()) // Disable CSRF for APIs -  Needed for stateless REST APIs, otherwise POST/PUT/DELETE from Angular may fail.
        .cors(cors -> {}) // enable CORS
        .authorizeHttpRequests(auth -> auth
            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
            .requestMatchers("/hello/**").authenticated()
            .requestMatchers("/api/**").authenticated()
            .anyRequest().permitAll()
        )
        .httpBasic(Customizer.withDefaults()) // Enable HTTP Basic Auth -  Tells Spring to read your Authorization: Basic ... header
        .formLogin(form -> form.disable()); // Prevents the 302 redirect to /login.

    return http.build();
  }
  // Authentication Manager bean so we can inject it into the controller
  @Bean
  public AuthenticationManager authenticationManager(
      AuthenticationConfiguration authenticationConfiguration) throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
  }

  // Hardcoded user
  @Bean
  public UserDetailsService userDetailsService() {
    UserDetails user = User.withUsername("test")
        .password("{noop}test") // no encoding
        .roles("USER")
        .build();

    return new InMemoryUserDetailsManager(user);
  }

}
