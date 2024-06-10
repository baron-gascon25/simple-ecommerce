package com.baron.ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;

import java.sql.Types;

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
    @Column(name = "product_id")
    private int product_id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Integer price;

    @Lob
    @JdbcTypeCode(Types.BLOB)
    @Column(name = "image_data")
    private byte[] imageData;

}
