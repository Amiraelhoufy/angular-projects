package org.agcodes.restful_web_services;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Encoders;
import javax.crypto.SecretKey;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class UtilityMethodsTest {

  public static void main(String[] args) {

//    generateSecretKey();

    getHashedPwd("user");

  }

  private static void getHashedPwd(String rawPassword) {
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    String encodedPassword = encoder.encode(rawPassword);
    System.out.println(encodedPassword); // will produce a hash like the one you posted
  }

  private static void generateSecretKey() {
    SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Generates a random secure key
    String secretString = Encoders.BASE64.encode(key.getEncoded());
    System.out.println(secretString);
  }
}
