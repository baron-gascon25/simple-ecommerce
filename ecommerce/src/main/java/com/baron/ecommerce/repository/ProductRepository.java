package com.baron.ecommerce.repository;

import com.baron.ecommerce.entity.Product;
import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    Page<Product> findAllByType(String type, Pageable pageable);

    Page<Product> findAllByNameContainingIgnoreCase(String name, Pageable pageable);

    Page<Product> findAllByNameContainingIgnoreCaseAndType(String name, String type, Pageable pageable);

}
