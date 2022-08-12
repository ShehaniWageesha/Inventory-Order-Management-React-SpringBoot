package com.itp.unity.backend.model;

import java.util.Comparator;

public class InventorySorter implements Comparator<InventoryItem> {
    @Override
    public int compare(InventoryItem o1, InventoryItem o2) {
        return o1.getItemID().compareTo(o2.getItemID());
    }
}
