package com.asanka.tutor.geography.services;

import java.util.concurrent.ConcurrentHashMap;

class PaymentService {
    private final ConcurrentHashMap<Long, Double> accounts = new ConcurrentHashMap<>();

    public void addAccount(long accountId, double balance) {
        accounts.put(accountId, balance);
    }

    public boolean transfer(long from, long to, double amount) throws InterruptedException {
        if (amount <= 0) {
            return false;
        }

        Double fromBalance = accounts.get(from);
        Double toBalance = accounts.get(to);

        if (fromBalance == null || toBalance == null) {
            return false;
        }

        if (fromBalance >= amount) {
            Thread.sleep(10);

            accounts.put(from, fromBalance - amount);
            accounts.put(to, toBalance + amount);
            return true;
        }

        return false;
    }
}
