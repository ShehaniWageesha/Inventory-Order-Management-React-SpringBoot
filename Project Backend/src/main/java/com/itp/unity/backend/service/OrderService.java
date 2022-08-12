package com.itp.unity.backend.service;

import com.itp.unity.backend.model.MedOrder;
import com.itp.unity.backend.model.OrderIdOnly;
import com.itp.unity.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public void addOrder(MedOrder medOrder){

        orderRepository.save(medOrder);

    }

    public List<MedOrder> getAllOrders(){
        ArrayList<MedOrder> medOrders = new ArrayList<>();
        orderRepository.findAll().forEach(medOrders::add);
        return medOrders;
    }

    public List<OrderIdOnly> getOrderIDs(){
        return orderRepository.findAllBy();
    }

}
