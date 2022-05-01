package com.wejbson.mockInvestment;

import com.wejbson.mockInvestment.domains.coin.service.CoinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MockInvestmentApplication {

    public static void main(String[] args) {
        SpringApplication.run(MockInvestmentApplication.class, args);
    }

}
