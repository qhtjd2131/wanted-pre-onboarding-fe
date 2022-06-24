# :: 원티드 프리온보딩 프론트엔드 코스 사전과제

## Quick Overview

모듈 설치 
```
npm install
```

json-server 실행(port : 8080)
```
node server/server.js
```

dev server 실행
```
npm run start
```
<br>

**description**
- width 사이즈 320px 까지의 모바일 환경 반응형 구현.
- Mock server(json-server)를 사용하여, 로그인 데이터, Feed 데이터를 GET, PUT Method로 컨트롤.
- globalStyleVariables를 정의하여, 컴포넌트 스타일 쉽게 변경 가능.
- 사용자의 편의 중심 개발.
- 에러가 나더라도 프로세스에 영향이 가지 않도록 에러 처리.
<br><br>

**추가로 설치된 라이브러리**
- react-icons
  - icon 사용
- json-server
  - Restful mock server 구현
- polished
  - style-components 에서 lighten, darken function 사용.
- axios
  - json-server와 http 통신
---

## Assignment 1 - Login 

- id, pw 값을 useState()가 아닌 useRef()로 구현하여, 리랜더링 최소화.
- 로그인 시 localStorage에 현재 유저정보 저장.
- 로그인 성공 시 main page로 이동.

- 사용자 흐름
  - InputPassWord 컴포넌트가 focus 상태일때 'Enter' 키로 로그인 할 수 있게 구현.
  - 사용자가 페이지를 닫고 다시 접속할 때(로그아웃 X), login page를 건너뛰고, main page로 바로 이동.

  <br>
## Assignment 2 - GNB

- `position : sticky` property를 사용하여, 레이아웃을 차지하면서 fixed된 효과 구현.
- window width가 600px 미만일 때, Input 컴포넌트 `display : none`
- 로그아웃 버튼, 기능 구현
  - 로그아웃 시, localStorage에 저장된 유저정보 삭제 후 login page로 이동.

  <br>

## Assignment3 - Validation
- id validation check function
  ```javascript
  // src/components/Home/Login.module.js
  export const checkIdValidation = (id) => {
    const bool =
      /^(?=.*\.)(?=.*\@)[A-Za-z\d@~!@#$%^&*()-_=+\|\[\]{};:'",.<>/?]+$/g.test(id);

    return bool;
  };
  ```
  
- password validation check function
  ```javascript
  // src/components/Home/Login.module.js
  export const checkPwValidation = (pw) => {
    const bool =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&()\-_=+|[\]{};:'",.<>/?])[A-Za-z\d~!@#$%^&()\-_=+|[\]{};:'",.<>/?]{8,}/g.test(
        pw
      );

    return bool;
  };
  ```

- login check function
  ```javascript
  export const checkLogin = async (id, pw) => {
    const response = await axios
      .get(`http://localhost:8080/users?userName=${id}`)
      .catch(() => {
        return {
          data: [],
        };
      });
    if (response.data.length === 0) {
      // console.log('동일한 id가 없음');
      return false;
    } else if (response.data[0].passWord != pw) {
      // console.log('비밀번호 오류');
      return false;
    } else {
      // console.log('로그인 성공');
      return true;
    }
  };
  ```
  로그인 검증 방법은 ID확인 => PW확인 순으로 이루어 진다. ID확인에서 실패한다면 PW확인은 이루어지지 않는다.

  <br>

## Assignment4 - Routing

페이지 이동은 `react-router-dom`의 `useNavigate()` hooks를 이용
- 로그인 성공
  - localStorage에 currentUser 저장
  - main page로 이동
- 로그아웃
  - localStorage에 currentUser 제거
  - main page로 이동
- login page 접속
  - localStorage에 currentUser 존재여부 확인
  - currentUser 존재 시, main page로 이동
  - currentUser 없을 시, login page 그대로 유지
- 링크로 main page 접속
  - localStorage에 currentUser 존재여부 확인
  - currentUser 존재 시, main page 그대로 유지
  - currentUser 없을 시, login page로 이동

  <br>

## Assignment5 - Feeds
- feed
  - 화면 중앙에 위치
  - window width가 400px 미만일 때, `width:100%`로 반응형 구현
  - 각 피드마다 `[isLoad, setIsLoad] = useState(false)`를 초기값으로 가진다.
  - 초기상태의 feed 는 `opacity : 0, visibility : hidden` 속성으로 보이지 않는 상태
  - 이 때, image.onLoad() 를 정의하여, 각 피드의 이미지가 load 완료 되었을 때, `opacity : 1, visivility : visible` 로 변경하여 화면에 보여지게 된다.

- feed data
  - /sever/data.js 에 위치
  - 피드 데이터는 `json-server`를 이용하여 구축한 Restful 서버와 HTTP 통신(axios 사용)으로 제어됨
  - 하나의 피드에 담긴 정보
    - id
    - 작성자, 작성자 이미지 주소
    - 이미지 컨텐츠 주소
    - 텍스트 컨텐츠
    - 좋아요 수
    - 댓글
- feed 댓글 기능
  - Enterkey or 클릭 으로 댓글 게시 가능
  - Input이 비어있다면, 게시 기능 동작하지 않게 구현
  - 게시 후 Input 값이 비워지게 구현.
  - 댓글 게시에 오류가 생길 경우, Input값을 비우지 않음.
  - Feed 댓글이 끊기지 않은 긴 영어 단어로 이루어 져 있을 때, overflow 되는 현상을 `word-break: break-all;` 속성으로 방지
- feed 이미지
  - feed image는 400x400 사이즈를 기본값으로 함.
  - 사진을 클릭해서 볼 수 없는 인스타그램의 특성에 맞추어 원본에 가까운 이미지를 한눈에 볼 수 있게 만드는 것에 초점을 둠.
  - 가로 세로 중 더 긴 값을 400px로 맞추기 위해 `object-fit: scale-down` 속성을 이용함.
  - 배경을 `black`으로 설정하여, 400x400 사이즈에 벗어난 부분은 검은색으로 나오게 함(시각적인 효과, 피드 크기 유지).
  - 만일 400x400 사이즈보다 더 작은 이미지가 업로드 되면, 사진 그대로의 크기를 유지하고, 가운데 위치하게 함.
  - 예시 피드 이미지로 400x400, 2080x500, 700x1080 사이즈를 사용함.
  

<br><br>

## 사용자 관점에서의 개발 사항
- login page 에서 InputPassWord 컴포넌트가 focus 상태일때 'Enter' 키로 로그인 할 수 있게 구현.
- login page 에서 idInput과 pwInput에 입력값이 있을 때만, checkValidation 을 함. 이는 아무 입력이 없는 초기화면에서, validation false로 인한 스타일 변경(border : red)을 방지함.

- 사용자가 페이지를 닫고 다시 접속할 때(로그아웃 X), login page를 건너뛰고, main page로 바로 이동.
- Feed 댓글을 다는 중 오류 발생 시, Input 값을 비우지 않고 유지.
- Feed 댓글이 비어있다면, 사용자의 클릭 실수를 대비해 댓글 게시기능 동작하지 않음.
- Feed 댓글이 끊기지 않은 긴 영어 단어로 이루어 져 있을 때, overflow 되는 현상을 `word-break: break-all;` 속성으로 방지.

<br><br>

## 마치며...

로직과 기능을 사용자 흐름을 상상하며 구현했습니다. 모든 사용자 시나리오를 고려했다고 확신 할 수는 없습니다. 하지만 예외적인 시나리오가 발생하더라도 그에 알맞은 적절한 처리를 할 수 있습니다.

함수 또는 컴포넌트 설계, 데이터 구조 등을 확장성과 가독성을 고려해서 개발했습니다. 경험과 식견이 부족하여 잘못된 방법일수도 있지만, 쉽게 접근하고 확장가능하게 만들자는 근본적인 목표는 동일합니다. 이처럼 근본적인 목표를 생각하고 나아간다면, 저는 높은 성장을 이룰것을 확신합니다.
