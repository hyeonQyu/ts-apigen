package com.wejbson.mockInvestment.domains.apigen.controller;

import com.wejbson.mockInvestment.domains.apigen.domain.SingleGeneric;
import com.wejbson.mockInvestment.domains.apigen.domain.MultiGeneric;
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

//    @PostMapping("/apigen-primitive")
//    private ResponseEntity<Integer> apigenPrimitive() {
//        return null;
//    }
//
//    @PostMapping("/apigen-no-response")
//    private void apigenNoResponse() {
//        return;
//    }
//
//    @PostMapping("/apigen-form")
//    private void apigenForm(@RequestParam Integer param1) {return;}

    @PostMapping("generic")
    private SingleGeneric<String> genericTest(@RequestBody SingleGeneric<Integer> req) {
        return null;
    }

    @PostMapping("generic2")
    private MultiGeneric<SingleGeneric<String>, Boolean> genericTest2(@RequestBody MultiGeneric<Integer, String> req) {
        return null;
    }
}
