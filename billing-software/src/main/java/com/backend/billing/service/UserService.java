package com.backend.billing.service;

import com.backend.billing.io.UserRequest;
import com.backend.billing.io.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse createUser (UserRequest userRequest);
    String getUserRole(String email);
    List<UserResponse> readUser();
    void deleteUser(String id);
}
