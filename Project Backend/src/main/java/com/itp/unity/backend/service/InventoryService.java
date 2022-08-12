package com.itp.unity.backend.service;

import com.itp.unity.backend.model.*;
import com.itp.unity.backend.repository.InventoryRepository;
import com.itp.unity.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    public boolean addInventoryItem(InventoryItem inventoryItem){
        InventoryItem inventoryItem1 = inventoryRepository.save(inventoryItem);
        if(inventoryItem1 != null)
            return true;
        else
            return false;
    }

    public List<InventoryItem> getAllInventoryItems(){
        List<InventoryItem> inventoryItems = new ArrayList<>();
        inventoryRepository.findAll().forEach(inventoryItems::add);
        inventoryItems.sort(new InventorySorter());
        return inventoryItems;
    }

    public InventoryItem getInventoryItem(String itemID){
        return inventoryRepository.findById(itemID).orElse(null);
    }

    public boolean updateInventoryItem(String itemID, InventoryItem updatedInventoryItem) {
        InventoryItem inventoryItem = inventoryRepository.findById(itemID).get();
        inventoryItem.setDetails(updatedInventoryItem);
        InventoryItem inventoryItem1 = inventoryRepository.save(inventoryItem);
        if(inventoryItem1 != null)
            return true;
        else
            return false;
    }

    public boolean deleteInventoryItem(String itemID) {
        inventoryRepository.deleteById(itemID);
        return inventoryRepository.existsById(itemID);
    }

    public List<InventoryItem> findByItemType(String itemType){
        List<InventoryItem> inventoryItems = new ArrayList<>();
        inventoryRepository.findByItemType(itemType).forEach(inventoryItems::add);
        return inventoryItems;
    }

    public List<InventoryItem> itemsNearingExpiration(){

        List<InventoryItem> inventoryItems = new ArrayList<>();

        inventoryRepository.findAll().forEach(inventoryItem -> {
            Date date = inventoryItem.getExpDate();
            Date date1 = new Date();
            long difference = date.getTime() - date1.getTime();
            long diffenceMonths = difference / (1000*60*60*24);
            System.out.println("Item ID Months:"+inventoryItem.getItemID());
            System.out.println("Difference Months:"+diffenceMonths);
            if(diffenceMonths <= 30 && diffenceMonths >= 0){
                inventoryItems.add(inventoryItem);
            }
        });

        return inventoryItems;

    }

    public List<InventoryItem> itemsExpired(){

        List<InventoryItem> inventoryItems = new ArrayList<>();

        inventoryRepository.findAll().forEach(inventoryItem -> {
            Date date = inventoryItem.getExpDate();
            Date date1 = new Date();
            long difference = date.getTime() - date1.getTime();
            long diffenceMonths = difference / (1000*60*60*24);
            if(difference <= 0){
                inventoryItems.add(inventoryItem);
            }
        });

        return inventoryItems;

    }

    public List<InventoryItem> itemsOutOfStock(){

        List<InventoryItem> inventoryItems = new ArrayList<>();

        inventoryRepository.findAll().forEach(inventoryItem -> {
            if (inventoryItem.getNoOfItems() <= 10)
                inventoryItems.add(inventoryItem);
        });

        return inventoryItems;
    }


    public List<ItemIdOnly> findItemIDs(){

        return inventoryRepository.findAllBy();

    }

    public HashMap<String, AtomicReference> findNumberOfItems(){

        HashMap<String, AtomicReference> itemType = new HashMap<>();
        AtomicReference<Integer> medicine= new AtomicReference<>(0);
        AtomicReference<Integer> medicalItems= new AtomicReference<>(0);
        AtomicReference<Integer> other= new AtomicReference<>(0);

        inventoryRepository.findAll().forEach(inventoryItem -> {

            if (inventoryItem.getItemType().equals("Medicine"))
                medicine.getAndSet(medicine.get() + 1);

            else if (inventoryItem.getItemType().equals("Medical Equipment"))
                medicalItems.getAndSet(medicalItems.get() + 1);

            else if (inventoryItem.getItemType().equals("Other"))
                other.getAndSet(other.get() + 1);
        });

        itemType.put("Medicine", medicine);
        itemType.put("Medical Equipment", medicalItems);
        itemType.put("Other", other);

        return itemType;

    }

    public void checkoutInventoryUpdate(OrderItemWrapper orderItemWrapper){

        ArrayList<InventoryItem> inventoryItemArrayList = new ArrayList<>();

        orderItemWrapper.getOrderItems().forEach(orderItem -> {
            InventoryItem inventoryItem = inventoryRepository.findById(orderItem.getItemId()).get();
            inventoryItem.setNoOfItems(inventoryItem.getNoOfItems()-orderItem.getQuantity());
            inventoryItemArrayList.add(inventoryItem);
        });

        inventoryRepository.saveAll(inventoryItemArrayList);

    }

}
