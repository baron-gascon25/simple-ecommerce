package com.baron.ecommerce.controller;

import com.baron.ecommerce.entity.dto.CartDto;
import com.baron.ecommerce.entity.dto.CheckoutDto;
import com.baron.ecommerce.entity.dto.ResponseDto;
import com.baron.ecommerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/cart")
    public ResponseEntity<?> addToCart(@RequestParam int productId, @RequestBody CartDto cartDto) {
        try {
            cartService.add(productId, cartDto);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseDto(HttpStatus.OK.value(), "Item successfully added to cart"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new ResponseDto(HttpStatus.CONFLICT.value(), "Item could not be added due to a duplication error"));
        }
    }

    @PutMapping("/cart")
    public ResponseEntity<?> updateCart(@RequestParam long itemId, @RequestBody CartDto cartDto) {
        try {
            cartService.update(itemId, cartDto);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseDto(HttpStatus.OK.value(), "Cart updated successfully"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Cart could not be updated due to an error"));
        }
    }

    @PutMapping("/cart/checkout")
    public ResponseEntity<?> checkoutCart(@RequestParam int userId, @RequestBody CheckoutDto checkoutDto) {
        try {
            cartService.checkout(userId, checkoutDto);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseDto(HttpStatus.OK.value(), "Checkout success"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Checkout success"));
        }
    }

    @GetMapping("/cart")
    public ResponseEntity<?> getCart(@RequestParam int userId) {
        return ResponseEntity
                .status(HttpStatus.FOUND)
                .body(cartService.get(userId));
    }
}
