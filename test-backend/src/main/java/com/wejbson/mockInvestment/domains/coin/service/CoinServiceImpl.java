package com.wejbson.mockInvestment.domains.coin.service;

import com.wejbson.mockInvestment.domains.coin.domain.Coin;
import com.wejbson.mockInvestment.domains.coin.dto.MarketResDto;

import com.wejbson.mockInvestment.domains.coin.dto.UbtApiMakretAllResDto;
import com.wejbson.mockInvestment.domains.coin.dto.UbtApiMarketCurrentPriceResDto;
import com.wejbson.mockInvestment.domains.coin.repository.CoinRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Description;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CoinServiceImpl implements CoinService{

    @Value("${upbit.api.url}")
    private String upbitApiUrl;

    private final RestTemplate restTemplate;

    private final CoinRepository coinRepository;

    @Description(value = "업비트 market 리스트 조회")
    @Override
    public List<MarketResDto> getMarketList() {
        List<MarketResDto> marketResDtoList = new ArrayList<MarketResDto>();

        List<Coin> coinList = coinRepository.findAllCoins();

        for(Coin coin : coinList){
            marketResDtoList.add(MarketResDto.builder()
                    .market(coin.getMarket())
                    .korName(coin.getKorName())
                    .engName(coin.getEngName())
                    .currentPrice(coin.getOpening_price())
                    .build());
        }

        return marketResDtoList;
    }

    @Description("코인정보 DB에 저장하기 임시")
    @Transactional
    @Override
    public void saveCoins() {
        // 업비트 market List API(/v1/market/all) 호출 영역
        UbtApiMakretAllResDto[] listResponse = restTemplate.getForObject(upbitApiUrl + "/v1/market/all", UbtApiMakretAllResDto[].class);
        List<UbtApiMakretAllResDto> marketList = Arrays.asList(listResponse);

        int marketCount = 0;
        for(int i = 0; i < marketList.size(); i++)
        {
            Coin coin = new Coin();

            UbtApiMakretAllResDto ubtApiMakretAllResDto = marketList.get(i);
            // 한국 시장 데이터만 추출
            if(ubtApiMakretAllResDto.getMarket().startsWith("KRW")){

                // 현재가 조회 API 호출
                UriComponents builder  = UriComponentsBuilder.fromUriString(upbitApiUrl + "/v1/candles/minutes/1")
                        .queryParam("market", ubtApiMakretAllResDto.getMarket())
                        .queryParam("count", 1)
                        .encode()
                        .build();
                UbtApiMarketCurrentPriceResDto[] currentPriceResponse = restTemplate.getForObject(builder.toUri(), UbtApiMarketCurrentPriceResDto[].class);
                UbtApiMarketCurrentPriceResDto currentPriceResDto = Arrays.asList(currentPriceResponse).get(0);

                // 기존에 저장되어 있는 코인인지 확인
                Coin srchCoin = coinRepository.findCoin(ubtApiMakretAllResDto.getMarket());

                if(srchCoin != null)
                {
                    srchCoin.setOpening_price(currentPriceResDto.getOpening_price());
                } else {
                    coin.setMarket(ubtApiMakretAllResDto.getMarket());
                    coin.setEngName(ubtApiMakretAllResDto.getEnglish_name());
                    coin.setKorName(ubtApiMakretAllResDto.getKorean_name());
                    coin.setOpening_price(currentPriceResDto.getOpening_price());
                    coinRepository.saveCoin(coin);
                }
                marketCount++;
            }

            if(marketCount > 5){
                break;
            }
        }

        log.info("코인데이터 저장 완료");
    }
}
