package com.backend.billing.controller;

import com.backend.billing.io.AuthRequest;
import com.backend.billing.io.AuthResponse;
import com.backend.billing.service.UserService;
import com.backend.billing.service.impl.AppUserDetailsService;
import com.backend.billing.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService appUserDetailsService;
    private final JwtUtil jwtUtil;
    private final UserService userService;


    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest authRequest) throws Exception{
        authenticate(authRequest.getEmail(),authRequest.getPassword());
        final UserDetails userDetails = appUserDetailsService.loadUserByUsername(authRequest.getEmail());
        final String jwtToken = jwtUtil.generateToken(userDetails);

        String role = userService.getUserRole(authRequest.getEmail());
        return new AuthResponse(authRequest.getEmail(),jwtToken,role);
    }

    private void authenticate(String email,String password)throws Exception{
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email,password));
        }
        catch (DisabledException e) {
            throw new Exception("User disabled");
        }
        catch (BadCredentialsException e) {
           throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Email or password is incorrect");
        }

    }

    @PostMapping("/encode")
    public String encodedPassword(@RequestBody Map<String,String> request){
        return passwordEncoder.encode(request.get("password"));
    }
}
