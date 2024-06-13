package com.baron.ecommerce.repository;

import com.baron.ecommerce.entity.Cart;
import com.baron.ecommerce.entity.enums.ItemStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Integer> {

}
