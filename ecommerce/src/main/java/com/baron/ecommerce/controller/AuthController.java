package com.baron.ecommerce.controller;

import com.baron.ecommerce.entity.User;
import com.baron.ecommerce.service.AccountsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    private AccountsService accountsService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@ModelAttribute User user) {
        accountsService.register(user);
        return ResponseEntity.ok("User registered");
    }

    @PostMapping("/auth")
    public ResponseEntity<?> authenticateUser(Authentication authentication) {
        User user = accountsService.getUserByEmail(authentication.getName());
        return ResponseEntity
                .status(HttpStatus.FOUND)
                .body(user);
    }
}
