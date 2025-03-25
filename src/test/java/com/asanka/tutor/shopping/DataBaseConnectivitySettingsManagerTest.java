package com.asanka.tutor.shopping;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class DataBaseConnectivitySettingsManagerTest {

    @Test
    public void returnDefaultConnectionStringInitially() {
        assertTrue(DataBaseConnectivitySettingsManager.isUsingDefaultConnectionString());
    }

    @Test
    public void updateConnectionStringSuccessfully() {
        DataBaseConnectivitySettingsManager.performConnectionStringUpdate("jdbc:mysql://localhost:3306/test_db");
        assertEquals("jdbc:mysql://localhost:3306/test_db",
                DataBaseConnectivitySettingsManager.obtainActualConnectionString());
    }

    @Test
    public void throwExceptionWhenConnectionStringIsInvalid() {
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            DataBaseConnectivitySettingsManager.performConnectionStringUpdate("");
        });
        assertEquals("Provided connection string is invalid!", exception.getMessage());
    }

    @Test
    public void resetConnectionStringToDefault() {
        DataBaseConnectivitySettingsManager.performConnectionStringUpdate("jdbc:mysql://localhost:3306/another_db");

        DataBaseConnectivitySettingsManager.resetConnectionStringToDefault();

        assertTrue(DataBaseConnectivitySettingsManager.isUsingDefaultConnectionString());
    }
}
