package com.wejbson.mockInvestment.domains.apigen.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class MultiGeneric<T, U> {
    private SingleGeneric<T> singleGeneric;
    private U u;
}
