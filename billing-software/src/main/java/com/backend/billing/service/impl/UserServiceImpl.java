package com.backend.billing.service.impl;

import com.backend.billing.entity.UserEntity;
import com.backend.billing.io.UserRequest;
import com.backend.billing.io.UserResponse;
import com.backend.billing.repository.UserRepository;
import com.backend.billing.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse createUser(UserRequest userRequest) {
        UserEntity newUser = convertToEntity(userRequest);
        newUser = userRepository.save(newUser);
        return convertToResponse(newUser);
    }

    @Override
    public String getUserRole(String email) {
           UserEntity existingUser = userRepository.findByEmail(email)
                   .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
           return existingUser.getRole();
    }

    @Override
    public List<UserResponse> readUser() {
        return userRepository.findAll()
                .stream()
                .map(user -> convertToResponse(user))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUser(String id) {
       UserEntity exitingUser =  userRepository.findByUserId(id).orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + id));
       userRepository.delete(exitingUser);
    }

    private UserEntity convertToEntity(UserRequest userRequest){
        return UserEntity.builder()
                .userId(UUID.randomUUID().toString())
                .email(userRequest.getEmail())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .role(userRequest.getRole().toUpperCase())
                .name(userRequest.getName())
                .build();
    }

    private UserResponse convertToResponse(UserEntity userEntity){
        return UserResponse.builder()
                .name(userEntity.getName())
                .email(userEntity.getEmail())
                .userId(userEntity.getUserId())
                .createdAt(userEntity.getCreatedAt())
                .updatedAt(userEntity.getUpdatedAt())
                .role(userEntity.getRole())
                .build();
    }
}
