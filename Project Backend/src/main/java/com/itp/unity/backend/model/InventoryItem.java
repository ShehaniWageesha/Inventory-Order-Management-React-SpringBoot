package com.itp.unity.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "inventory_item")
public class InventoryItem {

    @Id
    private String itemID;
    @Column(name = "displayname")
    private String displayName;
    @Column(name = "manufacturer")
    private String manufacturer;
    @Column(name = "price")
    private double price;

    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "mfgdate")
    private Date mfgDate;

    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "expdate")
    private Date expDate;
    @Column(name = "dose")
    private int dose;
    @Column(name = "itemtype")
    private String itemType;
    @Column(name = "noofitems")
    private int noOfItems;
    @Column(name = "description")
    private String description;


    public InventoryItem() {
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getItemID() {
        return itemID;
    }

    public void setItemID(String itemID) {
        this.itemID = itemID;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Date getMfgDate() {
        return mfgDate;
    }

    public void setMfgDate(Date mfgDate) {
        this.mfgDate = mfgDate;
    }

    public Date getExpDate() {
        return expDate;
    }

    public void setExpDate(Date expDate) {
        this.expDate = expDate;
    }

    public int getDose() {
        return dose;
    }

    public void setDose(int dose) {
        this.dose = dose;
    }

    public int getNoOfItems() {
        return noOfItems;
    }

    public void setNoOfItems(int noOfItems) {
        this.noOfItems = noOfItems;
    }

    public String getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDetails(InventoryItem inventoryItem){
        setDisplayName(inventoryItem.displayName);
        setManufacturer(inventoryItem.manufacturer);
        setMfgDate(inventoryItem.mfgDate);
        setExpDate(inventoryItem.expDate);
        setItemType(inventoryItem.itemType);
        setDose(inventoryItem.dose);
        setNoOfItems(inventoryItem.noOfItems);
        setPrice(inventoryItem.price);
        setDescription(inventoryItem.description);
    }
}
