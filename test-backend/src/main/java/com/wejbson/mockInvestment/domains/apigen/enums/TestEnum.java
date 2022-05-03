package com.wejbson.mockInvestment.domains.apigen.enums;

public enum TestEnum {
    Test("면접전형");

    private final String value;

    public String getValue() {
        return value;
    }

    TestEnum(String value) {
        this.value = value;
    }
}