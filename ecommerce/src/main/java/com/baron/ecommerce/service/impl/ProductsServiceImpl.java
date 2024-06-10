package com.baron.ecommerce.service.impl;

import com.baron.ecommerce.entity.Product;
import com.baron.ecommerce.exception.UserNotFoundException;
import com.baron.ecommerce.repository.ProductRepository;
import com.baron.ecommerce.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductsServiceImpl implements ProductsService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void createProduct(Product product, MultipartFile file) throws IOException {
        var productToSave = Product.builder()
                .name(product.getName())
                .price(product.getPrice())
                .imageData(file.getBytes())
                .build();
        productRepository.save(productToSave);
    }

    @Override
    public void updateProduct(int id, Product product, MultipartFile file) throws IOException {
        Product productToUpdate = productRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Product not found"));
        productToUpdate.setName(product.getName() == null ? productToUpdate.getName() : product.getName());
        productToUpdate.setPrice(product.getPrice() == null ? productToUpdate.getPrice() : product.getPrice());
        productToUpdate.setImageData(file == null ? productToUpdate.getImageData() : file.getBytes());
        productRepository.save(productToUpdate);
    }

    @Override
    public void deleteProduct(int id) {
        Product productToDelete = productRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Product not found"));
        productRepository.delete(productToDelete);
    }

    @Override
    public Product getProduct(int id) {
        return productRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Product not found"));
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
