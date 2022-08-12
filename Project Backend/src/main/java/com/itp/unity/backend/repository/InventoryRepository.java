package com.itp.unity.backend.repository;

import com.itp.unity.backend.model.InventoryItem;
import com.itp.unity.backend.model.ItemIdOnly;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface InventoryRepository extends CrudRepository<InventoryItem, String> {

    public List<InventoryItem> findByItemType(String itemType);
    public List<ItemIdOnly> findAllBy();

}
