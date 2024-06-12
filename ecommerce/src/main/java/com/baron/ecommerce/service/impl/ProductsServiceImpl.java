package com.baron.ecommerce.service.impl;

import com.baron.ecommerce.entity.Product;
import com.baron.ecommerce.exception.UserNotFoundException;
import com.baron.ecommerce.repository.ProductRepository;
import com.baron.ecommerce.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class ProductsServiceImpl implements ProductsService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void createProduct(Product product, MultipartFile file) throws IOException {
        String uniqueFileName = saveImageToStorage(file);
        var productToSave = Product.builder()
                .name(product.getName())
                .price(product.getPrice())
                .imagePath(uniqueFileName)
                .amountSold(0)
                .createdAt(new Date(System.currentTimeMillis()))
                .build();
        productRepository.save(productToSave);
    }

    @Override
    public void updateProduct(int id, Product product, MultipartFile file) throws IOException {
        Product productToUpdate = productRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Product not found"));
        productToUpdate.setName(product.getName() == null ? productToUpdate.getName() : product.getName());
        productToUpdate.setPrice(product.getPrice() == null ? productToUpdate.getPrice() : product.getPrice());
        if (file.isEmpty()) {
            productToUpdate.setImagePath(productToUpdate.getImagePath());
        } else {
            String uniqueFileName = saveImageToStorage(file);
            productToUpdate.setImagePath(uniqueFileName);
        }
        productRepository.save(productToUpdate);
    }

    @Override
    public void deleteProduct(int id) throws IOException {
        Product productToDelete = productRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Product not found"));
        deleteImage(productToDelete.getImagePath());
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

    @Override
    public byte[] getProductImage(int id) throws IOException {
        Product product = productRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
        Path imagePath = Path.of("src/main/resources/static/images", product.getImagePath());
        if(Files.exists(imagePath)) {
            return Files.readAllBytes(imagePath);
        } else {
            throw new IOException("Image not found");
        }
    }

    public String saveImageToStorage(MultipartFile file) throws IOException {
        String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path uploadPath = Path.of("src/main/resources/static/images");
        Path filePath = uploadPath.resolve(uniqueFileName);

        if(!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return uniqueFileName;
    }

    public void deleteImage(String imageName) throws IOException {
        Path imagePath = Path.of("src/main/resources/static/images", imageName);

        if (Files.exists(imagePath)) {
            Files.delete(imagePath);
        } else {
            throw new IOException("Image not found");
        }
    }
}
