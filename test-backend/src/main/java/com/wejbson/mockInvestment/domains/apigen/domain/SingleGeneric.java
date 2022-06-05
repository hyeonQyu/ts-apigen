package com.wejbson.mockInvestment.domains.apigen.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Data
@Getter
@Setter
public class SingleGeneric<T> {
    private T type;
    private List<Integer> integerList;
    private Set<Integer> integerSet;
    private Map<Integer, String> integerStringMap;
}
