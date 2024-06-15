package com.baron.ecommerce.repository;

import com.baron.ecommerce.entity.Product;
import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    Page<Product> findAllByTypeOrderByAmountSoldDesc(String type, Pageable pageable);

    Page<Product> findAllByTypeOrderByAmountSoldAsc(String type, Pageable pageable);

    Page<Product> findAllByOrderByAmountSoldDesc(Pageable pageable);

    Page<Product> findAllByOrderByAmountSoldAsc(Pageable pageable);

    Page<Product> findAllByOrderByCreatedAtDesc(Pageable pageable);

    Page<Product> findAllByOrderByCreatedAtAsc(Pageable pageable);

    Page<Product> findAllByOrderByPriceDesc(Pageable pageable);

    Page<Product> findAllByOrderByPriceAsc(Pageable pageable);

    Page<Product> findAllByType(String type, Pageable pageable);

    Page<Product> findAll(@NonNull  Pageable pageable);

}
