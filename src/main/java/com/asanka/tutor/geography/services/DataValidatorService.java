package com.asanka.tutor.geography.services;

public class DataValidatorService {
    public boolean validateIdentifier(String id) {
        return id != null && id.matches("^[A-Za-z0-9-]{3,20}$");
    }
}
