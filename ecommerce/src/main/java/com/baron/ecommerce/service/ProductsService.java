package com.baron.ecommerce.service;

import com.baron.ecommerce.entity.Product;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductsService {

    void createProduct(Product product, MultipartFile file) throws IOException;

    void updateProduct(int id, Product product, MultipartFile file) throws IOException;

    void deleteProduct(int id);

    Product getProduct(int id);

    List<Product> getAllProducts();
}
