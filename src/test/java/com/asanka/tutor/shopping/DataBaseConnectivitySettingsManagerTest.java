package com.asanka.tutor.shopping;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class DataBaseConnectivitySettingsManagerTest {

    @Test
    public void returnDefaultConnectionStringInitially() {
        assertTrue(org.example.DataBaseConnectivitySettingsManager.isUsingDefaultConnectionString());
    }

    @Test
    public void updateConnectionStringSuccessfully() {
        org.example.DataBaseConnectivitySettingsManager.performConnectionStringUpdate("jdbc:mysql://localhost:3306/test_db");
        assertEquals("jdbc:mysql://localhost:3306/test_db",
                org.example.DataBaseConnectivitySettingsManager.obtainActualConnectionString());
    }

    @Test
    public void throwExceptionWhenConnectionStringIsInvalid() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            org.example.DataBaseConnectivitySettingsManager.performConnectionStringUpdate("");
        });
        assertEquals("Provided connection string is invalid!", exception.getMessage());
    }

    @Test
    public void resetConnectionStringToDefault() {
        org.example.DataBaseConnectivitySettingsManager.performConnectionStringUpdate("jdbc:mysql://localhost:3306/another_db");

        org.example.DataBaseConnectivitySettingsManager.resetConnectionStringToDefault();

        assertTrue(org.example.DataBaseConnectivitySettingsManager.isUsingDefaultConnectionString());
    }
}
