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
        return userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    @Override
    public User getUserById(int id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    @Override
    public void updateUser(int id, User user) {
        User userToUpdate = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
        userToUpdate.setName(user.getName() == null ? userToUpdate.getName() : user.getName());
        userToUpdate.setEmail(user.getEmail() == null ? userToUpdate.getEmail() : user.getEmail());
        userToUpdate.setPassword(user.getPassword() == null ? userToUpdate.getPassword() : passwordEncoder.encode(user.getPassword()));
        userRepository.save(userToUpdate);
    }

    @Override
    public void deleteUser(int id) {
        User userToDelete = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
        userRepository.delete(userToDelete);
    }

}
