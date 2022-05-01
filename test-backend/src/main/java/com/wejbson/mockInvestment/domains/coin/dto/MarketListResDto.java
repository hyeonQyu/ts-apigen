package com.wejbson.mockInvestment.domains.coin.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.context.annotation.Description;

import java.util.List;

@Data
@Description(value = "마켓리스트 Response DTO")
public class MarketListResDto{

    List<MarketResDto> marketList;

    @Builder
    public MarketListResDto(List<MarketResDto> marketList)
    {
        this.marketList = marketList;
    }

}
