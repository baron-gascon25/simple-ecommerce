package com.baron.ecommerce.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data @AllArgsConstructor
public class CartDto {

    private Integer quantity;
    private int userId;
}
