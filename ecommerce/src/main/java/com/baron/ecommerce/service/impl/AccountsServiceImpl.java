package com.baron.ecommerce.service.impl;

import com.baron.ecommerce.entity.User;
import com.baron.ecommerce.exception.UserNotFoundException;
import com.baron.ecommerce.repository.UserRepository;
import com.baron.ecommerce.service.AccountsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountsServiceImpl implements AccountsService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

    @Override
    public void register(User user) {
        Optional<User> userToFind = userRepository.findByEmail(user.getEmail());
        if(userToFind.isPresent()) {
            throw new UserNotFoundException("User already exists");
        }
        try {
            var userToSave = User.builder()
                    .name(user.getName())
                    .email(user.getEmail())
                    .password(passwordEncoder.encode(user.getPassword()))
                    .role(user.getRole())
                    .build();
            userRepository.save(userToSave);
        } catch (Exception ex) {
            throw new RuntimeException("An exception occurred due to "+ex.getMessage());
        }
    }

    @Override
    public User getUserByEmail(String email) {
        Optional<User> userToFind = userRepository.findByEmail(email);
        if(userToFind.isEmpty()) {
            throw new UserNotFoundException("User not found.");
        }
        return userToFind.get();
    }
}
