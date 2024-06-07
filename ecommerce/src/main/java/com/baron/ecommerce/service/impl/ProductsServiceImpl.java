package com.baron.ecommerce.service.impl;

import com.baron.ecommerce.entity.Product;
import com.baron.ecommerce.exception.UserNotFoundException;
import com.baron.ecommerce.repository.ProductRepository;
import com.baron.ecommerce.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class ProductsServiceImpl implements ProductsService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void create(Product product, MultipartFile file) throws IOException {
        var productToSave = Product.builder()
                .name(product.getName())
                .price(product.getPrice())
                .imageData(file.getBytes())
                .build();
        productRepository.save(productToSave);
    }

    @Override
    public void update(int id, Product product, MultipartFile file) throws IOException {
        Optional<Product> productOptional = productRepository.findById(id);
        if(productOptional.isEmpty()) {
            throw new UserNotFoundException("Product not found");
        }
        Product productToUpdate = productOptional.get();
        productToUpdate.setName(product.getName() == null ? productToUpdate.getName() : product.getName());
        productToUpdate.setPrice(product.getPrice() == null ? productToUpdate.getPrice() : product.getPrice());
        productToUpdate.setImageData(file == null ? productToUpdate.getImageData() : file.getBytes());
        productRepository.save(productToUpdate);
    }
}
