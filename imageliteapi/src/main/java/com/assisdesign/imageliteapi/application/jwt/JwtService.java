package com.assisdesign.imageliteapi.application.jwt;

import com.assisdesign.imageliteapi.domain.AccessToken;
import com.assisdesign.imageliteapi.domain.entity.User;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class JwtService {
    private final SecretKeyGenerator keyGenerator;
    public AccessToken generateToken(User user){
      var key = keyGenerator.getKey();
      var expirationDate = generateExpirationDate();
      var claims = generateTokenClaims(user);

        String token = Jwts
                .builder()
                .signWith(key)
                .subject(user.getEmail())
                .expiration(expirationDate)
                .claims(claims)
                .compact();
        return new AccessToken(token);
    }

    private Date generateExpirationDate(){
        var expirationMinutes = 60;
        LocalDateTime now = LocalDateTime.now().plusMinutes(expirationMinutes);
        return Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
    }

    private Map<String, Object> generateTokenClaims(User user){
        Map<String, Object> claims = new HashMap<>();
        claims.put("name", user.getName());
        claims.put("email", user.getEmail());
        return claims;
    }
    public String getEmailFromToken(String tokenJWT){
        try{
            JwtParser build = Jwts.parser()
                .verifyWith(keyGenerator.getKey())
                .build();

                Jws<Claims> jwsClaims = build.parseSignedClaims(tokenJWT);
                Claims claims = jwsClaims.getPayload();
                return claims.getSubject();
            }catch (JwtException e){
                throw new InvalidTokenException(e.getMessage());
        }
    }
}
