package com.wejbson.mockInvestment.domains.apigen.controller;

import com.wejbson.mockInvestment.domains.apigen.dto.ApigenReqVO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/apigen")
public class ApigenController {

    @GetMapping("/apigen-vo")
    private ResponseEntity<ApigenReqVO> apigenVo(@RequestBody ApigenReqVO req) {
        return null;
    }

    @PostMapping("/apigen-primitive")
    private ResponseEntity<Integer> apigenPrimitive() {
        return null;
    }
}
