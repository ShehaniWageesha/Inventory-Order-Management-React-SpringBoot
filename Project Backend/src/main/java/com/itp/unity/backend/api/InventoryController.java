package com.itp.unity.backend.api;

import com.itp.unity.backend.model.InventoryItem;
import com.itp.unity.backend.model.ItemIdOnly;
import com.itp.unity.backend.model.OrderItem;
import com.itp.unity.backend.model.OrderItemWrapper;
import com.itp.unity.backend.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class InventoryController {

    @Autowired
    InventoryService inventoryService;

    @RequestMapping("/inventoryItems")
    public List<InventoryItem> getAllInventoryItems() {
        return inventoryService.getAllInventoryItems();
    }

    @RequestMapping("/inventoryItems/{id}")
    public InventoryItem getInventoryItem(@PathVariable String id){
        return inventoryService.getInventoryItem(id);
    }

    @RequestMapping("/inventoryitems/{itemType}")
    public List<InventoryItem> findByItemType(@PathVariable String itemType){
        return inventoryService.findByItemType(itemType);
    }

    @RequestMapping("/inventoryitems/items/type")
    public HashMap<String, AtomicReference> findNumberOfItemsByType(){
        return inventoryService.findNumberOfItems();
    }

    @RequestMapping("/inventoryitems/itemIDs")
    public List<ItemIdOnly> findByItemType(){
        return inventoryService.findItemIDs();
    }

    @RequestMapping("/expiring")
    public List<InventoryItem> itemsNearingExpiration(){
        return inventoryService.itemsNearingExpiration();
    }

    @RequestMapping("/expired")
    public List<InventoryItem> itemsExpired(){
        return inventoryService.itemsExpired();
    }

    @RequestMapping("/runout")
    public List<InventoryItem> itemsOutOfStock(){
        return inventoryService.itemsOutOfStock();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/inventoryItems")
    public boolean addInventoryItem(@RequestBody InventoryItem inventoryItem) {
        Boolean status =  inventoryService.addInventoryItem(inventoryItem);
        return status;
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/inventoryItems/update/{itemID}")
    public boolean updateItemDetails(@PathVariable String itemID, @RequestBody InventoryItem inventoryItem){
        Boolean status = inventoryService.updateInventoryItem(itemID, inventoryItem);
        return status;
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/inventoryItems/{id}")
    public Map<String, Boolean> deleteInventoryItem(@PathVariable String id){
        //inventoryService.deleteInventoryItem(id);
        Map<String, Boolean> valid = new HashMap<>();
        valid.put("valid",inventoryService.deleteInventoryItem(id));

        return valid;
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/inventoryItems/checkout/update", consumes = "application/json")
    public void checkoutInventoryUpdate(@RequestBody OrderItemWrapper orderItemWrapper){


        if(orderItemWrapper.getOrderItems().size() != 0)
            System.out.println(orderItemWrapper.getOrderItems().size());
        inventoryService.checkoutInventoryUpdate(orderItemWrapper);

    }

}
