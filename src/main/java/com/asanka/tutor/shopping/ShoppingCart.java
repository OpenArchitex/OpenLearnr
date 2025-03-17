package com.asanka.tutor.shopping;

import java.util.ArrayList;
import java.util.List;

public class ShoppingCart {
    private static int totalItemsInAllCarts = 0;
    private List<String> items;

    public ShoppingCart() {
        this.items = new ArrayList<>();
    }

    public void addItem(String item) {
        items.add(item);
        totalItemsInAllCarts++;
    }

    public void removeItem(String item) {
        if (items.remove(item)) {
            totalItemsInAllCarts--;
        }
    }

    public List<String> getItems() {
        return new ArrayList<>(items);
    }

    public static int getTotalItemsInAllCarts() {
        return totalItemsInAllCarts;
    }
}
