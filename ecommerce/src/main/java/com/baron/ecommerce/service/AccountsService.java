package com.baron.ecommerce.service;

import com.baron.ecommerce.entity.User;

public interface AccountsService {

    void register(User user);

    User getUserByEmail(String email);

    User getUserById(int id);

    void updateUser(int id, User user);

    void deleteUser(int id);
}
