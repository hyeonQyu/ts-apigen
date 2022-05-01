package com.wejbson.mockInvestment.domains.member.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter @Setter
public class Member {

    @Id
    private String id;

    private String password;

    private String name;

    private String tel;
}
