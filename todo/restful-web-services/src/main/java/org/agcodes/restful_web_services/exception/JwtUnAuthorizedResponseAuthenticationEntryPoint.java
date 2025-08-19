package org.agcodes.restful_web_services.exception;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Serializable;
import javax.naming.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class JwtUnAuthorizedResponseAuthenticationEntryPoint implements AuthenticationEntryPoint,
    Serializable {
  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response,
      org.springframework.security.core.AuthenticationException authException)
      throws IOException, ServletException {
    response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
        "You would need to provide the Jwt Token to Access This resource");
  }
}
