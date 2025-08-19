package org.agcodes.restful_web_services.config;

import org.agcodes.restful_web_services.exception.JwtUnAuthorizedResponseAuthenticationEntryPoint;
import org.agcodes.restful_web_services.security.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig {

  @Autowired
  private JwtUnAuthorizedResponseAuthenticationEntryPoint jwtUnAuthorizedResponseAuthenticationEntryPoint;
  @Autowired
  private JwtRequestFilter jwtRequestFilter;
  @Value("${jwt.get.token.uri}")
  private String authenticationPath;
  
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable()) // Disable CSRF for APIs -  Needed for stateless REST APIs, otherwise POST/PUT/DELETE from Angular may fail.
        .cors(cors -> {}) // enable CORS
        .authorizeHttpRequests(auth -> auth
            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
            .requestMatchers(
                "/api/v1/auth/basic/authenticate",
                "/api/v1/auth/basic/refresh"
            ).permitAll() // Public login endpoint for JWT
            .requestMatchers("/hello/**").authenticated()
            .requestMatchers("/api/**").authenticated()
            // Allow login without JWT
            .anyRequest().permitAll()
        )
        //        .httpBasic(Customizer.withDefaults()) // Enable HTTP Basic Auth -  Tells Spring to read your Authorization: Basic ... header
        .exceptionHandling(ex -> ex.authenticationEntryPoint(jwtUnAuthorizedResponseAuthenticationEntryPoint)) // handles unauthorized requests with a 401
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//        .formLogin(form -> form.disable()); // Prevents the 302 redirect to /login Removed as (JWT will handle authentication)

    /*
    * Add JWT filter before UsernamePasswordAuthenticationFilter
    * jwtTokenFilter → extracts & validates JWT on each request
    * sessionCreationPolicy → ensures no session storage
    */
    http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    http.headers(headers -> headers
        .frameOptions(frame -> frame.sameOrigin()) // Needed for H2 Console
        .cacheControl(Customizer.withDefaults())   // disable caching
    );
    return http.build();

  }
  // Authentication Manager bean so we can inject it into the controller
  @Bean
  public AuthenticationManager authenticationManager(
      AuthenticationConfiguration authenticationConfiguration) throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
  }

  // Password Encoder
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  // Hardcoded user
  /*@Bean
  public UserDetailsService userDetailsService() {

    UserDetails user = User.withUsername("test")
        .password("{noop}test") // no encoding
        .roles("USER")
        .build();

    return new InMemoryUserDetailsManager(user);
  }*/

}
