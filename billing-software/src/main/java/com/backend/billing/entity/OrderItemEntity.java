package com.backend.billing.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "tbl_order_item")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    @Column(unique = true)
    private String itemId;
    private String name;
    private Double price;
    private Double quantity;
}
