package com.baron.ecommerce.service;

import com.baron.ecommerce.entity.Product;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ProductsService {

    void create(Product product, MultipartFile file) throws IOException;
    void update(int id, Product product, MultipartFile file) throws IOException;
}
