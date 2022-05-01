package com.wejbson.mockInvestment.domains.coin.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

// 업비트 API
// Access Key : 8ZIuewPOGfmFoLCyhgssccju91MfOD5QCLn3M7Nf
// Secret Key : mqcNTwOI5Zd9SrW7zndj9SlCZM6Dx1XtbWpGK72T

@Entity
@Getter @Setter
public class Coin {

    @Id @NotBlank
    private String market;

    private String korName;

    private String engName;

    private String opening_price;

}
