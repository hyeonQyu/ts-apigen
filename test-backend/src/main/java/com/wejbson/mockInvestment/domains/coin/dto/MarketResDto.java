package com.wejbson.mockInvestment.domains.coin.dto;

import lombok.Builder;
import lombok.Data;

@Data
public class MarketResDto {

    private String market;

    private String korName;

    private String engName;

    private String currentPrice;


    @Builder
    public MarketResDto (String market, String korName, String engName, String currentPrice){
        this.market = market;
        this.korName = korName;
        this.engName = engName;
        this.currentPrice = currentPrice;
    }
}
