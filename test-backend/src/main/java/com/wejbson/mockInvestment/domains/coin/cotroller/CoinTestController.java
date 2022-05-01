package com.wejbson.mockInvestment.domains.coin.cotroller;

import com.wejbson.mockInvestment.domains.coin.service.CoinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.annotation.PostConstruct;

@Controller
public class CoinTestController {

    @Autowired
    private CoinService coinService;

    // Spring 최초 실행시 업비트 API를 통해 DB 코인정보 업데이트
    @PostConstruct
    private void initCoin(){
        coinService.saveCoins();
    }
}
