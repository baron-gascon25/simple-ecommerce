package com.baron.ecommerce.entity.dto;

import com.baron.ecommerce.entity.Items;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartPendingDto {

    private Integer total;
    private List<Items> items;
}
