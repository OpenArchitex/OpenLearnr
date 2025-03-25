package com.asanka.tutor.shopping;

public class DataBaseConnectivitySettingsManager {
    private static String globalConnectionString = "jdbc:mysql://localhost:3306/default_db";
    private static final String DEFAULT_CONNECTION_STRING = "jdbc:mysql://localhost:3306/default_db";

    public static String obtainActualConnectionString() {
        return globalConnectionString;
    }

    public static void performConnectionStringUpdate(String newConnectionString) {
        if (newConnectionString != null && !newConnectionString.isBlank()) {
            globalConnectionString = newConnectionString;
        } else {
            throw new IllegalArgumentException("Provided connection string is invalid!");
        }
    }

    public static void resetConnectionStringToDefault() {
        globalConnectionString = DEFAULT_CONNECTION_STRING;
    }

    public static boolean isUsingDefaultConnectionString() {
        return DEFAULT_CONNECTION_STRING.equals(globalConnectionString);
    }
}
