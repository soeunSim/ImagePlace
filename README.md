# 🖼️ **ImagePlace**

<p align="center">
  <img src="https://github.com/user-attachments/assets/da757d51-cdc7-4c90-ab25-bd2a93a14f59">
</p>

<p align="center">
ImagePlace는 이미지 등록 시 <br/> 일회성으로 고유한 URL을 제공하는 이미지 호스팅 사이트입니다.
</p>

<p align="center">
  <a href="https://app.myimageplace.com" target="_blank">🔗 ImagePlace 바로가기 </a>
</p>

<br/><br/>

# 목차

- [개발 배경](#%EA%B0%9C%EB%B0%9C-%EB%B0%B0%EA%B2%BD)
- [기능 및 환경 소개](#%EA%B8%B0%EB%8A%A5-%EB%B0%8F-%ED%99%98%EA%B2%BD-%EC%86%8C%EA%B0%9C)
  - [1.1 구현화면 및 기능 소개](#11-%EA%B5%AC%ED%98%84%ED%99%94%EB%A9%B4-%EB%B0%8F-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C)
  - [1.2 기술 스택 및 환경](#12-%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D-%EB%B0%8F-%ED%99%98%EA%B2%BD)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [배포 & 빌드](#%EB%B0%B0%ED%8F%AC--%EB%B9%8C%EB%93%9C)
  - [1.3 상태관리는 어떻게? Zustand vs Redux vs useContext](#13-%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-zustand-vs-redux-vs-usecontext)
  - [1.4 호스팅 서비스, 왜 서버리스 Lambda인가?](#14-%ED%98%B8%EC%8A%A4%ED%8C%85-%EC%84%9C%EB%B9%84%EC%8A%A4-%EC%99%9C-%EC%84%9C%EB%B2%84%EB%A6%AC%EC%8A%A4-lambda%EC%9D%B8%EA%B0%80)
- [세부 구현 사항](#%EC%84%B8%EB%B6%80-%EA%B5%AC%ED%98%84-%EC%82%AC%ED%95%AD)
  - [1.1 등록한 이미지는 어디로 저장 되는가](#11-%EB%93%B1%EB%A1%9D%ED%95%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80%EB%8A%94-%EC%96%B4%EB%94%94%EB%A1%9C-%EC%A0%80%EC%9E%A5-%EB%90%98%EB%8A%94%EA%B0%80)
    - [[의문] 왜 일반 데이터베이스가 아닐까?](#%EC%9D%98%EB%AC%B8-%EC%99%9C-%EC%9D%BC%EB%B0%98-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4%EA%B0%80-%EC%95%84%EB%8B%90%EA%B9%8C)
    - [[해결] 왜 Amazon S3인가\*\*](#%ED%95%B4%EA%B2%B0-%EC%99%9C-amazon-s3%EC%9D%B8%EA%B0%80)
  - [1.2 이미지를 저장하기 위해 필요한 설정은?](#12-%EC%9D%B4%EB%AF%B8%EC%A7%80%EB%A5%BC-%EC%A0%80%EC%9E%A5%ED%95%98%EA%B8%B0-%EC%9C%84%ED%95%B4-%ED%95%84%EC%9A%94%ED%95%9C-%EC%84%A4%EC%A0%95%EC%9D%80)
    - [[발생 문제] S3에 동일한 파일명으로 업로드할 경우](#%EB%B0%9C%EC%83%9D-%EB%AC%B8%EC%A0%9C-s3%EC%97%90-%EB%8F%99%EC%9D%BC%ED%95%9C-%ED%8C%8C%EC%9D%BC%EB%AA%85%EC%9C%BC%EB%A1%9C-%EC%97%85%EB%A1%9C%EB%93%9C%ED%95%A0-%EA%B2%BD%EC%9A%B0)
    - [[추가 발생 문제] 사용자가 S3에 직접 업로드하는 방법은 위험하다](#%EC%B6%94%EA%B0%80-%EB%B0%9C%EC%83%9D-%EB%AC%B8%EC%A0%9C-%EC%82%AC%EC%9A%A9%EC%9E%90%EA%B0%80-s3%EC%97%90-%EC%A7%81%EC%A0%91-%EC%97%85%EB%A1%9C%EB%93%9C%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95%EC%9D%80-%EC%9C%84%ED%97%98%ED%95%98%EB%8B%A4)
  - [1.3 보안을 지켜 주는 AWS Pre-signedURL](#13-%EB%B3%B4%EC%95%88%EC%9D%84-%EC%A7%80%EC%BC%9C-%EC%A3%BC%EB%8A%94-aws-pre-signedurl)
    - [[보안] 추가 보안 강화 방안, 짧은 TTL(Time To Live) 유지](#%EB%B3%B4%EC%95%88-%EC%B6%94%EA%B0%80-%EB%B3%B4%EC%95%88-%EA%B0%95%ED%99%94-%EB%B0%A9%EC%95%88-%EC%A7%A7%EC%9D%80-ttltime-to-live-%EC%9C%A0%EC%A7%80)
    - [[번외 문제] DNS 관련 오류 및 해결](#%EB%B2%88%EC%99%B8-%EB%AC%B8%EC%A0%9C-dns-%EA%B4%80%EB%A0%A8-%EC%98%A4%EB%A5%98-%EB%B0%8F-%ED%95%B4%EA%B2%B0)
  - [2.1 이미지 해상도는 그대로 두고 용량만 줄일 수 있는가](#21-%EC%9D%B4%EB%AF%B8%EC%A7%80-%ED%95%B4%EC%83%81%EB%8F%84%EB%8A%94-%EA%B7%B8%EB%8C%80%EB%A1%9C-%EB%91%90%EA%B3%A0-%EC%9A%A9%EB%9F%89%EB%A7%8C-%EC%A4%84%EC%9D%BC-%EC%88%98-%EC%9E%88%EB%8A%94%EA%B0%80)
  - [2.2 quality를 사용하면 용량을 얼마나 줄일 수 있을까?](#22-quality%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EB%A9%B4-%EC%9A%A9%EB%9F%89%EC%9D%84-%EC%96%BC%EB%A7%88%EB%82%98-%EC%A4%84%EC%9D%BC-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C)
  - [3.1 어떤 방법으로 이미지를 자를까? UX UI구성하기](#31-%EC%96%B4%EB%96%A4-%EB%B0%A9%EB%B2%95%EC%9C%BC%EB%A1%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80%EB%A5%BC-%EC%9E%90%EB%A5%BC%EA%B9%8C-ux-ui%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0)
  - [3.2 사용자가 잘라낼 Overlay 영역과 조절할 Handle 구하기](#32-%EC%82%AC%EC%9A%A9%EC%9E%90%EA%B0%80-%EC%9E%98%EB%9D%BC%EB%82%BC-overlay-%EC%98%81%EC%97%AD%EA%B3%BC-%EC%A1%B0%EC%A0%88%ED%95%A0-handle-%EA%B5%AC%ED%95%98%EA%B8%B0)
  - [3.3 Handle을 통한 지정 영역 조정하기, 캔버스 좌표 기반 움직임 구현](#33-handle%EC%9D%84-%ED%86%B5%ED%95%9C-%EC%A7%80%EC%A0%95-%EC%98%81%EC%97%AD-%EC%A1%B0%EC%A0%95%ED%95%98%EA%B8%B0-%EC%BA%94%EB%B2%84%EC%8A%A4-%EC%A2%8C%ED%91%9C-%EA%B8%B0%EB%B0%98-%EC%9B%80%EC%A7%81%EC%9E%84-%EA%B5%AC%ED%98%84)
    - [[개선점] useState 상태 관리, 그리고 useRef 기반 성능 최적화 고려](#%EA%B0%9C%EC%84%A0%EC%A0%90-usestate-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC-%EA%B7%B8%EB%A6%AC%EA%B3%A0-useref-%EA%B8%B0%EB%B0%98-%EC%84%B1%EB%8A%A5-%EC%B5%9C%EC%A0%81%ED%99%94-%EA%B3%A0%EB%A0%A4)
    - [[발생 문제] 사용자가 지정한 영역이 너무 작아서 추출할 값이 없다](#%EB%B0%9C%EC%83%9D-%EB%AC%B8%EC%A0%9C-%EC%82%AC%EC%9A%A9%EC%9E%90%EA%B0%80-%EC%A7%80%EC%A0%95%ED%95%9C-%EC%98%81%EC%97%AD%EC%9D%B4-%EB%84%88%EB%AC%B4-%EC%9E%91%EC%95%84%EC%84%9C-%EC%B6%94%EC%B6%9C%ED%95%A0-%EA%B0%92%EC%9D%B4-%EC%97%86%EB%8B%A4)
  - [3.4 지정한 영역을 잘라내기](#34-%EC%A7%80%EC%A0%95%ED%95%9C-%EC%98%81%EC%97%AD%EC%9D%84-%EC%9E%98%EB%9D%BC%EB%82%B4%EA%B8%B0)
- [회고](#%ED%9A%8C%EA%B3%A0)

<br/><br/>

# 개발 배경

Notion과 같은 협업 도구를 사용하다 보면 이미지 업로드 용량 제한 때문에 원하는 이미지를 자유롭게 활용하기 어려웠던 경험이 있으실 겁니다. 이럴 때 필요한 것은 이미지 호스팅 서비스이지만, **등록된 이미지가 다른 사람에게 노출되지 않고, 고용량 이미지를 압축 후 저장하며, 단기간 보관**되어 신경 쓸 필요 없는 서비스는 쉽게 찾기 어려웠습니다.

이러한 **문제점을 직접 해결**해보고자 이미지 호스팅 프로젝트를 시작하게 되었습니다.

<br/><br/>

# 기능 및 환경 소개

## 1.1 구현화면 및 기능 소개

<table>
  <tr>
    <td width="60%" align="center">
      <img width="553" center height="334" style="display:inline-block;" src="https://github.com/user-attachments/assets/4dcf96fc-fc85-4991-97b3-e9c06847b10e" />
    </td>
    <td width="40%">
      * 메인 페이지<br /><br />
      좌측 박스는 드래그 드롭으로 등록이 가능하며 드래그 드롭 후 바로 이미지 호스팅이 실행됩니다. 우측 input 박스의 경우 클릭하여 이미지 등록이 가능합니다.
      고용량 이미지(2MB이상) 해상도를 유지한 채 압축을 제공합니다.
    </td>
  </tr>
  <tr>
    <td width="60%" align="center">
      <img width="503" center height="324" style="display:inline-block;" src="https://github.com/user-attachments/assets/4ccf1e92-6b3a-471c-a2dc-c3464fd506f8" />
    </td>
    <td width="40%">
      * 호스팅 페이지<br /><br />
      사용자가 등록한 이미지의 호스팅을 제공하는 페이지 입니다. 최상단은 호스팅 기간이 유효하는 동안 사용자가 접근할 수 있는 제공페이지의 URL입니다. 하단은 이미지의 호스팅 URL, 마크업 및 태그가 적용 된 URL입니다.
    </td>
  </tr> 
  <tr>
    <td width="60%" align="center">
      <img width="503" center height="324" style="display:inline-block;" src="https://github.com/user-attachments/assets/c2bf162d-703a-4bb4-a618-6f132d6642d9" />
    </td>
    <td width="40%">
      * 편집(자르기) 페이지<br /><br />
      사용자가 등록한 이미지의 호스팅을 제공하는 페이지 입니다. 최상단은 호스팅 기간이 유효하는 동안 사용자가 접근할 수 있는 제공페이지의 URL입니다. 하단은 이미지의 호스팅 URL, 마크업 및 태그가 적용 된 URL입니다.
    </td>
  </tr>  
</table>

<br/>

## 1.2 기술 스택 및 환경

### **Frontend**

| 사용 툴      | 역할           |
| ------------ | -------------- |
| React        | UI 개발        |
| Zustand      | 전역 상태 관리 |
| Tailwind CSS | 스타일링       |

### **Backend**

| 사용 툴              | 역할                                |
| -------------------- | ----------------------------------- |
| AWS Lambda           | 서버리스                            |
| API Gateway          | 라우팅                              |
| AWS S3               | 이미지 저장소 (Pre-signed URL 사용) |
| CloudFront + Route53 | CDN 및 도메인 관리                  |
| DynamoDB             | 데이터베이스                        |

### **배포 & 빌드**

| 사용 툴 | 역할        |
| ------- | ----------- |
| Netlify | 정적 호스팅 |
| Vite    | 빌드 도구   |

<br/>

## 1.3 상태관리는 어떻게? Zustand vs Redux vs useContext

Zustand를 사용하여, 프로젝트 핵심 상태인 **사용자가 등록한 이미지 파일의 정보**를 관리하고 있습니다.<br/>
| | ✅ Zustand | ❌ Redux | ❌ useContext |
| --------- | ---------------- | ------------- | ------------ |
| 장점 | 1. 가벼운 보일러플레이트로 전역 상태 관리를 빠르게 적용 가능. <br/>2. 상태 변경 시 필요한 컴포넌트만 리렌더링되도록 최적화. | 1. 대규모 애플리케이션에 적합하며, 커뮤니티가 활성화 되어있음. | 1. 별도의 라이브러리 설치가 필요없는 React 내장 기능으로, 작은 규모의 애플리케이션에 적합.<br/> 2. 러닝커브가 낮음. |
| 단점 | 비교적 새로운 라이브러리이므로, 사용 사례에 대한 자료가 적음. | 초기 설정과 코드 구조가 복잡하여 보일러플레이트가 무겁고 러닝커브가 높음. | useContext를 가지고 있지 않는 곳이라면 컴포넌트의 재활용이 어려움. |

프로젝트 구조 상 각 컴포넌트들이 형제컴포넌트로 존재하기 때문에 공유해야 할 상태(사용자가 등록한 파일의 정보, 로딩상태)를 prop으로 내려주기 어려워 전역으로 관리하게 되었고 상대적으로 러닝커브가 낮고 적은 리랜더를 발생시키는 **Zustand**를 택하게 되었습니다.<br/><br/><br/>

## 1.4 호스팅 서비스, 왜 서버리스 Lambda인가?

ImagePlace는 **AWS에서 제공하는 Lambda를 사용하여 구축**하였습니다. <br/>

**서버**는 “클라이언트(브라우저) → 이미지 업로드 **요청(request)** → 처리 결과(URL) **응답(response)** 반환” 흐름에서
**요청**을 받아 → **응답**을 반환하는 역할을 합니다. 이미지 호스팅 서비스라면 **이미지 업로드 → URL 발급** 같은 요청-응답을 처리해야 하므로 프로젝트에서 **서버의 구현은 필수적** 이었습니다.

그럼 어떻게 서버를 만들면 좋을까요? 초기에는 자체 서버 개발만이 유일한 선택지라고 생각으나 개발 환경에 대한 조사를 진행하면서 **서버리스(Serverless)** 라는 개념을 접하게 되었습니다.<br/>

**서버리스(Serverless)** 는 “개발자가 서버 컴퓨터를 직접 설치·운영하거나, 업데이트·모니터링하지 않아도, 클라우드 서비스가 대신 요청을 받아 처리해 주는 방식”을 말합니다. 서버리스를 제공하는 AWS의 경우 내부적으로 AWS Lambda, S3, API Gateway 같은 서비스가 동작하며, 사용자는 별도 서버 관리 없이 기능만 손쉽게 이용할 수 있습니다.

결정하기 앞서, 자체 서버 개발 환경의 **node.js+express** 와 **AWS Lambda** 를 비교해 보았었습니다.

|      | ✅ **AWS Lambda**                                                                                                                                                                                                                       | ❌ **node.js + express**                                                                                                                        |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 장점 | 1. 서버, OS 등 기본 인프라 관리를 담당해주어, 보안 업데이트 및 운영 부담을 줄일 수 있음.                                                                                                                                                | 1. 모든 시스템 구성 요소를(운영체제, 런타임) 직접 관리할 수 있어 보안 정책과 방어 전략을 세밀하게 적용 가능.                                    |
| 단점 | 1. 여러 함수 및 AWS의 다른 서비스(API Gateway, S3 등)와 연계하여 사용하는 경우, 각각의 설정 오류나 권한 과잉 문제를 겪을 수 있음.<br/>2. AWS가 인프라의 대부분을 관리하기 때문에, 사용자가 서버 설정을 직접 수정하거나 제어하기 어려움. | 1. 잘못된 서버 설정, 부적절한 CORS 정책을 설정 할 우려. <br/> 2. 서버 OS 및 네트워크 장비 등 직접 관리하는 경우, 미흡한 보안이 발생 할 수 있음. |

Node.js 기반으로 개발하는 것도 좋은 경험이 될 것이라 생각했지만, 보안 정책을 세밀하게 제어해야 하는 부담과 러닝 커브로 인해 프로젝트 기간 내 구현에 대한 우려가 있었습니다. <br/>

반면, AWS Lambda를 사용하면 보안을 포함한 운영 부담을 줄일 수 있고, 서버에서 처리할 함수의 수가 많지 않기 때문에 설정 오류에 대한 걱정도 덜 수 있어 **최종적으로 AWS Lambda 서비스를 사용하기로 결정**했습니다.

<br/><br/>

# 세부 구현 사항

## 1.1 등록한 이미지는 어디로 저장 되는가

사용자가 이미지를 업로드하면, 그 파일은 **Amazon S3(Simple Storage Service)** 라는 클라우드 저장소에 보관됩니다.<br/>

### **[의문] 왜 일반 데이터베이스가 아닐까?**

이미지 파일은 수십 MB가 넘는 **이진 데이터(binary)** 를 담고 있습니다.  
이런 큰 파일을 MySQL, MongoDB 같은 데이터베이스에 넣으면 데이터베이스 용량이 커져서 읽기·쓰기 속도가 느려지고 관리 비용이 올라갑니다.

### **[해결] 왜 Amazon S3인가**

**Amazon S3**는 “대용량 파일 전송·저장”에 최적화된 서비스입니다.  
여러 서비스 중에서, **Amazon S3**를 택한 이유는 다른 AWS 서비스와 손쉬운 연동(Lambda, CloudFront 등) 할 수 있는 점을 확인했습니다.
때문에 최종적으로 Amazon S3를 채택하여 이미지 저장소를 생성하게 되었습니다.

<p align="center">
  <img width="650" alt="aws구성" src="https://github.com/user-attachments/assets/abd030cb-4efd-40b4-ba6b-c71385a937f7" />
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/ea44ba02-2f85-4543-ba77-222fb27fb6de">
</p>

이처럼, **빈번히 변경되고 크기가 큰 이미지**는 데이터베이스 대신 **S3**에 저장함으로써 서비스 안정성과 성능을 동시에 확보할 수 있었습니다.

<br/>

## 1.2 이미지를 저장하기 위해 필요한 설정은?

Amazon S3에서 이미지를 S3에 저장하려면, 즉 클라이언트가 S3 버킷에 접근하려면
“누가(인증) → 어떤 파일(권한) → 어디서(출처)” 업로드할지 **3가지 설정**이 필요합니다.<br/>

<p align="center">
  <img width="503" alt="버킷설정" src="https://github.com/user-attachments/assets/b3954deb-83f3-41f1-bfd8-585600587f6b" />
</p>

1. **IAM 권한 설정**

   - `s3:PutObject`, `s3:GetObject` 권한을 가진 역할(Role) 또는 사용자(User)를 만들어야 합니다.

2. **버킷 정책(Bucket Policy)**

   - 해당 역할/사용자만 특정 버킷에 파일을 올리도록 허용하는 규칙을 추가합니다.

3. **CORS 설정(Cross-Origin Resource Sharing)**
   - 브라우저가 다른 도메인(내 사이트 → S3)으로 파일을 올릴 때 보안 오류가 나지 않도록 허용 도메인(origin)을 등록합니다.

상단에 언급한 설정들을 통해 S3 저장소에 정상적으로 업로드가 되는 것을 확인했으나, **예상치 못 한 문제가 발생**하였습니다.

<br/>

### **[발생 문제] S3에 동일한 파일명으로 업로드할 경우**

이미지 업로드 시 **UUID + 확장자** 형태의 고유 파일명을 사용하였습니다.

![URL중복이름문제.png](https://github.com/user-attachments/assets/c09bcb31-7a0b-4382-b017-827d4fa726c1)

1. **한글 파일 명으로 업로드 시, 인코딩 문제로 인해 등록한 URL의 파일명이 깨지는 문제.**
2. **동일한 파일 명으로 중복 업로드할 경우, 기존 이미지가 덮어씌워지는 현상이 발생.**

이미지를 S3에 보내기 전, 중복을 피할 수 있는 고유한 파일 명으로 변경 후 해당 URL을 받는 방식으로 진행하면, 1번과 2번 문제를 동시에 해결할 수 있다고 판단하였습니다.
<br/>

<br/>

> **중복은 그만, 고유성을 보장하는 UUID** <br/>
> UUID(Universally Unique Identifier)는 **128비트의 고유 식별자**로,
> 네트워크 상에서 고유한 id, 또는 값을 만들기 위해 국제 표준 규약으로 정의한 값 입니다.

<br/>

`UUID`는 일반적으로 랜덤 값, 시간 정보 등 여러 요소를 조합하여 생성되므로 동일한 값이 다시 생성될 가능성은 극히 낮아, 사실상 고유하다고 볼 수 있습니다. 다만, 확률적으로 중복 가능성을 완전히 배제하기 어려워, UUID가 이미 사용 중인지 DB에 저장된 값과 비교하여 확인하는 추가 검증 Logic 도입을 고려할 필요가 있다고 판단되었습니다. <br/>

그러나 프로젝트 규모가 작아 생성될 데이터양이 적을 것으로 추정하여 추후 리팩토링 단계에서 구현하기로 의사결정을 내리게 되었습니다.

이어서 `UUID` 제공하는 고유 값 그대로 파일명을 교체하는 방안으로 검토하던 중, 등록 시 전달되는 file 객체에 name 키가 포함되어 있음을 인지했습니다. 이에 해당 키에 직접 `UUID`를 할당하고자 `file.name = UUID4()`로 값을 변경했으나, Uncaught TypeError가 발생했습니다.

```jsx
Uncaught TypeError: Cannot assign to read only property "name" of object "[object File]"
```

에러코드를 확인 후후 `file.name`에 대한 접근이 잘 못 되었을까? 라는 의문이 들게 되었고 공식 문서를 확인한 결과 **`file.name`은 읽기 전용 속성**으로 **직접 수정할 수 없는 것을 발견하였습니다.** [[file api 공식문서]](https://developer.mozilla.org/en-US/docs/Web/API/File)

![fileName자료.png](https://github.com/user-attachments/assets/02476415-433e-46bd-a066-e0f2224dca28)

보안 정책 이슈로 인해 `file.name`을 직접 수정할 수 없었지만 대안으로 새로운 파일 객체를 생성하여 이름을 새로 부여하는 방법이 존재 했습니다. 아래는 새로운 파일 객체를 적용한 Logic입니다.

<table>
  <tr>
    <td>❌ <strong>새로운 객체를 생성하여 파일명을 수정한 로직</strong></td>
  </tr>
  <tr>
    <td width="100%" align="center">
      <img src="https://github.com/user-attachments/assets/589da9e9-ca49-4c63-99e9-a79de838bbfc" />
    </td>
  </tr>
</table>

위의 코드를 재 테스트한 결과 정상적으로 열람되는 것을 확인했습니다. 다만, 본래의 목적이 사용자가 등록한 이미지의 파일명 변경에 집중한 것이므로 **굳이 새로운 파일 객체를 생성할 필요가 없음**을 깨달았습니다. <br/> <br/>
이에 따라 원본 이미지 파일에서 확장자를 추출할 때, **`pop()` 매서드를 사용하여 확장자를 분리하고, 고유 식별자와 결합하여 새 파일명(newFileName)을 생성하는 Logic으로 재작성**하였습니다.<br/>

<table>
  <tr>
    <td>✅ <strong>파일명으로만 수정한 로직</strong></td>
  </tr>
  <tr>
    <td width="100%" align="center">
      <img src="https://github.com/user-attachments/assets/4adacd14-6482-4c86-a72e-8b7259658fc8" />
    </td>
  </tr>
</table>

이로써 사용자가 이미지를 등록하여 S3 저장소에 저장하는 초기 플로우 작업을 완료했지만, 추가 새로운 **문제**를 마주하게 되었습니다.

<br/>

### **[추가 발생 문제] 사용자가 S3에 직접 업로드하는 방법은 위험하다**

> 1. **클라이언트에서 직접 이미지를 등록하는 방식은 보안 상 권장되지 않았습니다.** <br/>
>    클라이언트 코드에 API 키나 자격 증명이 포함될 경우, 이를 탈취 당해 악용할 수 있습니다.

이 문제를 해결할 수 있는 방법으로 **AWS Pre-signed URL**이 적절한 답임을 알게 되었습니다.

<br/>

## 1.3 보안을 지켜 주는 AWS Pre-signedURL

서버를 통해 미리 서명된 URL(pre-signed URL)을 제공하면 일정 시간 동안 유효한 URL을 발급과 동시에 자격 증명 이루어져 클라이언트에 노출되지 않아 보안 정책을 유지할 수 있습니다.

그렇다면 어떤 흐름으로 pre-signed URL을 사용해야 할까요?

**[ ✅ pre-signed URL 적용 후, Flow ]**

<img width="850" alt="preSignedURL적용후" src="https://github.com/user-attachments/assets/8abf703c-0149-4baa-bccf-46c7c17ad2aa" />

1. 클라이언트가 이미지를 등록하여 서버리스 서비스인 Lambda에게 pre-signed URL을 요청(POST)합니다.
2. Lambda는 클라이언트가 전달 준 이미지를 기반으로 pre-signed URL를 생성하여 클라이언트에게 응답합니다.
3. Lambda는 클라이언트에게 pre-signed URL 정보를 응답함과 동시에 DB에도 해당 정보를 저장해 둡니다.
4. 클라이언트는 응답 받은 pre-signed URL을 S3에게 다시 전달(PUT)합니다.
5. S3안의 버킷에 보안 서명이 된 이미지가 저장이 됩니다.

즉, 사용자가 전달 받는 URL은 S3에 실제 파일이 업로드 되기 전에 미리 구성된 것으로 서버에게 응답 받은 pre-signed URL로 S3에 파일을 PUT 요청하여 업로드한 후, 해당 URL로 접근하게 되는 것입니다.
아래는 pre-signed URL을 적용한 Lambda에서의 Logic입니다.

<br/>

![pre-signed적용한Logic.jpg](https://github.com/user-attachments/assets/afa9b595-c4fa-4049-bfab-b54fe29d5e9f)

이것으로 **사용자는** ImagePlace가 제공하는 **S3에 대해 이미지를 등록할 수 있도록 300초(5분)간 허용** 받게 되는 것 입니다!

<br/>

### **[보안] 추가 보안 강화 방안, 짧은 TTL(Time To Live) 유지**

사전 서명된 URL의 보안성을 한층 강화하기 위해, URL 유효 시간을 300초(5분)로 설정하고 CloudFront 캐시의 최소·기본·최대 TTL 역시 모두 300초로 통일했습니다.

사전 서명된 URL의 유효 기간을 **24시간 → 5분으로 약 288배 단축(86,400초 → 300초)**하여, URL 탈취 시 공격 가능성을 대폭 줄였습니다. AWS 공식 문서에 따르면 기본 캐시 정책의 기본 TTL은 86,400초(24시간), 최소 TTL은 1초, 최대 TTL은 31,536,000초(365일)로 설정되어 있어 발급된 사전 서명 URL이 최대 하루 동안 재사용될 수 있습니다. 이처럼 긴 TTL은 URL이 탈취되었을 때 공격자가 오랜 시간 공격을 시도할 수 있는 여지를 제공하기 때문에, 모든 TTL을 300초로 단축하여 불필요하게 넓은 공격 표면을 최소화했습니다.

이 설정을 통해 캐시 만료 시점을 예측 가능하게 만들고 변경된 리소스가 5분 이내에 반영되도록 보장함으로써, 사용자에게는 언제나 최신 이미지를 안전하게 제공하면서도 URL 유효 기간을 짧게 유지해 보안 위협을 크게 줄일 수 있었습니다.

<br/>

### **[번외 문제] DNS 관련 오류 및 해결**

> 1. **Lambda를 통해 S3 업로드가 에러 코드 없이 등록이 잘 되지만 발급 받은 URL링크를 연결할 수 없다는 현상을 발견했습니다.** <br/> **[오류 코드 내용]** "dns_probe_finished_nxdomain" → DNS에서 해당 도메인을 찾지 못한다는 의미

</aside>

<p align="center">
  <img width="850" alt="버킷에_연결한_DNS" src="https://github.com/user-attachments/assets/83735286-9dbc-4f7b-9ba2-77ca8bfe704d" />
</p>

CloudFront는 CDN(콘텐츠 전송 네트워크)로 Lambda 함수는 파일이 업로드 될 S3 버킷 안에 있는 이미지의 위치를 기반으로 미리 최종 접근 URL을 생성할 때 CloudFront 도메인을 사용합니다.

여기서 도메인이 뜨지 않는다는 건 **CloundFront 연결에 문제**가 있다는 것이므로 Cloudfront의 설정을 다시 검토 할 필요가 있었습니다.

**[💻 문제원인 후보 리스트 ]**

- [ ✅ : 정상 ] CloudFront에 S3 버킷이 잘 연결 되어있는지 확인.
- [ ✅ : 정상 ] CloudFront 배포의 Origin Path(경로) 확인.
  - Origin Path를 빈 값 설정 후 S3 버킷에 위치한 폴더(`upload/`)를 읽을 수 있도록 세팅했는지.
- [ ✅ : 정상 ] 캐시 무효화(invalidation) 작업 시도
  - 작업을 시도 → 버킷의 객체 경로 지정해서 추가 시도 → 변화 없음. <br/>
    ![image.png](https://github.com/user-attachments/assets/17b54012-63a9-480b-a281-a07a1708364a)
- [ ✅ : 정상 ] Cloudfront 에 ACM 인증서가 연결되어있는지?
  - Cloudfront 배포를 하기 위해선 미국 버지니아 동부 지역의 SSL 인증서가 필수 입니다!
  - 해당 SSL인증서에 \*.myimagePlace.com (와일드 카드 사용한 도메인으로 인증 함)
- [ ✅ : 정상 ] Alternate Domain Names (CNAMEs) 확인
  - 대체 도메인에 `img.myimageplace.com`과 `*.myimageplace.com`이 등록되어 있는지?
- [ ❌ : 문제 ] CloudFront와 Route53 네임서버(NS) 주소가 일치하는지 확인.

<br/>

**[💻 CloudFront와 Route53 네임서버(NS) 불일치 자료 사진]**

<p align="center">
  <img src="https://github.com/user-attachments/assets/7b4da2f9-49b2-4eaf-aad8-943730765d41">
</p>
CloudFront 도메인과 Route53의 네임서버(NS) 불일치로 인해 DNS 오류(dns_probe_finished_nxdomain)가 발생하였던 문제였습니다.
단순히 CloudFront에 Route53에서 발급한 도메인을 적용시켜 주는 것 뿐만이 아니라
CloudFront 배포 설정에서 Route53의 레코드 값을 재검토해 일치시켜주어야 했고 정상적으로 연결되게 처리하였습니다.

<br/><br/>

## 2.1 이미지 해상도는 그대로 두고 용량만 줄일 수 있는가

`.toBlob()` 매서드의 quality 파라미터를 사용하여 용량을 줄일 수 있었습니다.

먼저, 유사 서비스들이 어떻게 용량 문제를 해결하고 있는지 조사를 진행했습니다.

1MB에서 8.5MB 사이의 고해상도 이미지를 준비해 테스트한 결과, A 사이트에서는 4.5MB 이상의 이미지 등록 시 자동으로 압축을 수행하는 반면, B와 C 사이트에서는 별도의 이미지 용량 압축 기능은 제공하지 않았으며, 5MB 이상의 이미지를 등록할 경우 10초 이상 Lazy Loding 현상이 발생하는 점을 발견했습니다.

이러한 결과를 토대로, **고용량 등록에 대응해 이미지 용량 압축을 구현하는 것이 사용자 경험 측면에서 유리하다고 판단**하여 기능 개발을 시작하게 되었습니다.

**[ 💁사이트 별 용량 변화 테스트 ]**

|                | A. Imgur         | B. PostImage | C. imaebb |
| -------------- | ---------------- | ------------ | --------- |
| 용량 압축 여부 | ✅ 8.5MB → 4.7MB | ❌           | ❌        |
| 지연 시간      | 6초              | 12초         | 10초      |

본격적으로 용량 압축하는 방안을 검토하던 중, browser-image-compression과 Compressor.js라는 라이브러리를 발견했고 두 라이브러리 모두 공식 문서와 소스 코드를 통해 `canvas`태그를 활용하여 용량 압축을 지원한다는 점을 확인할 수 있었습니다. (참고로, browser-image-compression은 2021년에 `canvas` 기반 방식에서 UZIP 방식으로 변경되었다고 명시되어 있습니다.)

핵심은 **Canvas 태그를 활용하여 해상도는 유지한 채 이미지의 용량만 줄일 수 있다는 것**입니다. 이를 위해 `.toDataURL()`과 `.toBlob()` 두 가지 방식이 있으며, 이 두 매서드의 파라미터 중 **이미지 압축 품질(quality)을 조절**하는 것이 용량을 줄이는 중요한 요소입니다.

> **quality가 다루는 손실 압축 방식 이란?** <br/>
> 픽셀 수를 줄이는 것이 아니라, 각 픽셀에 저장된 정보의 일부를 의도적으로 버려 파일 크기를 줄이는 방식입니다.

**[ 💁매서드 비교 ]**

|           | ✅.toBlob()                                                                                      | ❌.toDataURL()                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| 반 환 값  | 캔버스의 내용을 **Blob** 객체로 반환(blob는 이진 데이터 덩어리)                                  | 캔버스의 내용을 Base64 인코딩된 데이터 URL로 반환(이미지 데이터를 포함하는 문자열)                         |
| 작동 방식 | 비동기식 처리                                                                                    | 동기식 처리                                                                                                |
| 특징      | 네트워크 전송이나 파일 저장에 유리한 Blob 데이터로 더 **큰 이미지 파일을 처리하는데 효율 적**임. | Base64로 인코딩된 데이터는 이미지 크기가 커지나, 텍스트 형식으로 다룰 수 있어 **처리 속도 면에서는 빠름**. |

공식 문서에서도 큰 이미지의 경우 성능 문제를 고려해 `canvas.toBlob()` 사용을 권장하고 있거니와 사용자가 고해상도 이미지를 등록할 가능성을 감안하여, 본 프로젝트에서는 **canvas.toBlob() 방식을 채택**하기로 결정하였습니다.

<br/>
<br/>

## 2.2 quality를 사용하면 용량을 얼마나 줄일 수 있을까?

사용자가 업로드 한 이미지가 `canvas` 태그에 랜더링 되었을 때 `.toBlob()` 함수의 quality 파라미터값을 제어하게 되면 용량을 줄일 수 있습니다! 아래는 코드는 toBlob()매서드의 구조입니다.

```js
// Syntax => toBlob(callback, type, quality)
canvas.toBlob(
  (blob) => {
    console.log(blob);
  },
  "image/jpeg",
  0.5
);
```

옵셔널 값인 quality는 0 ~ 1사이의 값을 가지며 값이 1에 가까울 수록 높은 품질을 제공합니다. 해당 수치를 고려하여 품질을 손실을 덜 해치는 수치인 **0.8** 과 **0.7** 값을 설정 후 평균 압축률을 구해보았습니다.

|             | ✅quality 0.7 | ❌quality 0.8  |
| ----------- | ------------- | -------------- |
| 평균 압축률 | 약 48% 감소   | 약 12~13% 감소 |

<br/>

압축 테스트의 상세한 결과는 아래와 같습니다.

<br/>

**[ 0.8 - 1차 압축 파일 용량 변화 ]**

- 1.41MB → 1.17MB
- 1.98MB → 1.76MB
- 4.78MB → 4.20MB
- 1.93KB → 5.09KB
- 4.18KB → 2.08KB

앞서 기술하였듯이 `quality` 인자는 0에서 1 사이의 값을 가집니다. 따라서 `quality`를 0.8로 설정할 경우, 극적인 용량 감소가 발생하지 않을 수 있다는 점은 이해가 되었으나 KB를 압축하는 테스트에서는 오히려 파일 크기가 증가하는 현상이 나타났습니다.

이러한 현상이 `quality`인자의 수치를 조정해도 동일하게 발생하는지 확인하기 위해 `quality`값을 0.7로 재 조정했습니다.

**[0.7 - 2차 압축 파일 용량 변화]**

- 1.41MB → 756KB
- 1.98MB → 1.10MB
- 4.78MB → 2.41MB
- 1.93KB → 5.09KB
- 4.18KB → 2.08KB

![용량변화비교.png](https://github.com/user-attachments/assets/7e81c32e-0cdc-447b-a73d-9fac3bc60bd2)

1.9MB 이상의 고용량 이미지의 경우 긍정적인 압축률을 얻을 수 있으나, 저용량 이미지에서는 오히려 용량이 커지는 현상이 확인 되었고 관련 이슈를 조사한 결과, 재인코딩 과정에서 원본 이미지가 이미 최적화된 경우에는 압축 후 파일 크기가 증가할 수 있다는 정보를 확인했습니다.

때문에 벤치 마킹을 진행했던 A. imagur 에서도 4.5MB 이상의 고용량 이미지에 한해 압축 서비스를 제공하는 것으로 보아, 이 같은 이유가 작용했을 것으로 생각하게 되었습니다.

그렇다면 저용량 이미지의 경우 되려 파일 크기가 증가하는 경우의 **대안**으로, `quality`인자는 0.7 고정하여 **2MB 이상의 이미지부터 압축을 적용**하도록 조건문을 설정하여 이미지 압축을 진행하는 쪽으로 결정 및 구현하였습니다.

```jsx
const IMAGE_DECREASE_CONDITION_SIZE = 2 * 1024 * 1024;
// 적용한 조건문
const compressedReduceImage =
  fileToUpload.size > IMAGE_DECREASE_CONDITION_SIZE
    ? await reduceImageVolume(fileToUpload, 0.7)
    : fileToUpload;
```

<br/>

## 3.1 어떤 방법으로 이미지를 자를까? UX UI구성하기

호스팅 flow를 작업하면서 이미지와 연관 된 편집 기능이 있으면 좋을 것 같다고 떠올렸고, **사용자가 기본 제공 영역을 직접 조절해 원하는 부분만 추출**하는 자르기 기능을 제공할 수 있도록 설계하는 것을 목표로 했습니다.

이 과정에서 카카오톡의 자르기 기능처럼 직관적이고 쉬운 UX UI 구성을 구현해보기로 결정했습니다. <br/>
아래의 사진 처럼 사용자가 등록한 이미지를 보여주는 `canvas` (아래), 사용자가 이미지를 잘라낼 영역을 정할 수 있는 `canvas`(위) 두가지 `canvas`를 겹쳐 자르기 기능을 구현하는 방향으로 접근하게 되었습니다.

![image.png](https://github.com/user-attachments/assets/46fa960f-642a-42c6-a06e-1cb422190cb9)

<br/><br/>

## 3.2 사용자가 잘라낼 Overlay 영역과 조절할 Handle 구하기

사용자가 **자유롭게 이미지를 자를 수 있도록**, 화면 위에 사각형 자르기 영역(Overlay)을 생성하고, 그 네 모서리에 "핸들(Handle)"을 배치해 영역을 직접 조절할 수 있도록 설계했습니다.

이를 위해 가장 먼저, 사용자가 자를 수 있는 영역을 시각적으로 표현할 정적인 배경이 필요했습니다.

<p align="center">
<img width="511" alt="canvas_설명" src="https://github.com/user-attachments/assets/67ab5858-a668-43f9-bac8-2dda0780bb89" />
</p>
이런 배경은 `Canvas`에서 사각형을 그리는 방식으로 구현하며, 하나의 사각형을 정의하려면 `x`, `y` 좌표와 `width`, `height` — 총 4개의 인자가 필요합니다.
위의 canvas 해당 구조를 활용해 Overlay를 만들기 위해서 두 개의 사각형을 조합해 사용합니다.

<br/>

<p align="center">
  <img width="805" alt="canvas_설명02" src="https://github.com/user-attachments/assets/bade9c09-f559-43ec-9694-3df4fb62df5b" />
</p>

1. 첫 번째 사각형에서는 `fillRect()`를 사용해 `canvas` 전체를 채워 "자르기 상태"를 표현합니다.
2. 그 위에 `clearRect()`를 적용해 사용자가 실제로 선택할 수 있는 투명한 영역을 만들어 Overlay를 구성합니다.

<br/>
<p align="center">
  <img alt="canvas_설명02" src="https://github.com/user-attachments/assets/8769b46c-71f2-4532-9559-98cf7473e481" />

</p>

이렇게 만들어진 Overlay 사각형 중 투명한 영역의 네 모서리에 작은 사각형 "핸들(Handle)"을 배치해 사용자가 영역 크기를 직관적으로 조절할 수 있도록 합니다.
아래는 좌측 상단과 우측 상단에 핸들을 배치할 때의 좌표 계산 방식입니다.

```js
// B의 [A]핸들(좌측 상단 모서리) 구하는 공식
"핸들"을 그리는 데 필요한 값은?
-> 지울 영역의 좌측 상단 모서리 x 값
"핸들"을 좌측 상단 모서리 x 값의 가운데 놓으려면?
-> 좌측 상단 모서리 x 값 - "핸들"의 너비 / 2
-> 좌측 상단 모서리 y 값 - "핸들"의 높이 /2
```

```js
// B의 [B]핸들(우측 상단 모서리) 구하는 공식
"핸들"을 그리는 데 필요한 값은?
-> 지울 영역의 우측 상단 모서리 x 값 + width 값
"핸들"을 우측 상단 모서리 x 값 + width 값의 가운데 놓으려면?
-> 우측 상단 모서리 x 값 + width 값 - "핸들"의 너비 / 2
-> 좌측 상단 모서리 y 값 + width 값 - "핸들"의 너비 / 2
```

이와 같이 Overlay 영역과 핸들의 위치를 계산하면, 사용자가 직관적으로 이미지를 자를 영역을 조절할 수 있습니다.

<br/>
<br/>

## 3.3 Handle을 통한 지정 영역 조정하기, 캔버스 좌표 기반 움직임 구현

사용자가 사각형(자르기) 영역을 자유롭게 조절할 수 있도록, 각 ‘핸들’에 `mousedown` 이벤트를 걸어 마우스 움직임을 감지하도록 설계했습니다.  
핵심은 마우스가 움직인 거리만큼 사각형(자르기)영역의 위치와 크기를 실시간으로 업데이트하는 것입니다.

예를 들어 사용자가 핸들을 누르면 `event.clientX`는 화면(뷰포트) 기준 좌표를 반환하지만, 우리가 원하는 건 `canvas` 기준 좌표입니다.

때문에 뷰포트 내 `canvas`요소의 위치를 파악 할 수 있는 매서드 `getBoundingClientRect()`를 사용하여 `canvas` 요소의 위치와 크기를 파악합니다.

예를 들어, `getBoundingClientRect()`함수를 사용해 파악 된 요소의 위치 값 event.clientX가 80px이고, `canvas` 의 왼쪽 경계(rect.left)가 30px이면, `canvas` 내부에서의 마우스 X 좌표는 80px - 30px = 50px이 됩니다.

```js
// 브라우저 기준 좌표 - 요소의 왼쪽 위치 = 요소 내부의 상대 좌표
mouseX = event.clientX - rect.left;
```

<p align="center">
  <img width="559" alt="뷰포트영역외요소내마우스위치구하기" src="https://github.com/user-attachments/assets/78bd3f9a-2ff1-4b1c-8fa1-5f7910685d7d" />
</p>

```jsx
const rect = overlayCanvasRef.current.getBoundingClientRect();
const mouseX = event.clientX - rect.left;
const mouseY = event.clientY - rect.top;
```

이렇게 계산된 상대 좌표를 바탕으로, 클릭한 handle과 현재 지정 영역의 상태, 그리고 마우스 위치를 저장합니다.

이제 동작을 위한 모든 재료는 준비되어있습니다. 사용자가 `canvas`요소 안에서 마우스를 움직이면 발생하는 `mousemove` 이벤트로 초기 마우스 위치와 현재 위치 사이의 delta(변위, deltaX와 deltaY)를 계산합니다.

이 변위를 기반으로, activeHandle(현재 조절 중인 handle)에 따라 지정 영역의 좌표와 크기를 업데이트합니다.예를 들어, 좌측 상단의 빨간 핸들(handle)을 드래그 하면, 지정 영역의 `x`, `y` 값이 증가하면서 `width`와 `height`는 감소하게 됩니다.

### **[개선점] useState 상태 관리, 그리고 useRef 기반 성능 최적화 고려**

현재 캔버스 좌표기반 움직임을 관리하는 상태는 `useState`로 관리하고 있으며 움직임에 따른 리랜더를 줄일 수 있는 방향으로 `useRef`를 사용을 고려하게 되었습니다.

사용자가 핸들(handle) 조작하게 되면 `useState`를 통하여 `mousemove` 이벤트 상태가 계속 업데이트됩니다.
이 경우 React 컴포넌트는 매번 리렌더링되기 때문에, 사용자가 빠르게 마우스를 움직이거나 이미지 크기가 클 경우 성능 이슈로 이어질 수 있습니다.

비록 `canvas` 내부는 React의 가상 DOM 대상이 아니므로 직접적인 DOM 조작 비용은 없지만,
상태 변경 자체는 리렌더를 유발하므로 비용이 누적될 수 있는 부분을 간과할 수 가 없었습니다.
때문에 컴포넌트의 시각적 출력에 영향을 미치지 않는 정보를 저장하는 데 적합한 `useRef` 를 대안으로 선정하게 되었습니다.

| 비교 항목                   | useState            | useRef                            |
| --------------------------- | ------------------- | --------------------------------- |
| 값 변경 시 리렌더 발생 여부 | ✅ 발생함           | ❌ 발생하지 않음                  |
| UI에 바로 반영되는가?       | ✅ 예               | ❌ 아니오                         |
| 마우스 좌표, 이전 상태 추적 | ❌ 렌더링 비용 발생 | ✅ 참조값만 갱신 → 성능 부담 적음 |

이에 따라 다음 리팩토링 단계에서는 useRef를 도입하여 다음과 같은 개선을 고려하게 되었습니다.

> **개선 목표:**  
> 마우스 좌표, 드래그 상태 등 UI에 직접 노출되지 않는 값은 useRef로 관리하여, <br/> **불필요한 리렌더를 줄이고 보다 부드러운 사용자 경험**을 제공할 예정입니다.

<br/>

### **[발생 문제] 사용자가 지정한 영역이 너무 작아서 추출할 값이 없다**

<p align="center">
  <img src="https://github.com/user-attachments/assets/aa76b444-b7b6-4a3e-9c49-b4d77463120c"> 
</p>

1. **사용자가 선택한 지정 영역의 width 와 height가 0 이 되어 추출되는 이미지 영역이 유효하지 않는 현상이 발생하였습니다.**

더불어 핸들 크기에 가려져 사용자가 지정 영역을 자세하기 확인하기 어려운 단점 또한 발견 했습니다. 그렇다면 사용자가 지정 영역을 줄이다가 **최소 크기에 도달하면 지정 영역이 줄어들지 않게** 만들어야 합니다.

먼저 newRect.x 값과 newRect.y 를 만나게 하지 않도록 둘의 값이 일치하다면 이라는 조건을 세웠습니다. 그러나 문제의 조건을 도식화하여 확인 했을 때 X축과 Y축은 값이 같아도 이어지는 꼭짓점으로만 만나며 정작 넓이 값을 가지지 못하였습니다. <br/><br/>
그렇다면 여기서 핵심은 넓이값 인 것을 인지하게 되었고 **최소 제한 크기 기준점(50px)** 을 정해 상수로 관리하는 것이 좋을 것이라 판단했습니다. <br/>
사용자가 지정 영역을 줄일 때 최소 제한 크기 보다 작아지면 해당 지정 영역을 값을 담은 newRect.width 와 newRect.height에게 무조건 최소 제한 크기의 값을 넣어주었습니다.

```jsx
const MIN_CROP_SIZE = 50;
// 적용한 조건문
if (newRect.width < MIN_CROP_SIZE) newRect.width = MIN_CROP_SIZE;
if (newRect.height < MIN_CROP_SIZE) newRect.height = MIN_CROP_SIZE;
```

<br/><br/>

## 3.4 지정한 영역을 잘라내기

사용자 입장에서는 이미지를 자르는 것과 유사하지만, **실제로는 지정한 영역을 추출**해야 합니다.

이미지에서 해당 영역을 추출한 후 저장하고, 이를 Lambda에 전달하여 URL을 반환 받는 것이 최종 프로세스입니다. 그렇다면, 추출한 이미지를 어떻게 저장해야 할까요?

사용자가 지정한 영역의 `x`, `y`, `width`, `height` 값을 계산한 후, **새로운 `canvas`에 해당 영역을 그려 `blob` 파일로 변환하여 전달**하면 됩니다. 이를 통해 최종적으로 선택된 영역을 기준으로 원본 이미지에서 해당 부분만 추출할 수 있습니다.

다만, 이번에는 `canvas`를 브라우저 화면에 직접 표시하지 않고, 사용자가 볼 수 없는 **offscreen canvas**를 생성 해야 합니다. 사용자가 "URL 생성" 버튼을 눌러 지정 영역의 이미지를 추출했으므로, 별도로 화면에 렌더링 할 필요가 없습니다. 이렇게 하면 UI에 영향을 주지 않으면서 이미지 추출 작업을 효율적으로 처리할 수 있습니다.

```jsx
// 기존 canvas -> canvas 태그에 useRef로 속성을 받아서 사용
const canvas = overlayCanvasRef.current;
const ctx = canvas.getContext("2d");

// offscreen 의경우
const cropCanvas = document.createElement("canvas");
const cropCtx = cropCanvas.getContext("2d");
```

이 과정을 통해 사용자는 선택한 이미지를 편집한 후 S3에 저장하고, 해당 이미지의 URL을 제공받는 서비스를 이용할 수 있습니다.

<br/><br/>

# 회고

프로젝트를 시작하기 전, 백엔드 부분도 작업하게 됨과 동시에 AWS와 같이 한 번도 사용해본 적 없는 클라우드 서비스를 다루어야 한다는 부담이 컸습니다. AWS의 방대한 정책 설정부터 복잡한 API 구성까지, 익숙하지 않은 영역에서 하나하나 지원하는 서비스들을 이해해 나가는 과정은 큰 도전이었습니다.

그러나 관련 온라인 강의를 찾아보고, 공식 문서를 꼼꼼히 읽으며 문제를 하나씩 해결해 나갔고, 이 과정을 통해 단순히 기능을 익히는 것을 넘어 구현을 이루어낸 성취감 및 문제 해결 능력과 새로운 기술에 대한 접근 방식을 터득할 수 있었습니다.

이번 프로젝트는 제 내면과 기술 양면에서 큰 성장을 이룰 수 있는 계기가 되었으며, 앞으로도 지속적으로 개선해 나갈 예정입니다.

<br/>
