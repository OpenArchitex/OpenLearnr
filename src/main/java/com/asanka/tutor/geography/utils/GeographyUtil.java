package com.asanka.tutor.geography.utils;

public class GeographyUtil {

    private static final double EARTH_RADIUS_KM = 6371.0;
    private static final double MILES_PER_KM = 0.621371;

    /**
     * Calculate distance between two points using Haversine formula
     * @return distance in kilometers
     */
    public static double calculateDistance(double lat1, double lon1,
                                           double lat2, double lon2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(Math.toRadians(lat1)) *
                        Math.cos(Math.toRadians(lat2)) *
                        Math.sin(dLon/2) * Math.sin(dLon/2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return EARTH_RADIUS_KM * c;
    }

    /**
     * Convert coordinates to decimal degrees format from DMS (Degrees, Minutes, Seconds)
     */
    public static double dmsToDecimal(int degrees, int minutes, double seconds, String direction) {
        if (degrees < 0 || minutes < 0 || seconds < 0) {
            throw new IllegalArgumentException("DMS components cannot be negative");
        }

        double decimal = degrees + (minutes / 60.0) + (seconds / 3600.0);
        switch (direction.toUpperCase()) {
            case "S":
            case "W":
                return -decimal;
            case "N":
            case "E":
                return decimal;
            default:
                throw new IllegalArgumentException("Invalid direction: " + direction);
        }
    }
}
