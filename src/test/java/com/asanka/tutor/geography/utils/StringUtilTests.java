package com.asanka.tutor.geography.utils;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.*;

class StringUtilTests {

    @Test
    void reverseShouldHandleVariousCases() {
        assertThat(StringUtil.reverse(null)).isNull();
        assertThat(StringUtil.reverse("")).isEmpty();
        assertThat(StringUtil.reverse("hello")).isEqualTo("olleh");
        assertThat(StringUtil.reverse("racecar")).isEqualTo("racecar");
        assertThat(StringUtil.reverse("123 456")).isEqualTo("654 321");
    }

    @Test
    void isPalindromeShouldValidateCorrectly() {
        assertThat(StringUtil.isPalindrome(null)).isFalse();
        assertThat(StringUtil.isPalindrome("")).isTrue();
        assertThat(StringUtil.isPalindrome("A man, a plan, a canal: Panama")).isTrue();
        assertThat(StringUtil.isPalindrome("Was it a car or a cat I saw?")).isTrue();
        assertThat(StringUtil.isPalindrome("hello")).isFalse();
        assertThat(StringUtil.isPalindrome("!!")).isTrue(); // Only special characters
    }

    @Test
    void truncateShouldHandleEdgeCases() {
        assertThat(StringUtil.truncate(null, 5)).isNull();
        assertThat(StringUtil.truncate("Hello world", 20)).isEqualTo("Hello world");
        assertThat(StringUtil.truncate("Short", 5)).isEqualTo("Short");
        assertThat(StringUtil.truncate("Long text needs truncating", 10))
                .isEqualTo("Long t...");
        assertThat(StringUtil.truncate("Test", 2)).isEqualTo("...");
    }

    @Test
    void containsIgnoringCaseShouldHandleNulls() {
        assertThat(StringUtil.containsIgnoringCase(null, "test")).isFalse();
        assertThat(StringUtil.containsIgnoringCase("test", null)).isFalse();
        assertThat(StringUtil.containsIgnoringCase("Hello World", "hello")).isTrue();
        assertThat(StringUtil.containsIgnoringCase("JAVA", "va")).isTrue();
        assertThat(StringUtil.containsIgnoringCase("CaseSensitive", "Sensitive")).isTrue();
    }

    @Test
    void isEmptyShouldCheckForBlankStrings() {
        assertThat(StringUtil.isEmpty(null)).isTrue();
        assertThat(StringUtil.isEmpty("")).isTrue();
        assertThat(StringUtil.isEmpty("   ")).isTrue();
        assertThat(StringUtil.isEmpty(" valid ")).isFalse();
    }

    @Test
    void edgeCaseCombinations() {
        assertThat(StringUtil.isPalindrome("Able was I ere I saw Elba"))
                .isTrue();

        assertThat(StringUtil.truncate("Exactly", 7))
                .isEqualTo("Exactly");

        assertThat(StringUtil.containsIgnoringCase("anything", ""))
                .isTrue();
    }
}
