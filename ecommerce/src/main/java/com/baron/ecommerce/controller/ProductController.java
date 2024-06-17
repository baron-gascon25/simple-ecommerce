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
        productsService.createProduct(product, file);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDto(HttpStatus.CREATED.value(), "Product successfully created"));
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable int id, @ModelAttribute Product product, @ModelAttribute MultipartFile file) throws IOException {
        productsService.updateProduct(id, product, file);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseDto(HttpStatus.OK.value(), "Product successfully updated"));
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable int id) throws IOException {
        productsService.deleteProduct(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseDto(HttpStatus.OK.value(), "Product successfully deleted"));
    }

    @GetMapping("/products")
    public ResponseEntity<?> getAllProducts(@RequestParam(required = false) String name,
                                            @RequestParam(required = false) String type,
                                            @RequestParam(required = false) boolean amountSoldAsc,
                                            @RequestParam int page,
                                            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(productsService.getAllProducts(name,type, amountSoldAsc, page - 1, size));
    }

    @GetMapping("/products/price")
    public ResponseEntity<?> getAllProductsSortedByPrice(@RequestParam(required = false) String name,
                                                         @RequestParam(required = false) String type,
                                                         @RequestParam boolean ascending,
                                                         @RequestParam int page,
                                                         @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(productsService.getAllProductsBySortedPrice(name, type, ascending, page - 1, size));
    }

    @GetMapping("/products/date")
    public ResponseEntity<?> getAllProductsSortedByDate(@RequestParam(required = false) String name,
                                                        @RequestParam(required = false) String type,
                                                        @RequestParam boolean ascending,
                                                        @RequestParam int page,
                                                        @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(productsService.getAllProductsBySortedDate(name, type, ascending, page - 1, size));
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<?> getProductById(@PathVariable int id) {
        return ResponseEntity
                .status(HttpStatus.FOUND)
                .body(productsService.getProduct(id));
    }

    @GetMapping("/products/{id}/image")
    public ResponseEntity<byte[]> getProductImage(@PathVariable int id) throws IOException {
        return ResponseEntity
                .status(HttpStatus.FOUND)
                .body(productsService.getProductImage(id));
    }
}
