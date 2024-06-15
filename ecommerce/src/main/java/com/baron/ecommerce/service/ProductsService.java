package com.baron.ecommerce.service;

import com.baron.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ProductsService {

    void createProduct(Product product, MultipartFile file) throws IOException;

    void updateProduct(int id, Product product, MultipartFile file) throws IOException;

    void deleteProduct(int id) throws IOException;

    Product getProduct(int id);

    byte[] getProductImage(int id) throws IOException;

    Page<Product> getAllProducts(String type, Boolean amountSoldAsc, int page, int size);

    Page<Product> getAllProductsBySortedDate(boolean isAscending, int page, int size);

    Page<Product> getAllProductsBySortedPrice(boolean isAscending, int page, int size);
}
