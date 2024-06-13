package com.baron.ecommerce.service;

import com.baron.ecommerce.entity.Cart;
import com.baron.ecommerce.entity.dto.CartDto;
import com.baron.ecommerce.entity.dto.CartPendingDto;
import com.baron.ecommerce.entity.dto.CheckoutDto;

public interface CartService {

    void add(int id, CartDto cartDto);

    void update(long id, CartDto cartDto);

    void checkout(int id, CheckoutDto checkoutDto);

    CartPendingDto get(int id);
}
