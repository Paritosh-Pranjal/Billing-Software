package com.backend.billing.controller;

import com.backend.billing.io.UserRequest;
import com.backend.billing.io.UserResponse;
import com.backend.billing.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/admin")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public UserResponse registerUser(@RequestBody UserRequest request){
        try{
            return userService.createUser(request);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unable to create user");
        }
    }

    @GetMapping("/users")
    public List<UserResponse> readUser(){
        return userService.readUser();
    }

    @DeleteMapping("/users/${id}")
    public void deleteUser(@PathVariable String id){
        try{
            userService.deleteUser(id);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }

}
