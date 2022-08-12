package com.itp.unity.backend.repository;

import com.itp.unity.backend.model.MedOrder;
import com.itp.unity.backend.model.OrderIdOnly;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderRepository extends CrudRepository<MedOrder, String> {

    public List<OrderIdOnly> findAllBy();

}
