package com.itp.unity.backend.model;

import javax.persistence.*;

@Entity
@Table(name = "medorder")
public class MedOrder {

    @Id
    @Column(name = "orderid")
    String orderId;

    @Column(name = "fname")
    String fName;

    @Column(name = "lname")
    String lName;

    @Column(name = "streetno")
    Integer streetNo;

    @Column(name = "street")
    String street;

    @Column(name = "city")
    String city;

    @Column(name = "cardtype")
    String cardType;

    @Column(name = "cardno")
    Integer cardNo;

    @Column(name = "cvv")
    Integer cvv;

    @Column(name = "phoneno")
    Integer phoneNo;

    @Column(name = "purchasedate")
    String purchaseDate;

    @Column(name = "total")
    Double total;

    public MedOrder() {
    }

    public MedOrder(String orderID, String fName, String lName, Integer streetNo, String street, String city, String cardType, Integer cardNo, Integer cvv, Integer phoneNo) {
        this.orderId = orderID;
        this.fName = fName;
        this.lName = lName;
        this.streetNo = streetNo;
        this.street = street;
        this.city = city;
        this.cardType = cardType;
        this.cardNo = cardNo;
        this.cvv = cvv;
        this.phoneNo = phoneNo;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getfName() {
        return fName;
    }

    public void setfName(String fName) {
        this.fName = fName;
    }

    public String getlName() {
        return lName;
    }

    public void setlName(String lName) {
        this.lName = lName;
    }

    public Integer getStreetNo() {
        return streetNo;
    }

    public void setStreetNo(Integer streetNo) {
        this.streetNo = streetNo;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public Integer getCardNo() {
        return cardNo;
    }

    public void setCardNo(Integer cardNo) {
        this.cardNo = cardNo;
    }

    public Integer getCvv() {
        return cvv;
    }

    public void setCvv(Integer cvv) {
        this.cvv = cvv;
    }

    public Integer getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(Integer phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(String purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }
}
