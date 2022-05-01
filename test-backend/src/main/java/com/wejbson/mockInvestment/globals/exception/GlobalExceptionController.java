package com.wejbson.mockInvestment.globals.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionController {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> exceptionHandler(RuntimeException runtimeException)
    {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ErrorResponse.builder().code("10").message(runtimeException.getMessage()).build());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> exceptionHandler(MethodArgumentNotValidException manvException)
    {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ErrorResponse.builder().code("20").message(manvException.getMessage()).build());
    }
}
