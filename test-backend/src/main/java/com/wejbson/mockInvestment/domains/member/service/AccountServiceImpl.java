package com.wejbson.mockInvestment.domains.member.service;

import com.wejbson.mockInvestment.domains.member.domain.Member;
import com.wejbson.mockInvestment.domains.member.dto.LoginReqDto;
import com.wejbson.mockInvestment.domains.member.dto.SignUpReqDto;
import com.wejbson.mockInvestment.domains.member.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class AccountServiceImpl implements AccountService{

    @Autowired
    private AccountRepository accountRepository;

    @Override
    @Transactional
    public void signUp(SignUpReqDto signUpReqDto) {

        // 중복된 id 존재하는지
        if(!isNotExistId(signUpReqDto.getId())){
            throw new RuntimeException("이미 존재하는 아이디입니다.");
        }

        // DB 저장 로직
        Member member = new Member();
        member.setId(signUpReqDto.getId());
        member.setName(signUpReqDto.getName());
        member.setPassword(signUpReqDto.getPassword());
        member.setTel(signUpReqDto.getTel());
        accountRepository.save(member);

    }

    @Override
    public Member login(LoginReqDto loginReqDto) {

        // id를 통한 Member 객체 데이터 조회
        Member member = accountRepository.find(loginReqDto.getId());

        if(member == null)
        {
            throw new RuntimeException("존재하지 않는 아이디입니다.");
        }

        if(!loginReqDto.getPassword().equals(member.getPassword()))
        {
            throw new RuntimeException("잘못된 비밀번호입니다.");
        }

        return member;
    }

    private boolean isNotExistId(String id) {
        if(accountRepository.find(id) != null)
        {
            return false;
        }

        return true;
    }
}
