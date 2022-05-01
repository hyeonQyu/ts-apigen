package com.wejbson.mockInvestment.domains.member.repository;

import com.wejbson.mockInvestment.domains.member.domain.Member;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
public class AccountRepository {

    @PersistenceContext
    private EntityManager em;

    public void save(Member member){
        em.persist(member);
    }

    public Member find(String id){
        return em.find(Member.class, id);
    }
}
