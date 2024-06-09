package com.baron.ecommerce.controller;

import com.baron.ecommerce.entity.Product;
import com.baron.ecommerce.entity.dto.ResponseDto;
import com.baron.ecommerce.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class ProductController {

    @Autowired
    private ProductsService productsService;

    @PostMapping("/products")
    public ResponseEntity<?> createProduct(@ModelAttribute Product product, @ModelAttribute MultipartFile file) throws IOException {
        productsService.create(product, file);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDto(HttpStatus.CREATED.value(), "Product successfully created"));
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable int id, @ModelAttribute Product product, @ModelAttribute MultipartFile file) throws IOException {
        productsService.update(id, product, file);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseDto(HttpStatus.OK.value(), "Product successfully updated"));
    }

    @GetMapping("/products")
    public ResponseEntity<?> getAllProducts() {
        return ResponseEntity
                .status(HttpStatus.FOUND)
                .body(productsService.getAllProducts());
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<?> getProductById(@PathVariable int id) {
        return ResponseEntity
                .status(HttpStatus.FOUND)
                .body(productsService.getProduct(id));
    }
}
