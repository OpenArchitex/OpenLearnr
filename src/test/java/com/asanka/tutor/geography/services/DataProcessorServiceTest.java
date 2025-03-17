package com.asanka.tutor.geography.services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DataProcessorServiceTest {
    @InjectMocks
    private DataProcessorService dataProcessorService;
    @Mock
    private DataValidatorService dataValidatorService;
    @Mock
    private DataFetchService dataFetchService;

    @Test
    void processData_ValidRequest_ReturnsRedactedData() {
        String testId = "8d1ba692-1ce9-4cb4-a407-34743e6483c8";
        when(dataFetchService.fetchData(testId))
                .thenReturn("<User><ID>8d1ba692-1ce9-4cb4-a407-34743e6483c8</ID><Name>John Wiley</Name><Email>j.wiley@gmail.com</Email></User>");

        String result = dataProcessorService.processData(testId);

        assertTrue(result.contains("<Name>John Wiley</Name>"));
    }
}
