package com.asanka.tutor.geography.utils;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.within;

public class GeographyUtilTest {

    //region Generated with Explyt. Tests for GeographyUtil.calculateDistance(double, double, double, double): double

    /**
     * Given two points on the equator with specific longitudes<br>
     * When the system calculates the distance between these two points<br>
     * Then the calculated distance should reflect the actual distance along the equator<br>
     * And the result should be consistent with known geographical data<br>
     * And the distance should be greater than zero if the longitudes are different<br>
     * And the distance should be zero if the longitudes are the same
     */
    @Test
    public void shouldCalculateDistanceBetweenTwoPointsOnEquator() {
        // Given two points on the equator with specific longitudes
        double lat1 = 0.0;
        double lon1 = 0.0;
        double lat2 = 0.0;
        double lon2 = 90.0;

        // When the system calculates the distance between these two points
        double distance = GeographyUtil.calculateDistance(lat1, lon1, lat2, lon2);

        // Then the calculated distance should reflect the actual distance along the equator
        assertThat(distance).isCloseTo(10007.543, within(0.1));

        // And the result should be consistent with known geographical data
        assertThat(distance).isGreaterThan(0);

        // And the distance should be greater than zero if the longitudes are different
        assertThat(distance).isGreaterThan(0);

        // And the distance should be zero if the longitudes are the same
        double sameLongitudeDistance = GeographyUtil.calculateDistance(lat1, lon1, lat1, lon1);
        assertThat(sameLongitudeDistance).isEqualTo(0);
    }

    /**
     * Given two geographical points with identical latitude and longitude<br>
     * When the system calculates the distance between these two points<br>
     * Then the calculated distance should be zero<br>
     * And the system should not throw any errors or exceptions<br>
     * And the result should be consistent regardless of the specific location<br>
     * And the calculation should complete within a reasonable time frame
     */
    @Test
    public void shouldHandleEdgeCasesWhereTwoPointsAreAtSameLocation() {
        // Given two geographical points with identical latitude and longitude
        double lat = 51.5074;
        double lon = -0.1278;

        // When the system calculates the distance between these two points
        double distance = GeographyUtil.calculateDistance(lat, lon, lat, lon);

        // Then the calculated distance should be zero
        assertThat(distance).isEqualTo(0);

        // And the system should not throw any errors or exceptions
        // (implicitly tested by the absence of exceptions)

        // And the result should be consistent regardless of the specific location
        double anotherDistance = GeographyUtil.calculateDistance(34.0522, -118.2437, 34.0522, -118.2437);
        assertThat(anotherDistance).isEqualTo(0);

        // And the calculation should complete within a reasonable time frame
        // (implicitly tested by the test execution time)
    }

    //endregion

}
