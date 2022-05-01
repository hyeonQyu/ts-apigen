package com.wejbson.mockInvestment.domains.apigen.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Getter
@Setter
public class ApigenPersonalInfo {
    private String id;

    private String password;

    private String address;

    private String tel;
}
