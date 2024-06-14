package com.baron.ecommerce.repository;

import com.baron.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Pageable;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    Page<Product> findAllByOrderByCreatedAtDesc();
    Page<Product> findAllByType(String type);
    Page<Product> findAll(Pageable pageable);
}
