package com.asanka.tutor.shopping;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ShoppingCartTest {

    @Test
    void testAddItem() {
        ShoppingCart cart = new ShoppingCart();
        cart.addItem("Apple");
        assertEquals(1, cart.getItems().size());
        assertEquals(1, ShoppingCart.getTotalItemsInAllCarts());
    }

    @Test
    void testRemoveItem() {
        ShoppingCart cart = new ShoppingCart();
        cart.addItem("Banana");
        cart.removeItem("Banana");
        assertEquals(0, cart.getItems().size());
        assertEquals(0, ShoppingCart.getTotalItemsInAllCarts());
    }

    @Test
    void testTotalItemsAcrossCarts() {
        ShoppingCart cart1 = new ShoppingCart();
        cart1.addItem("Orange");

        ShoppingCart cart2 = new ShoppingCart();
        cart2.addItem("Grapes");

        assertEquals(2, ShoppingCart.getTotalItemsInAllCarts());
    }
}
