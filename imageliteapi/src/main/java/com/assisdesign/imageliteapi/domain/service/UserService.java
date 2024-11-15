package com.assisdesign.imageliteapi.domain.service;

import com.assisdesign.imageliteapi.domain.AccessToken;
import com.assisdesign.imageliteapi.domain.entity.User;

public interface UserService {
    User getByEmail(String email);
    User save(User user);
    AccessToken authenticate(String email, String password);
}
