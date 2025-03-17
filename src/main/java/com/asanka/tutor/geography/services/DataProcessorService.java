package com.asanka.tutor.geography.services;

import java.util.concurrent.*;

public class DataProcessorService {
    private static final int MAX_RETRIES = 3;

    private final DataFetchService dataFetchService;
    private final DataValidatorService dataValidatorService;

    private final ConcurrentMap<String, String> responseCache = new ConcurrentHashMap<>();

    public DataProcessorService(DataFetchService dataFetchService, DataValidatorService dataValidatorService) {
        this.dataFetchService = dataFetchService;
        this.dataValidatorService = dataValidatorService;
    }

    public String processData(String id) {
        if (!dataValidatorService.validateIdentifier(id)) {
            return null;
        }

        return responseCache.computeIfAbsent(id, key -> {
            String rawData = fetchWithRetry(key);
            return parseData(rawData);
        });
    }

    private String fetchWithRetry(String id) {
        int attempt = 0;
        while (true) {
            try {
                return dataFetchService.fetchData(id);
            } catch (Exception e) {
                if (++attempt > MAX_RETRIES) throw e;
            }
        }
    }

    private String parseData(String rawData) {
        if (rawData.startsWith("{")) {
            return rawData.replaceAll("(?i)\"password\":.*?,", "");
        }
        return rawData;
    }
}
