package com.asanka.tutor.geography.services;

public class DataFetchService {

    public String fetchData(String id)  {
        return String.format("<User><ID>%s</ID><Name>User%s</Name><Email>user%s@domain.com</Email></User>", id, id, id);
    }
}
