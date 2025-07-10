package com.backend.billing.service;

import com.backend.billing.io.OrderRequest;
import com.backend.billing.io.OrderResponse;

import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderRequest request);
    void deleteOrder(String orderId);
    List<OrderResponse> getLatestOrders();
}
