package com.wejbson.mockInvestment.domains.member.dto;

import lombok.Data;
import org.springframework.context.annotation.Description;

import javax.validation.constraints.NotBlank;

@Data
@Description(value = "로그인 Request DTO")
public class LoginReqDto {

    @NotBlank
    private String id;

    @NotBlank
    private String password;

}
