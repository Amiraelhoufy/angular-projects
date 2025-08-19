package org.agcodes.restful_web_services.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {

  @Value("${jwt.secret}")
  private String SECRET_KEY;

  @Value("${jwt.expiration.in.seconds}")
  private long expiration;

  private Key getSignKey() {
    byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
    return Keys.hmacShaKeyFor(keyBytes);
  }

  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  private Claims extractAllClaims(String token) {
    return Jwts.parserBuilder()
        .setSigningKey(getSignKey())
        .build()
        .parseClaimsJws(token)
        .getBody();
  }

  private boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }
  private Boolean ignoreTokenExpiration(String token) {
    // here you specify tokens, for that the expiration is ignored
    return false;
  }
  private Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  public String generateToken(String username, Collection<?> roles) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("roles", roles);
    return createToken(claims, username);
  }

  private String createToken(Map<String, Object> claims, String subject) {
    Date now = new Date();
    System.out.println(new Date(now.getTime()));
    System.out.println(new Date(now.getTime() + expiration * 1000));
    return Jwts.builder()
        .setClaims(claims)
        .setSubject(subject)
        .setIssuedAt(now)
        .setExpiration(new Date(now.getTime() + expiration * 1000))
        .signWith(getSignKey(), SignatureAlgorithm.HS256)
        .compact();


  }

  public boolean validateToken(String token, String username) {
    return (extractUsername(token).equals(username) && !isTokenExpired(token));
  }

  public boolean validateToken(String token, org.springframework.security.core.userdetails.UserDetails userDetails) {
    return (extractUsername(token).equals(userDetails.getUsername()) && !isTokenExpired(token));
  }

  public Boolean canTokenBeRefreshed(String token) {
    return (isTokenExpired(token) || ignoreTokenExpiration(token));
  }

  public String refreshToken(String token) {
    final Claims claims = extractAllClaims(token);
    return createToken(claims, claims.getSubject());
  }
}