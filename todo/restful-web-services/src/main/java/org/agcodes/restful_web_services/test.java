package org.agcodes.restful_web_services;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Encoders;
import javax.crypto.SecretKey;
import io.jsonwebtoken.security.Keys;
public class test {

  public static void main(String[] args) {

    SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Generates a random secure key
    String secretString = Encoders.BASE64.encode(key.getEncoded());
    System.out.println(secretString);


  }
}
