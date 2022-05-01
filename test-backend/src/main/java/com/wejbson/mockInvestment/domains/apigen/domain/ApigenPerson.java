package com.wejbson.mockInvestment.domains.apigen.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Data
@Getter
@Setter
public class ApigenPerson {
    private String name;

    private ApigenPersonalInfo info;
}
