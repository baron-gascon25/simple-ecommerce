package com.baron.ecommerce.service;

import com.baron.ecommerce.entity.User;

public interface AccountsService {

    void register(User user);

    User getUserByEmail(String email);
}
