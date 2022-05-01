package com.wejbson.mockInvestment.domains.coin.cotroller;

import com.wejbson.mockInvestment.domains.coin.dto.MarketListResDto;
import com.wejbson.mockInvestment.domains.coin.service.CoinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;

@RestController
@RequestMapping("/coin")
public class CoinController {

    @Autowired
    private CoinService coinService;

    @RequestMapping("/market-list")
    private ResponseEntity<MarketListResDto> getMarketList() {

        MarketListResDto marketListResDto = MarketListResDto.builder().marketList(coinService.getMarketList()).build();

        return ResponseEntity.status(HttpStatus.OK).body(marketListResDto);
    }

}
