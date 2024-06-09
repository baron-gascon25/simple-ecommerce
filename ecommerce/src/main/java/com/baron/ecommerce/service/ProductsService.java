package com.baron.ecommerce.service;

import com.baron.ecommerce.entity.Product;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductsService {

    void create(Product product, MultipartFile file) throws IOException;

    void update(int id, Product product, MultipartFile file) throws IOException;

    Product getProduct(int id);

    List<Product> getAllProducts();
}
