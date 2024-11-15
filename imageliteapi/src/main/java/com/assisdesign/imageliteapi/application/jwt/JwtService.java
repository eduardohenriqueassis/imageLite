package com.assisdesign.imageliteapi.application.jwt;

import com.assisdesign.imageliteapi.domain.AccessToken;
import com.assisdesign.imageliteapi.domain.entity.User;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    public AccessToken generateToken(User user){
        return new AccessToken("");
    }
}
