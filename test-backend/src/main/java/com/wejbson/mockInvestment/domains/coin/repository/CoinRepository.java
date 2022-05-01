package com.wejbson.mockInvestment.domains.coin.repository;

import com.wejbson.mockInvestment.domains.coin.domain.Coin;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class CoinRepository {

    @PersistenceContext
    EntityManager em;

    public void saveCoin(Coin coin){
        em.persist(coin);
    }

    public Coin findCoin(String market){
        return em.find(Coin.class, market);
    }

    public List<Coin> findAllCoins(){
        return em.createQuery("select c from Coin as c", Coin.class).getResultList();
    }

}
