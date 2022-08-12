package com.itp.unity.backend.model;

import java.util.ArrayList;
import java.util.List;

public class OrderItemWrapper {

    private List<OrderItem> orderItems = new ArrayList<>();

    public OrderItemWrapper() {
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }
}
