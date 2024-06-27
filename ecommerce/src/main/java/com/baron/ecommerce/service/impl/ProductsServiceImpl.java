package com.baron.ecommerce.service.impl;

import com.baron.ecommerce.entity.Product;
import com.baron.ecommerce.exception.UserNotFoundException;
import com.baron.ecommerce.repository.ProductRepository;
import com.baron.ecommerce.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Date;
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
                .type(product.getType().toUpperCase())
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
        productToUpdate.setType(product.getType() == null ? productToUpdate.getType() : product.getType().toUpperCase());
        if (file == null) {
            productToUpdate.setImagePath(productToUpdate.getImagePath());
        } else {
            deleteImage(product.getImagePath());
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
    public Page<Product> getAllProducts(String name, String type, Boolean amountSoldAsc, int page, int size) {
        Sort sort = Sort.by("id").ascending();

        if (amountSoldAsc != null) {
            sort = amountSoldAsc ? Sort.by("amountSold").ascending() : Sort.by("amountSold").descending();
        }

        Pageable pageable = PageRequest.of(page, size, sort);

        if (name != null && !name.isEmpty()) {
            if (type != null && !type.isEmpty()) {
                return productRepository.findAllByNameContainingIgnoreCaseAndType(name, type, pageable);
            } else {
                return productRepository.findAllByNameContainingIgnoreCase(name, pageable);
            }
        } else {
            if (type != null && !type.isEmpty()) {
                return productRepository.findAllByType(type, pageable);
            } else {
                return productRepository.findAll(pageable);
            }
        }
    }

    @Override
    public Page<Product> getAllProductsBySortedDate(String name, String type, boolean isAscending, int page, int size) {
        Sort sort = isAscending ? Sort.by("createdAt").ascending() : Sort.by("createdAt").descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        if (name == null || name.isEmpty()) {
            if (type == null || type.isEmpty()) {
                return productRepository.findAll(pageable);
            } else {
                return productRepository.findAllByType(type, pageable);
            }
        } else {
            if (type == null || type.isEmpty()) {
                return productRepository.findAllByNameContainingIgnoreCase(name, pageable);
            } else {
                return productRepository.findAllByNameContainingIgnoreCaseAndType(name, type, pageable);
            }
        }
    }

    @Override
    public Page<Product> getAllProductsBySortedPrice(String name, String type, boolean isAscending, int page, int size) {
        Sort sort = isAscending ? Sort.by("price").ascending() : Sort.by("price").descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        if (name == null || name.isEmpty()) {
            if (type == null || type.isEmpty()) {
                return productRepository.findAll(pageable);
            } else {
                return productRepository.findAllByType(type, pageable);
            }
        } else {
            if (type == null || type.isEmpty()) {
                return productRepository.findAllByNameContainingIgnoreCase(name, pageable);
            } else {
                return productRepository.findAllByNameContainingIgnoreCaseAndType(name, type, pageable);
            }
        }
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
