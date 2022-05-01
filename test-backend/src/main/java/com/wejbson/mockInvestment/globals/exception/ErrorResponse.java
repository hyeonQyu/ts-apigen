package com.wejbson.mockInvestment.globals.exception;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ErrorResponse {

    private String code;

    private String message;

    @Builder
    public ErrorResponse(String code, String message){
        this.code = code;
        this.message = message;
    }
}
