package com.wejbson.mockInvestment.domains.apigen.dto;

import com.wejbson.mockInvestment.domains.apigen.domain.ApigenPerson;
import com.wejbson.mockInvestment.domains.apigen.domain.ApigenPersonalInfo;
import lombok.Data;

import java.util.List;

@Data
public class ApigenReqVO {
    private boolean isReq;
    private ApigenPerson person;
    private List<ApigenPersonalInfo> infoList;
}
