package com.wejbson.mockInvestment.domains.apigen.controller;

import com.wejbson.mockInvestment.domains.apigen.dto.ApigenReqVO;
import com.wejbson.mockInvestment.domains.coin.dto.MarketListResDto;
import com.wejbson.mockInvestment.domains.coin.dto.MarketResDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/apigen")
public class ApigenController {
    @PostMapping("/apigen-test")
    private ResponseEntity<ApigenReqVO> apigenTest() {

        return null;
    }
}
