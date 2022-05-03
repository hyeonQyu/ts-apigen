package com.wejbson.mockInvestment.domains.apigen.dto;

import com.wejbson.mockInvestment.domains.apigen.domain.ApigenPerson;
import com.wejbson.mockInvestment.domains.apigen.domain.ApigenPersonalInfo;
import com.wejbson.mockInvestment.domains.apigen.enums.Rank;
import com.wejbson.mockInvestment.domains.apigen.enums.TestEnum;
import lombok.Data;

import java.util.List;

@Data
public class ApigenReqVO {
    private Boolean isReq;
    private ApigenPerson person;
    private ApigenPerson person2;
    private List<ApigenPersonalInfo> infoList;
    private Integer integers;
    private Float floats;
    private Double doubles;
    private Long longs;
    private List<Long> longsList;
    private Rank rank;
    private TestEnum testEnum;
}
