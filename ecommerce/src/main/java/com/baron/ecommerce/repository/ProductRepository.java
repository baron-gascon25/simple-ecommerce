package com.baron.ecommerce.repository;

import com.baron.ecommerce.entity.Product;
import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    // Filter products by Type and/or Sort by Amount Sold
    Page<Product> findAllByTypeOrderByAmountSoldDesc(String type, Pageable pageable);
    Page<Product> findAllByTypeOrderByAmountSoldAsc(String type, Pageable pageable);
    Page<Product> findAllByOrderByAmountSoldDesc(Pageable pageable);
    Page<Product> findAllByOrderByAmountSoldAsc(Pageable pageable);

    // Filter products by Type and/or Sort by Date
    Page<Product> findAllByTypeOrderByCreatedAtDesc(String type, Pageable pageable);
    Page<Product> findAllByTypeOrderByCreatedAtAsc(String type, Pageable pageable);
    Page<Product> findAllByOrderByCreatedAtDesc(Pageable pageable);
    Page<Product> findAllByOrderByCreatedAtAsc(Pageable pageable);

    // Filter products by Type and/or Sort by Price
    Page<Product> findAllByTypeOrderByPriceDesc(String type, Pageable pageable);
    Page<Product> findAllByTypeOrderByPriceAsc(String type, Pageable pageable);
    Page<Product> findAllByOrderByPriceDesc(Pageable pageable);
    Page<Product> findAllByOrderByPriceAsc(Pageable pageable);

    // Filter products by Type only
    Page<Product> findAllByType(String type, Pageable pageable);

    // Sort by Keyword only
    Page<Product> findAllByNameContainingIgnoreCase(String name, Pageable pageable);
    // Sort by Keyword and
    // type
    Page<Product> findAllByNameContainingIgnoreCaseAndType(String name, String type, Pageable pageable);
    // Price
    Page<Product> findAllByNameContainingIgnoreCaseOrderByPriceDesc(String name, Pageable pageable);
    Page<Product> findAllByNameContainingIgnoreCaseOrderByPriceAsc(String name, Pageable pageable);
    // Date
    Page<Product> findAllByNameContainingIgnoreCaseOrderByCreatedAtDesc(String name, Pageable pageable);
    Page<Product> findAllByNameContainingIgnoreCaseOrderByCreatedAtAsc(String name, Pageable pageable);
    // Amount sold
    Page<Product> findAllByNameContainingIgnoreCaseOrderByAmountSoldDesc(String name, Pageable pageable);
    Page<Product> findAllByNameContainingIgnoreCaseOrderByAmountSoldAsc(String name, Pageable pageable);
    // Price and Type
    Page<Product> findAllByNameContainingIgnoreCaseAndTypeOrderByPriceDesc(String name, String type, Pageable pageable);
    Page<Product> findAllByNameContainingIgnoreCaseAndTypeOrderByPriceAsc(String name, String type, Pageable pageable);
    // Date and Type
    Page<Product> findAllByNameContainingIgnoreCaseAndTypeOrderByCreatedAtDesc(String name, String type, Pageable pageable);
    Page<Product> findAllByNameContainingIgnoreCaseAndTypeOrderByCreatedAtAsc(String name, String type, Pageable pageable);
    // Amount sold and Type
    Page<Product> findAllByNameContainingIgnoreCaseAndTypeOrderByAmountSoldDesc(String name, String type, Pageable pageable);
    Page<Product> findAllByNameContainingIgnoreCaseAndTypeOrderByAmountSoldAsc(String name, String type, Pageable pageable);
}
