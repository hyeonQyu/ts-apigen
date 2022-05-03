package com.wejbson.mockInvestment.domains.apigen.enums;

public enum Rank {
    FIRST("1등"), SECOND("2등");
    
    private final String value;

    public String getValue() {
        return value;
    }

    Rank(String value) {
        this.value = value;
    }
}