package com.asanka.tutor.geography.utils;

public class StringUtil {

    public static String reverse(String input) {
        if (input == null) return null;
        return new StringBuilder(input).reverse().toString();
    }

    public static boolean isPalindrome(String input) {
        if (input == null) return false;
        String cleaned = input.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
        return cleaned.equals(reverse(cleaned));
    }

    public static String truncate(String input, int maxLength) {
        if (input == null) return null;
        if (maxLength <= 3) return "...";
        if (input.length() <= maxLength) return input;
        return input.substring(0, maxLength - 3) + "...";
    }

    public static boolean containsIgnoringCase(String source, String search) {
        if (source == null || search == null) return false;
        return source.toLowerCase().contains(search.toLowerCase());
    }

    public static boolean isEmpty(String input) {
        return input == null || input.trim().isEmpty();
    }
}
