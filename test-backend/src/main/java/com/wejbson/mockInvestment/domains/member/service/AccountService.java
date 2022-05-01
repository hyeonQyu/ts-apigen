package com.wejbson.mockInvestment.domains.member.service;

import com.wejbson.mockInvestment.domains.member.domain.Member;
import com.wejbson.mockInvestment.domains.member.dto.LoginReqDto;
import com.wejbson.mockInvestment.domains.member.dto.SignUpReqDto;

public interface AccountService {

    // 회원가입 로직
    void signUp(SignUpReqDto signUpReqDto);

    // 로그인 로직
    Member login(LoginReqDto loginRequestDto);
}
