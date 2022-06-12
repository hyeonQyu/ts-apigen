# [TS-APIgen] typescript REST API 요청 코드 자동 생성

## 1. 개요
Typescript를 도입하면서 API 타입을 코드로 작성하게 되었습니다. 그러나 백엔드에서 코드로 작성하는 API를 Swagger와 같은 문서를 보고 프론트엔드에서 다시 요청 코드를 작성해야 한다는 것이 상당히 번거롭게 느껴졌습니다.

Swagger가 API 문서를 UI로 표시해주는 기능을 보고 프론트의 요청 코드 작성을 자동화할 수 있을 것 같다는 생각을 하게 되었습니다.

### OpenAPI Spececification (OAS)
OpenAPI는 RESTful API를  정의된 규칙에 맞게 표현하는 방식입니다.

Swagger에서도 OAS로 표현된 데이터를 UI로 표시하고 있었습니다. OAS를 사용하여 자동으로 코드를 작성할 수 있었습니다.

[OpenAPI Specification - Version 3.0.3 | Swagger](https://swagger.io/specification/)

> 개방된 공공 API를 의미하는 Open API와 다른 의미입니다.

## 2. 설치 및 실행
### npm package
[ts-apigen - npm (npmjs.com)](https://www.npmjs.com/package/ts-apigen)

### 설치
프로젝트 루트 디렉토리에서 아래와 같이 설치합니다.

개발 시에만 사용하기 때문에 **devDependencies**에 추가합니다.


```
$ npm -D install ts-apigen
```

### 실행
설치가 완료되면 아래와 같이 프로그램을 실행합니다. 새로운 브라우저 탭이 자동으로 열립니다.

--port 옵션을 사용하여 실행 포트를 변경할 수 있습니다. 옵션 없이 실행 시 **6200**번 포트를 사용합니다.

브라우저에서 아래 화면이 나타나면 정상적으로 실행된 것입니다.

```
$ npx ts-apigen
$ npx ts-apigen --port 8888
$ npx ts-apigen -p 8888
```
![image](https://user-images.githubusercontent.com/44297538/173226378-c46eaf34-5654-46f6-8da3-49ab605a582f.png)


## 3. 옵션
### API docs URI (required)
OpenAPI Spec을 반환하는 URI 주소로 아래 Swagger UI에서 붉은색 네모 영역에 해당됩니다.

유효한 URI 입력 시 해당 Spec에 정의되어 있는 Controller 목록을 불러옵니다.

![image](https://user-images.githubusercontent.com/44297538/172747696-04c9ccc0-2c7a-4ea2-9e1c-5578bb051891.png)

![uri](https://user-images.githubusercontent.com/44297538/173227288-500d0efa-c8a5-44b3-b97b-4e9f851736e7.gif)
***
### prettier 설정 파일
생성되는 typescript 코드의 포맷 설정 파일(.prettierrc)입니다.

선택한 .prettierrc 파일 이름 위에 커서를 올리면 적용할 설정을 확인할 수 있습니다.

![image](https://user-images.githubusercontent.com/44297538/173227036-c62b8b04-71a2-4b18-bde3-421dbbe1c465.png)

파일 미선택 시 기본 설정이 적용되며 기본 설정은 아래와 같습니다.

```javascript
{
    trailingComma: 'all',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    printWidth: 140,
    parser: 'babel-ts',
}
```
prettier 설정에 대한 자세한 내용은 [Options · Prettier](https://prettier.io/docs/en/options.html) 에서 확인하세요.
***
### Controller 선택
REST API 요청 코드는 Controller 별로 별도의 파일에 작성됩니다.

Controller를 선택하면 선택한 Controller에 대응하는 Request.ts 파일이 생성됩니다.

선택한 Controller가 없는 경우에는 모든 Controller에 대한 REST API 요청 코드가 생성됩니다.

선택한 Controller를 제외한 다른 Controller에 대응하는 요청 코드를 생성할 수도 있습니다.

> TestController에 대응하는 REST API 요청 코드는 testRequest.ts 라는 파일 이름으로 생성됩니다.
***
### HTTP 통신 방식
코드에 사용될 통신 방식을 fetch / axios 중 선택합니다.

> 현재는 axios만 사용 가능합니다.
***
### 자동 생성 코드 경로
코드가 생성되는 위치로 기본값으로 `${projectdir}/src/apis`가 설정됩니다.

이때 요청 코드는 `${projectdir}/src/apis/requests`, 객체 정의는 `${projectdir}/src/apis/models`에 생성됩니다.
***
### Base Root
![image](https://user-images.githubusercontent.com/44297538/172748586-3c2c93bc-0486-4eec-b401-c21ff6d33166.png)

위 코드와 같이 하나의 Controller에 대한 요청이 여러 URL에 대해 mapping되어 있다면

그 Controller의 하나의 메소드에 여러 인터페이스가 생성됩니다.
![image](https://user-images.githubusercontent.com/44297538/172748412-3f886db6-9f32-4dae-a226-c11ac54e31c9.png)


여기서 공통으로 사용되는 URL의 일부인 account를 제외한 root1/, root2/를 Base Root로 지정해주어야 합니다.

> OpenAPI Spec 자체적으로 Base Root를 분리할 수 없습니다.

> Base Root 지정이 필요한 Controller에 대해 Base Root를 지정하지 않으면 생성된 코드에 오류가 생길 수 있습니다.

## 4. 코드 생성
하단의 코드 생성 버튼을 클릭하면 자동 생성 코드 경로에 지정한 위치에 코드가 생성됩니다.

![image](https://user-images.githubusercontent.com/44297538/172748649-4c5c246f-10a4-41d7-81ef-af572e7d2b8c.png)

##### Controller 코드 예
```java
@RestController
@RequestMapping("/apigen")
public class ApigenController {
    // ContentType: application/json
    // 반환형에 ResponseEntity<ApigenInfoResVO>를 사용하지 않아도 요청 코드는 정상적으로 생성됨
    @GetMapping("/info")
    private ResponseEntity<ApigenInfoResVO> info(@RequestBody ApigenInfoReqVO req) {
        /** do something **/
        return res;
    }
    
    // ContentType: formData
    // 반환형에 ResponseEntity<ApigenPerson>를 사용해도 요청 코드는 정상적으로 생성됨
    @GetMapping("/person")
    private ApigenPerson person(@RequestParam(required = true) Integer personSn) {
        /** do something **/
        return res;
    }
}
```

##### 생성된 요청 코드
```typescript
export namespace ApigenRequest {
    export async function info(req: ApigenInfoReqVO, config?: AxiosRequestConfig): Promise<ApigenInfoResVO> {
        return RequestCommon.axiosGet<ApigenInfoResVO>('/apigen/info', req, RequestCommon.getJsonConfig(config));
    }

    export async function person(personSn: number, config?: AxiosRequestConfig): Promise<ApigenPerson> {
        return RequestCommon.axiosGet<ApigenPerson>(
            '/apigen/person',
            RequestCommon.createFormData({ personSn }),
            RequestCommon.getFormDataConfig(config),
        );
    }
}
```

## 5. 제약 사항
OAS가 표현할 수 있는 데이터의 한계, OAS에 대한 지식 부족, 구현 난이도 및 중요도 등의 이유로 몇가지 제약 사항이 있습니다.

### 제네릭
OAS는 다양한 언어를 지원할 수 있는 RESTful API 디자인의 표준으로 제네릭 개념이 없는 언어 때문에 제네릭을 표현할 수 없습니다.

따라서 아래와 같이 표현됩니다.

##### 백엔드 Controller 메소드
![image](https://user-images.githubusercontent.com/44297538/172748713-ca069514-0193-4555-b71c-a56311f7ba2a.png)

##### 프론트 요청 코드
![image](https://user-images.githubusercontent.com/44297538/172748725-4211af4e-de89-4d74-8116-a77e05d31219.png)

### Content-Type: formData
요청을 formData 형식으로 보내는 경우 파라미터로 primitive type만 받을 수 있습니다.

### 선택한 Controller에서만 사용하는 Model 생성
요청 코드는 Controller를 선택하여 생성할 수 있습니다.

그러나 Model은 선택한 Controller에서 참조하는 Model 뿐만 아니라 모든 Controller에서 참조하는 Model에 대한 코드가 생성됩니다.

추후 업데이트할 예정입니다.

### OpenAPI Spececification 3.0 지원
현재 OAS의 최신 버전은 3.0이나 ts-apigen은 2.0 버전 기준으로 개발되었습니다.

3.0도 지원할 수 있도록 업데이트할 예정입니다.

[여기](https://gruuuuu.github.io/programming/openapi/)에서 2.0과 3.0의 차이를 간략히 확인할 수 있습니다.

### fetch 방식 코드 생성
귀찮아서 아직 안했습니다. ~~그냥 axios 쓰자!~~

추후에 업데이트할 예정입니다.

 

## 6. 기타
기타 문의사항은 [여기](https://github.com/hyeonQyu/ts-apigen/issues)에 남겨주세요.
