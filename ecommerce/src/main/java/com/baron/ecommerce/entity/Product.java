package com.baron.ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;

@Entity
@Table(name = "products")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Integer price;

    @Column(name = "type")
    private String type;

    @Column(name = "image_path")
    private String imagePath;

    @Column(name= "amount_sold")
    private Integer amountSold;

    @CreatedDate
    @Column(name= "created_at", updatable = false)
    private Date createdAt;
}
