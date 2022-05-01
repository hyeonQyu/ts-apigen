package com.wejbson.mockInvestment.domains.member.dto;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class LoginResDto {

    @NotBlank
    private String id;

    private String name;

    private String token;

    @Builder
    public LoginResDto(String id, String name, String token)
    {
        this.id = id;
        this.name = name;
        this.token = token;
    }
}
