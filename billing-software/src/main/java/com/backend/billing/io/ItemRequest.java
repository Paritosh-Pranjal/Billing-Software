package com.backend.billing.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.math.BigInteger;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class ItemRequest {

    private String name;
    private BigDecimal price;
    private String categoryId;
    private String description;
}
